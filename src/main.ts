import { activateEventListeners } from "./buttonListeners";
import "./style.css";
import { currentSum, result } from "./math";

export function updateDisplay() {
	const sum = document.querySelector(".sum span")
	const display = document.querySelector(".display span")
	sum.textContent = currentSum.join(" ")
	if (currentSum.join(" ") === "") sum.textContent = "0"
	display.textContent = result.toString()
}

activateEventListeners()

function scroll() {
	const result = document.querySelector('.display');
	const sum = document.querySelector(".sum")

	result.scroll({
		left: result.scrollWidth
	})

	sum.scroll({
		left: sum.scrollWidth
	})
}

window.addEventListener('keyup', scroll)
document.body.addEventListener('click', scroll)

document.addEventListener('click', () => console.log(currentSum))