import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ setVisible, setNewBlog, handleSubmit, newBlog, }) => {
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>title</span>
                    <input type="text" id="title" name="Title" value={newBlog.title} onChange={({ target }) => setNewBlog(
                        {
                            ...newBlog,
                            title: target.value
                        }
                    )} />
                </div>
                <div>
                    <span>author</span>
                    <input type="text" id="author" name="Author" value={newBlog.author} onChange={({ target }) => setNewBlog(
                        {
                            ...newBlog,
                            author: target.value
                        }
                    )} />
                </div>
                <div>
                    <span>url</span>
                    <input type="text" id="url" name="URL" value={newBlog.url} onChange={({ target }) => setNewBlog(
                        {
                            ...newBlog,
                            url: target.value
                        }
                    )} />
                </div>
                <button type="submit" id="create" onClick={() => setVisible(false)}>create</button>
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