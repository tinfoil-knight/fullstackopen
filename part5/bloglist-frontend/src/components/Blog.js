import React from 'react'
import { useState } from 'react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

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
          likes 0 <button type="button">like</button>
        </div>
        <div>
          {blog.url}
        </div>
      </div>
    </div>
  )
}

export default Blog