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
  return (
    <>
    {part.map(content =>
      <p key={content.id}>
      {content.name} {content.exercises}
      </p>)}
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
