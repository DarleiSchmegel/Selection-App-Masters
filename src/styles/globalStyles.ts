import { createGlobalStyle } from "styled-components";
// import { theme } from "./theme";
interface ThemeProps {
  color?: string;
  backgroundColor?: string;
  backgroundColorSecundary?: string;
}
const GlobalStyle = createGlobalStyle<ThemeProps>`

  *{
    margin: 0;
    padding: 0;
    /* outline: 0; */    
    font-family: 'Source Sans Pro', sans-serif;
  }
  html {
    /* a cada 1rem será considera 10px */
    font-size: 62.5%;
  }

  body {
    color: ${props=> props.color};
    background:${props=> props.backgroundColor};  
  }
  main {
    width: 100%;
    min-height: 85vh;
    display: flex;
    flex-direction: column; 
    align-items: center;

    transition: 0.5ms;
  }

  .content {
    margin: 10px;   
  }

  .info {
    /* flex-direction: column; */
    /* align-items: center; */
    display: flex;
    min-height: 120px;
    /* border: 1px solid black; */
    justify-content: space-between;
    flex-direction: column;
    text-align: justify;  
  }
  .text--medium {
    font-size: 1.6rem;
    line-height: 2.6rem;
    font-weight: 400;
    color: #e1e1e1;
  }

  .id {
    color: #e1e1e1;
    font-family: Arial, Helvetica, sans-serif;
    margin-left: auto;
    padding: 5px 20px;
    filter: brightness(90%);
  }

  .title {
    margin-bottom: 20px;
    font-size: 20px;
    font-style: oblique;
  }

`;

export default GlobalStyle;
