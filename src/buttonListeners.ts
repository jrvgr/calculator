import { updateDisplay } from "./main";
import {
	clear,
	currentSum,
	deleteEmptyArrayEntries,
	result,
	updateResult,
} from "./math";

let operators = ["+", "-", "/", "*", "^"];

export function activateEventListeners() {
	numberListener();
	operatorListener();
	resultListener();
	backspaceListener();
	clearListener();
}

window.addEventListener("keyup", (event) => {
	if (isFinite(parseInt(event.key)) || event.key === ".") {
		addNumberToCurrentSum(event.key, getNeededIndex());
		updateDisplay();
		return;
	}
	if (operators.includes(event.key)) {
		addOperatorToCurrentSum(event.key, currentSum);
		updateDisplay();
		return;
	}
	if (event.key === "Backspace") {
		deleteCharacter();
		return;
	}
	if (event.key === "Enter" || (event.key === "=" && currentSum.length !== 2)) {
		updateResult(currentSum, false);
		return;
	}
});

// stuff for operators

function operatorListener() {
	const operatorButtons: NodeListOf<HTMLButtonElement> =
		document.querySelectorAll(".operator");
	operatorButtons.forEach((operator) => {
		operator.addEventListener("click", () => {
			addOperatorToCurrentSum(operator.value, currentSum);
			updateDisplay();
		});
	});
}

function addOperatorToCurrentSum(operator: string, currentSum): void {
	if (currentSum[0] === "-" && operator === "-") return;
	const index = getNeededIndex();
	if (operator === "-" && !currentSum[index]) {
		addNumberToCurrentSum(operator, index);
		return;
	}
	if (currentSum.length === 3) updateResult(currentSum, true);

	if (!currentSum[0]) currentSum[0] = result;
	if (currentSum[2] === undefined) {
		currentSum[1] = operator;
	}
}
//end stuff for operators

// stuff for backspace

function backspaceListener() {
	document
		.querySelector(".backspace")
		.addEventListener("click", deleteCharacter);
}

function deleteCharacter() {
	deleteEmptyArrayEntries();
	if (currentSum.join(" ") !== "") {
		const i = currentSum.length - 1;
		currentSum[i] = currentSum[i].slice(0, -1);
	}
	updateDisplay();
}

//end stuff for backspace

//only next funtion for result

function resultListener(): void {
	document.querySelector(".result").addEventListener("click", () => {
		if (currentSum.length !== 2) updateResult(currentSum, false);
	});
}

// stuff for numbers

function numberListener(): void {
	const numbers = document.querySelectorAll(".number, .decimal");

	numbers.forEach((number) => {
		number.addEventListener("click", () => {
			addNumberToCurrentSum(number.textContent, getNeededIndex());
			updateDisplay();
		});
	});
}
function addNumberToCurrentSum(number: string, index: number): void {
	if (number === ".") {
		if (index === 0 && currentSum[0].includes(".")) return;
		if (index === 2 && currentSum[2].includes(".")) return;
	}
	if (!currentSum[index]) {
		currentSum[index] = number;
		return;
	}
	currentSum[index] = currentSum[index] + number;
}

function getNeededIndex(): number {
	if (currentSum[1] && operators.includes(currentSum[1].toString())) return 2;
	return 0;
}

//end stuff for numbers

//only next function for both clear buttons

function clearListener() {
	document.querySelector(".clear").addEventListener("click", () => clear(true));
	document
		.querySelector(".clear-entry")
		.addEventListener("click", () => clear(false));
}
