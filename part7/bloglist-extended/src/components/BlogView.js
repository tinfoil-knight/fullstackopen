import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'


const BlogView = ({ blogs }) => {
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    const dispatch = useDispatch()

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

    if (!blog) {
        return null
    }

    return (
        <div>
            <h1>{blog.title} by {blog.author}</h1>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>{blog.likes} likes <button type="button" onClick={() => handleLike(blog)}>like</button></div>
            <div>added by {blog.user.name}</div>
        </div>
    )
}

export default BlogView