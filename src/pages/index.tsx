import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import { api } from "../services/api"

const Home: NextPage = () => {

  useEffect(()=> {
    async function getItems() {
      try {
        const { data } = await api.get("/games");
        
        console.log("items", data)
      } catch (error) {
        console.log(error)
        alert("Ocorreu um erro ao buscar os items");
      }
    }
    getItems();
  }, [])
  return (
    <div>
      <Head>
        <title>App Mastters</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>

        <h1>
          Olá Mundo!!
        </h1>
      </main>
  </div>
  )
}

export default Home