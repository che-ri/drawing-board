const canvas = document.getElementById('jsCanvas');
const colorBtns = document.getElementById('jsColors');
let ctx = canvas.getContext('2d');

//캔버스의 크기를 정의! (css 코드로는 적용안됨!!)
canvas.width = 700;
canvas.height = 700;

//기본 선 스타일
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

// 선의 굵기 조절
let range = document.getElementById('jsRange');
function changeRange() {
  ctx.lineWidth = range.value;
}
if (range) {
  range.addEventListener('change', changeRange);
}

function changeColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

let painting = false; //기본 설정
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

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

colorBtns.addEventListener('click', changeColor);
