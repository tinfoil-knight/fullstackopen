import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const handleLike = async (blog) => {
    const blogPost = {
      ...blog,
      likes: blog.likes + 1,
    }

    try {
      const response = await blogService.update(blogPost, blog.id)
      const id = response.id
      dispatch({
        type: 'LIKE',
        id
      })
    }
    catch (exception) {
      alert(exception)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Remove blog?')) {
      try {
        await blogService.deleteBlog(id)
        dispatch({
          type: 'DELETE',
          id
        })
      }
      catch (exception) {
        alert(exception)
      }
    }

  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <span>{blog.title}</span> <span>{blog.author}</span>
      <Button variant="outline-secondary" type="button" onClick={() => setVisible(true)} style={hideWhenVisible}>view</Button>
      <div style={showWhenVisible} className="test">
        <Button variant="outline-secondary" type="button" onClick={() => setVisible(false)}>hide</Button>
        <div>
          {blog.url}
        </div>
        <div>
          likes <span>{blog.likes}</span> <Button variant="outline-secondary" type="button" onClick={() => handleLike(blog)}>like</Button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <Button variant="outline-secondary" type="button"
          onClick={() => handleDelete(blog.id)}>remove</Button>
      </div>
    </div>
  )
}

export default Blog