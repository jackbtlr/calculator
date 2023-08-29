const screenBottom = document.querySelector("#screenBottom");
const screenTop = document.querySelector("#screenTop");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");
const equals = document.querySelector("#equals");
// const zero = document.querySelector("#zero");
// const one = document.querySelector("#one");
// const two = document.querySelector("#two");
// const three = document.querySelector("#three");
// const four = document.querySelector("#four");
// const five = document.querySelector("#five");
// const six = document.querySelector("#six");
// const seven = document.querySelector("#seven");
// const eight = document.querySelector("#eight");
// const nine = document.querySelector("#nine");
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

function operatorSymbol(operatorText){
    switch(operatorText){
        case 'add':
            return '+';
            break;
        case 'subtract':
            return '-';
            break;
        case 'multiply':
            return '×';
            break;
        case 'divide':
            return '÷';
            break;
    }
}

for (let numButton of numButtons) {
  numButton.addEventListener("click", () => {
    const number = numButton.innerText;
    if (`${displayValue}`.length < 11) {
      if (displayValue === 0) {
        displayValue = parseInt(number);
      } else {
        displayValue = parseInt(`${displayValue}${number}`)
      }
      screenBottom.innerText = displayValue;
    }
  });
}

for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener('click', (e) => {
    operator = e.target.id;
    firstNumber = displayValue;
    screenTop.innerText = `${firstNumber} ${e.target.innerText}`;
    displayValue = 0;
  });
}

clearButton.addEventListener('click', () => {
  displayValue = 0;
  screenBottom.innerText = displayValue;
  screenTop.innerText = '';
});

deleteButton.addEventListener('click', () => {
  if (screenBottom.innerText.length === 1) {
    displayValue = 0;
    screenBottom.innerText = displayValue;
  } else {
    screenBottom.innerText = screenBottom.innerText.slice(0, -1);
    displayValue = parseInt(screenBottom.innerText);
  }
});

equals.addEventListener('click', () => {
  secondNumber = displayValue;
  result = operate(firstNumber, secondNumber, operator);
  displayValue = result;
  screenBottom.innerText = displayValue;
  screenTop.innerText = `${firstNumber} ${operatorSymbol(operator)} ${secondNumber} =`;
});
