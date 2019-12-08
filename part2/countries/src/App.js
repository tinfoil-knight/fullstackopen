import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Result = ({results, query, handleBtn}) => {
  const len = results.length
  if (len > 10 && query){
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  }

  else if (len > 1 && len <= 10){
    return (
      <>
          <ul type="none">
            {results.map(el => <li key={el.callingCodes}>{el.name} <button value={el.name} onClick={handleBtn}>show</button></li>)}
          </ul>
      </>
    )
  }

  else if (len===1) {
    return (
      <>
        <h1>{results[0].name}</h1>
          <p>capital {results[0].capital}</p>
          <p>population {results[0].population}</p>
        <h3>languages</h3>
        <ul type="disc">
          {results[0].languages.map(el => <li key={el.name}>{el.name}</li>)}
        </ul>
        <img alt="flag" src={results[0].flag} width="100" height="100" />
      </>
    )
  }

  else {
    return (
      <>
      </>
    )
  }
}

const App = () => {
  // state handlers
  const [ data, setData ] = useState([])
  const [ query, setQuery ] = useState("")

  // fetching data
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
  }, [])

  // event handler for search query
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  // function for filtering data
  const filterItems = (array, term) => {
    return array.filter(el => el.name.toLowerCase().startsWith(term.toLowerCase()) === true)
  }

  // filtered data
  const results = filterItems(data, query)

  // event handler for show button
  const handleBtn = (event) => {
    setQuery(event.target.value)
    console.log(query)
  }


  return (
    <>
    <form onSubmit={(event)=>event.preventDefault()}>
      find countries
      <input onChange={handleQueryChange} />
    </form>
    <Result results={results} query={query} handleBtn={handleBtn}/>
    </>
  )
}


export default App
