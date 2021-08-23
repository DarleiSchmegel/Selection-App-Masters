import styled from "styled-components";
interface ThemeProps {
  color?: string;
  backgroundColor?: string;
  backgroundColorSecundary?: string;
}
const GameSearchStyles = styled.div`
  display: flex;

  flex-direction: column;
  
  justify-content: center;
  align-items: center;
  
  padding: 50px 0;
  margin-bottom: 30px; 

  //Formes
  form{
    padding: 20px 2px;
  }

  form label {
    display: block;
    margin-bottom: 0.8em;
    font-weight: bold;
    font-size: 2.0rem;
  }
  form input {
    color: inherit;
    background-color: rgba(255,255,255,0);
    padding: 0.2em;
    border-bottom: solid 2px rgba(255,255,255,0.2);
    border-radius: 8px 8px 0 0;
    font-size: 3.5rem;
    font-weight: bold;
    width: 100%;
    outline: none;
    transition: background-color 0.5 ease-in;
  }

  form input:focus {
    background-color: rgba(255,255,255,0.05);
  }

  .input-search {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
  } 
  .input-search button{
    background: none;
    border:none;
    border-radius: 8px;
    background-color: #e1e1e1;
    transition: all 0.3s ease 0s;
  }
  .input-search button img{
    padding: 10px;
    height: 30px;
  }
  .input-search button:hover{
    transform: translateY(-3px);
    cursor: pointer;
    background-color: white;
  }
  .search-results ul li {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 2.5rem;
    color: rgba(255,255,255,0.5);
    list-style-type: "⭐";
    list-style-position: inside;
  } 

  .search-results ul li:hover {
    cursor: pointer;
    color: rgba(255,255,255,0.8);
    background-color: rgba(255,255,255,0.05);

  }

  .search-results ul li span {
    padding-left: 1ch;
  }

  select.select-search {
    width: 400px;
    height: 35px;
    background: #e1e1e1;
    color: #1e1e1e;

    width: 100%;

    /* espaçamentos*/
    margin-bottom: 4px;

    padding: 2px 16px;

    /* bordas */
    border-radius: 4px;
    border: 1px #ffffff88 solid;
  }


  //End forms


  .status ul {
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: left;
    gap: 1ch;
    list-style-type: none;
  }


  .status li {
    color: #1e1e1e;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 8px 20px;
    border-radius: 2px;
    background: rgba(255,255,255,0.1);
    opacity: 0.8;
    width: auto;
    text-align: center;
    transition: all 0.3s ease 0s;
  }

  .status li.selected {
    opacity: 1;
    padding: 8px;
    border-radius: 2px;
    background: lightgreen;//rgba(255,255,255,0.5);
    
  }

  .rating ul  {
    display: flex;
    //justify-content: space-between;
    gap: 1ch;
    margin: 20px 0;
    list-style-type: none;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.8);
    height: 50px;
    border-radius: 8px;
    gap: 20px;
  }


`;

export { GameSearchStyles };