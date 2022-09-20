// create gameboard module
const Game = (() => {
  const gameBoard = ['', '', '', '', '', '', '', '', '',];

  const Player = (mark) => {
    const getMark = () => mark;
  
    return {
      getMark
    }
  };

  // add players 
  const player1= Player('X');
  const player2 = Player('O');

  let currentPlayer = player1; 

  // dom elements
  const gameBoardElem = document.querySelector('#game-board');

  // events
  gameBoardElem.addEventListener('click', addMark);

  // functions
  function addMark(event) {
    const square = event.target;
    const pos = square.getAttribute('data-pos');
    const mark = currentPlayer.getMark();

    if(gameBoard[pos] || square.tagName !== 'DIV') return;

    square.textContent = mark;

    gameBoard[pos] = mark;


    changePlayer();
    checkWinner(mark);
  }

  function changePlayer() {
    if(currentPlayer.getMark() === 'X') {
      currentPlayer = player2;
    } 
    else {
      currentPlayer = player1;
    }
  }

  function checkWinner(mark) {
    // horizontal pattern
    if(gameBoard[0] === mark && gameBoard[1] === mark && gameBoard[2] === mark) {
      console.log(`${mark} winner`);
      return;
    }

    if(gameBoard[3] === mark && gameBoard[4] === mark && gameBoard[5] === mark) {
      console.log(`${mark} winner`);
      return;
    } 

    if(gameBoard[6] === mark && gameBoard[7] === mark && gameBoard[8] === mark) {
      console.log(`${mark} winner`);
      return;
    } 

    // vertical pattern
    if(gameBoard[0] === mark && gameBoard[3] === mark && gameBoard[6] === mark) {
      console.log(`${mark} winner`);
      return;
    }

    if(gameBoard[1] === mark && gameBoard[4] === mark && gameBoard[7] === mark) {
      console.log(`${mark} winner`);
      return;
    } 

    if(gameBoard[2] === mark && gameBoard[5] === mark && gameBoard[8] === mark) {
      console.log(`${mark} winner`);
      return;
    } 

    // cross pattern
    if(gameBoard[0] === mark && gameBoard[4] === mark && gameBoard[8] === mark) {
      console.log(`${mark} winner`);
      return;
    }    

    if(gameBoard[2] === mark && gameBoard[4] === mark && gameBoard[6] === mark) {
      console.log(`${mark} winner`);
      return;
    }
    
    // draw
    if(gameBoard.every(val => val != '')) {
      console.log("It's a draw");
      return;
    }
  }

  return {
    currentPlayer,
    gameBoard
  };
})();
