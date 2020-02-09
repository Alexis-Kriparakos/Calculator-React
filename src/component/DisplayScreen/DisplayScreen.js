import React from "react";
import "./DisplayScreen.css";

function DisplayScreen(props) {
  const { display } = props;
  return <div className="calculator__display">{display}</div>;
}

export default DisplayScreen;
