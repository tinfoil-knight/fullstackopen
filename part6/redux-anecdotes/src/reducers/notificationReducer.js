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

export const setNotification = (data, event, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET',
            data,
            event
        })
        
        setTimeout(() => dispatch({
            type: 'UNSET'
        }), time * 1000)
    }
}

export default notificationReducer