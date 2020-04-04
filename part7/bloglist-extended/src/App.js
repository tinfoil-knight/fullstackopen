import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import loginService from './services/login'
import blogService from './services/blogs'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  
  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        dispatch({
          type: 'INIT',
          data: initialBlogs
        })
      })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleMessage('wrong username or password')
    }
  }

  const handleLogout = () => {
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
      <div>
        <h2>blogs</h2>
        <p><b>{message}</b></p>
        {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
      </div>
      <div>
        <div style={hideWhenVisible}>
          <button type="button" onClick={() => setVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm handleSubmit={handleSubmit} newBlog={newBlog} setVisible={setVisible} setNewBlog={setNewBlog} />
        </div>
        <div>
          {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    </>
  )

}

export default App