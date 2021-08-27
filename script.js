let selectedTool = "pencil";

// Canvas related Script
window.addEventListener("load", () => {
	document.addEventListener("mousedown", startPainting);
	document.addEventListener("mouseup", stopPainting);
	document.addEventListener("mousemove", sketch);
});
document.getElementById("colorChange").addEventListener("change", changeColour);
document.getElementById("btnClear").addEventListener("click", clearCanvas);
document.getElementById("lineWidth").addEventListener("change", changeWidth);
document.getElementById("btnSave").addEventListener("click", handleSave);
document
	.getElementById("pencil-tool")
	.addEventListener("click", () => (selectedTool = "pencil"));
document
	.getElementById("eraser-tool")
	.addEventListener("click", () => (selectedTool = "eraser"));
document
	.getElementById("square-tool")
	.addEventListener("click", () => (selectedTool = "rectangle"));
document
	.getElementById("circle-tool")
	.addEventListener("click", () => (selectedTool = "circle"));
const canvas = document.querySelector("#myCanvas");

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext("2d");

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "#000";

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
	coord.x = event.clientX - canvas.offsetLeft;
	coord.y = event.clientY - canvas.offsetTop;
}

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
	paint = true;
	getPosition(event);
}

function stopPainting() {
	paint = false;
}

function changeColour() {
	ctx.strokeStyle = document.getElementById("colorChange").value;
}

function clearCanvas() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function changeWidth() {
	ctx.lineWidth = document.getElementById("lineWidth").value;
}

function sketch(event) {
	if (!paint) return;

	ctx.beginPath();
	ctx.moveTo(coord.x, coord.y);
	getPosition(event);
	changeColour();

	if (selectedTool === "pencil") {
		ctx.lineTo(coord.x, coord.y);
		ctx.stroke();
	}
	if (selectedTool === "eraser") {
		ctx.lineTo(coord.x, coord.y);
		ctx.strokeStyle = "white";
		ctx.stroke();
	}
	if (selectedTool === "rectangle") {
		ctx.rect(coord.x, coord.y, 200, 200);
		ctx.stroke();
	}
	if (selectedTool === "circle") {
		ctx.arc(coord.x, coord.y, 50, 0, Math.PI * 2);
		// We will use 👇 this code to fill the color inside the elements
		// ctx.fillStyle = "red";
		// ctx.fill();
		ctx.stroke();
	}
}

function handleSave() {
	let a = document.createElement("a");
	a.href = canvas.toDataURL("image/png");
	a.download = "rangify.png";
	a.click();
}
