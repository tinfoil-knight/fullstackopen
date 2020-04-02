const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data
        default:
            return state
    }
}

export const filterAction = (data) => {
    return {
        type: 'FILTER',
        data
    }
}

export default filterReducer