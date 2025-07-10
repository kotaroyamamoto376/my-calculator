document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.calculator__buttons');

    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let shouldResetDisplay = false;

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        const value = target.value;

        if (!target.matches('.calculator__button')) {
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(value);
                break;
            case '=':
                handleEqual();
                break;
            case 'C':
                resetCalculator();
                break;
            case '.':
                inputDecimal();
                break;
            default:
                inputDigit(value);
                break;
        }
        updateDisplay();
    });

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function inputDigit(digit) {
        if (shouldResetDisplay) {
            currentInput = digit;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
    }
    
    function inputDecimal() {
        if (shouldResetDisplay) {
             currentInput = '0.';
             shouldResetDisplay = false;
             return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && shouldResetDisplay) {
            operator = nextOperator;
            return;
        }

        if (previousInput === null) {
            previousInput = inputValue;
        } else if (operator) {
            const result = calculate();
            currentInput = `${parseFloat(result.toFixed(7))}`;
            previousInput = result;
        }

        operator = nextOperator;
        shouldResetDisplay = true;
    }
    
    function handleEqual() {
        if (operator === null || shouldResetDisplay) return;
        const result = calculate();
        currentInput = `${parseFloat(result.toFixed(7))}`;
        operator = null;
        previousInput = null;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (previousInput === null || operator === null) return parseFloat(currentInput);
        const currentValue = parseFloat(currentInput);
        let result = 0;
        switch (operator) {
            case '+':
                result = previousInput + currentValue;
                break;
            case '-':
                result = previousInput - currentValue;
                break;
            case '*':
                result = previousInput * currentValue;
                break;
            case '/':
                result = previousInput / currentValue;
                break;
            default:
                return currentValue;
        }
        return result;
    }

    function resetCalculator() {
        currentInput = '0';
        operator = null;
        previousInput = null;
        shouldResetDisplay = false;
    }
});