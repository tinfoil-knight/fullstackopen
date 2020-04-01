import React from 'react'
import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()

        const content = event.target.anectode.value
        event.target.anectode.value = ''

        dispatch(createAction(content))
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

