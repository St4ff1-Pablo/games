let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;
let score = 0;
let time = 0;
let frames = 0;
let gameIsOver = false;
let tryAgain = false;

let submButton = document.getElementById('submButton');
submButton.addEventListener('click', function () {
  tryAgain = true;
});
submButton.style.bottom = '200px';
submButton.style.display = 'none';

setInterval(function () {
  if (gameIsOver === false) {
    frames++;
    if (frames % 25 == 0) {
      time++;
      checkTime();
    }
    update();
  } else {
    context.clearRect(0, 0, width, height);
    context.font = '40px Arial';
    context.fillStyle = 'red';
    context.fillText('Game over', width / 2 - 100, height / 2);
    context.fillStyle = 'green';
    context.fillText(
      `Your score is: ${score}`,
      width / 2 - 100,
      height / 2 + 50
    );
    submButton.style.display = 'block';
    if (tryAgain === true) {
      window.location.reload();
    }
  }
}, 40);
function checkTime() {
  if (time > 19) {
    gameIsOver = true;
  }
}
let regionX, regionY;
let regionW = 40;
let regionH = 40;
function createRegion() {
  regionX = Math.floor(Math.random() * (canvas.width - regionW) + regionW);
  regionY = Math.floor(Math.random() * (canvas.height - regionH));
  console.log(regionX + regionY);
}
createRegion();
function update() {
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'green';
  context.fillRect(regionX, regionY, regionW, regionH);
  context.font = '20px Arial';
  context.fillStyle = 'white';
  context.fillText(`Your score is ${score}`, 30, 40);
  context.font = '20px Arial';
  context.fillStyle = 'red';
  context.fillText(`Score:  ${score}`, 50, 40);
  context.fillText(`Time left ${20 - time}`, 200, 40);
}
document.onmousedown = function (event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  if (
    mouseX >= regionX &&
    mouseX <= regionX + regionW &&
    mouseY >= regionY &&
    mouseY <= regionY + regionH
  ) {
    score++;
    createRegion();
  }
};
