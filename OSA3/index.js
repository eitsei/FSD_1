const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny', {
    skip: function (req, res) { return req.method === 'POST' }
}))
morgan.token('post', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : '' })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
const cors = require('cors')
app.use(cors())


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
    return(
            `<P>Phonebook has info for ${persons.length} people</P>
             <p>${req} </p>
            `)
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    })

app.get('/api/persons', (request, response) => {
        response.json(persons)
        })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => Number(p.id) === id)
    if (person) {
        response.json(person)
        } else {
        response.status(404).end()
        }
    })

app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(p => Number(p.id) !== id)
        response.status(204).end()
    })

app.get('/info', (request, response) => {
    const reqTime = new Date()
    response.send(infoPage(reqTime))
    })


const generateId = () => {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(10000);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }    

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) 
        return response.status(400).json({ 
        error: 'Name missing!' 
        })
    else if (!body.number) 
        return response.status(400).json({ 
        error: 'number missing!' 
        })
    else if (persons.some(p => p.name === body.name)) 
        return response.status(400).json({ 
        error: 'name must be unique!' 
        })

    else if (persons.some(p => p.number === body.number)) 
        return response.status(400).json({ 
        error: 'Number must be unique!' 
        })

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)

    })    

    const PORT = process.env.PORT || 3003
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })