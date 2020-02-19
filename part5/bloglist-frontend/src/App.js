import React from 'react'
import { useState, useEffect } from 'react'
import loginService from './services/login'
import fetchService from './services/blogs'
import Blog from './components/Blog'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert(exception)
    }
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
    <div>
      <h2>blogs</h2>
      {user.username} logged in
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App;

