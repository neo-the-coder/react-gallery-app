import React, { useState } from "react";
import { client } from "../api/pexelAPI";
import "./SearchBar.css";

function SearchBar({ content, setContent }) {
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (query && query !== content.query) {
      client.photos
        .search({ query, per_page: 20 })
        .then(({ page, next_page, photos, total_results }) => {
          setContent({
            query,
            page: page + 1,
            next_page,
            photos,
            total_results,
          });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
