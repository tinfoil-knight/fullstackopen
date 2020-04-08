import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = ({ show, user }) => {

  const results = useQuery(ALL_BOOKS)

  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if (user){
      setGenre(user.favoriteGenre)
    }
  }, [user]) // eslint-disable-line

  useEffect(() => {
    if (results.data) {
      setBooks(results.data.allBooks)
    }
  }, [results.data])


  if (!show) {
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
      <h2>recommendations</h2>
      <div>books in  your favorite genre: <b>{genre ? genre : "all"}</b></div>
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
    </div>
  )
}

export default Books