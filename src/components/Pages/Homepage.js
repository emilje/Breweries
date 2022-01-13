import { Fragment, useState, useEffect } from "react";
import Card from "../../UI/Card";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import globalDetails from "../globalDetails/globalDetails";

const Homepage = function () {
  const [data, setData] = useState([]);

  const breweriesDataHandler = function (data) {
    setData(data);
    globalDetails.currentResults = data;
  };

  useEffect(() => {
    setData(globalDetails.currentResults);
  }, []);

  return (
    <Fragment>
      <Card>
        <p>Welcome to Breweries!</p>
        <SearchBar extractData={breweriesDataHandler} />
      </Card>
      <Card>
        <SearchResults breweriesData={data} />
      </Card>
    </Fragment>
  );
};

export default Homepage;
