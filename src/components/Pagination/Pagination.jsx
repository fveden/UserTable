import React from "react";
import "./pagination.css";

function Pagination({ onNextPageClick, onPrevPageClick, disable, pages }) {
  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };
  return (
    <div className="navigation__wrapper">
      <button
        className={"navigation__btn" + (disable.left ? " disabled" : " active")}
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        <img
          alt="prev page"
          src={
            "/img/icons/chevron-left-" +
            (disable.left ? "grey" : "white") +
            ".svg"
          }
          className="navigation__img"
        />
      </button>
      <span className="navigation__text">
        {pages.currentPage} / {pages.allPages}
      </span>
      <button
        className={
          "navigation__btn" + (disable.right ? " disabled" : " active")
        }
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        <img
          alt="next page"
          src={
            "/img/icons/chevron-right-" +
            (disable.right ? "grey" : "white") +
            ".svg"
          }
          className="navigation__img"
        />
      </button>
    </div>
  );
}

export default React.memo(Pagination);
