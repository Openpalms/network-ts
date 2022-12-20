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
            className={`border text-white w-10 mx-5
            hover:border-[#13a7ab] rounded-lg transition-all
            ${props.currentPage === p && 'bg-[#13a7ab]'}
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
