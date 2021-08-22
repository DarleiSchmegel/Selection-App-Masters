import { PaginationStyles } from "../styles/Components/Pagination"

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

interface PropTypes {
  limit: number,
  total:number,
  offset: number,
  setOffset: (value:number) => void;
}


const Pagination = (
  {limit,
  total,
  offset,
  setOffset}:PropTypes
  ) => {const current = offset ? offset / limit + 1 : 1;
    const pages = Math.ceil(total / limit);
    const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
    const first = Math.min(
      Math.max(current - MAX_LEFT, 1),
      maxFirst
    );
  
    function onPageChange(page:number) {
      setOffset((page - 1) * limit);
    }
  
    return (
      <PaginationStyles>
        <li>
          <button
            onClick={() => onPageChange(current - 1)}
            disabled={current === 1}
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: Math.min(MAX_ITEMS, pages) })
          .map((_, index) => index + first)
          .map((page) => (
            <li key={page}>
              
              <button
                onClick={() => onPageChange(page)}
                className={
                  page === current
                    ? 'pagination__item--active'
                    : undefined
                }
              >
                {page}
              </button>
            </li>
          ))}
        <li>
          <button
            onClick={() => onPageChange(current + 1)}
            disabled={current === pages}
          >
            Próxima
          </button>
        </li>
      </PaginationStyles>
    );
  };
export default Pagination;