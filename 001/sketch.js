//壁を定義
let walls = [];
//光線を定義
//位置と方向を持つ
let ray;

let particle;

function setup() {
    createCanvas(1000,800);
    //壁となる境界線を複数生成
    for (let i = 0; i < 10; i++){
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, x2, y1, y2);
    }

    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));

    particle = new Particle();
}

function draw() {
    background(0);
    for (let wall of walls){
        wall.show();
    }
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);
}