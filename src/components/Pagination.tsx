import React from 'react';
import { PaginationProps } from '../Types/Props';

function Pagination(props: PaginationProps) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.totalUsers / props.usersPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((p, i) => {
        return (
          <button
            key={i}
            onClick={() => props.setCurrentPage(p)}
            className={`border text-white w-10 mx-1 md:mx-5
            hover:scale-150 rounded-lg transition-all
            ${props.currentPage === p && 'bg-[#B8DBD9]'}
            `}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
