import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create a configured Axios instance
export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add authorization headers here
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: AxiosError) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        return response;
    },
    (error: AxiosError) => {
        console.error('[API Response Error]', error.response?.data || error.message);
        
        // Handle global error codes here (e.g., 401 Unauthorized -> redirect to login)
        if (error.response?.status === 401) {
            console.warn('Unauthorized access - perhaps redirect to login?');
        }

        return Promise.reject(error);
    }
);
