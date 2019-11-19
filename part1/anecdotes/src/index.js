import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Max = (props) => {
    const max = Math.max(...props.votes)
    let index = props.votes.indexOf(max)

    if(max===0){
        return (
            <p>no votes yet</p>
        )
    }
    return (
      <>
      <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[index]}</p>
      </>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(6).fill(0))

  const upVote = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
      <p>
        <button onClick={() => upVote(selected)}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * (6)))}>next anecdote</button>
      </p>
    <Max votes = {votes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
