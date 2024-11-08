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
    if (num2 == 0) {
        alert("Why are you trying to break the calculator? ;)")
    }
    return num1 / num2
}


let numberOne = "";
let numberTwo = "";
let operator = '';
let operatorBuffer = '';
let currDisplay = '';
justCalculated = false;

const MAX_DIGITS = 14;
const SIX_DECIMAL_PLACES = 1000000;


const display = document.querySelector("#display")



function operate(op, num1, num2) {

    // console.log(`op = ${op}, num1 = ${num1}, num2 = ${num2}`)

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
            handleDigitInput(button.innerHTML)
        });
    });

    // = Button
    const equalsButton = document.querySelector("#btn-equals")

    equalsButton.addEventListener("click", () => {
        // don't do anything if the equals button is pressed when
        // the display is empty or an operator hasn't been specified 
        if (!operator) {
            return
        }

        if (currDisplay && operator) {
            numberTwo = Number(currDisplay)
            processCalculation();
        }

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

function handleDigitInput(digit) {
    // console.log(`### handleDigitInput(${digit}) ###`)
    // console.log(`justCalculated = ${justCalculated}`)
    // console.log(`operator = ${operator}`)
    if (justCalculated) {
        if (operator) {
            // user wants to chain a calculation using the previous result
            clearDisplay()
            updateDisplay(digit)
            numberTwo = Number(digit)
        } else {
            // user wants to input a new pair of numbers so clear everything
            justCalculated = false;
            clearDisplay()
            clearData()
            updateDisplay(digit)
        }

    } else {
        // user is simply entering a number 
        updateDisplay(digit)
    }
}



function handleOperatorInput(op) {

    // console.log(op)

    // Check if the user is continuing a calculation with a previous result
    // because if they are then we need to set this flag to false for
    // numberTwo to be recorded correctly
    if (justCalculated) {
        justCalculated = false;
    }

    op == "btn-add" ? op = '+' :
        op == "btn-subtract" ? op = '-' :
            op == "btn-multiply" ? op = '*' :
                op == "btn-divide" ? op = '/' :
                    op == ""

    // if the user has already provided an operator, perform a calculation
    // while buffering this operator for the next calculation
    if (operator) {
        operatorBuffer = op;
        numberTwo = Number(currDisplay)
        processCalculation()
    } else {
        // otherwise we simply record the operator and have to check if 
        operator = op
        numberOne != "" ? numberTwo = Number(currDisplay) : numberOne = Number(currDisplay)
        currDisplay = ""
    }
}

function processCalculation() {
    clearDisplay()
    let result = operate(operator, numberOne, numberTwo)
    numberOne = result
    numberTwo = null
    operator = operatorBuffer
    operatorBuffer = ""
    result = Math.round((result + Number.EPSILON) * SIX_DECIMAL_PLACES) / SIX_DECIMAL_PLACES
    updateDisplay(result)
    justCalculated = true
}

function updateDisplay(string) {
    if (currDisplay.length < MAX_DIGITS) {
        currDisplay += string
        display.innerHTML = currDisplay
    }

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