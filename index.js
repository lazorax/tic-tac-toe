const gameContainer = document.querySelector(".game-container");
const playerVscompModel = document.getElementById("vsplayerOrvscomp");
let onGame = null;
class Game {
  constructor() {
    this.start = false;
    this.winnerCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.btns = document.querySelectorAll(".btn");
  }

  checkDraw() {
    for (let btn of this.btns) {
      if (btn.innerText === "") return;
    }
    this.showResult("Draw!");
  }

  checkWinner() {
    for (let pattern of this.winnerCondition) {
      let btn1 = this.btns[pattern[0]].innerText;
      let btn2 = this.btns[pattern[1]].innerText;
      let btn3 = this.btns[pattern[2]].innerText;
      if (btn1 === btn2 && btn2 === btn3 && btn1 != "") {
        this.showResult(btn1 + " won");
        return true;
      }
    }
    this.checkDraw();
  }

  resetBoard() {
    this.btns.forEach((btn) => {
      btn.innerText = "";
      btn.disabled = false;
    });
  }

  showResult(message) {
    let resultContainer = document.getElementById("result");
    resultContainer.classList.remove("hide");
    gameContainer.classList.add("blur");
    document.getElementById("resultMessage").innerText = message;
  }

  updateMove(btn, turn) {
    if (btn.innerText === "") {
      btn.innerText = turn;
      btn.disabled = true;
    } else {
      alert("box is not empty");
    }
  }
}

class vsplayer extends Game {
  constructor() {
    super();
    this.player1 = "O";
    this.player2 = "X";
    this.turn = this.player1;
  }

  togglePlayer() {
    this.turn = this.turn === this.player1 ? this.player2 : this.player1;
  }

  addEventsToBtns() {
    this.btns.forEach((btn) => {
      btn.onclick = () => {
        if (!this.start) {
          this.start = true;
          this.updateMove(btn, this.turn);
          this.togglePlayer();
        } else {
          this.updateMove(btn, this.turn);
          this.togglePlayer();
          this.checkWinner();
        }
      };
    });
  }
  startGame() {
    this.addEventsToBtns();
  }
}

function showPlayerVsCompModel() {
  playerVscompModel.classList.remove("hide");
  gameContainer.classList.add("blur");
}
function hidePlayerVsCompModel() {
  playerVscompModel.classList.add("hide");
  gameContainer.classList.remove("blur");
}

document.getElementById("restart").addEventListener("click", () => {
  onGame.resetBoard();
});

document.getElementById("start").addEventListener("click", () => {
  gameContainer.classList.remove("blur");
  document.getElementById("result").classList.add("hide");
  showPlayerVsCompModel();
  onGame.resetBoard();
  onGame = null;
});

document.getElementById("vsPlayer").addEventListener("click", () => {
  console.log("player game staterd");
  hidePlayerVsCompModel();
  onGame = new vsplayer();
  onGame.startGame();
});

class vsComp extends Game {
  constructor() {
    super();
    this.player = "X";
    this.bot = "O";
  }
  board() {
    return Array.from(this.btns).map((btn) => btn.innerText);
  }
  startGame() {
    this.btns.forEach((btn) => {
      btn.onclick = () => {
        if (!this.start) {
          this.start = true;
          console.log("in startgame if block");
          this.updateMove(btn, this.player);
          let boared = this.board();
          console.log(boared);
          this.computeMove(boared);
        } else {
          this.updateMove(btn, this.player);
          console.log("in startgame else block");
          let boared = this.board();
          console.log(boared + " inside startame");
          this.checkWinner();
          this.computeMove(boared);
          this.checkWinner();
        }
      };
    });
  }
  checkIfWon(board) {
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== "")
      return board[0];
    else if (board[3] === board[4] && board[4] === board[5] && board[3] !== "")
      return board[3];
    else if (board[6] === board[7] && board[7] === board[8] && board[6] !== "")
      return board[6];
    else if (board[0] === board[3] && board[3] === board[6] && board[0] !== "")
      return board[0];
    else if (board[1] === board[4] && board[4] === board[7] && board[1] !== "")
      return board[1];
    else if (board[2] === board[5] && board[5] === board[8] && board[2] !== "")
      return board[2];
    else if (board[2] === board[4] && board[4] === board[6] && board[2] !== "")
      return board[2];
    else if (board[0] === board[4] && board[4] === board[8] && board[0] !== "")
      return board[0];
    else return undefined;
  }

  checkIfDraw(board) {
    for (let btn of board) {
      if (btn === "") return false;
    }
    return true;
  }
  computeMove(board) {
    let bestScore = -800;
    let bestMove = 0,
      score = 0;
    for (let key = 0; key < board.length; key++) {
      if (board[key] === "") {
        board[key] = this.bot;
        score = this.minmax(board, 0, false);
        board[key] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = key;
        }
      }
    }
    if (bestMove !== null && bestMove !== undefined) {
  this.updateMove(this.btns[bestMove], this.bot);
}
    return;
  }

  minmax(board, depth, isMaximizing) {
    let winMark = this.checkIfWon(board);
    if (winMark === this.player) return -1;
    else if (winMark === this.bot) return 1;
    else if (this.checkIfDraw(board)) return 0;

    if (isMaximizing) {
      let bestScore = -800;
      let score = null;
      for (let key in board) {
        if (board[key] === "") {
          board[key] = this.bot;
          score = this.minmax(board, depth + 1, false);
          board[key] = "";
          if (score > bestScore) {
            bestScore = score;
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = 800;
      let score = null;
      for (let key in board) {
        if (board[key] === "") {
          board[key] = this.player;
          score = this.minmax(board, depth + 1, true);
          board[key] = "";
          if (score < bestScore) {
            bestScore = score;
          }
        }
      }
      return bestScore;
    }
  }
}

document.getElementById("vsComputer").addEventListener("click", () => {
  console.log("computer game started");
  hidePlayerVsCompModel();
  onGame = new vsComp();
  onGame.startGame();
});
