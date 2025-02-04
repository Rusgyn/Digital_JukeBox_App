import React, { useState } from "react";

const SearchMusic = () => {

  const [findMusic, setFindMusic] = useState("");

  const handleSearch = async(e: React.FormEvent) => {
    e.preventDefault();
    alert("You Click Search!");
  }

  return (
    <div>
      <h2> This is SearchMusic Component </h2>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search here ..."
            value={findMusic}
            onChange={(e) => setFindMusic(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchMusic;