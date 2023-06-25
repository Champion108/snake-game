const play= document.querySelector('.play')

let gameOver=false
let foodX = 13 , foodY = 10
let snakeX = 4, snakeY = 4
let snakeBody=[]
let velocityX = 0 , velocityY = 0
let setIntervalId
var sc = document.getElementById("sc")
var hs = document.getElementById('hs')
let score=0
let highscore = localStorage.getItem('hs') ||0;
hs.innerText = highscore

const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() *30) +1;
    foodY = Math.floor(Math.random()*30)+1;
}

const changedirection = (e) =>{
    if(e.key === "ArrowUp" && velocityY!=1){
        velocityX = 0
        velocityY = -1
    }
    else if(e.key === "ArrowDown" && velocityY!=-1){
        velocityX = 0
        velocityY = 1
    }
    else if(e.key === "ArrowLeft" && velocityX!=1){
        velocityX = -1
        velocityY = 0
    }
    else if(e.key === "ArrowRight" && velocityX!=-1){
        velocityX = 1
        velocityY = 0
    }
    initGame();
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    let x = document.querySelector(".go");
    x.style.display = 'flex';
    let b=document.getElementsByClassName('button')[0];
    b.addEventListener('click', () =>{
       location.reload();
    })
    document.addEventListener('keydown', (e) => {
        if(e.key == "Enter")
        location.reload();
    })
}

const initGame =() =>{
    if(gameOver) return handleGameOver();
    if(snakeX === foodX && snakeY === foodY)
       { 
        changeFoodPosition();
        snakeBody.push([foodX, foodY])
        score+=1
        sc.innerHTML = score
        if(score>highscore)
            {
                highscore = score
                hs.innerText = highscore
                localStorage.setItem('hs', highscore);
            }
       }
    
    for(let i=snakeBody.length -1;i>0;--i){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX,snakeY]

    let htmli=`<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    snakeX += velocityX
    snakeY += velocityY

    if(snakeX<=0 || snakeX>30 || snakeY>30 || snakeY<=0)
        {  
            gameOver=true
        }
    
        
    for(let i = 0;i<snakeBody.length; i++){
        htmli+=`<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i!=0 && snakeBody[i][0] == snakeBody[0][0] && snakeBody[i][1] == snakeBody[0][1])
            gameOver=true
    }
    play.innerHTML = htmli;
}

changeFoodPosition();
setIntervalId= setInterval(initGame,125);

document.addEventListener("keydown",changedirection)