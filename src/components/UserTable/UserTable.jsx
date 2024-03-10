import { useState, useEffect, useRef, useCallback } from "react";
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
const ELEMETS_ON_PAGE = 5;
function UserTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeDelete, setActiveDelete] = useState(false); // Open or Close modal window
  const deleteId = useRef(undefined); // Store an id of user to delete
  const [filterValue, setFilterValue] = useState(""); // Value in search field
  const debounceFilter = useDebounce(filterValue, 0); // Value will be updated with a delay if needed
  const [sortBy, setSortBy] = useState(undefined); // sorting object {name: string, direction: "desc" | "asc"}
  const [pages, setPages] = useState({ currentPage: 1, allPages: 0 });
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
   * Sorting function depending on columnName
   * @param {object[]} data 
   * @param {"date" | "rating"} columnName 
   * @param {"desc" | "asc"} direction 
   * @returns sorted object[]
   */
  const handleSort = (data, columnName, direction = "desc") => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const item1 =
        columnName === "date"
          ? new Date(a.registration_date.split("T")[0])
          : Number(a.rating);
      const item2 =
        columnName === "date"
          ? new Date(b.registration_date.split("T")[0])
          : Number(b.rating);
      if (item1 < item2) {
        return direction === "asc" ? -1 : 1;
      } else if (item1 > item2) {
        return direction === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

    setSortBy({ name: columnName, direction: direction });
    return sorted;
  };

  /**
   * Return all filter states to original
   * Set a page to 1
   */
  const handleCleanFilters = () => {
    setSortBy(undefined);
    setFilterValue("");
    setPages((prev) => {
      return { currentPage: 1, allPages: prev.allPages };
    });
  };
  /**
   * Set the page to the next page if it's possible
   */
  const handleNextPageClick = useCallback(() => {
    const current = pages.currentPage;
    const next = current + 1;
    const total = filteredData ? Math.ceil(filteredData.length / 5) : current;

    setPages({ currentPage: next <= total ? next : current, allPages: total });
  }, [pages, filteredData]);
  /**
   * Set the page to the prev page if it's possible
   */
  const handlePrevPageClick = useCallback(() => {
    const current = pages.currentPage;
    const back = current - 1;

    setPages((prev) => {
      return {
        currentPage: back > 0 ? back : current,
        allPages: prev.allPages,
      };
    });
  }, [pages]);
  /**
   * Checks if it's the first time or
   * repeated click on sorting button
   * @param {"date" | "rating"} columnName 
   */
  const handleSortClick = (columnName) => {
    if (sortBy && sortBy.name === columnName) {
      setFilteredData(
        handleSort(
          filteredData,
          columnName,
          sortBy.direction === "asc" ? "desc" : "asc"
        )
      );
    } else {
      setFilteredData(handleSort(filteredData, columnName));
    }
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
        setPages({ currentPage: 1, allPages: Math.ceil(data.length / 5) });
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    fetchUsersData();
  }, []);

  /**
   * Update data according to the filters state
   */
  useEffect(() => {
    let filtered = data;
    if (debounceFilter) {
      filtered = data.filter((item) => {
        return (
          item.username.toLowerCase().includes(debounceFilter.toLowerCase()) ||
          item.email.toLowerCase().includes(debounceFilter.toLowerCase())
        );
      });
    }
    if (sortBy) {
      filtered = handleSort(filtered, sortBy.name, sortBy.direction);
    }

    setFilteredData(filtered);
  }, [data, debounceFilter]);
  /**
   * Update page object according to the changes in data
   */
  useEffect(() => {
    const allPages = Math.ceil(filteredData.length / ELEMETS_ON_PAGE);
    let currentPage =
      pages.currentPage > allPages ? allPages : pages.currentPage;
    if (currentPage === 0 && filteredData.length > 0) {
      currentPage = 1;
    }
    setPages({ currentPage: currentPage, allPages: allPages });
  }, [filteredData]);

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
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          />
        </div>
        {(filterValue || sortBy) && (
          <div
            className="table__clear-filter-field"
            onClick={handleCleanFilters}
          >
            <img
              className="table__clear-filter-img"
              alt="clean"
              src="/img/icons/clean.svg"
            />
            <span className="table__clear-filter-btn">Очистить фильтр</span>
          </div>
        )}
      </div>
      <div className="table__sorting">
        <h6 className="table__sorting-title">Сортировка:</h6>
        <button
          onClick={() => {
            handleSortClick("date");
          }}
          className={
            "table__sorting-button" +
            (sortBy?.name === "date" ? " table__sorting-button--active" : "")
          }
        >
          Дата регистрации
        </button>
        <button
          onClick={() => {
            handleSortClick("rating");
          }}
          className={
            "table__sorting-button" +
            (sortBy?.name === "rating" ? " table__sorting-button--active" : "")
          }
        >
          Рейтинг
        </button>
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
              filteredData
                .slice(
                  (pages.currentPage - 1) * ELEMETS_ON_PAGE,
                  pages.currentPage * ELEMETS_ON_PAGE
                )
                .map((item) => {
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
      </div>
      {filteredData.length > 0 && (
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: pages.currentPage === 1,
            right: pages.currentPage === pages.allPages,
          }}
          pages={pages}
        />
      )}
    </div>
  );
}

export default UserTable;
