import { useState, useEffect } from 'react'
import Phonebook from "./components/PhoneBook"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsService from "./services/PersonsService"



const App = () => {
  const {
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
  } = Phonebook()
  
  const [personsToShow, setPersonsToShow] = useState([])

  useEffect(() => {
    PersonsService.getAll().then(p => {
      setPersons(p)
      setPersonsToShow(p)})
  }, [])
  
  useEffect(() => {
    const updatedPersons = persons
    setPersonsToShow(updatedPersons)
    setPersonsToShow(
      newFilter === ""
        ? persons
        : persons.filter(person => 
            person.name.toUpperCase().includes(newFilter.toUpperCase())
          ))
  }, [persons, newFilter])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePersons={deletePersons} />
    </div>
  )
}

export default App
