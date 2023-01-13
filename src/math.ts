import { updateDisplay } from "./main";

export let currentSum = [];
export let result: number | "Error" = 0;


//filters out any empty entries in the currentSum array.
export function deleteEmptyArrayEntries() {
	currentSum = currentSum.filter((entry) => entry.trim() != "");
}


//assigns the value of the toAssign parameter to the currentSum array.
export function backspaceAssign(toAssign) {
	currentSum = toAssign;
}


//clears the currentSum array and, if specified, the result variable. It also calls the updateDisplay() function from the main module.
export function clear(clearResult: boolean) {
	if (clearResult) result = 0;
	currentSum = [];
	updateDisplay();
	return;
}


//updates the result variable based on the input provided. If specified, it also copies the result to the currentSum array.
export function updateResult(input, copyResultToCurrentSum?: boolean) {
	if (!input.length) return;
	copyResultToCurrentSum = false ?? copyResultToCurrentSum;
	if (input[0] && !input[0].toString().includes("-") && input.length === 1)
		result = input[0];
	if (input[0].toString().includes("-") && input.length === 1 && input[0])
		input = [result, "-", Math.abs(input[0])];
	if (input.length > 1) result = executeOperation(input);

	updateDisplay();
	if (copyResultToCurrentSum) {
		currentSum.splice(0, 3, result);
		return;
	}
	currentSum.splice(0, 3);
}


//takes in an input array and performs the specified mathematical operation on the first and second elements of the array. If the operation results in a NaN, it returns "Error".
export function executeOperation(input): number | "Error" {
	const firstNum = parseFloat(input[0]);
	const secondNum = parseFloat(input[2]);
	let result;

	result = firstNum + secondNum;
	if (input[1] === "*") result = firstNum * secondNum;
	if (input[1] === "/") result = firstNum / secondNum;
	if (input[1] === "-") result = firstNum - secondNum;
	if (input[1] === "^") result = Math.pow(firstNum, secondNum);

	if (isNaN(result)) return "Error";
	return result;
}
