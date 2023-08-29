const screenBottom = document.querySelector("#screenBottom");
const screenTop = document.querySelector("#screenTop");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");
const equals = document.querySelector("#equals");

let displayValue = 0;
let firstNumber = 0;
let secondNumber;
let result;
let operator;

const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".oper");

function operate(num1, num2, operator) {
  switch (operator) {
    case "add":
      return num1 + num2;
      break;
    case "subtract":
      return num1 - num2;
      break;
    case "multiply":
      return num1 * num2;
      break;
    case "divide":
      return num1 / num2;
      break;
  }
}

function operatorSymbol(operatorText) {
  switch (operatorText) {
    case "add":
      return "+";
      break;
    case "subtract":
      return "-";
      break;
    case "multiply":
      return "×";
      break;
    case "divide":
      return "÷";
      break;
  }
}

for (let numButton of numButtons) {
  numButton.addEventListener("click", () => {
    const number = numButton.innerText;
    if (`${displayValue}`.length < 10) {
      if (displayValue === 0) {
        displayValue = parseInt(number);
      } else {
        displayValue = parseInt(`${displayValue}${number}`);
      }
      screenBottom.innerText = displayValue;
    }
  });
}

for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", (e) => {
    if(screenTop.innerText){
        let num1 = parseInt(screenTop.innerText.split(' ')[0]);
        let num2 = displayValue 
        displayValue = operate(num1, num2, operator);
        screenBottom.innerText = displayValue;
    }
    operator = e.target.id;
    firstNumber = displayValue;
    screenTop.innerText = `${firstNumber} ${e.target.innerText}`;
    displayValue = 0;
  });
}

clearButton.addEventListener("click", () => {
  displayValue = 0;
  screenBottom.innerText = displayValue;
  screenTop.innerText = "";
});

deleteButton.addEventListener("click", () => {
  if (screenBottom.innerText.length === 1) {
    displayValue = 0;
    screenBottom.innerText = displayValue;
  } else {
    screenBottom.innerText = screenBottom.innerText.slice(0, -1);
    displayValue = parseInt(screenBottom.innerText);
  }
});

equals.addEventListener("click", () => {
  secondNumber = displayValue;
  result = operate(firstNumber, secondNumber, operator);
  displayValue = result;
  screenBottom.innerText = displayValue;
  screenTop.innerText = `${firstNumber} ${operatorSymbol(
    operator
  )} ${secondNumber} =`;
});
