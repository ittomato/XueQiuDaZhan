import { Global } from "./Global";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnRestart: cc.Node = null;

    @property(Global)
    global: Global = null;
    // onLoad () {},
    start() {
        this.btnRestart.on("touchstart", this.onRestart, this);
        this.btnRestart.on(cc.Node.EventType.MOUSE_ENTER, this.global.setCursor, this);
        this.btnRestart.on(cc.Node.EventType.MOUSE_LEAVE, this.global.clearCursor, this);
    }
    onRestart() {
        cc.director.loadScene("Game");
    }
    onDestroy() {
        this.btnRestart.off("touchstart", this.onRestart, this);
        this.btnRestart.off(cc.Node.EventType.MOUSE_ENTER, this.global.setCursor, this);
        this.btnRestart.off(cc.Node.EventType.MOUSE_LEAVE, this.global.clearCursor, this);
        this.global.clearCursor();
    }
}
