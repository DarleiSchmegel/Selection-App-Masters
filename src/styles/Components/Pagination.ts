import styled from "styled-components";

const PaginationStyles = styled.ul`
  display: flex;
  list-style: none;

  .pagination li + li {
    margin-left: 1rem;
  }

  .pagination__item--active {
    background: none;
    font-weight: bold;
    border: none;
  }

  .pagination__item--active:focus {
    outline: none;
  }
`;

export { PaginationStyles };