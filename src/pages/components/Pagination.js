import React from "react";

const Pagination = ({ page, totalPage, setPage }) => {
  const scrollTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
    scrollTop();
  };

  const handleNextPage = () => {
    setPage((next) => next + 1);
    scrollTop();
  };

  return (
    <div className="paginations">
      {page <= 1 ? null : (
        <a className="pagination-prev" onClick={handlePrevPage}>
          Prev
        </a>
      )}
      <p className="text-pages">
        {page} of {totalPage}
      </p>
      {page >= totalPage ? null : (
        <a className="pagination-next" onClick={handleNextPage}>
          Next
        </a>
      )}
    </div>
  );
};

export default Pagination;
