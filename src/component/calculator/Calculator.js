/* eslint-disable */
import React from "react";
import Button from "../button";
import Logo from "../logo";
import DisplayScreen from "../DisplayScreen";
import ExchangeRates from "../exchangeRates";
import { evaluateCalc, multiplyTwoNumbers } from "../../utilities/calc";
import "./styles/Calculator.css";

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "",
			input: "",
			firstOperand: null,
			secondOperand: null,
			operator: null,
			rates: {
				USD: null,
				JPY: null,
				CAD: null,
				SEK: null,
				GBP: null,
			},
		};
	}
	isNumber = value => !isNaN(value);
	handleOperand = operator => {
		let currentValue = this.state.input;
		this.setState({
			display: currentValue,
			firstOperand: currentValue,
			input: "",
			operator: operator,
		});
	};
	handleSign = () => {
		let currentValue = this.state.input;
		currentValue = parseFloat(currentValue) * -1;
		this.setState({ input: currentValue, display: currentValue });
	};
	handleEqual = () => {
		this.state.secondOperand = this.state.input;
		let currentValue = evaluateCalc(
			this.state.operator,
			this.state.firstOperand,
			this.state.secondOperand
		);
		this.setState({
			input: currentValue,
			display: currentValue,
		});
	};
	handleDecimal = () => {
		let currentValue = this.state.input;
		currentValue = currentValue.includes(".")
			? currentValue
			: currentValue + ".";
		this.setState({
			input: currentValue,
			display: currentValue,
		});
	};
	handleBackSpace = () => {
		let currentValue = this.state.input;
		currentValue = currentValue.slice(0, -1);
		this.setState({
			input: currentValue,
			display: currentValue,
		});
	};
	handleReset = () => {
		this.setState({
			input: "",
			display: "",
			firstOperand: "",
			secondOperand: "",
			operator: "",
		});
	};
	handleExchange = currency => {
		if (this.state.display) {
			let currentValue = this.state.input;
			this.setState({
				display: multiplyTwoNumbers(currentValue, currency),
			});
		}
	};
	handleCurrencyBtn = currency => {
		let currentValue = this.state.input;
		let currencyRate;
		if (this.state.display) {
			if (currency === "$") {
				currencyRate = this.state.rates.USD;
				this.setState({
					display: multiplyTwoNumbers(currentValue, currencyRate).toString(),
				});
			} else if (currency === "¥") {
				currencyRate = this.state.rates.JPY;
				this.setState({
					display: multiplyTwoNumbers(currentValue, currencyRate).toString(),
				});
			}
		}
	};
	handleNumber = value => {
		let newInput = this.state.input + value;
		if (newInput.length < 15) {
			this.setState({
				input: newInput,
				display: newInput,
			});
		}
	};

	componentDidMount() {
		const URL = `http://data.fixer.io/api/latest?
    access_key=2bfbded8300778f4269e781a93ff923b&
    symbols=USD,JPY,CAD,SEK,GBP&format=1`;
		fetch(URL)
			.then(curr => curr.json())
			.then(curr => {
				let {
					rates: { USD, JPY, CAD, SEK, GBP },
				} = curr;
				this.setState({
					rates: {
						USD: USD,
						JPY: JPY,
						CAD: CAD,
						SEK: SEK,
						GBP: GBP,
					},
				});
			});
	}

	render() {
		const { rates } = this.state;
		const country = ["USD", "JPY", "CAD", "SEK", "GBP"];
		const exchangeCurrency = Object.values(rates).map((currency, index) => (
			<ExchangeRates
				country={country[index]}
				currency={currency}
				key={index}
				handleClick={this.handleExchange}
			/>
		));
		return (
			<div className="app__wrapper">
				<div className="calculator">
					<DisplayScreen display={this.state.display} />
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
							<Button
								isNumber={this.isNumber}
								handleClick={this.handleBackSpace}
							>
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
							<Button
								isNumber={this.isNumber}
								handleClick={this.handleCurrencyBtn}
							>
								$
							</Button>
							<Logo />
							<Button
								isNumber={this.isNumber}
								handleClick={this.handleCurrencyBtn}
							>
								¥
							</Button>
						</div>
					</div>
				</div>
				<ul className="currency__list">{exchangeCurrency}</ul>
			</div>
		);
	}
}

export default Calculator;
