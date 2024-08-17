import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL
const config = {
    baseURL: apiUrl,
    headers: { "Content-type": "application/json" },
}

const api_key = localStorage.getItem('api_key');
if(api_key) config.headers['Api-Key'] = `${api_key}`;

const publicApiInstance = axios.create(config);
const privateApiInstance = axios.create(config);

privateApiInstance.interceptors.response.use(
    response => response,
    error => {
        // Ошибка авторизации
        if(error.response.status === 401) {
            localStorage.removeItem('api_key');
            location.reload();
        }
        return Promise.reject(error);
    }
)

export {publicApiInstance, privateApiInstance}