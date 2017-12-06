const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //火球数组
    @property({
        type: [cc.Node]
    })
    Fire: cc.Node[] = [];

    start() {

    }

    onXueQiu1() {
        this.Fire[0].active = false;

    }
    onXueQiu2() {
        this.Fire[1].active = false;
    }

    onXueQiu3() {
        this.Fire[2].active = false;
    }

    onXueQiu4() {
        this.Fire[3].active = false;
    }
    onXueQiu5() {
        this.Fire[4].active = false;
    }
}
