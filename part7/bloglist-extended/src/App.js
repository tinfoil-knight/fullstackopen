import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'

const Navigation = () => {
  return (
    <>
      <Link to="/">blogs</Link>
      <Link to="/users"> users</Link>
    </>
  )
}
const App = () => {
  const dispatch = useDispatch()

  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const blogsHook = () => {
    blogService
      .getAll().then(initialBlogs => {
        dispatch({
          type: 'INIT',
          data: initialBlogs
        })
      })
  }
  useEffect(blogsHook, [dispatch])


  const usersHook = () => {
    userService.getAll().then(users => setUsers(users))
  }
  useEffect(usersHook, [blogs])

  const loginHook = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      blogService.setToken(user.token)
    }
  }
  useEffect(loginHook, [dispatch])

  const handleMessage = (text) => {
    dispatch({
      type: 'NOTIFY',
      data: text
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      dispatch({
        type: 'LOGIN',
        data: user
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleMessage('wrong username or password')
    }
  }

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    })
    window.localStorage.clear()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    try {
      setNewBlog(blogObject)
      blogService
        .create(blogObject, user.username)
        .then(returnedObject => {
          dispatch({
            type: 'CREATE',
            data: returnedObject
          })
          setNewBlog({ title: '', author: '', url: '' })
          handleMessage(`a new blog ${returnedObject.title} by ${returnedObject.author} added`)
        })

    }
    catch (exception) {
      alert(exception)
    }

  }


  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <p><b>{message}</b></p>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} id="username" name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} id="password" name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  return (
    <>
      <Router>
        <div>
          <Navigation />
          <span>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></span>
          <p><b>{message}</b></p>
          <h2>blogs</h2>
        </div>

        <Switch>
          <Route path="/users/:id">
            <User users={users} />
          </Route>

          <Route path="/users">
            <Users users={users} />
          </Route>

          <Route path="/blogs/:id">
            <BlogView blogs={blogs} />
          </Route>

          <Route path="/">
            <div>
              <div style={hideWhenVisible}>
                <button type="button" onClick={() => setVisible(true)}>new note</button>
              </div>
              <div style={showWhenVisible}>
                <BlogForm handleSubmit={handleSubmit} newBlog={newBlog} setVisible={setVisible} setNewBlog={setNewBlog} />
              </div>
              <div>
                {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
                  <><Link to={`/blogs/${blog.id}`}><Blog key={blog.id} blog={blog} /></Link></>
                )}
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App