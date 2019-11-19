import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text,value}) => {
  return (
    <>
    <p>{text} {value}</p>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*(-1))/(total)
  const positive = good*100/(total)

  if (total===0){
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
    <Statistic text="good" value={good} />
    <Statistic text="neutral" value={neutral} />
    <Statistic text="bad" value={bad} />
    <Statistic text="all" value={total} />
    <Statistic text="average" value={average} />
    <Statistic text="positive" value={positive+" %"} />
    </>
  )

}

const Button = ({good, neutral, bad, ftnGood, ftnBad, ftnNeutral}) => {
  return (
    <>
    <button onClick={ftnGood}>good</button>
    <button onClick={ftnNeutral}>neutral</button>
    <button onClick={ftnBad}>bad</button>
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
      <Button ftnGood={() => setGood(good+1)} ftnNeutral={() => setNeutral(neutral+1)} ftnBad={() => setBad(bad+1)} />
    <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
