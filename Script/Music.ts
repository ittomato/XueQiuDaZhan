import { Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({
        url: cc.AudioClip
    })
    music: string = '';

    @property(cc.SpriteAtlas)
    btnMusicAtlas: cc.SpriteAtlas = null;
    audioId: number = 0;

    @property(Global)
    global: Global = null;
    // onLoad () {},
    start() {
        cc.audioEngine.play(this.music, true, 0.6);
        this.node.on("touchstart", this.musicStop, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.global.setCursor, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.global.clearCursor, this);
    }
    musicStop() {
        let audioState = cc.audioEngine.getState(this.audioId);
        if (audioState == 1) {
            cc.audioEngine.pause(this.audioId);
            let musicSprite = this.node.getComponent(cc.Sprite);
            musicSprite.spriteFrame = this.btnMusicAtlas.getSpriteFrame("yin yue0002");
        } else if (audioState == 2) {
            cc.audioEngine.resume(this.audioId);
            let musicSprite = this.node.getComponent(cc.Sprite);
            musicSprite.spriteFrame = this.btnMusicAtlas.getSpriteFrame("yin yue0001");
        }
    }
    onDestroy() {
        this.node.off("touchstart", this.musicStop, this);
        this.node.off(cc.Node.EventType.MOUSE_ENTER, this.global.setCursor, this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.global.clearCursor, this);
    }
}
