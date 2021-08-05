const canvasEL = document.querySelector("canvas");
const conX = canvasEL.getContext("2d");

canvasEL.height = 400;
canvasEL.width = 400;

// Game Parameters
let speed = 7;
let tileCount = 20;
let snakeHeadX = 10;
let snakeHeadY = 10;
let xV = 0;
let yV = 0;
let snackY = 5;
let snackX = 5;
let snakeTailLength = 2;
let score = 0;

// Derived Dimension
let tileSize = canvasEL.width / tileCount;

//snakeBody
const snakeBody = [];

// Arrow keys event listener
document.addEventListener("keydown", keyDown);

const eatSnack = new Audio("eat.wav");

// _
function playGame() {
  changeSnakePosition();

  // handling gameOver
  let result = gameOver();
  if (result) {
    return;
  }

  clearScreen();
  snackColiDete();
  drawSnack();
  drawSnake();
  drawScore();

  setTimeout(playGame, 1000 / speed);
}
//
function gameOver() {
  let gameOver = false;

  if (xV === 0 && yV === 0) return false;

  // check for wall collision почему нельзя было через ||

  if (
    snakeHeadX < 0 ||
    snakeHeadX === tileCount ||
    snakeHeadY < 0 ||
    snakeHeadY === tileCount
  ) {
    gameOver = true;
  }

  //che
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === snakeHeadX && part.y === snakeHeadY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    conX.fillStyle = "white";
    conX.font = "50px sans-serif";
    conX.fillText("GAME OVER", canvasEL.width / 8, canvasEL.height / 2);
  }
  return gameOver;
}
//

function drawScore() {
  conX.fillStyle = "white";
  conX.font = "15px sans-serif";
  conX.fillText(`Score: ${score}`, 20, 20);
}
// clear screen
function clearScreen() {
  conX.fillStyle = "black";
  conX.fillRect(0, 0, canvasEL.width, canvasEL.height);
}

// draw Snake
function drawSnake() {
  conX.fillStyle = "orange";
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    conX.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeBody.push(new SnakeBody(snakeHeadX, snakeHeadY));
  if (snakeBody.length > snakeTailLength) {
    snakeBody.shift();
  }

  conX.fillStyle = "green";
  conX.fillRect(
    snakeHeadX * tileCount,
    snakeHeadY * tileCount,
    tileSize,
    tileSize
  );
}

//
function changeSnakePosition() {
  snakeHeadX = snakeHeadX + xV;
  snakeHeadY = snakeHeadY + yV;
}

//
function drawSnack() {
  conX.fillStyle = "red";
  conX.fillRect(snackX * tileCount, snackY * tileCount, tileSize, tileSize);
}

//

function snackColiDete() {
  if (snackX === snakeHeadX && snackY === snakeHeadY) {
    snackX = Math.floor(Math.random() * tileCount);
    snackY = Math.floor(Math.random() * tileCount);
    eatSnack.play();
    snakeTailLength++;
    score++;
    speed++;
  }
}

// key
function keyDown(e) {
  //
  if (e.keyCode === 38) {
    if (yV === 1) return;
    yV = -1;
    xV = 0;
  }

  //
  if (e.keyCode === 40) {
    if (yV === -1) return;
    yV = 1;
    xV = 0;
  }

  //
  if (e.keyCode === 37) {
    if (xV === 1) return;
    xV = -1;
    yV = 0;
  }
  //
  if (e.keyCode === 39) {
    if (xV === -1) return;
    xV = 1;
    yV = 0;
  }
}

//
class SnakeBody {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

playGame();
