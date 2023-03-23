/*
BEGIN

  set boardContent
  set row
  set column

  FUNCTION startGame
    FOR r = 0; r<row; r++ 
      set boardContent[r] = [];
      FOR c = 0 ; c < column; c++
      create new tile div
      set tile id as 2D array index


  FUNCTION setrandomNumber
    random number, if < 0.5 display new tile with 2 
    if > 0.5 new tile with 4


  FUNCTION checkValue
    clear class 
    set class to tile value 

  FUNCTION merge
    remove zeroes from array [i]
    IF array[i][i] === array[i][i+1]
      array content *= 2
      array[i+1] = 0
    return zeroes to array[]

    FUNCTION for Movement
    Let rowValue be the direction you want to move then reverse it for opossite direction
    merge(rowValue)
    Check for winner after every move


END
*/

let boardContent = [];
let row = 4;
let column = 4;
let score = 0;
let counter = 0;
let gameBoard = document.getElementById('gameBoard');
let details = document.getElementById('details');
let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let win = document.querySelector('.win');
let lose = document.querySelector('.lose');
let nav = document.getElementById('nav');
let menu = document.querySelector('.menu');
let menuInstBtn = document.querySelector('.menuInstBtn');
let game = document.querySelector('.game');

let PlayGame = document.createElement('button');
PlayGame.innerHTML = 'Play Game';
PlayGame.classList.add('PlayGame');
document.querySelector('.menu').appendChild(PlayGame);
PlayGame.addEventListener('click', () => {
  game.classList.remove('hidden');
  menu.classList.add('hidden');
  resetGame();
});

let ResetGame = document.createElement('button');
ResetGame.innerHTML = 'Reset Game';
document.getElementById('nav').appendChild(ResetGame);

ResetGame.addEventListener('click', () => {
  resetGame();
});

let inst = document.createElement('button');
inst.innerHTML = 'Instructions';
document.getElementById('nav').appendChild(inst);
inst.addEventListener('click', () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

let ExitGame = document.createElement('button');
ExitGame.innerHTML = 'Exit Game';
document.getElementById('nav').appendChild(ExitGame);

ExitGame.addEventListener('click', () => {
  game.classList.add('hidden');
  menu.classList.remove('hidden');
});

let closeLose = document.querySelector('.closeLose');
closeLose.addEventListener('click', () => {
  lose.classList.add('hidden');
  overlay.classList.add('hidden');
  window.location.reload();
});

let closeWin = document.querySelector('.closeWin');
closeWin.addEventListener('click', () => {
  win.classList.add('hidden');
  overlay.classList.add('hidden');
});

let closeModalBtn = document.querySelector('.closeModalBtn');
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

function startGame() {
  // Create board of the game
  for (let r = 0; r < row; r++) {
    boardContent[r] = [];
    for (let c = 0; c < column; c++) {
      boardContent[r].push('0');
      let tile = document.createElement('div');
      tile.id = 'tile' + r + c;
      tileValue = boardContent[r][c];
      changeValue(tile, tileValue);
      document.getElementById('gameBoard').appendChild(tile);
    }
  }
  // Set 2 random number at the start
  setRandomNumber();
  setRandomNumber();
}

function resetGame() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++) {
      boardContent[r][c] = 0;
      let tile = document.getElementById('tile' + c + r);
      tileValue = boardContent[r][c];
      changeValue(tile, tileValue);
    }
  }
  setRandomNumber();
  setRandomNumber();
}

//Function to check individual tile values
function checkValues() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++) {
      let tile = document.getElementById('tile' + c + r);
      let tileValue = boardContent[c][r];
      changeValue(tile, tileValue);
    }
  }
}
//Function to edit values of tiles
function changeValue(tile, tileValue) {
  tile.innerHTML = '';
  tile.classList = '';
  tile.classList = 'tile' + ' ' + 'c' + tileValue;
  if (tileValue > 0) {
    tile.innerHTML = tileValue;
  }
}

