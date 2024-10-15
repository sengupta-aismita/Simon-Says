let gameSeq = [];
let userSeq = [];

let btns = ["one", "two", "three", "four"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function btnFlash(btn) {
  if (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 250);
  } else {
    console.error("button not found");
  }
}

function userFlash(btn) {
    if (btn) {
      btn.classList.add("userflash");
      setTimeout(function () {
        btn.classList.remove("userflash");
      }, 250);
    } else {
      console.error("button not found");
    }
  }

function levelUp() {
  userSeq=[];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtn);
}

function checkAns(idx){
   
    if(userSeq[idx] === gameSeq[idx]){
      console.log("same value");
      if(userSeq.length == gameSeq.length){
        setTimeout(levelUp,1000);
      }
    }
    else{
      h2.innerHTML = `Game Over! <b> Your score was ${level}</b> <br> Press any key to start`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout( function(){
        document.querySelector("body").style.backgroundColor = "rgb(36, 162, 74)";
      }, 1000)
      reset();
    }
   
}

function btnPress(){
    console.log(this);
    btn = this;
    btnFlash(btn);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function reset(){
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
   btn.addEventListener("click", btnPress);
}

let resetGame = document.querySelector(".reset-game");
resetGame.addEventListener("click", function(){
  h2.innerHTML = "Game has been reset! <br> Press any key to start again";
  reset();
})