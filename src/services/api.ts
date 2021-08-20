// import axios from 'axios';

// const api = axios.create({
//   baseURL: "http://localhost:3333"
// });


import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// ...
        const config: AxiosRequestConfig = {
            baseURL: "https://free-to-play-games-database.p.rapidapi.com/api",
            headers: {
              'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
              'x-rapidapi-key': process.env.API_KEY
            }
        };
        const api: AxiosInstance = axios.create(config);
// ...
export  {api};