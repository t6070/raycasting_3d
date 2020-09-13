//光線を生成するクラス
class Ray {
    constructor(pos, angle) {
        //スタートの位置
        this.pos = pos;
        //方向
        this.dir = p5.Vector.fromAngle(angle);
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        //正規化
        this.dir.normalize();
    }
    //描画処理
    //方向を表すための短い境界線を描画する
    show() {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x*10, this.dir.y*10);
        pop();
    }
    //rayとboundaryの交点を取得
    //交点が存在するorしない・存在するのであれば、その座標を返す
    cast(wall) {
        //現在の境界線のa点(x,y)、b点(x,y)を取得
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        //現在の光線のa点(x,y)、b点(x,y)を取得
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        //交点を求める際の分母
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 -  x4);
        //位置を計算して、分母が0の場合は処理を終了
        if (den == 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }else{
            return;
        }
    }
}