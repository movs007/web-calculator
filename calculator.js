const display = document.getElementById("display");
const calcValues = document.querySelectorAll(".value-btn")
const clearButton = document.getElementById("clear-btn")
const backButton = document.getElementById("back-btn")
const equals = document.getElementById("equals-btn")
const operatorButtons = document.querySelectorAll(".operator-btn")

let firstValue = null;
let operator = null;
let currentValue = null;
let result = null;


const numberButton = (num) => {
    const digit = +num;
    if (currentValue === null) {
        currentValue = digit;
        
    }else {
        currentValue = currentValue * 10 + digit;
    }
}

const operatorButton = (opBtn) => {
    if (firstValue === null && operator === null && currentValue !== null){
        firstValue = currentValue;
        currentValue = null;
        operator = opBtn;
    }else if (firstValue !== null && operator === null && currentValue !== null){
        firstValue = currentValue;
        currentValue = null;
        operator = opBtn;
    }else{
        operator = opBtn
    }
}

const equalsButton = () => {
    if (firstValue !== null && operator !== null && currentValue !== null){
        if (operator === "+"){
            result = firstValue + currentValue;
            firstValue = result;
            currentValue = null;
            operator = null;
        }else if (operator === "-"){
            result = firstValue - currentValue;
            firstValue = result;
            currentValue = null;
            operator = null;
        }else if (operator === "*"){
            result = firstValue * currentValue;
            firstValue = result;
            currentValue = null;
            operator = null;
        }else if (operator === "/"){
            if (currentValue === 0) {
                result = "Error";
                firstValue = null;
                currentValue = null;
                operator = null;
                return;
            }
            result = firstValue / currentValue;
            firstValue = result;
            currentValue = null;
            operator = null;
        }
    }
}


calcValues.forEach(button => {
    button.addEventListener("click", () => {
        // Handle button click
        if (display.textContent === "0" || currentValue === null && operator === null) {
            display.textContent = button.textContent;
            numberButton(button.textContent)
            console.log("after no")
            console.log("first value = ", firstValue)
            console.log("current value = ", currentValue)
            console.log("operator = ", operator)
            console.log("result = ", result)
        }else {
            display.textContent += button.textContent;
            numberButton(button.textContent)
            console.log("after no")
            console.log("first value = ", firstValue)
            console.log("current value = ", currentValue)
            console.log("operator = ", operator)
            console.log("result = ", result)
        }
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (display.textContent === "0"){
            display.textContent = "0"
            console.log("after operator")
            console.log("first value = ", firstValue)
            console.log("current value = ", currentValue)
            console.log("operator = ", operator)
            console.log("result = ", result)
        }else{
            display.textContent += button.textContent
            operatorButton(button.textContent)
            console.log("after operator")
            console.log("first value = ", firstValue)
            console.log("current value = ", currentValue)
            console.log("operator = ", operator)
            console.log("result = ", result)
        }
    })
})

clearButton.addEventListener("click", () =>{
    display.textContent = "0";
    result = null;
    firstValue = null;
    currentValue = null;
    operator = null;

})

equals.addEventListener("click", () => {
    if (display.textContent !== "0"){
    equalsButton()
    console.log("after equality")
    console.log("first value = ", firstValue)
    console.log("current value = ", currentValue)
    console.log("operator = ", operator)
    console.log("result = ", result)
    display.textContent = result; }
})
