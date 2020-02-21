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
      alert(exception)
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
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog({title: '', author: '', url: ''})
      })
    }
    catch (exception) {
      alert(exception)
    }
    console.log("done")

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      </div>
    )
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
      </div>
      <div>
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
          <button type="submit">create</button>
        </form>
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

