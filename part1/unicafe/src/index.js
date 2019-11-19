import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = good + neutral + bad
  if (total==0){
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {total}</p>
    <p>average {(good*1 + neutral*0 + bad*(-1))/(total)}</p>
    <p>positive {good*100/(total)} %</p>
    </>
  )

}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
    <h1>statistics</h1>
    <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
