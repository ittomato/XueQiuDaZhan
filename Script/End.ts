
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnRestart: cc.Node = null;


    // onLoad () {},

    start() {
        this.btnRestart.on("touchstart", this.onRestart, this);
    }
    onRestart() {
        cc.director.loadScene("Game");
    }
    // update (dt) {},
}
