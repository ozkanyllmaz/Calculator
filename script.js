const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = '0';
let firstValue = null;
let waitingForSecondValue = false;
let operator = null;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click', function(e){
    const element = e.target;

    if(!element.matches('button')) return;
    
    if(element.classList.contains('operator')){
        handleOperator(element.value);
        updateDisplay();
        return;
        //console.log("operator Button: ",element.value);
    
    }
    else if(element.classList.contains('decimal')){
        //console.log("decimal Button: ",element.value);
        inputDecimal();
        updateDisplay();
        return;
    }
    else if(element.classList.contains('clear')){
        //console.log("clear Button: ",element.value);
        clearNumber();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();

    function handleOperator(nextOperator){
        const value = parseFloat(displayValue);

        if(firstValue === null){
            firstValue = value;
        }else if(operator){
            const result = calculate(firstValue, value, operator);
            displayValue = String(result);
            firstValue = result;
        }

        waitingForSecondValue = true;

        operator = nextOperator;

        console.log(displayValue, firstValue, operator, waitingForSecondValue);
          

    }

    function inputNumber (num){
        if(waitingForSecondValue){
            displayValue = num;
            waitingForSecondValue = false;
        }else{
            displayValue = displayValue === '0'? num: displayValue + num;
        }
        console.log(displayValue, firstValue, operator, waitingForSecondValue);
    }

    function inputDecimal (){
        if(!displayValue.includes('.')){
            displayValue += '.';
        }
    }

    function clearNumber(){
        displayValue = '0';
    }

    function calculate(firstValue, value, operator) {
        if(operator === '+'){
            return firstValue + value;
        }else if(operator === '-'){
            return firstValue - value;
        }else if(operator === '/'){
            return firstValue / value;
        }else if (operator === '*'){
            return firstValue * value;
        }else{
            return value;
        }
    }

    

    
});