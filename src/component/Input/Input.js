import React from "react";
import "./Input.css";

function Input(props) {
  const { display } = props;
  return <div className="calculator__display">{display}</div>;
}

export default Input;
