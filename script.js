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

  // events
  startBtn.onclick = initGame;
  boardElem.addEventListener('click', addMark);
  boardElem.addEventListener('click', () => {
    patterns.forEach(item => checkPattern(currentPlayer.mark, item))
  });
  boardElem.addEventListener('click', changePlayer);

  // functions 
  function initGame() {
    // show board
    boardElem.style.display = 'grid';

    // show restart btn
    restartBtn.style.display = 'inline-block';

    // assign players 
    playerX = Player('Player X', 'X');
    playerO = Player('Player O', 'O');
    
    // assign current player
    currentPlayer = playerX;
  };

  function addMark(event) {
    const square = event.target;
    const pos = square.getAttribute('data-pos');
    const mark = currentPlayer.mark;

    if(board[pos] || square.tagName !== 'DIV') return;

    square.textContent = mark;

    board[pos] = mark;
  }

  function changePlayer() {
    if(currentPlayer.mark === 'X') {
      currentPlayer = playerO;
    } 
    else {
      currentPlayer = playerX;
    }
  }

  const checkPattern = (mark, {pos1, pos2, pos3}) => {
    if(board[pos1] === mark && board[pos2] === mark && board[pos3] === mark) {
      console.log(`${mark} winner`);
    }
  }

})();