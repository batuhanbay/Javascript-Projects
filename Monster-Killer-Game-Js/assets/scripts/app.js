const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 12;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'MODE_STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_EVENT_STRONG_PLAYER_ATTACK = 'STRONG PLAYER ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_EVENT_GAME_OVER = 'GAME OVER';
const LOG_EVENT_PLAYER_BONUS_LIFE = 'BONUS LIFE';


const enteredHeealth = prompt('Maximum health for monster and player?','100');

let battleLog = [];
let chosenMaxLife = parseInt(enteredHeealth);


if(isNaN(chosenMaxLife) || chosenMaxLife <= 0){
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value , monsterHealth , playerHealth ) {
  let logEntry = {
    event : event ,
    value : value ,
    finalMonsterHealth : monsterHealth,
    finalPlayerHealth : playerHealth
  };
  if(event === LOG_EVENT_PLAYER_ATTACK) {   
    logEntry.target = 'MONSTER';
  }else if(event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = 'PLAYER';
  }else if(event === LOG_EVENT_STRONG_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER';
  }else if(event === LOG_EVENT_PLAYER_HEAL){
    logEntry.target = 'PLAYER';
  }
  battleLog.push(logEntry);
}
function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}
function endRound() {
  const previousPlayerHealth = currentPlayerHealth;//previousPlayerHealth is health of the player before died
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);  
  currentPlayerHealth -= playerDamage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);
  if(currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = previousPlayerHealth;
    setPlayerHealth(previousPlayerHealth);
    writeToLog(LOG_EVENT_PLAYER_BONUS_LIFE,previousPlayerHealth,currentMonsterHealth,currentPlayerHealth);
    alert("You would be dead but bonus life is saved you!");
  }
  if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
    alert('You won!');
    writeToLog(LOG_EVENT_GAME_OVER,'PLAYER WON', currentMonsterHealth,currentPlayerHealth);
  }else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0){
    alert('You lost!');
    writeToLog(LOG_EVENT_GAME_OVER,'MONSTER WON', currentMonsterHealth,currentPlayerHealth);
  }
  else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have draw!');
    writeToLog(LOG_EVENT_GAME_OVER,'DRAW', currentMonsterHealth,currentPlayerHealth);
  }
  if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
    writeToLog(LOG_EVENT_GAME_OVER,'RESET',currentMonsterHealth,currentPlayerHealth);
  }
}


function attackMonster(mode) {
  const chosenTypeAttackValue = mode === MODE_ATTACK ?  ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_STRONG_PLAYER_ATTACK;
  const monsterDamage = dealMonsterDamage(chosenTypeAttackValue);
  currentMonsterHealth -= monsterDamage;
  writeToLog(logEvent,monsterDamage,currentMonsterHealth,currentPlayerHealth);
  endRound();
}

function attackHandler() {
 attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
 attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can not heal to more than your initial health");
    healValue = chosenMaxLife - currentPlayerHealth;
  }else{
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHealth);
  endRound();
}

function logEventHandler() {
  let k=0;
  for(const logEntry of battleLog) {
    console.log(`#${k}`);
    for(const property in logEntry){
      console.log(`${property} => ${logEntry[property]}`);
    }
    k++;
  }
  
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click' , logEventHandler);
