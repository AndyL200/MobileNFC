import sql from './db'
const API_URL = ""

class AuthService {
    login(email, password) {
        return sql`
        SELECT 
        `.then(response=> {
            //if valid response
            if(response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
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