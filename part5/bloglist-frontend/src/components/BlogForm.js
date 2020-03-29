import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
    setVisible,
    setNewBlog,
    handleSubmit,
    newBlog,
}) => {
    return (
        <>
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
        </>
    )
}

BlogForm.propTypes = {
    setVisible: PropTypes.func.isRequired,
    setNewBlog: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    newBlog: PropTypes.object.isRequired,
}

export default BlogForm