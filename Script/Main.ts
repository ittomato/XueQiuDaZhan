const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    text: cc.Node = null;

    @property(cc.Node)
    btnStart: cc.Node = null;

    @property(cc.Node)
    Title: cc.Node = null;


    @property(cc.Node)
    btnMusic: cc.Node = null;
    onLoad() {
        // cc.director.getPhysicsManager().enabled = true;
        cc.director.setDisplayStats(false);
        cc.game.addPersistRootNode(this.btnMusic);
    }
    start() {
        this.btnStart.on("touchstart", this.onStartGame, this);
    }

    onStartGame() {
        if (this.text.active) {
            // cc.log("进入游戏");
            cc.director.loadScene("Game");
        } else {
            this.text.active = true;
            this.Title.active = false;
        }
    }
    onDestroy() {
        this.btnStart.off("touchstart", this.onStartGame, this);
    }

}
