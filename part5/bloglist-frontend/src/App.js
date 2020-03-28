import React from 'react'
import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [message, setMessage] = useState(null)
  const [visible,setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleMessage = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
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
      handleMessage("wrong username or password")
    }
  }

  const handleLogout = (event) => {
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
          setBlogs(blogs.concat(returnedObject))
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
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
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
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input type="text" name="Title" value={newBlog.title} onChange={({ target }) => setNewBlog(
            {
              ...newBlog,
              title: target.value
            }
          )} />
          </div>
          <div>
            author
            <input type="text" name="Author" value={newBlog.author} onChange={({ target }) => setNewBlog(
            {
              ...newBlog,
              author: target.value
            }
          )} />
          </div>
          <div>
            url
            <input type="text" name="URL" value={newBlog.url} onChange={({ target }) => setNewBlog(
            {
              ...newBlog,
              url: target.value
            }
          )} />
          </div>
          <button type="submit" onClick={() => setVisible(false)}>create</button>
          <button type="button" onClick={() => setVisible(false)}>cancel</button>
        </form>
        </div>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    </>
  )

}

export default App;

