import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
    </>
  )
}

const Header = ({course}) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = ({course}) => {
  return (
    <>
    <Part part={course.parts}/>
    </>
  )
}

const Part = ({part}) => {

  const y = part.map(x => x.exercises)
  const z = y.reduce((a,b) => a+b, 0)

  return (
    <>
    {part.map(content =>
      <p key={content.id}>
      {content.name} {content.exercises}
      </p>)}
      <p><b>total of {z} exercises</b></p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
