require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


morgan.token('post', (req, res) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
}
  next(error)
}

const Person = require('./models/person')

let persons = [
        {   "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
        ]

const infoPage = (req) => {
    return Person.find({}).then(persons => {
        return (`<p>Phonebook has info for ${persons.length} people</p>
                <p>${req}</p>`)})
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    })

app.get('/api/persons', (request, response) => {
        Person.find({}).then(persons => {
            response.json(persons)
        })
        })

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(p => {
        if (p){
            response.json(p)}
        else {
            response.status(404).end()
        }
    }).catch(error => next(error))
    })

app.delete('/api/persons/:id', (request, response, next) => {
        Person.findByIdAndDelete(request.params.id).then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    })

app.get('/info', (request, response) => {
    const reqTime = new Date()
    infoPage(reqTime).then(content => {
        response.send(content)})
    })

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    // const person = {
    //     name: body.name,
    //     number: body.number
    // }

    Person.findByIdAndUpdate(request.params.id, 
        {name, number}, 
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
    })


app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ 
            error: 'Name missing!' 
        })
    } else if (!body.number) {
        return response.status(400).json({ 
            error: 'Number missing!' 
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})