import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL
const api_key = localStorage.getItem('api_key');
const publicConfig = {
    baseURL: apiUrl,
    headers: { "Content-type": "application/json" },
}
const privateConfig = {
    baseURL: apiUrl,
    headers: { "Content-type": "application/json"},
}

if (api_key) {
    privateConfig.headers['Api-Key'] = api_key;
}

const publicApiInstance = axios.create(publicConfig);
const privateApiInstance = axios.create(privateConfig);

privateApiInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('api_key');
            location.reload();
        }
        return Promise.reject(error);
    }
)

export {publicApiInstance, privateApiInstance}