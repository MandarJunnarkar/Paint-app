// Canvas related Script
window.addEventListener("load", () => {
    document.addEventListener("mousedown", startPainting);
    document.addEventListener("mouseup", stopPainting);
    document.addEventListener("mousemove", sketch);
});
document.getElementById("colorChange").addEventListener("change", changeColour);
document.getElementById("btnClear").addEventListener("click", clearCanvas);
document.getElementById("lineWidth").addEventListener("change", changeWidth);


const canvas = document.querySelector("#myCanvas");

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext("2d");

ctx.lineWidth = 5;
ctx.lineCap = "round"
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

function changeColour(){
    ctx.strokeStyle = document.getElementById('colorChange').value;
}

function clearCanvas(){
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height); 
}

function changeWidth(){
    ctx.lineWidth = document.getElementById('lineWidth').value;
}

function sketch(event) {
    if (!paint) return;
    ctx.beginPath();

    // The cursor to start drawing
    // moves to this coordinate
    ctx.moveTo(coord.x, coord.y);

    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    ctx.lineTo(coord.x, coord.y);

     // Draws the line.
     ctx.stroke();
    }

    

