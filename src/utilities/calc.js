const calculatorOperations = {
	additionTwoNumbers: (firstNumber, secondNumber) => {
		let result = parseFloat(firstNumber) + parseFloat(secondNumber);
		return roundResult(result);
	},
	substractTwoNumbers: (firstNumber, secondNumber) => {
		let result = parseFloat(firstNumber) - parseFloat(secondNumber);
		return roundResult(result);
	},
	multiplyTwoNumbers: (firstNumber, secondNumber) => {
		let result = parseFloat(firstNumber) * parseFloat(secondNumber);
		return roundResult(result);
	},
	divideTwoNumbers: (firstNumber, secondNumber) => {
		let result = parseFloat(firstNumber) / parseFloat(secondNumber);
		return roundResult(result);
	},
	powerTwoNumbers: (firstNumber, secondNumber) => {
		let result = parseFloat(firstNumber) ** parseFloat(secondNumber);
		return roundResult(result);
	},
};
const roundResult = number => Math.round(number * 100) / 100;

const evaluateCalc = (operation, number1, number2) => {
	const {
		additionTwoNumbers,
		substractTwoNumbers,
		multiplyTwoNumbers,
		divideTwoNumbers,
		powerTwoNumbers,
	} = calculatorOperations;
	// eslint-disable-next-line
	switch (true) {
		case operation === "+":
			return additionTwoNumbers(number1, number2).toString();
		case operation === "-":
			return substractTwoNumbers(number1, number2).toString();
		case operation === "*":
			return multiplyTwoNumbers(number1, number2).toString();
		case operation === "/":
			return divideTwoNumbers(number1, number2).toString();
		case operation === "^":
			return powerTwoNumbers(number1, number2).toString();
	}
};
const { multiplyTwoNumbers } = calculatorOperations;

export { evaluateCalc, multiplyTwoNumbers };
