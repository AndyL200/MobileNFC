import {createClient} from '@supabase/supabase-js'
import {supabase} from '../scripts/supabaseClient'


class AuthService {
    
    async login(email, password) {
        const {data : userData, error : signInError} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(signInError || !userData.user?.id) 
        {
            console.error("There was a problem signing up: ", signInError)
            return {success : false, signInError}
        }
        //using trigger for automatic creation if not available
        const {data : profile, error : profileError} = await supabase.from("NFCUsers").select('*')
        if(profileError)
        {
            console.error("There was a retrieving profile: ", profileError)
            return {success : false, profileError}
        }
        localStorage.setItem('user', JSON.stringify(profile));
        return {success: true, data: userData, profile};
    }

    async sendResetEmail(email) {
        await supabase.auth.resetPasswordForEmail(email, {redirectTo: "/resetPassword"})
    }

    async resetPassword(newPass) {
        await supabase.auth.updateUser({password: newPass})
    }

    async signUp(email, password) {
        const {data, error} = await supabase.auth.signUp({
            email:email,
            password:password
        })
        if(error) 
        {
            console.error("There was a problem signing up: ", error)
            return {success: false, error}
        }
        else
        {
        return await this.login(email, password)
        }

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