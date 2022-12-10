import { activateEventListeners } from "./buttonListeners";
import "./style.css";
import { currentSum, result } from "./math";

// import { setupCounter } from "./counter";

export function updateDisplay() {
	const sum = document.querySelector(".sum span")
	const display = document.querySelector(".display span")
	// entries should be displayed as reversed for rtl scrolling hack
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