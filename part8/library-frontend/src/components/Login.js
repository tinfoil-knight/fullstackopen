import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const Login = ({ show, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginUser, result] = useMutation(LOGIN)

    useEffect(() => {
        const token = localStorage.getItem('library-user-token')
        if (token) {
            setToken(token)
        }
    }, []) // eslint-disable-line

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            console.log("setting token")
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line



    const submit = async (event) => {
        event.preventDefault()
        console.log("attempting sign in with: ", username, password)
        try {
            await loginUser({
                variables: { username, password }
            })
        }
        catch (error) {
            console.log(error.message)
        }
        finally {
            setUsername('')
            setPassword('')
        }
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
          <input value={password} onChange={({ target }) => setPassword(target.value)} type="password" />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login