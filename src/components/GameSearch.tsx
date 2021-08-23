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

 var tags = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world",
             "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person",
              "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale",
               "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", 
               "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"]

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
  const [key, setKey] = useState('nofilter');
  const [value,setValue] = useState('');

  //Para ordenar
  const [placing, setPlacing] = useState('title')

  //Para fazer o sistema de paginação
  const totalForPage = 9;
  const [offset, setOffset] = useState(0);
  const [quantItems, setQuantItems] = useState(0);
  //Para controlar useEffect e tela de carregando
  const [loading,setLoading] = useState(false);

  //Para slavar o dados xarregados da API
  const [items, setItems] = useState<Item[]>([]);
  const [filterItems, setFilterItems] = useState<Item[]>([]);
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
    if(quantItems > 1 ){
      setItems(filterItems.slice(value,value+totalForPage))
    }
  }

  async function heandleSearch(e:any) {
    e.preventDefault()
    setLoading(true)
  }

  async function heandlePlacing(e:any) {
    e.preventDefault()
    alert("This feature is not working yet 😞")
    // if(placing === "title") {
    //   setFilterItems(Array.from(filterItems.sort(function (a:Item, b:Item) {	
    //     return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0); 
    //   })));
     
    //   setItems(Array.from(filterItems.slice(offset,offset+totalForPage)))
    //   setOffset(0)    
    // }
    // else if( placing === "rating"  ){
      
    //   setMyGames(Array.from(myGames.sort(function (a:MyGames, b:MyGames) {	
    //     return (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0); 
    //   })));
      
    //   let first = Array.from(filterItems.filter(value => {
    //     if(myGames.findIndex(myGame =>myGame.id === value.id) === -1)
    //       return false
    //     return true
    //   }))

    //   let second = Array.from(filterItems.filter(value => {
    //     if(myGames.findIndex(myGame =>myGame.id === value.id) === -1)
    //       return true
    //     return false
    //   }))
    //   console.log("first", first)
    //   console.log("Second", second)
    //   setFilterItems(Array.from(first.concat(second)));
     
    //   console.log(filterItems)

    //   setItems(Array.from(filterItems.slice(offset,offset+totalForPage)))
    //   setOffset(0)  
    // }

    // setLoading(true)
  }

  async function heandleFilter(e:any) {
    e.preventDefault()
    setLoading(true)
  }
  //Faz a coleta inical dos dados na API para exibir na primeira tela
  useEffect(()=>{
    api.get('/games?sort-by=alphabetical').then(response => {
          setTotalItems(Array.from(response.data))
          setFilterItems(Array.from(response.data))
          let retrievedMyGame = JSON.parse(localStorage.getItem('mygames') || '[]');

          setMyGames(retrievedMyGame)
          setQuantItems(response.data.length)
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
  
    if(retrievedMyGame !== ''){
      setMyGames(retrievedMyGame)
    }
  },[isModalVisible])

  
  //Para fazer uma busca por pelo titulo com os dados salvos no state.
  useEffect(()=>{

    if(loading){
      let filtro: Item[] = [];
      filtro = totalItems.filter(valor => valor.title.includes(`${value}`));
      
      
      setFilterItems(Array.from(totalItems.filter(valor => valor.title.includes(`${value}`))));
     
      setItems(Array.from(filtro.slice(offset,offset+totalForPage)))
      setOffset(0)
      setQuantItems(filtro.length)
      setLoading(false);
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
      return 0;
    }else{
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
        <select className="select-search" onClick={heandlePlacing} value={placing} onChange={event => setPlacing(event.target.value)}>
              
          {/* -Permitir ordenar a lista por avaliação ou título
          - Permitir filtrar itens por interesse e remover os filtros também */}
          <option value="title">Sort by title</option>
          <option value="rating">Sort by rating</option>

        </select>
      </form>

      {loading && (
        <p>Carregando...</p>
      )}
      {items.length === 0 && (
        <h1>Nothing here.</h1>
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
      {quantItems > totalForPage &&(

      <Pagination limit={totalForPage} total={quantItems} offset={offset} setOffset={handleSetOffset}/>
      )}

    </GameSearchStyles>
    </>
  )

}
export default GameSearch;
