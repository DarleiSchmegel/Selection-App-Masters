import { CardsStyles } from "../styles/Components/Cards"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Cookies from "js-cookie";

import { api } from "../services/api"

import {GameSearchStyles} from "../styles/Components/GameSearch";
import Modal from "./Modal";
import Pagination from "./Pagination";

interface Item {
  developer: string,
  freetogame_profile_url: string,
  game_url: string,
  genre: string,
  id: number,
  platform: string,
  publisher: String,
  release_date: string,
  short_description: string,
  thumbnail: string,
  title: string
}


interface MyGames {
  id: number,
  rating: number ,
  status: "played" | "wantingToPlay" | "playing" | null
}


interface PropTypes {
  handleItems: () => void;
}


const GameSearch = () => {
  // if (typeof window !== 'undefined'){

  //   const localStorageMyGames = JSON.parse(localStorage.getItem("mygames") || '') 
  // }
  // //let myGames = localStorage.getItem("mygames") !== '' ? localStorageMyGames : []



  Cookies.set("SameSite", "none");
  //Para fazer buscas na API
  const [key, setKey] = useState('');
  const [value,setValue] = useState('');

  //Para fazer o sistema de paginação
  const totalForPage = 9;
  const [offset, setOffset] = useState(0);
  
  //Para controlar useEffect e tela de carregando
  const [loading,setLoading] = useState(false);

  //Para slavar o dados xarregados da API
  const [items, setItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState<Item[]>([]);

  //Para obter os dados salvos na memória
  const [myGames, setMyGames] = useState<MyGames[]>([]);


  const [isModalVisible,setIsModalVisible] = useState(false);

  const [id,setId] = useState<Number>(0)
  function openModal(id:number) {
    setIsModalVisible(true);
    setId(id);
  }
  function closeModal() {
    setIsModalVisible(false);
  }


  function handleSetOffset(value: number){
    setOffset(value)
    console.log(value)
    if(totalItems.length > 1 ){
      setItems(totalItems.slice(value,value+totalForPage))
    }
  }

  async function heandleSearch(e:any) {
    e.preventDefault()
    setLoading(true)
 
  }
  //Faz a coleta inical dos dados na API para exibir na primeira tela
  useEffect(()=>{
    api.get('/games?sort-by=alphabetical').then(response => {
          setTotalItems(Array.from(response.data))
          let retrievedMyGame = JSON.parse(localStorage.getItem('mygames') || '[]');

          setMyGames(retrievedMyGame)
          if(response.data.length > 1){
            setItems(Array.from(response.data.slice(offset,offset+totalForPage)))
            console.log(response.data)
          }
        }).catch(function (err){
          alert("Erro to load database." + err)
          console.log(err)
        })
  },[])

  //Para atualizar tela quando voltamos do Modal e atualizar a tela anterior
  useEffect(()=>{
    let retrievedMyGame = JSON.parse(localStorage.getItem('mygames') || '[]');
    console.log()
    if(retrievedMyGame !== ''){
      setMyGames(retrievedMyGame)
    }
  },[isModalVisible])

  
  //Para fazer uma busca por chave valor na API
  useEffect(()=>{
    if(loading){


      let URL;
      if(key !== "id")
        URL = `/games?${key}=${value}`;
      else
        URL = `/game?${key}=${value}`;

      api.get(URL).then(response => {

        
        if(key !== "id"){
          response.data.sort(function (a:Item, b:Item) {	
            return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0); 
          });
          var itens = response.data.filter((item:Item) => item.title == `${value}`);
        
          setTotalItems(Array.from(itens))
        }

        if(key !== "id"){
          setItems(Array.from(itens.slice(offset,offset+totalForPage)))
          setOffset(0)
        }else{
          let aux = [];
          aux.push(response.data)
          setItems(Array.from(aux))
          setOffset(0)
        }
      }).catch(function (err){
        alert("Object not found: Game or endpoint not found" + err)
      })
      setLoading(false);
      //console.log("Items", totalItems)
    }

  },[loading,totalItems,offset,key,value,items]) 

  function handleLocalStorageStatus(id: number){
    var index = myGames.findIndex((element:any)=>{
      return element.id === id
    })
    if(index === -1){
      return '';
    }else{
      return myGames[index].status
    }
  }
  function handleLocalStorageRating(id: number){
    var index = myGames.findIndex((element:any)=>{
      return element.id === id
    })
    if(index === -1){
      console.log( 0 >= 1)
      return 0;
    }else{
      console.log("Mygames", myGames[index].rating)
      return myGames[index].rating
    }
  }

  return(
    <>
    <GameSearchStyles>
      <form onSubmit={heandleSearch}>
        <label htmlFor="search">Game search</label>
        <div className="input-search">
          <input name="search" id="search" onChange={event => setValue(event.target.value)}/>
          <button ><img src="./magnifier.png" alt="" /></button>
        </div>
        <select value={key} onChange={event => setKey(event.target.value)}>
            
          {/* -Permitir ordenar a lista por avaliação ou título
          - Permitir filtrar itens por interesse e remover os filtros também */}
          <option value="nofilter">No filter</option>
          <option value="category">Category</option>
          <option value="plataform">Plataform</option>
          <option value="id">ID</option>
          <option value="myratedgames">My rated games</option>

        </select>
      </form>

      {loading && (
        <p>Carregando...</p>
      )}
      {items.length === 0 && (
        <h1>Nada encontrado</h1>
      )}
      {items  && 
         
          <CardsStyles >
         
          {items.map((item) => (
      
            <div className="card" key={item.id} onClick={() => openModal(item.id)}>
              <div className="image">
                {/* <img className="imageProd" src="" alt=""/> */}
                <img src={item.thumbnail} alt="" />
              </div>

              <div className="content">
                <p className="title text--medium">
                  {item.title}
                </p>
                <div className="info">
                  <p className="text--medium">{item.short_description}</p>
              
                  <div className="status">
                    <ul>
                      <li className={handleLocalStorageStatus(item.id) === "played" ? "selected": ""} ><p>Played</p></li>
                      <li className={handleLocalStorageStatus(item.id) === "playing" ? "selected": ""} ><p>Playing</p></li>
                      <li className={handleLocalStorageStatus(item.id) === "wantingToPlay" ? "selected": ""} ><p>Wanting to play</p></li>
                    </ul>
                  </div>
                    
                  <div className="rating">

                  <ul>
                  <li>
                        {handleLocalStorageRating(item.id) >= 1 ? (

                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "rgba(255, 255, 255, 0.5)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        )}
                    </li>
                    <li>
                        {handleLocalStorageRating(item.id) >= 2? (

                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "rgba(255, 255, 255, 0.5)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        )}
                    </li>
                    <li>
                        {handleLocalStorageRating(item.id) >=3 ? (

                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "rgba(255, 255, 255, 0.5)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        )}
                    </li>
                    <li>
                        {handleLocalStorageRating(item.id) >= 4? (

                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "rgba(255, 255, 255, 0.5)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        )}
                    </li>
                    <li>
                        {handleLocalStorageRating(item.id) >= 5? (

                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path style={{fill: "rgba(255, 255, 255, 0.5)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                        )}
                    </li>              
                  </ul>

                  </div>

                  <p className="id text--medium"><strong>ID: </strong>{item.id}</p>
                </div>
              </div>

            </div>
          )) }
          {isModalVisible ? <Modal id={id} closeModal={closeModal} isOpen={isModalVisible}/> : null}
          </CardsStyles>
         
      }
      {totalItems.length > totalForPage &&(

      <Pagination limit={totalForPage} total={totalItems.length} offset={offset} setOffset={handleSetOffset}/>
      )}

    </GameSearchStyles>
    </>
  )

}
export default GameSearch;
