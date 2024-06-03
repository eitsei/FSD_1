import React from 'react'
import usePhonebook from "./components/PhoneBook"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const {
    persons,
    newName,
    newNumber,
    addPerson,
    handleNameChange,
    handleNumberChange,
    newFilter,
    setNewFilter,
    deletePersons
  } = usePhonebook()

  const personsToShow = 
    newFilter === ""
      ? persons
      : persons.filter(person => 
          person.name.toUpperCase().includes(newFilter.toUpperCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
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
