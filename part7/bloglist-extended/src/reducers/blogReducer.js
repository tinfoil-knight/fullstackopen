const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            return action.data
        case 'CREATE':
            return state.concat(action.data)
        case 'LIKE':
            const id = action.id
            const blogToLike = state.find(ele => ele.id === id)
            const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }

            return state.map(blog =>
                blog.id !== id ? blog : likedBlog
            )
        case 'DELETE':
            return state.filter(ele => ele.id !== action.id)
        default:
            return state
    }
}

export default blogReducer