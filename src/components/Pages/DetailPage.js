import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../UI/Card";
import classes from "./DetailPage.module.css";
import globalDetails from "../globalDetails/globalDetails";

const DetailPage = function () {
  const [distance, setDistance] = useState(0);
  const navigate = useNavigate();
  const brewery = globalDetails.details;

  function deg2rad(deg) {
    // convert degrees into radians
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      const { latitude: lat1, longitude: lon1 } = success.coords;
      // console.log(lat1, lon1);
      const lat2 = brewery.latitude;
      const lon2 = brewery.longitude;

      var R = 6371; // radius of the earth in km
      var dLat = deg2rad(lat2 - lat1);
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = (R * c).toFixed(); // distance in km

      setDistance(d);
    });
  }, [brewery]);

  const goBackHandler = function () {
    navigate("/");
  };

  return (
    <Fragment>
      <Card>
        <p>Information about {brewery.name}.</p>
      </Card>
      <Card>
        <p>Brewery name: {brewery.name}</p>
        <p>Brewery type: {brewery.brewery_type}</p>
        <p>Address: {brewery.street}</p>
        {brewery.address_2 && <p>Address: {brewery.street}</p>}
        {brewery.address_3 && <p>Address: {brewery.street}</p>}
        <p>City: {brewery.city}</p>
        <p>State: {brewery.state}</p>
        {brewery.county_province && (
          <p>County province: {brewery.county_province}</p>
        )}
        <p>Postal code: {brewery.postal_code}</p>
        {brewery.longitude !== null && brewery.latitude !== null && (
          <p>Distance from you: {distance} km</p>
        )}
        <button onClick={goBackHandler} className={classes.goBack}>
          Go back
        </button>
      </Card>
    </Fragment>
  );
};

export default DetailPage;
