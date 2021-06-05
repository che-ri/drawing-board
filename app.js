const canvas = document.getElementById('jsCanvas');
const colorBtns = document.getElementById('jsColors');
const mode = document.getElementById('jsMode');
let ctx = canvas.getContext('2d');

//기본스타일
const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE; //캔버스의 크기를 정의! (css 코드로는 적용안됨!!)
canvas.height = CANVAS_SIZE;
let painting = false; //기본 설정
let filling = true;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 선의 굵기 조절
let range = document.getElementById('jsRange');
function changeRange() {
  ctx.lineWidth = range.value;
}
if (range) {
  range.addEventListener('change', changeRange);
}

// 모드 변경
function changeMode() {
  if (filling) {
    filling = false;
    mode.innerText = 'Paint';
  } else {
    filling = true;
    mode.innerText = 'Fill';
  }
}

if (mode) {
  mode.addEventListener('click', changeMode);
}

function changeColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//마우스가 움직일 때마다 x와 y가 갱신되게 한다.
function onMouseMove(e) {
  const x = e.offsetX,
    y = e.offsetY;

  if (!painting) {
    ctx.beginPath(); //path 생성
    ctx.moveTo(x, y); //움직임
    //painting이 false일때도 움직이는 좌표를 생성해야되는 이유는,
    //mousedown은 painting을 true로 만들지만, 이벤트 자체가 단발성이므로, 계속 이벤트가 일어날 수 없다.
    //따라서, 계속적으로 이벤트를 만드는 mousemove로 좌표를 생성해주어야 한다!!
  } else {
    ctx.lineTo(x, y); //line이 생성
    ctx.stroke(); //현재 stroke의 스타일로 선을 그음
  }
}

function fillColor() {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', fillColor);
}

colorBtns.addEventListener('click', changeColor);
