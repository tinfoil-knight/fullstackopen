import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)

    const vote = (anecdote) => {
        dispatch(voteAction(anecdote.id))
        dispatch(setNotification(anecdote.content, "voted"))
        setTimeout(() => {
            dispatch(unsetNotification(anecdote.content))
        }, 5000)


    }

    return (
        <>
            {anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default AnecdoteList
