import React from "react";

export const Navbar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (e) => void;
}) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div>
          <span className="navbar-text"> Filter current pages users </span>
          <input value={search} onChange={setSearch} />
        </div>
      </div>
    </div>
  );
};
