import React from "react";
import "./Button.css";

function Button(props) {
	const { isNumber, children, handleClick } = props;
	return (
		<button
			className={`btn ${
				isNumber(parseInt(children)) ? "btn-number" : "btn-operand"
			}`}
			onClick={() => handleClick(children)}
		>
			{children}
		</button>
	);
}

export default Button;
