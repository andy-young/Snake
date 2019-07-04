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