import { useEffect, useState } from "react";

import {ModalStyles} from "../styles/Components/Modal"
import {api} from "../services/api"
interface PropTypes {
  id: Number,
  isOpen: boolean,
  closeModal: () => void;
}


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
  title: string,

  description: string,
}


interface MyGames {
  id: number,
  rating: number ,
  status: "played" | "wantingToPlay" | "playing" | null
}


const Modal = ({id,closeModal, isOpen}:PropTypes) => {


  const [gameSelected, setGameSelected] = useState<MyGames>();

  function updateLocalStorage (id:number, rating: number | 0, status:string | null) {

    let retrievedMyGame = JSON.parse(localStorage.getItem('mygames') || '[]'); //retrieve the object
    console.log("retrivedMyGame1", retrievedMyGame)

    
    if(rating || status){
      let aux = {
        id: id,
        rating: rating,
        status: status
      }
      
      var index = retrievedMyGame.findIndex((element:any)=>{
        return element.id === id
      })
      if(index !== -1){
        if(rating !== null )
          retrievedMyGame[index].rating = rating
        if(status !== null)
          retrievedMyGame[index].status = status
      }else{
        retrievedMyGame.unshift(aux)
      }
      localStorage.setItem('mygames', JSON.stringify(retrievedMyGame));
      setGameSelected(retrievedMyGame[retrievedMyGame.findIndex((element:any)=>{
        return element.id === id
      })])
    }
  }


  const [item,setItem] = useState<Item>();
  useEffect(()=>{
    let retrievedMyGame = JSON.parse(localStorage.getItem('mygames') || '[]');
    if(retrievedMyGame){
      setGameSelected(retrievedMyGame[retrievedMyGame.findIndex((element:any)=>{
        return element.id === id
      })])
    }
    api.get(`/game?id=${id}`).then(response => {
          console.log(response.data)
          setItem(response.data)
        }).catch(function (err){
          alert("Erro to load database." + err)
        })
  },[])

  return (

    <ModalStyles>
      {/* <div className={`modal-overlay ${isOpen ? 'active'  : ''}`}>
      <div className={`modal ${isOpen ? 'active'  : ''}`}> */}
      {/* <div className="modal-overlay"> */}
        <a className="close-modal" onClick={closeModal}>
          <svg viewBox="0 0 20 20">
            <path
              fill="#000000"
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
            ></path>
          </svg>
        </a>
      <div className="modal">
        <div className="container">
        <div className="left">
          <div className="image">
            {/* <img className="imageProd" src="" alt=""/> */}
            <img src={item?.thumbnail} alt="" />
              </div>

            <div className="content modal-content">
                <p className="title text--medium">
                  {item?.title}
                </p>
                <p className="text--medium"><strong>ID: </strong>{item?.id}</p>
                <div className="info">
                  <p className="text--medium">{item?.short_description}</p>
                  <p className="text--medium">{item?.description}</p>
                </div>
              </div>

          </div>
          <div className="right">
            <div className="status">
              <h1>Status:</h1>
              <ul>
                <li className={gameSelected?.status === "played" ? "selected": ""} onClick={()=>updateLocalStorage(item?.id || 0, 0, "played")}>Played</li>
                <li className={gameSelected?.status === "playing" ? "selected": ""} onClick={()=>updateLocalStorage(item?.id || 0,0, "playing")}>Playing</li>
                <li className={gameSelected?.status === "wantingToPlay" ? "selected": ""} onClick={()=>updateLocalStorage(item?.id || 0,0, "wantingToPlay")}>Wanting to play</li>
              </ul>
            </div>

            <div className="rating">
             <h1>Rating:</h1>
            <ul>
            <li onClick={()=>updateLocalStorage(item?.id || 0,1,null)}>
                  {(typeof gameSelected?.rating != "undefined") && (gameSelected?.rating >= 1 ? (

                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "rgba(0, 0, 0, 1)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
              </li>
              <li onClick={()=>updateLocalStorage(item?.id || 0,2,null)}>
                  {(typeof gameSelected?.rating != "undefined") && (gameSelected?.rating >= 2 ? (

                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "rgba(0, 0, 0, 1)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
              </li>
              <li onClick={()=>updateLocalStorage(item?.id || 0,3,null)}>
                  {(typeof gameSelected?.rating != "undefined") && (gameSelected?.rating >= 3 ? (

                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "rgba(0, 0, 0, 1)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
              </li>
              <li onClick={()=>updateLocalStorage(item?.id || 0,4,null)}>
                  {(typeof gameSelected?.rating != "undefined") && (gameSelected?.rating >= 4 ? (

                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "rgba(0, 0, 0, 1)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
              </li>
              <li onClick={()=>updateLocalStorage(item?.id || 0,5,null)}>
                  {(typeof gameSelected?.rating != "undefined") && (gameSelected?.rating >= 5 ? (

                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "#DAA520"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path style={{fill: "rgba(0, 0, 0, 1)"}} d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
              </li>              
            </ul>

            </div>


            {/* <button onClick={()=>updateLocalStorage(item?.id || 0)}>ADD</button> */}
            <p className="text--medium">*Select a status to rate the game.</p>
          </div>
        </div>


      </div> 
      {/* </div> */}

    </ModalStyles>
    
  )

}
export default Modal;