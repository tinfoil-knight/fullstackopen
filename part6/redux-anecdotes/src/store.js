import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
})

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

export default store