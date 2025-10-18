import React from 'react'
import AuthService from '@/scripts/authService'

const Protected = () => {
    const user = AuthService.getCurrentUser();

    if(user)
    {
        return (
            <div>
                <h2>Welcome, {user.email}</h2>
                <button onClick={AuthService.logout}>Logout</button>
            </div>
        )
    }
}

export default Protected;