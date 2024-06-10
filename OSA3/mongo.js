const mongoose = require('mongoose')

const password = encodeURIComponent(process.argv[2])

const url =
  `mongodb+srv://fullstack:${password}@cluster0.pigqfhq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: `${process.argv[3]}`,
  number: `${process.argv[4]}`,
})

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

else if (process.argv.length === 3){
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(persons => {
          console.log(persons.name, " ", persons.number)
        })
        mongoose.connection.close()
      })
}
else if (process.argv.length === 5){
    person.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
})}

else {
    console.log('Wrong number of arguments!')
    process.exit(1)
}
