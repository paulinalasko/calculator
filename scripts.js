class Calculator {
    constructor(previousNumberText, currentNumberText) {
        this.previousNumberText = previousNumberText;
        this.currentNumberText = currentNumberText;
        this.clear();
    }

    clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operator = undefined;
    }

    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    chooseOperation(operator) {
        if (this.currentNumber === '') return
        if (this.previousNumber !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    }

    compute() {
        let sum;
        const previous = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);
        if (isNaN(previous) || isNaN(current)) return
        
        switch (this.operator) {
            case '+':
                sum = previous + current;
                break;
            case '-':
                sum = previous - current;
                break;
            case 'x':
                sum = previous * current;
                break;
            case '÷':
                sum = previous / current;
                break;
            default:
                return
        }
        this.currentNumber = sum.toFixed(2);
        this.operator = undefined;
        this.previousNumber = '';
    }

    negativeNumber() {
        this.currentNumber = this.currentNumber * -1;
    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    updateDisplay() {
        this.currentNumberText.innerText = this.currentNumber;
        this.previousNumberText.innerText = this.previousNumber;
        if (this.operator != null) {
            this.previousNumberText.innerText = `${this.previousNumber} ${this.operator}`;
        }
    }
}

const operatorButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousNumberText = document.querySelector('[data-previous-number]');
const currentNumberText = document.querySelector('[data-current-number]');
const negativeButton = document.querySelector('[data-negative-number]');

const calculator = new Calculator(previousNumberText, currentNumberText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
    
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

negativeButton.addEventListener('click', () => {
    calculator.negativeNumber();
    calculator.updateDisplay();
});



