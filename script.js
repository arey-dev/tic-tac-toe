const Player = (name, mark) => {
  return {
    name,
    mark,
  }
};

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', '',];

  const patterns = [
    {pos1: 0, pos2: 1, pos3: 2}, 
    {pos1: 3, pos2: 4, pos3: 5}, 
    {pos1: 6, pos2: 7, pos3: 8}, 
    {pos1: 0, pos2: 3, pos3: 6}, 
    {pos1: 1, pos2: 4, pos3: 7}, 
    {pos1: 2, pos2: 5, pos3: 8}, 
    {pos1: 0, pos2: 4, pos3: 8}, 
    {pos1: 2, pos2: 4, pos3: 6},
  ];

  return {
    board,
    patterns,
  }
})();

const game = (() => {
  // game objects
  const board = gameBoard.board;
  const patterns = gameBoard.patterns;
  let playerX;
  let playerO;
  let currentPlayer;

  // cache dom
  const boardElem = document.getElementById('game-board');
  const displayElem = document.getElementById('display-container')
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const squares = boardElem.getElementsByClassName('square');

  // events
  startBtn.onclick = startGame;
  restartBtn.onclick = restartGame;
  boardElem.addEventListener('click', addMark);
  // boardElem.addEventListener('click', checkWinner);
  // boardElem.addEventListener('click', changePlayer);

  // functions 
  function startGame() {
    // show board
    boardElem.style.display = 'grid';

    // show restart btn
    restartBtn.style.display = 'inline-block';

    // hide start btn
    startBtn.style.display = 'none';

    // assign players 
    playerX = Player('Player X', 'X');
    playerO = Player('Player O', 'O');
    
    // assign current player
    currentPlayer = playerX;
  };

  function restartGame() {
    const length = board.length;

    // clear board array and div text
    for(let i = 0; i < length; i++) {
      board[i] = '';
      squares[i].textContent = '';
      squares[i].style.color = '';
    }

    currentPlayer = playerX; // reset player

    displayElem.innerHTML = ''; // reset reulst

    boardElem.addEventListener('click', addMark); // restore event listener
  }

  function addMark(event) {
    const square = event.target;
    const pos = square.getAttribute('data-pos');
    const mark = currentPlayer.mark;

    if(square.tagName !== 'DIV') return;

    // return immediately if position
    // in board array is not empty
    if(board[pos]) return; 

    square.textContent = mark;  // display mark on ui

    board[pos] = mark;  // add mark to array
    
    checkWinner(mark);

    changePlayer(); // change player after adding mark
  }

  function changePlayer() {
    if(currentPlayer.mark === 'X') {
      currentPlayer = playerO;
    } 
    else {
      currentPlayer = playerX;
    }
  }

  function checkWinner(mark) {
    let isDraw = true;

    // check every pattern
    patterns.forEach(item => {
      // destructure pattern object
      const {pos1, pos2, pos3} = item;

      if(board[pos1] === mark && board[pos2] === mark && board[pos3] === mark) {
        // prevents from displaying draw if there's a winner,
        // and all squares are taken
        isDraw = false;

        showResults(isDraw);

        highlightSqaures(pos1, pos2, pos3);

        // removes event listener after match
        // after results are displayed
        boardElem.removeEventListener('click', addMark); 
      }
    });

    // display draw if there's no winner,
    // and all squares are taken
    if(board.every(item => item !== '')) {
      showResults(isDraw);
    }
  }

  // helper functions
  function showResults(val) {
    // if falsy argument is given, display 'tie' message;
    displayElem.innerHTML = (val) ? 
      "<p>It's a draw!!!</p>" : `<p>${currentPlayer.name} wins!!!</p>`;
  }

  function highlightSqaures(pos1, pos2, pos3) {
    // highlight the squares that match the pattern
    [squares[pos1], squares[pos2], squares[pos3]].forEach(item => item.style.color = 'indigo');
  }
})();