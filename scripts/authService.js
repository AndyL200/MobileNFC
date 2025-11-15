import {supabase} from './supabaseClient.js'
import AsyncStorage from '@react-native-async-storage/async-storage'


class AuthService {

    
    async login(email, password) {
        const {data : userData, error : signInError} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(signInError || !userData.user?.id) {
            console.error("There was a problem signing in: ", signInError)
            return {success : false, signInError}
        }
        
        // Filter by user ID ✅
        const {data : profile, error : profileError} = await supabase
            .from("NFCUsers")
            .select('*')
            .eq('user_id', userData.user.id) 
            .single();
        
        if(profileError) {
            console.error("Error retrieving profile: ", profileError)
            return {success : false, profileError}
        }
        
        await AsyncStorage.setItem('user', JSON.stringify(profile));
        return {success: true, data: userData, profile};
    }

    async sendResetEmail(email) {
        await supabase.auth.resetPasswordForEmail(email, {redirectTo: "/resetPassword"})
    }

    async setFields(user, tnum, fname, lname) {
    try {
        // Get user ID from the passed-in user object (from context)
        const userId = user?.user_id || user?.id;
        
        if (!userId) {
            console.error("No user ID found");
            return { success: false, error: "User not found" };
        }

        const { data, error } = await supabase
            .from("NFCUsers")
            .upsert({
                user_id: userId, // ✅ Use user from context
                tnum: tnum,
                fname: fname,
                lname: lname
            })
            .select().single();

        if (error) {
            console.error("Error setting fields:", error.message);
            return { success: false, error: error.message };
        }

        // Update local storage
        await AsyncStorage.setItem('user', JSON.stringify(data));
        return { success: true, data: data };
    } catch (err) {
        console.error("Unexpected error in setFields:", err);
        return { success: false, error: err.message };
    }
}
    async getFields(user){
        const userId = user?.user_id || user?.id;
        
        if (!userId) {
            console.error("No user ID found");
            return { success: false, error: "User not found" };
        }

        const {data : profile, error : profileError} = await supabase
        .from("NFCUsers")
        .select('*')
        .eq('user_id', userData.user.id) 
        .single();

        return {firstName : profile.firstName, lastName : profile.lastName, TNumber: profile.TNumber}
    }

    async resetPassword(newPass) {
        await supabase.auth.updateUser({password: newPass})
    }

    async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Signup error:', error.message);
        return { success: false, error: error.message };
    }

    // Check if user needs email confirmation
    // If user was created but not confirmed, the user exists but is unconfirmed
    if (data?.user?.id && !data.user.confirmed_at) {
        return { 
            success: true, 
            message: 'Check your email to confirm your account',
            requiresConfirmation: true 
        };
    }

    // User created and confirmed (or confirmation disabled), log them in
    return await this.login(email, password);
    }
    async logout() {
        await supabase.auth.signOut()
        
        await AsyncStorage.removeItem('user')
    }

    async getCurrentUser() {
        return await AsyncStorage.getItem('user')
    }

    async isLoggedIn() {
        return await AsyncStorage.getItem('user') != null
    }
    async getSession() {
        const ses = await AsyncStorage.getItem("session")
        if (ses)
        {
            return JSON.parse(ses)
        }
       
        return await supabase.auth.getSession().then(({ data: { session } }) => session);
    }
    async setSession(ses) {
    if (ses) {
        await AsyncStorage.setItem('session', JSON.stringify(ses));
    } else {
        await AsyncStorage.removeItem('session');
    }
}
}


export default new AuthService()