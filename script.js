// Get the areas on the screen where numbers will be shown
let previousOperand = document.querySelector(".previous-operand");
let currentOperand = document.querySelector(".current-operand");

// These variables will store the numbers and operation you're working with
let prevOperand = "";
let currOperand = "";
let operation;

function changeTheme(themeNumber) {
  document.documentElement.classList.remove("theme1", "theme2", "theme3");
  document.documentElement.classList.add(`theme${themeNumber}`);
}

function handleResetBtnClick() {
  // Clear out the numbers and operation
  prevOperand = "";
  currOperand = "";
  operation = undefined;
  // Update the display to show everything is cleared
  displayNum();
}

function handleDeleteBtnClick() {
  currOperand = currOperand.toString().slice(0, -1);
  displayNum();
}

function handleNumBtnClick(number) {
  // If the current number is less than 10 digits, add the new number to it
  if (currOperand.length < 10) {
    currOperand = currOperand.toString() + number.toString();
  }
  displayNum();
}

function handleOperatorBtnClick(operate) {
  // If there's no current number, do nothing
  if (currOperand === "") return;
  // If there's already a previous number, calculate the result first
  if (prevOperand !== "") {
    calculate();
  }
  // Store the chosen operation and move the current number to the previous number spot
  operation = operate;
  prevOperand = currOperand;
  currOperand = "";
  // Update the display to show what's happening
  displayNum();
}

function calculate() {
  let result;
  // Convert the stored numbers into actual numbers that can be calculated
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currOperand);

  // If either number is not a valid number, stop the function
  if (isNaN(prev) || isNaN(current)) return;

  // Perform the correct operation based on what the user selected
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  
  // Store the result as the current number and clear the previous number and operation
  currOperand = result.toString();
  operation = undefined;
  prevOperand = "";
}

// This function updates the display to show the current state of the calculator
function displayNum() {
  // Show the current number on the main display
  currentOperand.innerText = currOperand;
  // If there's an operation selected, show the previous number and the operation above
  if (operation != null) {
    previousOperand.innerText = `${prevOperand} ${operation}`;
  } else {
    previousOperand.innerText = prevOperand;
  }
}

// This function is called when you press the "=" button to calculate and show the result
function handleOutputBtnClick() {
  calculate();
  displayNum();
}
