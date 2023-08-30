const screenBottom = document.querySelector("#screenBottom");
const screenTop = document.querySelector("#screenTop");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

let currentValue = '0';
let previousValue = '';
let operator = '';

const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".oper");

function operate(str1, str2, operator) {
  let num1 = Number.parseFloat(str1);
  let num2 = Number.parseFloat(str2);
  switch (operator) {
    case "+":
      return (num1 + num2).toString();
      break;
    case "-":
      return (num1 - num2).toString();
      break;
    case "×":
      return (num1 * num2).toString();
      break;
    case "÷":
      return (num1 / num2).toString();
      break;
  }
}

numButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    addDigit(e.target.innerText);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    addOperation(e.target.innerText);
  })
})

equals.addEventListener('click', () => {
  if(currentValue && previousValue && operator){
    updateTopScreen(previousValue + " " + operator + " " + currentValue + " =");
    currentValue = operate(previousValue, currentValue, operator)
    currentValue = (Math.round(currentValue * 1000) / 1000).toString();
    if (currentValue.length > 10){
      screenBottom.innerText = scientific(currentValue, 10);
    }
    else{
      screenBottom.innerText = currentValue;
    }
    operator = '';
    previousValue = currentValue;;
  }
});

clearButton.addEventListener('click', () => {
  currentValue = '';
  previousValue = '';
  operator = '';
  screenBottom.innerText = '0';
  screenTop.innerText = '';
});

function addDigit(digit) {
  if (currentValue.length < 10) {
    if (currentValue === '0' || currentValue === '') {
      currentValue = digit;
    } else {
      currentValue += digit;
    }
    screenBottom.innerText = currentValue;
  }
}

function addOperation(operatorText){
  if(operator){
    previousValue = operate(previousValue, currentValue, operator);
  }
  else if(currentValue){
    previousValue = currentValue;
  }
  else{
    previousValue = 0;
  }
  currentValue = '';
  operator = operatorText;
  screenTop.innerText = previousValue + " " + operatorText;
}

function scientific(numStr, space){
  let power = (numStr.length - 1).toString();
  return numStr[0] + "." + numStr.slice(1,space-1-power.length) + 'e' + power;
  // return `${Math.round(Number.parseFloat(numStr) / (10 ** (power)))}e${power}`
}

decimal.addEventListener("click", () => {
  updateTopScreen('1 + 2');
});

function updateTopScreen(str){
  let [num1, operChar, num2] = str.split(' ')
  if(str.length > 17){
    num1 = scientific(num1, 7);
    num2 = scientific(num2, 7);
  }
  screenTop.innerText = num1 + " " + operChar + " " + num2 + " =";
}

// function shortenNumber(numString){
//   if(numString.split('.')[0].length > 10){

//   }
// }

// function updateDisplay(topText, bottomText) {
//   if (topText.length > 20) {
//     screenTop.style.fontSize = "1.2em";
//   }
//   else{
//     screenTop.style.fontSize = '1.8em'
//   }
//   if (bottomText.length > 10) {
//     // bottomText = Math.round(Number.parseFloat(bottomText) * 1000) / 1000;
//     if(bottomText.split('.')[0].length > 10){
//       let overflow = bottomText.split('.')[0].length - 10;
//       console.log(overflow);
//       bottomText = `${Math.round(Number.parseFloat(bottomText) / (10 ** (overflow + 2)))} e${overflow + 2}`
//     }
//   }
//   screenTop.innerText = topText;
//   screenBottom.innerText = bottomText;
// }

// deleteButton.addEventListener('click', () => {
//   if (screenBottom.innerText.length === 1) {
//     displayValue = 0;
//     screenBottom.innerText = displayValue;
//   } else {
//     screenBottom.innerText = screenBottom.innerText.slice(0, -1);
//     displayValue = parseInt(screenBottom.innerText);
//   }
// });

// for (let operatorButton of operatorButtons) {
//   operatorButton.addEventListener("click", (e) => {
//     if (screenTop.innerText) {
//       let num1 = parseInt(screenTop.innerText.split(" ")[0]);
//       let num2 = displayValue;
//       displayValue = operate(num1, num2, operator);
//       screenBottom.innerText = displayValue;
//     }
//     operator = e.target.id;
//     firstNumber = displayValue;
//     screenTop.innerText = `${firstNumber} ${e.target.innerText}`;
//     displayValue = 0;
//   });
// }


