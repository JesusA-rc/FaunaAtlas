import axios, { type AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5069/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export default axios;
