import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Form from './components/Form'
import Filter from './components/Filter'
import service from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else {
    if (message.type === 'success'){
      return (
        <div className="success">
          {message.text}
        </div>
      )
    }
    else {
      return (
        <div className='error'>
          {message.text}
        </div>
      )
    }
  }

}

const App = () => {


  // state handlers
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  const [ addMessage, setMessage] = useState(null)

  // function for filtering using indexOf
  const filterItems = (array, query) => {
    return array.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  // fetching initial state of persons from json-server
  useEffect(() => {service.getAll().then(initialContacts => {setPersons(initialContacts)})}, [])

  // event handler for search query
  const handleQueryChange = (event) => {
    setNewQuery(event.target.value)
  }

  // event handler for form
  const addContact = (event) => {
    event.preventDefault()

    const checker = persons.filter(person => person.name===newName)

    if (newName){

      if (checker.length!==0){

        if (!newNumber || newNumber===checker[0].number){
          window.alert(`${newName} is already added to phonebook`)
        }

        else {
          // updating contacts
          if(window.confirm(`${checker[0].name} is already added to the phonebook, replace the old number with the new one?`)){
            const contact = persons.find(el => el.id === checker[0].id)
            const changedContact = { ...contact, number: newNumber }

            service
            .updateContact(checker[0].id, changedContact)
            .then(returnedContact =>{
              setPersons(persons.map(el =>el.id !== checker[0].id ? el : returnedContact))})
              .catch(error => {
                setMessage({text:`Information of ${checker[0].name} has already been removed from server`, type:'error'})
                setTimeout(() => {setMessage(null)}, 3000)
                setPersons(persons.filter(el => el.id !== checker[0].id))
              })
            // .catch(error => {alert('the contact was not updated at the server')})

          setNewName("")
          setNewNumber("")
        }
      }
    }

      else{
        const contactObj = {
          name: newName,
          number: newNumber,
        }

        // Sending data to db.json(and saving it there), getting a response in return
        // If response is successful, Object received with contents same as contactObj
        service
        .createContact(contactObj)
        .then(returnedContacts => {
          setPersons(persons.concat(returnedContacts))
          // message for successful addition of contact
          setMessage({text:`Added ${contactObj.name}`, type:'success'})
          setTimeout(() => {setMessage(null)}, 3000)
        })
        .catch(error => {alert('the contact was not added to the server')})

        setNewName("")
        setNewNumber("")
      }
    }
  }

  // event handler for deletion
  const handleDelete = (event) => {
    if(window.confirm(`Delete ${event.target.name} ?`)){
      service
      .deleteContact(event.target.value)
      .catch(error => {alert('the contact was not deleted from the server')})

      setPersons(persons.filter(el => el.name !== event.target.name))
    }
  }

  // event handler for input fields
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // array selector for display
  const namesToShow = newQuery
    ? filterItems(persons, newQuery)
    : persons


// The way of passing properties to components is not good. Please find a way to do this properly.
  return (
    <div>
      <Notification message={addMessage} />
      <h1>Phonebook</h1>
      <Filter newQuery={newQuery} handleQueryChange={handleQueryChange}/>
      <h3>Add a new</h3>
      <Form addContact={addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Contacts namesToShow={namesToShow} handleDelete={handleDelete}/>
    </div>
  )


}


export default App
