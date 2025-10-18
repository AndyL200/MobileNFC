import React from 'react'
import AuthService from '@/scripts/authService'

const Protected = () => {
    const authString = AuthService.getCurrentUser()
    const user = authString? JSON.parse(authString) : null;

    if(user && user.email)
    {
        return (
            <div>
                <h2>Welcome, {user.email}</h2>
                <button onClick={AuthService.logout}>Logout</button>
            </div>
        )
    }
    else
    {
        return (
            <div>
                <h2>User not found</h2>
            </div>
        )
    }
}

export default Protected;