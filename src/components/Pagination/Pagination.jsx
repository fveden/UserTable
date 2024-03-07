import "./pagination.css";

function Pagination() {
  return (
    <div className="navigation__wrapper">
      <button className="navigation__btn disabled">
        <img
          alt="prev page"
          src="/img/icons/chevron-left-grey.svg"
          className="navigation__img"
        />
      </button>
      <span className="navigation__text">1 / 5</span>
      <button className="navigation__btn active">
        <img
          alt="next page"
          src="/img/icons/chevron-right-white.svg"
          className="navigation__img"
        />
      </button>
    </div>
  );
}

export default Pagination;
