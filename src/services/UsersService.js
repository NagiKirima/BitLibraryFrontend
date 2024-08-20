import {privateApiInstance} from '@/http-common';

class UsersService {
    getUsers(offset, limit, sort_by, desc) {
        const url = '/users'
        const params = { offset: offset, limit: limit, sort_by: sort_by, desc: desc }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    getUserById(id_user){
        const url = '/users/id'
        const params = { id_user: id_user }
        return privateApiInstance.get(url, {
            params: {
                ...params
            }
        })
    }

    createUser(full_name, birth_date, phone_number, address){
        const url = '/users'
        return privateApiInstance.post(url, {
            full_name: full_name, 
            birth_date: birth_date,
            phone_number: phone_number,
            address: address
        })
    }

    deleteUser(id_user){
        const url = '/users/id'
        const params = { id_user: id_user }
        return privateApiInstance.delete(url, {
            params: {
                ...params
            }
        })
    }

    updateUser(id_user, full_name, birth_date, address){
        const url = '/users/id'
        const params = { id_user: id_user }
        const data = { full_name: full_name, birth_date: birth_date, address: address }
        return privateApiInstance.patch(url, data, {
            params: {
                ...params
            },
        })
    }
}
export default new UsersService