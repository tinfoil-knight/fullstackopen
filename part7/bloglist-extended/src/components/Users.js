import React from 'react'

const Users = ({ users }) => {
    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <><tr><td>{user.name}</td><td>{user.blogs.length}</td></tr></>)}
                </tbody>
            </table>
        </>
    )
}

export default Users