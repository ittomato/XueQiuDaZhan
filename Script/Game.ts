const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    currentQuestion: number = 0;
    @property(cc.Label)
    Question: cc.Label = null;

    @property({
        type: [cc.Label]
    })
    AnswerList: cc.Label[] = [];


    @property(cc.SpriteAtlas)
    LifeAtlas: cc.SpriteAtlas = null;

    @property(cc.Sprite)
    LifeState: cc.Sprite = null;

    currentLifeState: number = 0;
    currentAnswerOk: string = '';
    // onLoad () {},

    start() {

        this.loadQuestion(this.currentQuestion);
        this.AnswerList.forEach(ele => {
            ele.node.on("touchstart", this.selectAnswer, this);
        })
    }
    loadQuestion(currentQuestion) {
        cc.loader.loadRes("subject", (err, res) => {
            if (err) {
                cc.log(err);
            } else {
                cc.log(res);
                this.Question.string = res[currentQuestion].question;
                this.AnswerList.forEach((ele, index) => {
                    ele.string = res[currentQuestion].answer[index];
                })
                this.currentAnswerOk = res[currentQuestion].answerOk;

            }
        })
    }
    selectAnswer(event) {
        cc.log(event.target.name);

        let selectText = event.target.getComponent(cc.Label).string;
        if (selectText == this.currentAnswerOk) {
            cc.log("回答正确");
        } else {
            cc.log("回答错误");
            this.currentLifeState++;
            this.setLifeState(this.currentLifeState);
        }
    }
    //设置生命状态
    setLifeState(state: number) {
        this.LifeState.spriteFrame = this.LifeAtlas.getSpriteFrame(state.toString());
    }
}
