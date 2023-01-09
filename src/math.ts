import { updateDisplay } from "./main";

export let currentSum = [];
export let result: number | "Error" = 0;

export function deleteEmptyArrayEntries() {
	currentSum = currentSum.filter((entry) => entry.trim() != "");
}

export function backspaceAssign(toAssign) {
	currentSum = toAssign;
}

export function clear(clearResult: boolean) {
	if (clearResult) result = 0;
	currentSum = [];
	updateDisplay();
	return;
}

export function updateResult(input, copyResultToCurrentSum?: boolean) {
	copyResultToCurrentSum = false;
	if (input.length > 0) result = executeOperation(input);
	if (input.length === 1 && input[0]) result = input[0];
	updateDisplay();
	if (copyResultToCurrentSum) {
		currentSum.splice(0, 3, result);
		return;
	}
	currentSum.splice(0, 3);
}

export function executeOperation(input): number | "Error" {
	const firstNum = parseFloat(input[0]);
	const secondNum = parseFloat(input[2]);
	let result;
	if (input[1] === "*") result = firstNum * secondNum;
	if (input[1] === "/") result = firstNum / secondNum;
	if (input[1] === "-") result = firstNum - secondNum;
	result = firstNum + secondNum;

	if (isNaN(result)) return "Error";
	return result;
}
