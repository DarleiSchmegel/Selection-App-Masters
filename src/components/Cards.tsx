import { useEffect } from "react";
import { CardsStyles } from "../styles/Components/Cards"

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

interface PropTypes {
  Items: Array<Item>
}

const Cards = ({Items}:PropTypes) => {


  useEffect(()=>{
    
  },[Items])


  return(
    <>
    <CardsStyles >
    {Items.map((item) => (

      <div className="card" key={item.id}>
        <img src={item.thumbnail} alt="" />
        <p>Title: <strong>{item.title}</strong></p>
        <p>Description: <strong>{item.short_description}</strong></p>
        <p>ID: <strong>{item.id}</strong></p>
      </div>

    )) }
    </CardsStyles>
    </>

  )

}
export default Cards;