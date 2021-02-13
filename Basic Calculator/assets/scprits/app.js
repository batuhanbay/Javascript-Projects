const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//Gets input which  user entered
function getUserNumberInput() {
    return parseInt(usrInput.value);
}

//Gets result of calculation and description.
function createAndWriteOutput( operator , initialResult , enteredNumber) {
  const descriptionCalc = `${initialResult} ${operator} ${enteredNumber}`;
  outputResult(currentResult , descriptionCalc);
}

function writeToLog (operationIdentifier,prevResult,enteredNumber,currentResult) {
 const logEntry = {
   operation:operationIdentifier,
   prevResult:prevResult,
   number:enteredNumber,
   result:currentResult
 };
 logEntries.push(logEntry);
 console.log(logEntries);
}

function calculationResult (calculationtType) {

  const enteredNumber = getUserNumberInput();
  if (
    calculationtType != 'ADD' &&
    calculationtType != 'SUBSTRACT' &&
    calculationtType != 'MULTIPLY' &&
    calculationtType != 'DIVIDE' ||
    !enteredNumber 
     ) {
       return;
     }
  const initialResult = currentResult;
  let mathOperator;
  if(calculationtType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationtType === 'SUBSTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  }  else if (calculationtType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else {
    currentResult /= enteredNumber;
    mathOperator = '/'
  }
 
  createAndWriteOutput (mathOperator, initialResult , enteredNumber);
  writeToLog(calculationtType,initialResult,enteredNumber,currentResult);
}

function add() {
  calculationResult('ADD');
}

function substract() {
  calculationResult('SUBSTRACT');

}
function multiply() {
  calculationResult('MULTIPLY');

}
function divide() {
  calculationResult('DIVIDE');
}

addBtn.addEventListener('click' , add);  
substractBtn.addEventListener('click', substract);
multiplyBtn.addEventListener('click' , multiply);
divideBtn.addEventListener('click' , divide);

