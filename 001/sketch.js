//壁を定義
let walls = [];
//光線を定義
//位置と方向を持つ
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

const sceneW = 400;
const sceneH = 400;
let sliderFOV;
const scene = [];

function setup() {
    createCanvas(800,400);
    //壁となる境界線を複数生成
    for (let i = 0; i < 5; i++){
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);
        walls[i] = new Boundary(x1, x2, y1, y2);
    }
    //生成したキャンバス要素の枠全てにboundaryを生成
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
    walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
    walls.push(new Boundary(0, sceneH, 0, 0));
    //particleを生成
    particle = new Particle();
    sliderFOV = createSlider(0, 360, 45);
    sliderFOV.input(changeFOV);
}

function changeFOV() {
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}
function draw() {

    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.1);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.1);
    } else if (keyIsDown(UP_ARROW)) {
        particle.move(2);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-2);
    }

    background(0);
    //壁が複数生成されているため、全てを表示する
    for (let wall of walls){
        wall.show();
    }
    //マウスは動的に動き続けるため、1回の描画毎に座標を求め直す
    // particle.update(mouseX, mouseY);
    // particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH);
    //座標が求め直されたら表示する
    particle.show();
    // xoff += 0.01;
    // yoff += 0,01;

    //光と壁との距離を取得
    const scene = particle.look(walls);
    //sceneW(初期値400)/光線が壁と交わっている数分(sceneは交点が存在しないと生成されない)
    const w = sceneW / scene.length;
    push();
    translate(sceneW, 0);
    //3dの影描写を縦割りの長方形で表す
    //光線が壁と交わっている分の長方形を生成
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = scene[i] * scene[i];
        const wSq = sceneW * sceneW;
        const b = map(sq, 0, wSq, 255, 0);
        const h = map(scene[i], 0, sceneW, sceneH, 0);
        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2, w + 1, h);
    }
    pop();
}