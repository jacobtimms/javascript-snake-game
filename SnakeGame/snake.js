const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;

// Images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Audio

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let music = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
/*
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
*/
music.src = "audio/music.wav";
music.volume = 0.4;
music.loop = true;

// Snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// Food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Score

let score = 0;

//Pause & Resume game
let gameActive = true;

function startGame(x) {
    // setting gameActive flag to true
    gameActive = true;
    game = setInterval(draw,100);
    music.play();
}

function pauseGame() {
    // setting gameActive flag to false
    clearInterval(game);
    gameActive = false;
    music.pause();
}

document.addEventListener("keydown",pause);

function pause(event){
    let spaceBar = event.keyCode;
    if (spaceBar === 32)   {
    if(gameActive === true) {
            pauseGame();
    }else {
            startGame();
        }
    }
}

//Restart game
function Restart()  {
    
}

//Play music on start

document.addEventListener("keydown",playMusic);

function playMusic(event){
    let startMus = event;
    if (startMus = true){
        music.play();
        document.removeEventListener("keydown",playMusic);
    }
}

//Direction controls

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key === 37 && d !== "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key === 38 && d !== "DOWN"){
        d = "UP";
        up.play();
    }else if(key === 39 && d !== "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key === 40 && d !== "UP"){
        d = "DOWN";
        down.play();
    }
}



// Collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x === array[i].x && head.y === array[i].y){
            music.pause();
            return true;
        }
    }
    return false;
}

// Canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i === 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // Which direction?
    if( d === "LEFT") snakeX -= box;
    if( d === "UP") snakeY -= box;
    if( d === "RIGHT") snakeX += box;
    if( d === "DOWN") snakeY += box;
    
    // If the snake eats the food
    if(snakeX === food.x && snakeY === food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // We don't remove the tail
    }else{
        // Remove the tail
        snake.pop();
    }
    
    // Add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // Game Over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        music.pause();
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}


// Call draw function every 100 ms

let game = setInterval(draw,100);


















