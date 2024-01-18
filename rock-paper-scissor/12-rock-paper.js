   //when loading page
   let score=JSON.parse(localStorage.getItem('score')) ||   { 
    wins:0,
    losses:0,
    ties:0,
  };

  updateScoreElement();


/*
 if(!score){
  score={
  wins:0,
    losses:0,
    ties:0,
 };
}
*/
let isAutoPlaying=false;
let intervalId;
//need not use arriw function as it is easier to read and supports hoisting
 function autoplay(){
  if(!isAutoPlaying)
  {
    intervalId=setInterval(()=>{
      const playerMove= pickComputerMove();
      playGame(playerMove);
    }, 1000);
  
  isAutoPlaying=true;
  
} else {
  clearInterval(intervalId);
  isAutoPlaying=false;
}
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock')});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper')
});
document.querySelector('.js-scissor-button').addEventListener('click',()=>{
  playGame('scissor')
});

document.querySelector('.js-reset-button').addEventListener('click', ()=>{
  score.wins=0;
  score.losses=0;
  score.ties=0;
  localStorage.removeItem('score');
  updateScoreElement();
});

document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
  autoplay();
})

document.body.addEventListener('keydown',( event)=>{
if(event.key==='r')
{
  playGame('rock');
}
else if(event.key==='p')
{
  playGame('paper');
}
else if(event.key==='s')
{
  playGame('scissor');
}
})


function playGame(userMove){
  let result=' ';

  let computerMove=pickComputerMove();
if(userMove==='rock'){
  
if(computerMove==='rock'){
 result='Tie';
}
else if(computerMove==='paper'){
result='You lose'
}

else {
result= 'You win';
}

}
else if(userMove==='paper'){
  if(computerMove==='rock'){
result= 'You win'; 
}
else if(computerMove==='paper'){
result= 'Tie';
}

else {
result= 'You lose';  
}
}

else if(userMove==='scissor'){
  if(computerMove==='scissor'){
result= 'Tie';

}
else if(computerMove==='paper'){
result= 'You win';

}

else {
result= 'You lose';
 
}


}
if(result=='You win')
{
  score.wins+=1;
}
else if(result==='You lose'){
  score.losses+=1;
}
else if(result==='Tie'){
  score.ties+=1;
}
(localStorage.setItem('score',JSON.stringify(score)));  //save in local storage 
updateScoreElement();
document.querySelector('.js-result').innerText=` ${result}`;
document.querySelector('.js-moves').innerHTML=` 

You <img src="${userMove}-emoji.png" class="move-icon">
  <img src="${computerMove}-emoji.png" class="move-icon">Computer
`;

}
function updateScoreElement(){
document.querySelector('.js-score').innerText=`
  Wins:${score.wins},Losses:${score.losses},Ties:${score.ties}
  `;
}


 function pickComputerMove(){
  let  randomNum=Math.random();
  let computerMove=' ';
  
  if(randomNum<1/3){
    console.log(randomNum);

   computerMove=  'rock';
  }
  else if(randomNum<2/3){
    console.log(randomNum);
  
    computerMove=  'paper';
  }
  else if(randomNum<1){
    console.log(randomNum);
  computerMove=   'scissor';
  
  }
 return computerMove;
 }

