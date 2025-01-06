const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example:
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  if (delay === "easy") {
    return 1500;
  } else if (delay === "normal") {
    return 1000;
  } else if (delay === "hard") {
    return randomInteger(600, 1200);
  }
}

function chooseHole(holes) {
  let index = 0;
  index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 *
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 *
 * The purpose of this function is simply to determine if the game should
 * continue or stop. The game continues if there is still time `if(time > 0)`.
 * If there is still time then `showUp()` needs to be called again so that
 * it sets a different delay and a different hole. If there is no more time
 * then it should call the `stopGame()` function. The function also needs to
 * return the timeoutId if the game continues or the string "game stopped"
 * if the game is over.
 *
 *  // if time > 0:
 *  //   timeoutId = showUp()
 *  //   return timeoutId
 *  // else
 *  //   gameStopped = stopGame()
 *  //   return gameStopped
 *
 */
function gameOver() {
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId;
  } else {
    gameStopped = stopGame();
    return gameStopped;
  }
}

function showUp() {
  let delay = setDelay();
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * The purpose of this function is to show and hide the mole given
 * a delay time and the hole where the mole is hidden. The function calls
 * `toggleVisibility` to show or hide the mole. The function should return
 * the timeoutID
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, 0);
  setTimeout.delay = delay;
  return timeoutID;
}

/**
 * Adds or removes the 'show' class that is defined in styles.css to
 * a given hole. It returns the hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle("show");
  return hole;
}

function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

function whack(event) {
  updateScore();
  return points;
}

/**
 *
 * Adds the 'click' event listeners to the moles. See the instructions
 * for an example on how to set event listeners using a for loop.
 */
function setEventListeners() {
  moles.forEach((mole) => {
    mole.addEventListener("click", whack);
  });
  return moles;
}

function setDuration(duration) {
  time = duration;
  return time;
}

function stopGame() {
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
* This function starts the game when the `startButton` is clicked and initializes the game by performing the following steps: 

 * 1. Clears the score using `clearScore()`. 

 * 2. Sets the game duration using `setDuration()`. 

 * 3. Sets up event listeners on the moles using `setEventListeners()`.

 * 4. Starts the game timer by calling `startTimer()`.  

 * 5. Begins the game loop by calling `showUp()` to display moles. 


 * Note: Simply uncommenting `setDuration(10);` and `showUp();` is not enough. To make the game work, ensure all necessary functions listed above are called to initialize the score, timer, event listeners, and mole appearances. 
*/
function startGame() {
  clearScore();
  stopGame();
  setDuration();
  setEventListeners();
  startTimer(timerDisplay);
  showUp();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
