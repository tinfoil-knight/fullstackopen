import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async (blog) => {
    const blogPost = {
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      user: blog.user
    }

    try {
      blogService
        .update(blogPost, blog.id)
        .then(responseObject => setLikes(responseObject.likes))
    }
    catch (exception) {
      alert(exception)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Remove blog?')) {
      try {
        blogService
          .deleteBlog(id)
        // Doesn't handle the array of blog since it is here, move this out if you
        // want to update the blog array when a blog gets deleted
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
      <button type="button" onClick={() => setVisible(true)} style={hideWhenVisible}>view</button>
      <div style={showWhenVisible} className="test">
        <button type="button" onClick={() => setVisible(false)}>hide</button>
        <div>
          {blog.url}
        </div>
        <div>
          likes <span>{likes}</span> <button type="button" onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <button type="button"
          // For testing
          // style={{ display: JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username === blog.user.username ? '' : 'none' }}
          onClick={() => handleDelete(blog.id)}>remove</button>
      </div>
    </div>
  )
}

export default Blog