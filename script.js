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


let numberOne = "";
let numberTwo = "";
let operator = '';
let operatorBuffer = '';
let currDisplay = '';

const display = document.querySelector("#display")

function operate(op, num1, num2) {

    switch (op) {
        case '+':
            return add(num1, num2)
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

    // Digit buttons
    const digitButtons = document.querySelectorAll(".digit");

    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
            updateDisplay(button.innerHTML)
            //console.log(`currDisplay = ${currDisplay}`)
        });
    });

    // = Button
    const equalsButton = document.querySelector("#btn-equals")

    equalsButton.addEventListener("click", () => {
        numberTwo = Number(currDisplay)
        clearDisplay()
        let result = operate(operator, numberOne, numberTwo)
        updateDisplay(result)
        currDisplay = ""
        clearData();
        numberOne = result
        numberTwo = null
    })

    // AC button
    const clearButton = document.querySelector("#btn-clear")

    clearButton.addEventListener("click", () => {
        clearDisplay();
        clearData();
    })

    // Operator buttons

    const opButtons = [
        document.querySelector("#btn-add"),
        document.querySelector("#btn-subtract"),
        document.querySelector("#btn-multiply"),
        document.querySelector("#btn-divide")
    ];

    // Add event listeners using forEach
    opButtons.forEach(button => {
        button.addEventListener("click", () => handleOperatorInput(button.id));
    });
}

function handleOperatorInput(op) {

    console.log(op)

    op == "btn-add" ? op = '+' :
        op == "btn-subtract" ? op = '-' :
            op == "btn-multiply" ? op = '*' :
                op == "btn-divide" ? op = '/' :
                    op == ''

    // if the user has already provided an operator, perform a calculation
    // while buffering this operator for the next calculation
    if (operator) {
        operatorBuffer = op;
        clearDisplay()
        let result = operate(operator, numberOne, numberTwo)
        numberOne = result
        numberTwo = null
        operator = operatorBuffer
        operatorBuffer = ""
        updateDisplay(result)

    } else {
        // only register an operator if digits have been input
        operator = op
        numberOne != "" ? numberTwo = Number(currDisplay) : numberOne = Number(currDisplay)
        currDisplay = ""
    }
}

function updateDisplay(string) {
    currDisplay += string
    display.innerHTML = currDisplay
}

function clearDisplay() {
    currDisplay = ""
    display.innerHTML = ""
}

function clearData() {
    operator = ""
    numberOne = ""
    numberTwo = ""
}

setupButtonEventHandlers();