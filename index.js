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
// console.log("............................................................");
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
