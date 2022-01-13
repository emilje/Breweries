import { Fragment, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import BreweryItem from "./BreweryItem";
import classes from "./SearchResults.module.css";
import globalDetails from "../globalDetails/globalDetails";

const SearchResults = function (props) {
  const [isFiltered, setIsFiltered] = useState(false);

  const filterHandler = function () {
    setIsFiltered((prevState) => !prevState);
  };

  let filteredData = [];
  if (isFiltered) {
    filteredData = props.breweriesData.map((brewery) => {
      return { ...brewery };
    });

    filteredData.sort(function (a, b) {
      let cityA = a.city.toLowerCase();
      let cityB = b.city.toLowerCase();
      return cityA < cityB ? -1 : cityA > cityB ? 1 : 0;
    });
  }

  return (
    <Fragment>
      {globalDetails.loading && <LoadingSpinner />}

      <div className={classes.searchResults}>
        {props.breweriesData.length === 0 && (
          <p>Please input a brewery name in the search bar above.</p>
        )}
        {props.breweriesData.length !== 0 && (
          <button className={classes.filterButton} onClick={filterHandler}>
            {isFiltered ? "Revert" : "Sort by city name."}
          </button>
        )}
        {props.breweriesData.length !== 0 && (
          <p>Search results: {props.breweriesData.length}</p>
        )}
      </div>

      <div className={classes.grid}>
        {!isFiltered &&
          props.breweriesData.map((brewery) => {
            return (
              <div key={brewery.id}>
                <BreweryItem data={brewery} />
              </div>
            );
          })}
        {isFiltered &&
          filteredData.map((brewery) => {
            return (
              <div key={brewery.id}>
                <BreweryItem data={brewery} />
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default SearchResults;
