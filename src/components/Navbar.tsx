import React from "react";

export const Navbar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (e) => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full">
      <div className="flex justify-between bg-slate-500 p-6">
        <div>
          <span className="text-white pr-8"> Filter current pages users </span>
          <input
            value={search}
            onChange={setSearch}
            placeholder="Search"
            className="p-2"
          />
        </div>
      </div>
    </div>
  );
};
