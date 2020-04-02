import React from 'react'
import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()

        const content = event.target.anectode.value
        event.target.anectode.value = ''

        dispatch(createAction(content))

        dispatch(setNotification(content, "created"))
        setTimeout(() => {
            dispatch(unsetNotification(content))
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

