import AuthService from '@/services/AuthService';
import {privateApiInstance} from '@/http-common';
import axios from 'axios';

export default {
    namespaced: true,

    state() {
        return {
            credentials: {
                api_key: localStorage.getItem('api_key') || null,
                is_auth: localStorage.hasOwnProperty('api_key')
            }
        }
    },

    getters: {
        getCredentials(state) {
            return state.credentials
        }
    },

    mutations: {
        setApiKey(state, api_key) {
            state.credentials.api_key = api_key;
            state.credentials.is_auth = true
            localStorage.setItem('api_key', api_key)
            privateApiInstance.defaults.headers['Api-Key'] = `api_key`
        },

        deleteApiKey(state) {
            state.credentials.api_key = null
            state.credentials.is_auth = false

            localStorage.removeItem('api_key')

            delete privateApiInstance.defaults.headers['Api-Key']
        },
    },

    actions: {
        onLogin({commit}, {login, password}) {
            return new Promise((resolve, reject) => {
                AuthService.login(login, password)
                    .then((res) => {
                        let api_key = res.data.api_key;
                        commit('setApiKey', api_key);
                        resolve(res);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        onLogout({commit}) {            
            commit('deleteApiKey')
        }
    }
}