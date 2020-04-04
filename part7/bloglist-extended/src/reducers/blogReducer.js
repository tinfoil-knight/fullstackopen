const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            return action.data
        case 'CREATE':
            return state.concat(action.data)

        default:
            return state
    }
}

export default blogReducer