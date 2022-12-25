import React, { useEffect, useMemo } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { usePaginationRange, DOTS } from 'shared/components/Pagination/hook/usePagination';
import { IPagination } from 'shared/types/interface';
import './style.css';

export const Pagination: React.FC<IPagination> = ({
  total = 0,
  buttonConst = 1,
  pageSize = 10,
  siblingCount = 1,
  currentPage = 1,
  onChangePage,
  position = 'right'
}) => {
  const totalPageCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const paginationRange = usePaginationRange({
    totalPageCount,
    pageSize,
    buttonConst,
    siblingCount,
    currentPage
  });
  /* 👇 little UX tweak when user clicks on any button we scoll to top of the page */

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  }, [currentPage]);

  const goToNextPage = () => {
    onChangePage && onChangePage(currentPage + 1);
  };
  const gotToPreviousPage = () => {
    onChangePage && onChangePage(currentPage - 1);
  };
  const changePage = (event: any) => {
    const pageNumber = Number(event.target.textContent);
    onChangePage && onChangePage(pageNumber);
  };

  return (
    <div className={`td-pagination-warp td-pagination-${position}`}>
      <div className="pagination-container">
        {/* previous button */}
        <div
          onClick={() => {
            if (currentPage !== 1) gotToPreviousPage();
          }}
          className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <AiOutlineLeft />
        </div>
        {/* show paginated button group */}
        {paginationRange.map((item, index) => {
          if (item === DOTS) {
            return <div key={index}>&#8230;</div>;
          }

          return (
            <div
              key={index}
              onClick={changePage}
              className={`pagination-item ${currentPage === item ? 'selected' : ''}`}>
              <span>{item}</span>
            </div>
          );
        })}
        {/* next button */}
        <div
          onClick={() => {
            if (currentPage !== totalPageCount) goToNextPage();
          }}
          className={`pagination-item ${currentPage === totalPageCount ? 'disabled' : ''}`}>
          <AiOutlineRight />
        </div>
      </div>
    </div>
  );
};
