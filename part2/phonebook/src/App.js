import React, { useState } from 'react'
import Contacts from './components/Contacts'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  // const [ persons, setPersons] = useState([])

  // state handlers
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')

  //event handler for search query
  const handleQueryChange = (event) =>
  {
    setNewQuery(event.target.value)
  }

  // function for filtering using indexOf
  const filterItems = (array, query) => {
    return array.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  // The indexOf() method returns the position of the first occurrence of a specified value in a string.
  // This method returns -1 if the value to search for never occurs.
  // Note: The indexOf() method is case sensitive.


  // event handler for form
  const addContact = (event) =>
  {
    event.preventDefault()

    const checker = persons.filter(person => person.name===newName);
    if (newName){
      if (checker.length!==0){
        // notice how a variable and string are joined here using a template literal
        // NB: `` (backtick) are used, not "" or '' (quotes)
        window.alert(`${newName} is already added to phonebook`)
        // alt: newName + "is already added to phonebook"
      }
      else{
        const contactObj = {
          name: newName,
          number: newNumber,
        }
        setPersons(persons.concat(contactObj))
        setNewName("")
        setNewNumber("")
      }
    }
  }

  // event handler for input fields
  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  // array selector for display
  const namesToShow = newQuery
    ? filterItems(persons, newQuery)
    : persons

// The way of passing properties to components is not good. Please find a way to do this properly.

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newQuery={newQuery} handleQueryChange={handleQueryChange}/>
      <h3>Add a new</h3>
      <Form addContact={addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Contacts namesToShow={namesToShow} />
    </div>
  )

}

export default App
