//Declaration of class
class Calculator{
  constructor(operandTextElement, resultTextElement){
    this.operandTextElement = operandTextElement//parameter_x
    this.resultTextElement = resultTextElement//parameter_y
    this.clear()
  }
//Define method in class
  clear(){
    this.operand = ""
    this.result = ""
    this.operation = undefined
  }
  appendNumber(number){
    if (number === "." && this.operand.includes(".")) return
      this.operand = this.operand.toString() + number.toString()
      if (this.result !==""){
        this.result = this.result.toString() + this.operand.toString()
      }
  }
  chooseOperation(operation) {
    if (operation === "-"){
      this.operand = operation
    } else if (this.operand === "" && this.operation === "-"){
      this.operation  = operation
      this.result = this.operand.toString() + this.operation
      this.operand = ""
    } else if (this.operand === "") {return
    } else if (this.result !== "") {
      this.compute()
    } else {
    this.operation  = operation
    this.result = this.operand.toString() + this.operation
    this.operand = ""
    }
  }
  compute(){
    let computation
    const previous = parseFloat(this.result)
    const current = parseFloat(this.operand)
    if (isNaN(previous) || isNaN(current)) return
    //Choose  the way of calculating
    switch (this.operation){
      case "+":
        computation = previous + current
        break
      case "-":
        computation = previous - current
        break        
      case "*":
        computation = previous * current
        break    
      case "/":
        computation = previous / current
        break      
      default:
      return
    }
    this.operand = computation
    this.operation = undefined
    this.result = ""
  }
  
  updateDisplay(){
    if (this.operand === "." && this.operandTextElement.innerText === ""){
      this.clear()
    } else if (this.operand === "00" && this.operandTextElement.innerText === ""){
      this.operand = "0"
      this.operandTextElement.innerText = this.operand
    } else if (this.operand === "" && this.operation === "-"){
      this.operandTextElement.innerText = this.result
    } else if (this.result ==="") {
      this.operandTextElement.innerText = this.operand
    } else
    this.operandTextElement.innerText = this.result
  }
}

//Define variable
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
const allClearButton = document.querySelector("[data-all-clear]")
const operandTextElement = document.querySelector("[data-operand]")
const resultTextElement = document.querySelector("[data-result]")

//Create object from class
const calculator = new Calculator(operandTextElement, resultTextElement)

//Operation of each numberButtons clicked
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
equalButton.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
  calculator.clear()
})
allClearButton.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})