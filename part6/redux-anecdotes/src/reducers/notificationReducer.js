const notificationReducer = (state = [], action) => {
    console.log('action')
    console.log(action)    
    switch (action.type) {
        case 'SET':
            return state.concat(`you ${action.event} '${action.data}'`)
        case 'UNSET':
            return []
        default:
            return state
    }
}

export const setNotification = (data, event) => {
    return {
        type: 'SET',
        data,
        event
    }
}

export const unsetNotification = (data) => {
    return {
        type: 'UNSET',
        data
    }
}

export default notificationReducer