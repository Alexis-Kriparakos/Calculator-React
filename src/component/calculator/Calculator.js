/* eslint-disable */
import React from "react";
import Button from "../button";
import Input from "../Input";
import "./Calculator.css";
import { evaluateCalc, multiplyTwoNumbers } from "../../utilities/calc";

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "12",
			input: "",
			firstOperand: null,
			secondOperand: null,
			operator: null,
			rates: {
				USD: null,
				JPY: null,
			},
		};
	}
	isNumber = value => !isNaN(value);
	handleOperand = operator => {
		let currentValue = this.state.input;
		this.setState({
			firstOperand: currentValue,
			input: "",
			operator: operator,
		});
	};
	handleSign = () => {
		let currentValue = this.state.input;
		currentValue = parseFloat(currentValue) * -1;
		this.setState({ input: currentValue });
	};
	handleEqual = () => {
		this.state.secondOperand = this.state.input;
		this.setState({
			input: evaluateCalc(
				this.state.operator,
				this.state.firstOperand,
				this.state.secondOperand
			),
		});
	};
	handleDecimal = () => {
		let currentValue = this.state.input;
		currentValue = currentValue.includes(".")
			? currentValue
			: currentValue + ".";
		this.setState({
			input: currentValue,
		});
	};
	handleBackSpace = () => {
		let currentValue = this.state.input;
		currentValue = currentValue.slice(0, -1);
		this.setState({
			input: currentValue,
		});
	};
	handleReset = () => {
		this.setState({
			input: "",
			firstOperand: "",
			secondOperand: "",
			operator: "",
		});
	};
	handleCurrency = currency => {
		let currentValue = this.state.input;
		let currencyRate;
		if (currency === "$") {
			currencyRate = this.state.rates.USD;
			this.setState({
				input: multiplyTwoNumbers(currentValue, currencyRate).toString(),
			});
		} else if (currency === "¥") {
			currencyRate = this.state.rates.JPY;
			this.setState({
				input: multiplyTwoNumbers(currentValue, currencyRate).toString(),
			});
		}
	};
	handleNumber = value => {
		let newInput = this.state.input + value;
		this.setState({
			input: newInput,
		});
	};

	componentDidMount() {
		const URL = `http://data.fixer.io/api/latest
			?access_key=2bfbded8300778f4269e781a93ff923b
			&symbols=USD,JPY&format=1`;
		fetch(URL)
			.then(data => data.json())
			.then(data => {
				let {
					rates: { USD, JPY },
				} = data;
				this.setState({
					rates: {
						USD: USD,
						JPY: JPY,
					},
				});
			});
	}

	render() {
		return (
			<div className="calculator">
				<div className="calculator__display">
					<Input input={this.state.display} />
				</div>
				<div className="calculator__buttons">
					<div className="buttons__row">
						<Button isNumber={this.isNumber} handleClick={this.handleReset}>
							C
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleOperand}>
							/
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleOperand}>
							*
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleBackSpace}>
							CE
						</Button>
					</div>
					<div className="buttons__row">
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							7
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							8
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							9
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleOperand}>
							-
						</Button>
					</div>
					<div className="buttons__row">
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							4
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							5
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							6
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleOperand}>
							+
						</Button>
					</div>
					<div className="buttons__row">
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							1
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							2
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							3
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleEqual}>
							=
						</Button>
					</div>
					<div className="buttons__row">
						<Button isNumber={this.isNumber} handleClick={this.handleSign}>
							+/-
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleNumber}>
							0
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleDecimal}>
							.
						</Button>
						<Button isNumber={this.isNumber} handleClick={this.handleOperand}>
							^
						</Button>
					</div>
					<div className="buttons__row">
						<Button isNumber={this.isNumber} handleClick={this.handleCurrency}>
							$
						</Button>

						<Button isNumber={this.isNumber} handleClick={this.handleCurrency}>
							¥
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default Calculator;
