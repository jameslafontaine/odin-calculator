// Basic functions for performing various calculator operations
function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}


let numberOne = 0;
let numberTwo = 0;
let operator = '';
let currDisplay = '';

const display = document.querySelector("#display")

function operate(op, num1, num2) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2)
        case '*':
            return multiply(num1, num2)
        case '/':
            return divide(num1, num2)

        default:
            return "ERROR"
    }
}

function setupButtonEventHandlers() {
    digitButtons = document.querySelectorAll(".digit");

    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
            display.innerHTML += button.innerHTML;
            currDisplay += button.innerHTML;
            //console.log(`currDisplay = ${currDisplay}`)
        });
    });
}

setupButtonEventHandlers();