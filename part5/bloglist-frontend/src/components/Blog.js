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
      url: blog.url
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

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button type="button" onClick={() => setVisible(true)} style={hideWhenVisible}>view</button>
      <div style={showWhenVisible}>
        <button type="button" onClick={() => setVisible(false)}>hide</button>
        <div>
          {blog.url}
        </div>
        <div>
          likes {likes} <button type="button" onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          {blog.url}
        </div>
      </div>
    </div>
  )
}

export default Blog