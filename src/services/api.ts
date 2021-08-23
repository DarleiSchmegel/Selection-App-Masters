
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// ... 

        const config: AxiosRequestConfig = {
            baseURL: process.env.NEXT_PUBLIC_URL,
            headers: {
              'x-rapidapi-host': process.env.NEXT_PUBLIC_HOST,
              'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY
            }
        }; 
        const api: AxiosInstance = axios.create(config);
// ...
export  {api};