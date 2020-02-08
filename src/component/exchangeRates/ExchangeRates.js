import React from "react";
import "./ExchangeRates.css";

function ExchangeRates(props) {
  return (
    <div className="list__item">
      <p className="list__title">Exchange to {props.country}'s currency:</p>
      <button
        className="btn__currency"
        onClick={() => props.handleClick(props.currency)}
      >
        {props.country}
      </button>
    </div>
  );
}

export default ExchangeRates;
