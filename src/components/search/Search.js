import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_BASE_URL + "/api/stays?populate=image";

export default function SearchBar() {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(function () {
    async function getStays() {
      const response = await axios.get(API);

      const items = response.data.data.map((stay) => {
        return stay;
      });

      setAllItems(items);
    }

    getStays();
  }, []);

  const filter = (event) => {
    const searchedItem = event.target.value.trim();

    if (searchedItem === "") {
      return setFilteredItems([]);
    }

    const filteredHotels = allItems.filter((value) => {
      return value.attributes.name.trim().toLowerCase().includes(searchedItem.toLowerCase());
    });

    setFilteredItems(filteredHotels);
  };
  return (
    <div className="search">
      <div className="search-input">
        <input type="text" placeholder="Search..." onChange={filter} />
        <div className="search-icon"></div>
      </div>
      {filteredItems.length !== 0 && (
        <div className="search-result">
          {filteredItems.map((items) => {
            return (
              <div key={items.id}>
                <Link className="data-items" to={`details/${items.id}`}>
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
