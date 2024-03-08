import { useState, useEffect, useRef } from "react";
import Pagination from "../Pagination/Pagination";
import ModalWindow from "../ModalWindow/ModalWindow";
import DeleteConf from "../DeleteConf/DeleteConf";
import "./userTable.css";
import useDebounce from "../../hooks/useDebounce";

function UserTableRow({ id, username, email, date, rating, deleteFunc }) {
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
          onClick={() => {
            deleteFunc(id);
          }}
        />
      </td>
    </tr>
  );
}

function UserTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeDelete, setActiveDelete] = useState(false); // Open or Close modal window
  const deleteId = useRef(undefined); // Store an id of user to delete
  const [filterValue, setFilterValue] = useState("");
  const debounceFilter = useDebounce(filterValue); // Value will be updated with a delay
  /**
   * Handle click on delete button in row
   */
  const handleDeleteClick = (id) => {
    deleteId.current = id;
    setActiveDelete(true);
  };
  /**
   * Handle click on agree button
   */
  const agreeDeleteRow = () => {
    const updatedData = data.filter((item) => item.id !== deleteId.current);
    setData(updatedData);
    deleteId.current = undefined;
    setActiveDelete(false);
  };
  /**
   * Handle click on disagree button
   */
  const disagreeDeleteRow = () => {
    deleteId.current = undefined;
    setActiveDelete(false);
  };
  /**
   * For exit without clicking on buttons
   */
  const onLeaveDeleteConf = () => {
    deleteId.current = undefined;
  };
  /**
   * Fetch data from mock api when component did mount
   */
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
        setFilteredData(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    fetchUsersData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        item.username.toLowerCase().includes(debounceFilter.toLowerCase()) ||
        item.email.toLowerCase().includes(debounceFilter.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [data, debounceFilter]);

  return (
    <div className="table">
      <ModalWindow
        active={activeDelete}
        setActive={setActiveDelete}
        onLeaving={onLeaveDeleteConf}
      >
        <DeleteConf onAgree={agreeDeleteRow} onDisagree={disagreeDeleteRow} />
      </ModalWindow>
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
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
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
            {filteredData.length > 0 &&
              filteredData.map((item) => {
                return (
                  <UserTableRow
                    key={item.id}
                    id={item.id}
                    username={item.username}
                    email={item.email}
                    date={item.registration_date}
                    rating={item.rating}
                    deleteFunc={handleDeleteClick}
                  />
                );
              })}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <p className="table__data-table-empty-warning">Нет данных</p>
        )}
        <Pagination />
      </div>
    </div>
  );
}

export default UserTable;
