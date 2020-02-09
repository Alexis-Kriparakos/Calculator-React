const calculatorOperations = {
  additionTwoNumbers: (firstNumber, secondNumber) => {
    let result = parseFloat(firstNumber) + parseFloat(secondNumber);
    return (result = Math.round(result * 100) / 100);
  },
  substractTwoNumbers: (firstNumber, secondNumber) => {
    let result = parseFloat(firstNumber) - parseFloat(secondNumber);
    return (result = Math.round(result * 100) / 100);
  },
  multiplyTwoNumbers: (firstNumber, secondNumber) => {
    let result = parseFloat(firstNumber) * parseFloat(secondNumber);
    return (result = Math.round(result * 100) / 100);
  },
  divideTwoNumbers: (firstNumber, secondNumber) => {
    let result = parseFloat(firstNumber) / parseFloat(secondNumber);
    return (result = Math.round(result * 100) / 100);
  },
  powerTwoNumbers: (firstNumber, secondNumber) => {
    let result = parseFloat(firstNumber) ** parseFloat(secondNumber);
    return (result = Math.round(result * 100) / 100);
  }
};

const evaluateCalc = (operation, number1, number2) => {
  const {
    additionTwoNumbers,
    substractTwoNumbers,
    multiplyTwoNumbers,
    divideTwoNumbers,
    powerTwoNumbers
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
