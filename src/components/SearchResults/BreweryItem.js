import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import classes from "./BreweryItem.module.css";
import globalDetails from "../globalDetails/globalDetails";

const BreweryItem = function (props) {
  const navigate = useNavigate();

  const moreInfoHandler = function () {
    globalDetails.details = props.data;
    // console.log(globalDetails.details);
    navigate(`/details/${props.data.id}`);
  };

  return (
    <Fragment>
      <div className={classes.item}>
        <p className={classes.name}>{props.data.name.toUpperCase()}</p>
        <p className={classes.location}>
          Located in {props.data.city},{props.data.country}{" "}
        </p>
        <div>
          <button onClick={moreInfoHandler} className={classes.moreInfo}>
            Click for more info!
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default BreweryItem;
