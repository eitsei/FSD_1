import useState  from 'react'
import PersonsService from "../services/PersonsService"

const Phonebook = (persons,setPersons) => {
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState("info")

  const errorMessageFunc = (person = "Unknown person", service, err) => {
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
    else if (service === "validationWarning") {
      setNotificationMessage("error")
      setErrorMessage(`${err}`)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const deletePersons = id => {
    const person = persons.find(p => p.id === id);
    if (!person) return;

    if (window.confirm(`Delete ${person.name}?`)){
      PersonsService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          errorMessageFunc(person.name, "delete")
        })
        .catch(error => {
          errorMessageFunc(person.name, "deleteWarning")
        });
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={notificationMessage === "error" ? "error" : "info"}>
        {message}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.find(p => p.name.toUpperCase() === personObject.name.toUpperCase())
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace old number with new one?`)) {
        const replacingPerson={...existingPerson, number:newNumber}
        PersonsService
          .update(existingPerson.id, replacingPerson)
          .then(response => { 
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : response))
            setNewName('')
            setNewNumber('')
            errorMessageFunc(existingPerson.name, "replace")})
          .catch(error => {
            errorMessageFunc(existingPerson.name, "deleteWarning")
          })
      }
      
      
    } else {
      PersonsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          errorMessageFunc(personObject.name, "add")
        })
        .catch(error => {
          errorMessageFunc(undefined, "validationWarning", error.response.data.error)
          console.log('Error: ', error.response.data.error)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return {
    
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
