import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import "./userTable.css";

function UserTableRow({ id, username, email, date, rating }) {
  const date_parts = date.split("T")[0].split("-");
  const formated_date =
    date_parts[2] + "." + date_parts[1] + "." + date_parts[0].slice(-2);

  return (
    <tr className="table__data-table-row">
      <td className="table__data-table-cell-data table__data-table-cell-data--first">
        {username}
      </td>
      <td className="table__data-table-cell-data">{email}</td>
      <td className="table__data-table-cell-data">{formated_date}</td>
      <td className="table__data-table-cell-data">{rating}</td>
      <td className="table__data-table-cell-data table__data-table-cell-data--button">
        <img
          className="table__data-table-row-dlt-img"
          alt="cancel"
          src="/img/icons/cancel.svg"
        />
      </td>
    </tr>
  );
}

function UserTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const requestParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(
          "https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users",
          requestParams
        );
        const data = await response.json();
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    fetchUsersData();
  }, []);

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
            {data.map((item) => {
              return (
                <UserTableRow
                key={item.id}
                  id={item.id}
                  username={item.username}
                  email={item.email}
                  date={item.registration_date}
                  rating={item.rating}
                />
              );
            })}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}

export default UserTable;
