import styled from "styled-components";

const CardsStyles = styled.div`
  width: 90%;
  max-width: 1350px;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;

  padding-bottom: 20px;

  .image {
  width: 100%;
  padding-top: 56.25%; /* 16:9 */

  overflow: hidden;
  position: relative;
  }


  img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }


  button {
    background-color: none;
    background: none;
  }
  .card {
  display: flex;
  flex-direction: column;
  background-color: rgba(255,255,255,0.05);
  cursor: pointer;
  transition: all 0.3s ease 0s;

  }
  .card:hover {
    transform: translateY(-7px);
    /* transform: scale(1.03); */
  }

  

`;

export { CardsStyles };