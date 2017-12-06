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
    currentJiFen: number = 0;


    //火球数组
    @property({
        type: [cc.Node]
    })
    Fire: cc.Node[] = [];


    //愤怒
    @property(cc.Node)
    FenNu: cc.Node = null;


    @property(cc.Node)
    XueQiu: cc.Node = null;

    @property(cc.Label)
    JiFen: cc.Label = null;

    isLoading: boolean = false;

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
                this.Question.string = res[currentQuestion].question;
                this.AnswerList.forEach((ele, index) => {
                    ele.string = res[currentQuestion].answer[index];
                })
                this.currentAnswerOk = res[currentQuestion].answerOk;
                this.isLoading = false;



            }
        })
    }
    selectAnswer(event) {
        if (this.isLoading) return false;
        this.isLoading = true;
        let selectText = event.target.getComponent(cc.Label).string;
        if (selectText == this.currentAnswerOk) {
            cc.log("回答正确");
            this.currentJiFen += 20;

            if (this.currentQuestion == 5) {
                cc.log("游戏完成。。。。");
                return;
            } else {
                this.currentQuestion++;
            }

            this.setJiFen(this.currentJiFen);

        } else {
            cc.log("回答错误");
            if (this.currentQuestion == 5) return false;
            let action_q1 = cc.scaleTo(1, 2, 2);
            let action_Clear = cc.scaleTo(1, 1, 1);

            this.currentLifeState++;
            this.Fire[this.currentQuestion].runAction(cc.sequence(action_q1, cc.delayTime(1), action_Clear, cc.callFunc(function () {

                this.setLifeState(this.currentLifeState);
            }, this)));

            this.FenNu.active = true;
            let anim_FenNu = this.FenNu.getComponent(cc.Animation);
            anim_FenNu.play("fennu");
            anim_FenNu.once("finished", function () {
                this.FenNu.active = false;

            }, this)
        }
    }
    //设置生命状态
    setLifeState(state: number) {
        this.LifeState.spriteFrame = this.LifeAtlas.getSpriteFrame(state.toString());
        if (state == 3) {
            cc.log("游戏失败");
            cc.director.loadScene("EndFail");
            return;
        }
        this.isLoading = false;
    }
    //设置积分
    setJiFen(currentJiFen: number) {
        this.XueQiu.active = true;
        var localZorder = this.XueQiu.getLocalZOrder();

        if (this.currentQuestion > 3) {
            this.XueQiu.setLocalZOrder(-1);
            this.Fire[3].setLocalZOrder(-2);
            this.Fire[4].setLocalZOrder(-2);
        }
        let anim_xueqiu = this.XueQiu.getComponent(cc.Animation);
        anim_xueqiu.play("xueqiu" + this.currentQuestion);
        anim_xueqiu.once("finished", function () {
            this.JiFen.string = currentJiFen.toString();
            if (this.currentQuestion != 5) {
                this.loadQuestion(this.currentQuestion);
            } else {
                cc.log("游戏完成");
                cc.director.loadScene("EndWin");
            }

        }, this)

    }
}
