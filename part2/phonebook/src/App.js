import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')

  // Event Handlers

  // for form
  const addName = (event) =>
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
        const nameObj = {
          name: newName,
        }
        setPersons(persons.concat(nameObj))
        setNewName("")
      }
    }


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
