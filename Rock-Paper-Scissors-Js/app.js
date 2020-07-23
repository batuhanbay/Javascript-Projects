const startGameBtn = document.getElementById('start-game-button');

const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const DEFAULT_USER_CHOISE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER WINS';

let isGameRunning = false;

const getPlayerChoise = () => {
  const selection = prompt(`${ROCK},${SCISSORS} or ${PAPER} ?`, '').toUpperCase();
  return selection !== ROCK && selection !== SCISSORS && selection !== PAPER ? alert(`Invalid choice ! Default choice is ${DEFAULT_USER_CHOISE} for you !`) : selection;
  /*if(selection !== ROCK && 
     selection !== SCISSORS && 
     selection !== PAPER
    ) {
    alert(`Invalid choice ! Default choice is ${DEFAULT_USER_CHOISE} for you !`);
    return;
  }
  return selection;*/ 
};  

const getComputerChoise = () => {
  const randomValue = Math.random();
  return  randomValue < 0.36 ? ROCK : randomValue < 0.69 ? PAPER : SCISSORS;
  
  /*if(randomValue < 0.36){
    return ROCK
  }else if (randomValue < 0.69) {
    return PAPER; 
  }else {
    return  SCISSORS;
  }*/
};

const getWinner =  (cChoise , pChoise = DEFAULT_USER_CHOISE) => cChoise === pChoise ? RESULT_DRAW : pChoise === PAPER && cChoise === ROCK || 
  pChoise === ROCK && cChoise === SCISSORS ||
  pChoise == SCISSORS && cChoise === PAPER ? RESULT_PLAYER_WINS : RESULT_COMPUTER_WINS;

 /* if(cChoise === pChoise) {
    return RESULT_DRAW;
  } else if 
    (
     pChoise === PAPER && cChoise === ROCK || 
     pChoise === ROCK && cChoise === SCISSORS ||
     pChoise == SCISSORS && cChoise === PAPER
    ){
    return RESULT_PLAYER_WINS;
    }else {
      return RESULT_COMPUTER_WINS;
    }*/


startGameBtn.addEventListener('click', () => {
  if(isGameRunning){
    return;
  }
  isGameRunning = true;
  console.log('Game is starting..!');
  const playerChoise = getPlayerChoise();
  const computerChoise = getComputerChoise();
  console.log(`player choise = ${playerChoise || DEFAULT_USER_CHOISE } , computer choise = ${computerChoise}`);
  let winner;
  if(playerChoise) {
     winner = getWinner( computerChoise,playerChoise);
  }else {
    winner = getWinner(computerChoise);
  }
  console.log(winner);  
  let message = `You picked ${playerChoise || DEFAULT_USER_CHOISE} and computer picked ${computerChoise} therefore you had `;
  if(winner === RESULT_PLAYER_WINS) {
    message += `won!`;
  }else if (winner === RESULT_COMPUTER_WINS) {
    message += `lost!`;
  }else {
    message += `draw!`;
  }
  alert(message);
  isGameRunning = false;

});

//not related to game 
//take argument as a demand from user by using diferrent ways

const sumUp = (...numbers) => {
  const validNumber = (number) => {
    return isNaN(number) ? 0 : number;
  }
  let sum = 0;
  for(const number of numbers) {
    sum += validNumber(number);
  }
  return sum;
};


const substractUp = function() {
  let sum = 0;
  for (const num of arguments) { // dont highly recommended!
    sum -= num;
  }
  return sum;
}

console.log(sumUp(1,2,3,4,5,6));
console.log(substractUp(10,1,2,4));

//theory of callback function

const sumUp2 = (resultHandler,...numbers) => {
  const validNumber = (number) => {
    return isNaN(number) ? 0 : number;
  }
  let sum = 0;
  for(const number of numbers) {
    sum += validNumber(number);
  }
  resultHandler(sum);
};

const showResult = (result) => {
  alert(result);
}

sumUp2(showResult,1,3,5,1);