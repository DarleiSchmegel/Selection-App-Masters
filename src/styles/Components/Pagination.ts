import styled from "styled-components";

const PaginationStyles = styled.ul`
  display: flex;
  list-style: none;
  
  li {
    margin-left: 1rem;
  }
  li button {
    background-color: rgba(255,255,255,0.5);
    border-radius: 2px;
    border: none;
    color: #e1e1e1e1;
    padding: 10px;
    transition: all 0.3s ease 0s;
  }

  li button:hover {
    background-color: rgba(255,255,255,0.1);
    cursor:pointer;
  }

  .pagination__item--active {
    background: none;
    font-weight: bold;
    border: none;
  }
  .pagination__item--active:hover {
    cursor: not-allowed;
    background: none;
  }
  .pagination__item--active:focus {
    outline: none;
  }
`;

export { PaginationStyles };