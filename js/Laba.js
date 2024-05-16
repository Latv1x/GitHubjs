document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentOperand = '';
    let previousOperand = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value === null) return;

            switch (value) {
                case 'C':
                    clear();
                    break;
                case '=':
                    compute();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    chooseOperation(value);
                    break;
                default:
                    appendNumber(value);
                    break;
            }
            updateDisplay();
        });
    });

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = null;
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
    }

    function chooseOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = null;
        previousOperand = '';
    }

    function updateDisplay() {
        display.innerText = currentOperand;
    }

    clear();
});
