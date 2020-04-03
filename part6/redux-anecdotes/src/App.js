import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App