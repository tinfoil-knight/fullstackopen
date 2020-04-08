import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const results = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)


  const reducer = (accumulator, currentValue) => [...accumulator, ...currentValue]

  useEffect(() => {
    if (results.data) {
      setBooks(results.data.allBooks)
      const genres = Array.from(new Set(results.data.allBooks.map(book => book.genres).reduce(reducer, [])))
      setGenres(genres)
    }
  }, [results]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (results.error) {
    console.log(results.error.message)
  }

  if (results.loading || results.error) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <div>in genre <b>{genre ? genre : "all"}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(book => genre ? book.genres.includes(genre) : book).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(item => <button key={item} onClick={() => setGenre(item)}>{item}</button>)}
      </div>
    </div>
  )
}

export default Books