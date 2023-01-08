class Calculator {
  //inside class has constructor takes all inputs for and functions for calculator
  constructor(previousOperandTextElement, currentOperandTextElement) {
    //what does textElement mean here? --> it is constant we defined below!
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement; // we set operands inside calculator class? this is OOP? --> kind of? we're making the
    // constants "defined globally" so that we can use them in different functions like the updateDisplay() below
    this.clear(); // as soon as we create calculator we want to call this function because we want to reset
  }
  //creating functions for clear, delete, etc inside calculator class
  clear() {
    this.currentOperand = ""; // we just want to clear the number/ empty string and same for previousOperand
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); //we take the current number, convert it to string, then slice, basically removing
    // the last letter of the string (using -1)
  }

  appendNumber(number) {
    //adds the number to the screen visually, and has parameter that passes number user selected
    if (number === "." && this.currentOperand.includes(".")) return; // this line is to check if we already have a decimal in the number
    // when the user is doing a calculation we don't want them to enter invalid numbers like with a lot of decimals so if statement
    // of if number has a decimal (which when it does,) and the current operand (user input) includes . then it returns, so nothing happens
    this.currentOperand = this.currentOperand.toString() + number.toString(); //we convert to strings first so that we append (directly placinng numbers together)
  }

  chooseOperation(operation) {
    //one parameter takes in operation user selected
    if (this.currentOperand === "") return; // we're checking that if the user doesn't have a current operand then it won't be doing any operation?
    if (this.previousOperand !== "") {
      // this is for when we have already computed something and so we directly take the new operation that the user
      // has clicked on and pass it to compute function where user then enters next number to evaluate
      this.compute();
    }
    // if the previousoperand is not empty (there is already a calculation of a number and operation) then you directly solve
    // it when you click on another operation, so you want to call the compute function
    this.operation = operation;
    this.previousOperand = this.currentOperand; // we do this because we want to clear the operation we typed in from user input for them to type
    // next number
    this.currentOperand = ""; //clearing for new input
  }

  compute() {
    let computation; //variable that is result of computation, we use let as it is in scope of block statement
    const prev = parseFloat(this.previousOperand); //prev is the previous with float data type of previous operand so we can perform mathematical operations on it
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return; // this checks if there is no previous number or if there is no current number then we don't compute anything (no numbers to operate)
    switch (
      this.operation //we're using switchcases here because we want to compute/compare this.operation with mnay cases of what operation it can be, inside of the switch
    ) {
      // we define what the operation can be with different cases
      case "+": //the '+' is automatically checked with the this.operation variable
        computation = prev + current;
        break; //we need to break so that it doesn't check the rest of the cases
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "×":
        computation = prev * current;
        break;
      default:
        return; //if none of the operations match, then we don't want any computation
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = ""; // this is almost like resetting everything for next computation
  }

  getDisplayNumber(number) {
    // helper function to add commas/formatting of numbers
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]); // we split the number that we've converted to a string above into integer and decimal parts by turning the number into string array
    // then splitting exactly at the decimal and the [0] gets the first part so the integer values before the decimal
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      //checking when the person doesn't input anything or inputs an integer without decimals
      integerDisplay = ""; //if the integerDigits is not a number then it is a decimal and we just directly output decimal
    } else {
      integerDisplay = integerDigits.toLocaleString("en");  // this was in original code, but based on my belief since we already covered base condition of only allowing one period in line 89
    }
    if (decimalDigits != null) {
      return integerDisplay + "." + decimalDigits;
    } else {
      return integerDisplay;
    }
  }

  //  if (isNaN(floatNumber)) return ''
  //  return floatNumber.toLocaleString('en') // note that just this implementation isn't going to resolve this problem, and that's because when we have decimals it doesn't work because decimal
  // cannot be parsed into a float. so to resolve this we split the number into its integer and decimal pieces

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    ); // with the helper function, we pass it this.currentOperand so that it can apply getDisplayNumber function
    if (this.operation != null) {
      // this checks if there is an operation that the user clicked on, where it will set the previous operand text as the number itself with the operation
      this.previousOperandTextElement.innerText = this.getDisplayNumber(
        this.previousOperand) + " " + this.operation; // tutorial used template literals, I used string concatinating
    } else {
      this.previousOperandTextElement.innerText = ""; // if there was no previous calculation, then the top smaller previous calculation is empty
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]"); // gets all elements that match a certain string
// in this case is a data attribute (type), which is called? inside square brackets, in this case is data-number
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]"); // notice how this we only have querySelector because
// only one equalsButton so only need to grab first one
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
); // WHY IS THIS USER INPUT A STRING? --> anything we get in div/DOM is string?
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
); //this is how to define classes, passing previous and new operands

numberButtons.forEach((button) => {
  //for each loop with fat arrow that basically means: forEach runs through and waits for the button that was clicked then it
  //calls appendNumber function to calculator?
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//^^ I think this is for actually appending all of the button numbers that the user pushed in a string type 

operationButtons.forEach((button) => {
  //for each loop with fat arrow that basically means: forEach runs through and waits for the button that was clicked then it
  //calls appendNumber function to calculator?
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText); //same thing as numberButtons, but we're not appending the number anymore, we're calculating the math operation
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  //the equals button once clicked, will then it will call compute function and update display function
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear(); //this clears the calculator by calling clear function above
  calculator.updateDisplay(); //then this update display calls function which sets the inner text of the constant we set as the cleared texts we had in clear function
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete(); //this clears the calculator by calling clear function above
  calculator.updateDisplay(); //then this update display calls function which sets the inner text of the constant we set as the cleared texts we had in clear function
});

// ^^kind of getting a hang of it, in the calculator class you write all of the functions there, then you call all of them below in the addEventListeners
// which call the functions and updates diplay continuouisly
