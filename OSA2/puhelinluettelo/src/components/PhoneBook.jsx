import { useState, useEffect } from 'react'
import axios from 'axios'

const phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("")

  const hook = () => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
        setPersons(response.data)
    }
    )
  }
  useEffect(hook,[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    const sameName = personObject.name.toUpperCase()
    if (persons.map(p => p.name.toUpperCase()).includes(sameName)) alert(`${personObject.name} is already added to phonebook`)
    else
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return {
    persons,
    newName,
    newNumber,
    addPerson,
    handleNameChange,
    handleNumberChange,
    newFilter,
    setNewFilter
  }
}

export default phonebook
