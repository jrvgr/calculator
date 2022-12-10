import { updateDisplay } from "./main"

export let currentSum = []
export let result: number = 0

export function deleteEmptyArrayEntries() {
  currentSum = currentSum.filter(function (entry) { return entry.trim() != ''; });
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

export function updateResult(input, copyResultToCurrentSum: boolean) {
  if (input.length > 0) result = executeOperation(input)
  if (input.length === 1 && input[0]) result = input[0]
  if (copyResultToCurrentSum) { currentSum.splice(0, 3, result); return; }
  currentSum.splice(0, 3)
  updateDisplay()
}

export function executeOperation(input): number {
  const firstNum = parseFloat(input[0])
  const secondNum = parseFloat(input[2])
  if (input[1] === "*") return (firstNum * secondNum)
  if (input[1] === "/") return (firstNum / secondNum)
  if (input[1] === "-") return (firstNum - secondNum)
  return (firstNum + secondNum)
}