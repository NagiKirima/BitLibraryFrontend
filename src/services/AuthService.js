import {publicApiInstance} from '@/http-common';

class AuthService {
    login(login, password) {
        const url = '/login'
        const data = { login: login, password: password }
        return publicApiInstance.post(url, data)
    }
}
export default new AuthService