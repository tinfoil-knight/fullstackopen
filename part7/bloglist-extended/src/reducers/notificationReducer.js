const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.data
        case 'CLEAR':
            return null
            
        default:
            return state
    }
}

export default notificationReducer