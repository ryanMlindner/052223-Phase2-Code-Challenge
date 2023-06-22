import React, { useState } from "react";

function Search({updateSearchTerm}) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleClick() {
    updateSearchTerm(searchTerm);
  }
  
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleChange}
      />
      <i className="circular search link icon" onClick={handleClick}></i>
    </div>
  );
}

export default Search;
