const display = document.getElementById("display");
const expressionDisplay = document.getElementById("expression-display")
const calcValues = document.querySelectorAll(".value-btn")
const clearButton = document.getElementById("clear-btn")
const backButton = document.getElementById("back-btn")
const equals = document.getElementById("equals-btn")
const operatorButtons = document.querySelectorAll(".operator-btn")
const decimalButton = document.querySelector(".decimal-btn")
const percentButton = document.querySelector(".percent-btn")

let values = [];
let operators = [];
let currentValue = null;
let result = null;
let justCalculated = false;


const numberButton = (num) => {
    // const digit = +num;
    if (justCalculated || result === "Error"){
        resetCalculatorState()
        currentValue = num;        
    }else if ( currentValue === null){ 
        currentValue = num;
    }else {
        currentValue = currentValue + num;
    }
}

const enterDecimalButton = (decimal) =>{
    if (justCalculated || result === "Error"){
        resetCalculatorState()
        currentValue = "0" + decimal;
    }else if (currentValue === null){
        currentValue = "0" + decimal;
    }else if (currentValue.includes(".") === false){
        currentValue = currentValue + decimal;
    }
}

const resetCalculatorState = () => {
    values.length = 0;
    operators.length = 0;
    result = null;
    justCalculated = false;        
}

const operatorButton = (opBtn) => {
    let insertingValue = Number(currentValue)
    if (values.length === 0 && operators.length === 0 && currentValue !== null){
        values.push(insertingValue);
        currentValue = null;
        operators.push(opBtn);
    }else if(justCalculated && values.length === 0 && operators.length === 0 && currentValue === null){
        values.push(result);
        result = null;
        operators.push(opBtn);
        justCalculated = false;
    }else if (result === "Error"){
        values.push(0);
        operators.push(opBtn);
        result = null;
    }else {
        if(currentValue !== null){
            values.push(insertingValue);
            currentValue = null;
            operators.push(opBtn)
        }else{
            operators.splice(-1, 1, opBtn);
        }
    }
}

const backButtonFunction = () => {
    if (currentValue !== null && values.length === 0 && operators.length === 0){
        currentValue = currentValue.slice(0, -1);
        if (currentValue.length === 0){
            currentValue = null;
        }
        
    }else if (currentValue === null && values.length !== 0 && operators.length !== 0){
        currentValue = String(values.pop());
        operators.pop();
    }else if (currentValue !== null && values.length !== 0 && operators.length !== 0){
        currentValue = currentValue.slice(0, -1);
        if (currentValue.length === 0){
            currentValue = null;
        }
        
    }else if (currentValue === null && values.length !== 0 && operators.length === 0){
        values.pop();
        }
}

const equalsButton = () => {
    let insertingValue = Number(currentValue)
    if (values.length !== 0 && operators.length !== 0){
        if (currentValue !== null){
            values.push(insertingValue);
        }
        
        result = calculate(values, operators);
        if (result === "Error"){
            resetExpressionState(false);
            return;
        }
        resetExpressionState(true);
    }else if(values.length === 0 && operators.length === 0 && currentValue !== null){
        result = insertingValue;
        resetExpressionState(true);
    }
}

const percentageButton = () =>{
    let insertingValue = Number(currentValue)
    if (!justCalculated && currentValue !== null && values.length === 0){
        result = insertingValue / 100;
        resetExpressionState(true)
    }else if(justCalculated){
        result = result / 100;
    }
}


const calculate = (values,operators) => {
    let i = 0;
    let finalResult = null;
    let valuesCopy = [...values];
    let operatorsCopy = [...operators];

    if (valuesCopy.length === operatorsCopy.length){
        operatorsCopy.pop()
    }

    while (i < operatorsCopy.length){ 
        if (operatorsCopy[i] === "×"){
            valuesCopy[i] = valuesCopy[i] * valuesCopy[i+1];
            valuesCopy.splice(i+1,1);
            operatorsCopy.splice(i,1);
        }else if (operatorsCopy[i] === "÷"){
            if (valuesCopy[i+1] === 0){
               return "Error";
            }
            valuesCopy[i] = valuesCopy[i] / valuesCopy[i+1];
            valuesCopy.splice(i+1,1);
            operatorsCopy.splice(i,1);
        }else{
            i++
        }
    }
    while (operatorsCopy.length > 0){
        if (operatorsCopy[0] === "+"){
            valuesCopy[0] = valuesCopy[0] + valuesCopy[1];
            valuesCopy.splice(1,1);
            operatorsCopy.splice(0,1);
        }else if (operatorsCopy[0] === "-"){
            valuesCopy[0] = valuesCopy[0] - valuesCopy[1];
            valuesCopy.splice(1,1);
            operatorsCopy.splice(0,1);
        }
    }
    finalResult = valuesCopy[0];
    return finalResult;
}

const renderDisplay = () => {
    const formatter = new Intl.NumberFormat("en-US");
    if (values.length !== 0 || currentValue !== null){
        let expression = "";
        for (let i = 0; i < values.length; i++){
            expression += formatter.format(values[i]);
            expression += operators[i];
        }
        if (currentValue !== null){
            expression += formatter.format(currentValue);
        }
        expressionDisplay.textContent = `${expression}`
    }else if (justCalculated && result !== null && result !== "Error"){
        const formattedResult = formatter.format(result)
        display.textContent = `${formattedResult}`
    }else if ( !justCalculated && result === "Error"){
        display.textContent = `${result}`
    }
    else{
        expressionDisplay.textContent = "";
        display.textContent = "0";
    }
}

const resetExpressionState = (calculated) => {
    values.length = 0;
    operators.length = 0;
    currentValue = null;
    justCalculated = calculated;
}

const logState = () => {
    console.log("values = ", values)
    console.log("current value = ", currentValue)
    console.log("operators = ", operators)
    console.log("result = ", result)
    console.log("justCalculated = ", justCalculated)
}

calcValues.forEach(button => {
    button.addEventListener("click", () => {
        // Handle button click
        numberButton(button.textContent)
        renderDisplay()
        logState()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        operatorButton(button.textContent)
        renderDisplay()
        logState()
    })
})

decimalButton.addEventListener("click", () => {
    enterDecimalButton(decimalButton.textContent)
    renderDisplay()
    logState()
})

clearButton.addEventListener("click", () =>{
    result = null;
    resetExpressionState(false);
    renderDisplay()
    logState()

})

equals.addEventListener("click", () => {
    equalsButton()
    renderDisplay()
    logState()
})

percentButton.addEventListener("click", () =>{
    percentageButton()
    renderDisplay()
    logState()
})

backButton.addEventListener("click", () => {
    backButtonFunction()
    renderDisplay()
    logState()
})
