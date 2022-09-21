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
    }

    currentPlayer = playerX;
  }

  function addMark(event) {
    const square = event.target;
    const pos = square.getAttribute('data-pos');
    const mark = currentPlayer.mark;

    if(board[pos] || square.tagName !== 'DIV') return;

    square.textContent = mark;
    board[pos] = mark;
    
    changePlayer();
    checkWinner(mark);
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
    patterns.forEach(item => {
      const {pos1, pos2, pos3} = item;
      if(board[pos1] === mark && board[pos2] === mark && board[pos3] === mark) {
      console.log(`${mark} winner`);
    }
    });
  }

  function displayWinner() {
    
  }

  // const checkPattern = (mark, {pos1, pos2, pos3}) => {
  //   if(board[pos1] === mark && board[pos2] === mark && board[pos3] === mark) {
  //     console.log(`${mark} winner`);
  //   }
  // }

  return {
    board,
    squares,
  }
})();