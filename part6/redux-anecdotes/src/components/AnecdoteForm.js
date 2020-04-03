import React from 'react'
import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()

        const content = event.target.anectode.value
        event.target.anectode.value = ''

        dispatch(createAction(content))
        dispatch(setNotification(content, "created", 5))
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

