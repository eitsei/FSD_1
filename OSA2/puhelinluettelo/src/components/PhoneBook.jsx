import { useState, useEffect } from 'react'
import PersonsService from "../services/PersonsService"

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState("info")


  const errorMessageFunc = (person, service) => {
    if (service ==="delete"){
      setNotificationMessage("info")
      setErrorMessage(`You have removed ${person}`)
    }
    else if (service === "replace") {
      setNotificationMessage("info")
      setErrorMessage(`You have replaced ${person}'s number`)
    }
    else if (service === "add") {
      setNotificationMessage("info")
      setErrorMessage(`You have added ${person}`)
    }
    else if (service === "deleteWarning") {
      setNotificationMessage("error")
      setErrorMessage(`Information of ${person} has already been removed from server`)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const deletePersons = id => {
    if (window.confirm(`Delete ${persons.find(p=> p.id === id).name} ?`)){
      const changedPersons = persons.filter(p => p.id !== id)
      PersonsService.remove(id)
                    .then(personDelete => {
                      setPersons(changedPersons)
                    })
                    .catch(error => {
                      errorMessageFunc(persons.find(p=> p.id === id).name,"deleteWarning")
                    })
      errorMessageFunc(persons.find(p=> p.id === id).name, "delete")
                  }
  }

  const Notification = ({message }) => {
    if (message === null) {
      return null
    }
    else {
      if (notificationMessage === "error")
      {  return (
          <div className="error">
            {message}
          </div>)}
      else if (notificationMessage === "info") {
        return (
          <div className="info">
            {message}
          </div>
      )}   
      }
  }


  const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
      }
      const sameName = personObject.name.toUpperCase()
      const ppl = persons.find(p=> p.name === personObject.name)
      if (persons.map(p => p.name.toUpperCase()).includes(sameName)){ 
        if (window.confirm(`${ppl.name} is already added to phonebook, replace old number with new one?`)) 
          {PersonsService
            .update(ppl.id,personObject)
            .then(response =>{
                setPersons(newPersons =>
                  newPersons.concat(response.data))
                setNewName('')
                setNewNumber('')
            })
            .catch(error =>
              {
                errorMessageFunc(ppl.name,"deleteWarning")
              }
            )
          errorMessageFunc(ppl.name,"replace")}
        else
          alert(`${personObject.name} is already added to phonebook`)
        }
      else 
        {PersonsService
            .create(personObject)
            .then(response => 
              {
              setPersons(prevPersons =>
                prevPersons.concat(response.data))
              setNewName('')
              setNewNumber('')
              
            })
            .catch(error =>
              {
              console.log('Error: ', error)
            })

        errorMessageFunc(personObject.name, "add")}
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
    deletePersons,
    Notification,
    errorMessage
  }
}

export default Phonebook


