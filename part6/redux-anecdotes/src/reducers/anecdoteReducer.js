// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'UPVOTE':
      const id = action.data.id
      const anectodeToUpvote = state.find(element => element.id === id)
      const upvotedAnecdote = {
        ...anectodeToUpvote,
        votes: anectodeToUpvote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : upvotedAnecdote
      )

    case 'NEW':
      return state.concat(action.data)

    case 'INIT':
      return action.data

    default:
      return state

  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const upvotedAnecdote = await anecdoteService.upvote(anecdote)
    const id = upvotedAnecdote.id
    dispatch({
      type: 'UPVOTE',
      data: { id }
    })
  }
}

export const createAction = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer