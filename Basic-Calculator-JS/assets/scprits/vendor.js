  const usrInput = document.getElementById('input-number');
  const addBtn = document.getElementById('btn-add');
  const substractBtn = document.getElementById('btn-substract');
  const multiplyBtn = document.getElementById('btn-multiply');
  const divideBtn = document.getElementById('btn-divide');

  const currentResultOutput = document.getElementById('current-result');
  const currentCalculationOutput = document.getElementById('current-calcuation');

  function outputResult (result , text) {
    currentResultOutput.textContent = result;
    currentCalculationOutput.textContent = text;
  }

  
 