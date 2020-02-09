import React from "react";
import "./styles/ExchangeRates.css";

function ExchangeRates(props) {
  const { country, currency, handleClick } = props;
  return (
    <li className="list__item">
      <p className="list__title">Exchange to {country}'s currency:</p>
      <button className="btn__currency" onClick={() => handleClick(currency)}>
        {country}
      </button>
    </li>
  );
}

export default ExchangeRates;
