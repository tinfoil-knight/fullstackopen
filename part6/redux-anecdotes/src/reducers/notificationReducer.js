const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET':
            console.log(action.message)
        case 'CLEAR':
            console.log("removed")
        default:
            return state
    }
}

export const notificationChange = (message) => {
    return {
        type: 'SET_MESSAGE',
        message
    }
}

export default notificationReducer