import { Fragment, useRef } from "react";

import classes from "./SearchBar.module.css";
import globalDetails from "../globalDetails/globalDetails";

const SearchBar = function (props) {
  const inputRef = useRef();

  const searchByName = async function (name) {
    globalDetails.loading = true;

    try {
      const promise = await fetch(
        `https://api.openbrewerydb.org/breweries?by_name=${name}`
      );

      const data = await promise.json();

      if (data.length === 0) {
        inputRef.current.placeholder = "No results found!";
      }

      globalDetails.loading = false;
      props.extractData(data);
    } catch (error) {
      globalDetails.loading = false;
      console.log(error);
    }
  };

  const submitHandler = async function (e) {
    e.preventDefault();

    const searchText = inputRef.current.value;

    if (searchText.trim().length === 0) {
      inputRef.current.placeholder = "Search query can't be blank!";

      return;
    }

    await searchByName(searchText);

    inputRef.current.value = "";
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div className={classes.searchbar}>
          <input
            type="text"
            id="searchQuery"
            placeholder="Search for something tasty..."
            ref={inputRef}
          />

          <button>Find!</button>
        </div>
      </form>
    </Fragment>
  );
};

export default SearchBar;
