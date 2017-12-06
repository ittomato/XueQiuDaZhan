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
    // onLoad () {},
    start() {
        cc.audioEngine.play(this.music, true, 0.6);
        this.node.on("touchstart", this.musicStop, this);
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

}
