import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_BASE_URL + "/api/stays?populate=image";

export default function SearchBar() {
  const [searchedItem, setSearchedItem] = useState("");
  const [filteredSingleId, setFilteredSingleId] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(function () {
    async function getStays() {
      const response = await axios.get(API);

      const items = response.data.data.map((stay) => {
        return stay;
      });

      setFilteredSingleId(items);
    }

    getStays();
  }, []);

  const filter = (event) => {
    const searchedItem = event.target.value;
    setSearchedItem(searchedItem);

    const filteredId = filteredSingleId.filter((value) => {
      return value.attributes.name.trim().toLowerCase().includes(searchedItem.trim().toLowerCase());
    });
    setFilteredSingleId(filteredId);
    console.log("filtred name", filteredId);

    if (searchedItem === "") {
      setFilteredItems([]);
    } else {
      setFilteredItems(filteredSingleId);
    }
  };

  return (
    <div className="search">
      <div>
        <input type="text" placeholder="Search..." value={searchedItem} onChange={filter} />
        <div className="searchIcon"></div>
      </div>
      {filteredItems.length !== 0 && (
        <div className="resultResult">
          {filteredSingleId.map((items) => {
            return (
              <div key={items.id}>
                <Link className="dataItem" to={`details/${items.id}`}>
                  <p> {items.attributes.name} </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
