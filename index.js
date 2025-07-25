/*
let btns = document.querySelectorAll(".btn");//array of btns
let turn = "x";//whose turn?
let start = false;//
let compTurn="o";
let winningPattern = [[0, 1, 2],
                      [3, 4, 5], 
                      [6, 7, 8], 
                      [0, 4, 8],
                      [2, 4, 6],
                      [0, 3, 6],
                      [1, 4, 7],
                      [2, 5, 8]
                    ];
function gameStart(btn) {
  console.log("turn : " + turn);
  start = true;
  btn.innerText = turn;
  btn.disabled=true;
  // send the btn to vs player or vs computer 
}

//min max here
function vsComputer(){

}
function playgame(btn) {
  if (turn === "x") {
    turn = "o";
  } else {
    turn = "x";
  }
  btn.innerText = turn;
  btn.disabled=true;
  checkWinner();
}

function checkWinner(){
    for(pattern of winningPattern){
      //  console.log(pattern[0],pattern[1],pattern[2]);
         
        // console.log(btns[pattern[0]],btns[pattern[1]],btns[pattern[2]]);
        let btn1 = btns[pattern[0]].innerText;
        let btn2 = btns[pattern[1]].innerText;
        let btn3 = btns[pattern[2]].innerText;
            if(btn1!="" && btn1===btn2 && btn2===btn3){
              // console.log(turn +" is winner");
              winner(turn);
              start = false;
            }
      }

}
function winner(winner){
  document.querySelector("#result").classList.toggle("hide");
  document.querySelector("#result h1").innerText=`"${winner}" is winner!`;
 
}
 document.querySelector("#restart").addEventListener("click",resetBoard);
 document.querySelector("#start").addEventListener("click",()=>{
  document.querySelector("#result").classList.toggle("hide");
  resetBoard();
});

function resetBoard(){
  btns.forEach((btn)=>{
    btn.disabled=false;
    btn.innerText="";
    turn="x";
    
  })
 }
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!start) {
      gameStart(btn);
      console.log("start game called ");
    } else {
      playgame(btn);
      // console.log("play game called ");
    }
  });
});
*/

////////////////////////////////////////////////////////////////////////////////////////
/*
*user chooses vsp or vscomp
*class of either one has made

*game
*vsplayer [ inherits game]
*vscomp [ inherits game]

*game - var: winner condition, btns
        functions: check winner, draw, reset, start, btn-textupdate and disable

*vsplayer - vars: [palyer1 = x , player2 = o] 
            functions: 

*vscomp - vars: [palyer1 = x , computer = o] 
          functions: ispositionfree, compmove, minimax
  */    
////////////////////////////////////////////////////////////////////////////////////////

class  Game{
constructor(){
    this.winnerCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  this.btns = document.querySelectorAll(".btn")
}
checkDraw(){
  // //check all btns are filled
  // let emptyBtnTrack= false
  // this.btns.forEach(btn=>{
     
  //   if(btn.innerText===""){
  //    emptyBtnTrack = true
  //   }
  // })
  // if(emptyBtnTrack){
  //   return
  // }
  // else
  // alert("draw")
  // ..since in foreach using return only returns from loop not the function so alert is calledd again and again better to use for of loop 
  for(let btn of this.btns){
   if(btn.innerText==="") return
  }
  alert("draw")
}

  checkWinner(){
    for(let pattern of this.winnerCondition){
      console.log(pattern)
      // make 3 variables who will have inner text of the btns in this pattern
      let btn1 = this.btns[pattern[0]].innerText
      let btn2 = this.btns[pattern[1]].innerText
      let btn3 = this.btns[pattern[2]].innerText
      console.log(btn1,btn2,btn3);
      
      if(btn1 === btn2 && btn2 === btn3 && btn1!=""){
        alert(btn1+ " won")
        this.resetBoard()
        return 
      }

    }
    //if no one won check if draw
    this.checkDraw()
  }
  resetBoard(){

      this.btns.forEach(btn => {
      btn.innerText=""
      btn.disabled=false
  
})
  }

  updateMove(btn,turn){
    if(btn.innerText===""){
      btn.innerText= turn
      btn.disabled = true
    }
    else{
      alert("box is not empty")
    }
  }
}

// let game = new Game()
// console.log(game.winnerCondition)
// console.log(game.btns)
// game.checkWinner()

class vsplayer extends Game{
  constructor(){
    super()
    this.start= false
    this.player1 = "O"
    this.player2 = "X"
    this.turn = this.player1
  }

  startGame(){
    console.log("player game staterd");
    
    this.btns.forEach(btn => {
       btn.addEventListener("click",()=>{
        if(!this.start){
          this.start = true
          console.log("start turn: ",this.turn);
          this.updateMove(btn,this.turn)
          this.turn = this.turn===this.player1?this.player2:this.player1;
        }
        else{
          console.log("rest game turn: ",this.turn);
          this.updateMove(btn,this.turn)
          this.turn = this.turn===this.player1?this.player2:this.player1;
          this.checkWinner()
        }
       })
    });
  }
}

document.getElementById("vsPlayer").addEventListener("click",()=>{
  console.log("players moves");
  let playerGame = new vsplayer()
  playerGame.startGame()
  document.getElementById("restart").addEventListener("click",()=>{
    playerGame.resetBoard()
  })
})