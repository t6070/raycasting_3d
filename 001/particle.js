class Particle {
    constructor() {
        this.fov = 45;
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0;
        this.offset = 0;
        for ( let a = -30; a < 30; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    updateFOV(fov) {
        this.fov = fov;
        this.rays = [];
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    rotate(angle) {
        this.heading += angle;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays[index].setAngle(radians(a) + this.heading);
            index++;
        }
    }

    move(amt) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }

    update(x,y) {
        this.pos.set(x, y);
    }

    //光が壁を指す時
    look(walls) {
        const scene = [];
        //光線は多数出ているため、各光線毎に数値を求める
        for (let i = 0; i < this.rays.length; i++) {
            //複数個ある中の1つの光線を取得
            const ray = this.rays[i];
            //最も近い交点を取得する変数(初期値NULL)
            let closest = null;
            //その点までの距離を記録する変数(初期値無限)
            let record = Infinity;
            //壁が複数個生成されているため、1つずつ計算
            for (let wall of walls) {
                //光線1つあたりに対する壁との交点を取得
                const pt = ray.cast(wall);
                //交点が存在する時のみ実行
                if (pt) {
                    //光と交点との距離を取得
                    const d = p5.Vector.dist(this.pos, pt);
                    //光と交点との距離は、必ずrecordより小さくなるため
                    if (d < record) {
                    //必然的にrecordには取得した光と交点との距離が代入され、
                        record = d;
                    //一番近い交点は、必然的に取得したptとなる
                        closest = pt;
                    }
                }
            }
            //一番近い交点が取得できた場合(ptが存在する場合)に、光から光線を出すための座標を取得
            if (closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            //光と交点との距離を記録するため、配列に格納
            scene[i] = record;
        }
        return scene;
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}