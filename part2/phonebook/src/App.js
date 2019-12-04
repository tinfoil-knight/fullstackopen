import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  // Event Handlers

  // for form
  const addContact = (event) =>
  {
    event.preventDefault()

    const checker = persons.filter(person => person.name===newName);
    if (newName){
      if (checker.length!==0){
        // notice how a variable and string are joined here using a template literals
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

  // for input
  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )
      }
    </div>
  )

}

export default App
