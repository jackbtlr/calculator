const screenBottom = document.querySelector("#screenBottom");
const screenTop = document.querySelector("#screenTop");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

let currentValue = '';
let previousValue = '';
let operator = '';
let receipt = [];

const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".oper");

function evaluate(receiptInput){
  if(receipt.length < 3){
    return receipt[0];
  }
  else{
    return operate(...receipt);
  }
}

function operate(str1, operatorSymbol, str2) {
  let num1 = Number(str1);
  let num2 = Number(str2);
  switch (operatorSymbol) {
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

decimal.addEventListener('click', addDecimal);

operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    addOperation(e.target.innerText);
  })
})

deleteButton.addEventListener('click', () => {
  currentValue = currentValue.slice(0,-1);
  screenBottom.innerText = currentValue;
});

equals.addEventListener('click', () => {
  if(receipt.length === 2 && currentValue){
    receipt.push(currentValue);
    screenTop.innerText = scientific(receipt[0],7) + " " + receipt[1] + " " + scientific(receipt[2],7) + " ="
    receipt[0] = evaluate(receipt);
    receipt.splice(1,2);
    currentValue = receipt[0]
    screenBottom.innerText = scientific(currentValue, 10);
  }
});

clearButton.addEventListener('click', () => {
  receipt = []
  currentValue = '';
  screenBottom.innerText = '0';
  screenTop.innerText = '';
});

function addDigit(digit) {
  if (currentValue.length < 10 && !screenTop.innerText.includes('=')) {
    currentValue += digit;
    screenBottom.innerText = currentValue;
  }
}

function addDecimal(){
  if (!currentValue.includes('.')){
    currentValue += '.';
    screenBottom.innerText = currentValue;
  }
}

function addOperation(operatorText){
  if (receipt.length === 2 && currentValue){
    receipt.push(currentValue);
    receipt[0] = evaluate(receipt);
    receipt.splice(2,1);
  }
  else if (receipt.length === 0){
    receipt[0] = (currentValue || '0');
  }
  receipt[1] = operatorText;
  screenTop.innerText = scientific(receipt[0],17) + " " + receipt[1];
  currentValue = '';
  console.log(receipt);

}

function scientific(numStr, space){
  numStr = (Math.round(Number(numStr) * 10000) / 10000).toString();
  if(numStr.length <= space){
    return numStr;
  }
  if(numStr.includes('e')){
    let numArr = numStr.split('e')
    return (Math.round(Number(numArr[0])) * 10000 / 10000).toString() + "e" + numArr[1]
  }
  let power = (numStr.length - 1).toString();
  return numStr[0] + "." + numStr.slice(1,space-2-power.length) + 'e+' + power;
}