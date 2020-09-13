//境界線を生成するクラス
class Boundary {
    constructor(x1,y1,x2,y2) {
        //２点(a,b)とする境界線を生成
        //aとbはそれぞれのx,yを取得する(x1,y1,x2,y2)
        this.a = createVector(x1,y1);
        this.b = createVector(x2,y2);
    }

    show() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}