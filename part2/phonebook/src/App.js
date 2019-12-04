import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')

  // Event Handlers

  // for form
  const addName = (event) =>
  {
    event.preventDefault()
    const nameObj = {
      name: newName,
    }
    setPersons(persons.concat(nameObj))
    setNewName("")
  }

  // for input
  const handleNameChange = (event) =>
  {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person =>
          <p key={person.name}>{person.name}</p>
        )
      }
    </div>
  )

}

export default App
