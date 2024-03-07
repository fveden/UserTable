import Pagination from "../Pagination/Pagination";
import "./userTable.css";

function UserTable() {
  return (
    <div className="table">
      <h1 className="table__title">Список пользователей</h1>
      <div className="table__search-filter-block">
        <div className="table__search-field">
          <img
            className="table__search-img"
            alt="search"
            src="/img/icons/search.svg"
          />
          <input
            type="text"
            placeholder="Поиск по имени или e-mail"
            className="table__search"
          />
        </div>
        <div className="table__clear-filter-field">
          <img
            className="table__clear-filter-img"
            alt="clean"
            src="/img/icons/clean.svg"
          />
          <span className="table__clear-filter-btn">Очистить фильтр</span>
        </div>
      </div>
      <div className="table__sorting">
        <h6 className="table__sorting-title">Сортировка:</h6>
        <button className="table__sorting-button table__sorting-button--active">
          Дата регистрации
        </button>
        <button className="table__sorting-button">Рейтинг</button>
      </div>
      <div className="table__data-table-wrapper">
        <table className="table__data-table">
          <thead className="table__data-table-heading-block">
            <tr className="table__data-table-heading-row">
              <th className="table__data-table-heading">Имя пользователя</th>
              <th className="table__data-table-heading">E-mail</th>
              <th className="table__data-table-heading">Дата регистрации</th>
              <th className="table__data-table-heading">Рейтинг</th>
              <th className="table__data-table-heading"></th>
            </tr>
          </thead>
          <tbody className="table__data-table-block">
            <tr className="table__data-table-row">
              <td className="table__data-table-cell-data table__data-table-cell-data--first">
                Username
              </td>
              <td className="table__data-table-cell-data">test@test.ru</td>
              <td className="table__data-table-cell-data">23.09.19</td>
              <td className="table__data-table-cell-data">12</td>
              <td className="table__data-table-cell-data table__data-table-cell-data--button">
                <img
                  className="table__data-table-row-dlt-img"
                  alt="cancel"
                  src="/img/icons/cancel.svg"
                />
              </td>
            </tr>
            <tr className="table__data-table-row">
              <td className="table__data-table-cell-data table__data-table-cell-data--first">
                Username
              </td>
              <td className="table__data-table-cell-data">test@test.ru</td>
              <td className="table__data-table-cell-data">23.09.19</td>
              <td className="table__data-table-cell-data">12</td>
              <td className="table__data-table-cell-data table__data-table-cell-data--button">
                <img
                  className="table__data-table-row-dlt-img"
                  alt="cancel"
                  src="/img/icons/cancel.svg"
                />
              </td>
            </tr>
            <tr className="table__data-table-row">
              <td className="table__data-table-cell-data table__data-table-cell-data--first">
                Username
              </td>
              <td className="table__data-table-cell-data">test@test.ru</td>
              <td className="table__data-table-cell-data">23.09.19</td>
              <td className="table__data-table-cell-data">12</td>
              <td className="table__data-table-cell-data table__data-table-cell-data--button">
                <img
                  className="table__data-table-row-dlt-img"
                  alt="cancel"
                  src="/img/icons/cancel.svg"
                />
              </td>
            </tr>
            <tr className="table__data-table-row">
              <td className="table__data-table-cell-data table__data-table-cell-data--first">
                Username
              </td>
              <td className="table__data-table-cell-data">test@test.ru</td>
              <td className="table__data-table-cell-data">23.09.19</td>
              <td className="table__data-table-cell-data">12</td>
              <td className="table__data-table-cell-data table__data-table-cell-data--button">
                <img
                  className="table__data-table-row-dlt-img"
                  alt="cancel"
                  src="/img/icons/cancel.svg"
                />
              </td>
            </tr>
            <tr className="table__data-table-row">
              <td className="table__data-table-cell-data table__data-table-cell-data--first">
                Username
              </td>
              <td className="table__data-table-cell-data">test@test.ru</td>
              <td className="table__data-table-cell-data">23.09.19</td>
              <td className="table__data-table-cell-data">12</td>
              <td className="table__data-table-cell-data table__data-table-cell-data--button">
                <img
                  className="table__data-table-row-dlt-img"
                  alt="cancel"
                  src="/img/icons/cancel.svg"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}

export default UserTable;
