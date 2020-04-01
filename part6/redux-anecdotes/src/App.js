import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAction, voteAction} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
  }

  const create = (event) => {
    event.preventDefault()

    const content = event.target.anectode.value
    event.target.anectode.value = ''

    dispatch(createAction(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={(event) => create(event)}>
        <div><input name="anectode" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App