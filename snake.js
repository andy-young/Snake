// Defining the canvas, ctx, width & height constants..

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const width = ctx.width;
const height = ctx.height;


// Dividing the canvas into blocks..
const blockSize = 10;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

// Defining the score variable..
let score = 0;


// Drawing the Border
const drawBorder = () => {
	ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

// Draw the score in the top-left corner
const drawScore = () => {
  ctx.font = "20 Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`Score: ${score}`, blockSize, blockSize);
};

// Clear the interval and display Gave Over text
const gameOver = () => {
  clearInterval(intervalId);
  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.texBaseLine = "middle";
  ctx.fillText("Game Over", width / 2, height / 2);
};

// Draw a circle (using the function from Chapter 14)
const circle = (x, y, radius, fillCircle) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  fillCircle ? ctx.fill() : ctx.stroke;
};

// The Block Constructor
const Block = (col, row) => {
  this.col = col;
  this.row = row;
};

// Draw a square at the block's location
Block.prototype.drawSquare = color => {
  let x = this.col * blockSize;
  let y = this.row * blockSize;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};

// Check if this block is in the same location as another block
Block.prototype.equal = otherBlock => {
  return this.col === otherBlock.col && this.row === otherBlock.row;
}

// The Snake constructor
function Snake() {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];

  this.direction = "right";
  this.nextDirection = "right";
};

// Draw a square for each segment of the snake's body
Snake.prototype.draw = function () {
  for (let seg of segments) {
    this.segments[seg].drawSquare("Blue");
  }
};

// Create a new head and add it to the beginning of
// the snake to move the snake in its current direction
Snake.prototype.move = function () {
  let head = this.segments[0];
  let newHead;

  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
}

