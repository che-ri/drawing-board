const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const colorBtns = document.getElementById('jsColors');

//기본스타일
const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE; //캔버스의 크기를 정의! (css 코드로는 적용안됨!!)
canvas.height = CANVAS_SIZE;
let painting = false;
let filling = true;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 선의 굵기 조절
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

function onMouseMove(e) {
  //마우스가 움직일 때마다 x와 y 좌표가 갱신.
  const x = e.offsetX,
    y = e.offsetY;

  if (painting & !filling) {
    ctx.lineTo(x, y); //line이 생성
    ctx.stroke(); //현재 stroke의 스타일로 선을 그음
  } else {
    ctx.beginPath(); //path 생성
    ctx.moveTo(x, y); //움직임
    //painting이 false일때도 움직이는 좌표를 생성해야되는 이유는,
    //mousedown은 painting을 true로 만들지만, 이벤트 자체가 단발성이므로, 계속 이벤트가 일어날 수 없다.
    //따라서, 계속적으로 이벤트를 만드는 mousemove로 좌표를 생성해주어야 한다!!
  }
}

function fillColor() {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

//저장기능
function handleSaveClick() {
  const imageURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imageURL;
  link.download = '그림판🎨';
  link.click();
}
if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}

//오른쪽마우스 기능잠금
function handleCM(e) {
  e.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', fillColor);
  canvas.addEventListener('contextmenu', handleCM);
}

colorBtns.addEventListener('click', changeColor);
