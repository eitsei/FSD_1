import { useState, useEffect } from 'react'
import PersonsService from "../services/PersonsService"

const usePhonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("")

  const deletePersons = id => {
    const changedPersons = persons.filter(p => p.id !== id)
    PersonsService.remove(id)
                  .then(personDelete => {
                    setPersons(changedPersons)
                  })
  }

  useEffect(() =>{
    PersonsService.getAll()
                  .then(initialPersons => {
                    return setPersons(initialPersons)
                  })
    }, [])

  const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
      }
      const sameName = personObject.name.toUpperCase()
      //console.log('lisättävä objekti: ', personObject)
      if (persons.map(p => p.name.toUpperCase()).includes(sameName)) 
        alert(`${personObject.name} is already added to phonebook`)
      else 
        PersonsService
            .create(personObject)
            .then(response => 
              {
              const rData = response.data
              setPersons(prevPersons =>
                prevPersons.concat(rData))
              //console.log('Phonebookin response data:', response)
              //console.log('PhoneBookin persons: ', persons)
              setNewName('')
              setNewNumber('')
              
            })
            .catch(error =>
              {
              console.log('Error: ', error)
            })
      }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return {
    persons,
    setPersons,
    newName,
    newNumber,
    addPerson,
    handleNameChange,
    handleNumberChange,
    newFilter,
    setNewFilter,
    deletePersons
  }
}

export default usePhonebook


