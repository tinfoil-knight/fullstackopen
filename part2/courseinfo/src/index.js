import React from 'react'
import ReactDOM from 'react-dom'

const Courses = ({courses}) => {
  return (
    <>
      {
        courses.map(el =>
        <div key={el.id}>
          <h1>{el.name}</h1>
          <Part parts={el.parts}/>
        </div>
        )
      }
    </>
  )
}

const Part = ({parts}) => {

  const sum = parts.map(x => x.exercises).reduce((a,b) => a+b, 0)

  return (
    <>
      {
        parts.map(ele =>
        <div key={ele.id}>
        <p>{ele.name} {ele.exercises}</p>
        </div>)
      }
      {
        <b>total of {sum} exercises</b>
      }
    </>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
