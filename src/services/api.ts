// import axios from 'axios';

// const api = axios.create({
//   baseURL: "http://localhost:3333"
// });

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// ... 

        const config: AxiosRequestConfig = {
            baseURL: process.env.NEXT_PUBLIC_HOST,
            headers: {
              'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
              'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY
            }
        }; 
        const api: AxiosInstance = axios.create(config);
// ...
export  {api};