import styled from "styled-components";

const FooterStyles = styled.div`
  text-align: center;
  font-style: italic;
  border-top:  solid 2px  #e1e1e1;
  margin-bottom: 20px;
  padding: 5px;
  

  h2, h3{
    margin-top: 10px;
    padding: 0 20px;
  }
  h2 {

  }
  h2 a, h3 a {
    
    text-decoration: none;
    color: darkblue;
    transition: 5ms;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline solid 2px darkblue;    
  }

`;

export { FooterStyles };