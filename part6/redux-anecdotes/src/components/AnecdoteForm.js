import React from 'react'
import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()

        const content = event.target.anectode.value
        event.target.anectode.value = ''

        const newAnecdote = await anecdoteService.createNew(content)

        dispatch(createAction(newAnecdote))
        dispatch(setNotification(newAnecdote.content, "created"))
        setTimeout(() => {
            dispatch(unsetNotification(newAnecdote.content))
        }, 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={(event) => create(event)}>
                <div><input name="anectode" /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm

