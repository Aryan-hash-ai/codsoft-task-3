let display = document.getElementById('display');
        let buttons = document.querySelectorAll('button');

        let calculator = {
            displayValue: '0',
            firstOperand: null,
            operator: null,
            waitingForSecondOperand: false,

            handleButtonPress: function(button) {
                let buttonValue = button.id;

                if (buttonValue === 'clear') {
                    this.resetCalculator();
                } else if (buttonValue === 'backspace') {
                    this.displayValue = this.displayValue.slice(0, -1) || '0';
                } else if (buttonValue === 'divide' || buttonValue === 'multiply' || buttonValue === 'subtract' || buttonValue === 'add') {
                    this.handleOperator(buttonValue);
                } else if (buttonValue === 'equals') {
                    this.handleEquals();
                } else if (buttonValue === 'decimal') {
                    this.inputDecimal();
                } else {
                    this.inputDigit(buttonValue);
                }

                display.value = this.displayValue;
            },

            resetCalculator: function() {
                this.displayValue = '0';
                this.firstOperand = null;
                this.operator = null;
                this.waitingForSecondOperand = false;
            },

            handleOperator: function(nextOperator) {
                const inputValue = parseFloat(this.displayValue);

                if (this.operator && this.waitingForSecondOperand) {
                    this.operator = nextOperator;
                    return;
                }

                if (this.firstOperand === null) {
                    this.firstOperand = inputValue;
                } else if (this.operator) {
                    const result = this.calculate(this.firstOperand, inputValue, this.operator);
                    this.displayValue = String(result);
                    this.firstOperand = result;
                }

                this.waitingForSecondOperand = true;
                this.operator = nextOperator;
                this.displayValue = '0';
            },

            handleEquals: function() {
                if (!this.operator || this.waitingForSecondOperand) return;

                const inputValue = parseFloat(this.displayValue);
                const result = this.calculate(this.firstOperand, inputValue, this.operator);

                this.displayValue = String(result);
                this.firstOperand = null;
                this.operator = null;
                this.waitingForSecondOperand = false;
            },

            inputDigit: function(digit) {
                if (this.waitingForSecondOperand) {
                    this.displayValue = digit;
                    this.waitingForSecondOperand = false;
                } else {
                    this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
                }
            },

            inputDecimal: function() {
                if (!this.displayValue.includes('.')) {
                    this.displayValue += '.';
                }
            },

            calculate: function(firstOperand, secondOperand, operator) {
                switch (operator) {
                    case 'add':
                        return firstOperand + secondOperand;
                    case 'subtract':
                        return firstOperand - secondOperand;
                    case 'multiply':
                        return firstOperand * secondOperand;
                    case 'divide':
                        return firstOperand / secondOperand;
                    default:
                        return secondOperand;
                }
            }
        };

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                calculator.handleButtonPress(event.target);
            });
        });