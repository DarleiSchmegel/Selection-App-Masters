import styled from "styled-components";

const ModalStyles = styled.div`
  cursor: auto;


  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.8);
 
  color: #1e1e1e;
  .container {
    position: absolute;
    display: flex;
    
    
    padding: 10px;

  }
  .container .left {
    width: 50%;
    height: 90%;
    padding: 20px;
    
  }
  .container .right {
    width: 50%;
    height: 90%;
    padding: 20px;
  }

  .modal{
    overflow: auto;
    
    position: relative;
    
    background-color: #fff;
    
    width: 80%;
    height: 80%;
    
    margin: 100px;
    /* padding: 10px; */
    
    border-radius: 3px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

   .close-modal {
    background: white;
    border-radius: 2px;
    position: absolute;
    cursor: pointer;
    overflow: hidden;
    z-index: 10;
    top: 15px;
    right: 15px;
  }

 .close-modal svg {
    width: 38px;
    height: 38px;
  }

  .modal-content {
    border: 0;

    transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1);
    transition-delay: 0.3s;
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
    color: #1e1e1e;
  }
  .id {
    color: #1e1e12;

  }

  .right {
    display: flex;
    flex-direction: column;
  }
  .right .status {
    margin-bottom: 20px;
  }
  .right h1 {
    font-size: 3.2rem;
    
  }

  .right ul {
    display: flex;
    justify-content: left;
    gap: 1ch;
    list-style-type: none;
  }

  .right li {
    font-size: 2.5rem;
    cursor: pointer;
    
    
  }
  .right .status li {
    padding: 8px 25px;
    border-radius: 2px;
    background: rgba(0,0,0,0.7);

    width: auto;
    text-align: center;
    transition: all 0.3s ease 0s;
  }

  .right .status li.selected {
    opacity: 1;
    /* padding: 8px;
    border-radius: 2px; */
    background: lightgreen;//rgba(255,255,255,0.5);
    
  }

  .right .status li:hover{
    opacity: 1;
    background: lightgreen;
    transform: translateY(-1px);
    transform: 0.1;
  }
 
  .right .rating ul  {
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.8);
    height: 50px;
    border-radius: 8px;
    gap: 20px;
  }

  @media (max-width: 400px){

    .modal {  
      display: flex;
      width: 95%;
      height: 95%;
      margin: 0;
      padding: 0;    
    }

    .container { 
      flex-direction: column-reverse;
      padding: 0;
      margin:0;
      margin-top: 20px;
    }

    .right .status ul {
      flex-direction: column;
    }

    .right .status li{
      width: 70%;
    }

    .right .rating ul {
      gap: 5px;   
    }

    .container .left {
      width: 100%;
      padding: 0;
    }
    
    .container .right {
      width: auto;
      padding: 0;
      margin: 8px;
    }
  }
`;

export { ModalStyles };