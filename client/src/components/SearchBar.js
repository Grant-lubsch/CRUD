import React from "react";

export function SearchBar(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={props.value}
        onChange={props.onChange}
      />
      <button onClick={props.onClick}>Search</button>
    </div>
  );
}