// Function to locate empty tiles and set value to 2
function setRandomNumber() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++)
      if (tileValue == 0) {
        continue;
      }
  }
  let rowRandom = Math.floor(Math.random() * row);
  let colRandom = Math.floor(Math.random() * column);
  if (boardContent[rowRandom][colRandom] == 0) {
    counter = 0;
    let odds = Math.random();
    if (odds < 0.5) {
      boardContent[rowRandom][colRandom] = 2;
    } else {
      boardContent[rowRandom][colRandom] = 4;
    }
    let tile = document.getElementById('tile' + rowRandom + colRandom);
    tile.innerHTML = boardContent[rowRandom][colRandom];
    tile.classList = 'tile' + ' ' + 'c2';
    tileValue = boardContent[rowRandom][colRandom];
    changeValue(tile, tileValue);
  } else {
    counter += 1;
    if (counter < 500) {
      setRandomNumber();
    } else {
      delay(youLose);
    }
  }
}

// function to delay appearance of new number
function delay(x) {
  setTimeout(x, 400);
}

document.addEventListener('keyup', (e) => {
  if (e.code == 'ArrowLeft') {
    moveLeft();
    delay(setRandomNumber);
  } else if (e.code == 'ArrowRight') {
    moveRight();
    delay(setRandomNumber);
  } else if (e.code == 'ArrowDown') {
    moveDown();
    delay(setRandomNumber);
  } else if (e.code == 'ArrowUp') {
    moveUp();
    delay(setRandomNumber);
  }
  checkValues();
  document.getElementById('score').innerHTML = score;
  checkWinner();
});

// function to remove zeroes then merge numbers
function merge(rowValue) {
  rowFiltered = rowValue.filter((num) => num != 0);
  for (let i = 0; i < rowFiltered.length; i++) {
    if (rowFiltered[i] == rowFiltered[i + 1]) {
      rowFiltered[i] *= 2;
      rowFiltered[i + 1] = 0;
      score += rowFiltered[i];
    }
  }
  rowNew = rowFiltered.filter((num) => num != 0);
  while (rowNew.length < 4) {
    rowNew.push('0');
  }
  return rowNew;
}

function moveLeft() {
  for (let r = 0; r < 4; r++) {
    let rowValue = boardContent[r];
    rowValue = merge(rowValue);
    boardContent[r] = rowValue;
  }
}

function moveRight() {
  for (let r = 0; r < 4; r++) {
    let rowValue = boardContent[r].reverse();
    rowValue = merge(rowValue);
    boardContent[r] = rowValue.reverse();
  }
}

function moveUp() {
  for (let i = 0; i < 4; i++) {
    let rowValue = [];
    for (let c = 0; c < 4; c++) {
      rowValue.push(boardContent[c][i]);
    }
    rowValue = merge(rowValue);
    for (let r = 0; r < 4; r++) {
      boardContent[r][i] = rowValue[r];
    }
  }
}

function moveDown() {
  for (let i = 0; i < 4; i++) {
    let rowValue = [];
    for (let c = 0; c < 4; c++) {
      rowValue.push(boardContent[c][i]);
    }
    rowValue.reverse();
    rowValue = merge(rowValue);
    rowValue.reverse();
    for (let r = 0; r < 4; r++) {
      boardContent[r][i] = rowValue[r];
    }
  }
}

// Check All tiles for winner
function checkWinner() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++) {
      if (boardContent[r][c] == 2048) {
        win.classList.remove('hidden');
        overlay.classList.remove('hidden');
      }
    }
  }
}

// Check if all tiles are full then display lose
function youLose() {
  lose.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

document.addEventListener('touchstart', (e) => {
  touchstartX = e.changedTouches[0].screenX;
  touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchendX = e.changedTouches[0].screenX;
  touchendY = e.changedTouches[0].screenY;
  checkDirection();
});

function checkDirection() {
  let diffX = Math.abs(touchstartX - touchendX);
  let diffY = Math.abs(touchstartY - touchendY);
  if (diffX > diffY) {
    if (touchendX < touchstartX) {
      moveLeft();
      delay(setRandomNumber);
    } else if (touchendX > touchstartX) {
      moveRight();
      delay(setRandomNumber);
    }
  } else if (diffX < diffY) {
    if (touchendY < touchstartY) {
      moveUp();
      delay(setRandomNumber);
    } else if (touchendY > touchstartY) {
      moveDown();
      delay(setRandomNumber);
    }
  } else {
    return;
  }
  checkValues();
  document.getElementById('score').innerHTML = score;
  checkWinner();
}

startGame();
