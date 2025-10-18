import {createClient} from '@supabase/supabase-js'
import {supabase} from '../scripts/supabaseClient'


class AuthService {
    
    async login(email, password) {
        const {data, error} = await supabase.auth.signInWithPassword({
            email:email,
            password:password
        })
        if(error) 
        {
            console.error("There was a problem signing up: ", error)
            return {success : false, error}
        }

        localStorage.setItem('user', JSON.stringify(response.data));
        return {success: true, data};
    }

    async signUp(email, password) {
        const {data, error} = await supabase.auth.signUp({
            email:email,
            password:password
        })
        if(error) 
        {
            console.error("There was a problem signing up: ", error)
        }

        return await login(email, password)

    }
    logout() {
        supabase.auth.signOut()
        localStorage.removeItem('user')
    }

    getCurrentUser() {
        return localStorage.getItem('user')
    }

    isLoggedIn() {
        return localStorage.getItem('user') != null
    }
}


export default new AuthService()