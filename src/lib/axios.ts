import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

import { API_URL } from '../config';
import storage from '../utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig): any => {
    const token = storage.getToken();
    const { headers } = config;
    if (!headers) return config;

    if (token) {
        headers.authorization = `${token}`;
    }
    headers.Accept = 'application/json';
    return config;
}

export const http: AxiosInstance = Axios.create({
    baseURL: API_URL,
});

http.interceptors.request.use(authRequestInterceptor);
// TODO : notification
http.interceptors.response.use(
    (response) => response,
    (error) => error,
);