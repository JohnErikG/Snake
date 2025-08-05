const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
isPaused =  true;
let snake = [{ x: 200, y: 200 }];

let lastLogTime = 0;
let direction = "RIGHT";
let food = generateFood();
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "Enter"){ isPaused = !isPaused;};
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function draw() {
  if (isPaused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);



  let head = { ...snake[0] };
  if (direction === "LEFT") {head.x -= box;};
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
  if (
    head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    console.log(head.y );
    let bool = snake.some(segment => segment.x === head.x && segment.y === head.y);
    let bool1 = head.x < 0;
    let bool2 = head.x > canvasSize;
    let bool3 = head.y < 0;
    let bool4 = head.y > canvasSize ;
    console.log(bool, bool1, bool2, bool3, bool4);
    console.log("cabeaza:", snake[0]);
    alert("Game Over. Puntuación: " + score);
    document.location.reload();
    return;
  }


  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }
  
  snake.unshift(head);
    for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

}

setInterval(draw, 150);
