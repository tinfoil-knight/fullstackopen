import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content, id: (100000 * Math.random()).toFixed(0), votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const upvote = async (anecdote) => {
  const resourceUrl = `${baseUrl}/${anecdote.id}`
  const upvotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(resourceUrl, upvotedAnecdote)
  console.log('axios log')
  console.log(response.data)
  return response.data
}

export default { getAll, createNew, upvote }
