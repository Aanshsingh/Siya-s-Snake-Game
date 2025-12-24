const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let score =0;

let snake = [];
snake[0] = { x:10*box , y: 10*box};

let food = {

    x: Math.floor(Math.random() * (canvasSize / box))* box,
    y: Math.floor(Math.random()* (canvasSize/ box)) *box

};

let direction ="";
document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    if (e.key === 'ArrowLeft' && direction !== "RIGHT") {
        direction = "LEFT";
    }
    else if (e.key === 'ArrowRight' && direction !== "LEFT") {
        direction = "RIGHT";
    }
    else if (e.key === 'ArrowUp' && direction !== "DOWN") {
        direction = "UP";
    }
    else if (e.key === 'ArrowDown' && direction !== "UP") {
        direction = "DOWN";
    }
}

function colison(head , body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
            
        }
        
    }
    return false ;
}


function drawGame() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Snake drawing
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#03ff3aff" : "#7ef37eff";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //Food drawing
    ctx.fillStyle = "#9f0808ff";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") {
        snakeX -= box }
    if (direction === "RIGHT") {
        snakeX += box
        }
if (direction === "UP") {
    snakeY-= box
}
if (direction === "DOWN") {
    snakeY+= box
}

//eat food
if (snakeX === food.x && snakeY === food.y) {
    score++;
document.getElementById("score").innerText = score;

    
    food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}
else snake.pop();

let newHead = {x: snakeX, y: snakeY};

if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY>=canvasSize || colison(newHead, snake)) {
    clearInterval(game)
    alert("game over!!");
    window.location.reload;
    
}
snake.unshift(newHead)
}

let game = setInterval(drawGame, 100);

const Reloadbtn = document.getElementsByClassName("Reload")[0];
Reloadbtn.addEventListener("click", () => {
    // window.location.reload();
});