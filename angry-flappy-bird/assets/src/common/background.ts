const { ccclass, property } = cc._decorator;

@ccclass
export default class background extends cc.Component {

    @property({
        type: cc.Node,
        displayName: "背景",
        tooltip: "背景"
    })
    backgroundAnimation: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    init() {

    }

    // onLoad () {}

    start() {
        // this.backgroundAnimation.runAction(
        //     cc.repeatForever(
        //         cc.sequence(
        //             cc.bezierBy(10, [cc.v2(0, 0), cc.v2(-300 / 2, 400 / 2), cc.v2(0, 400)]),
        //             cc.bezierBy(10, [cc.v2(0, 0), cc.v2(300 / 2, 400 / 2), cc.v2(0, 400)]),
        //             cc.callFunc(function (sender) {
        //                 this.backgroundAnimation.x = 0;
        //                 this.backgroundAnimation.y = 0;
        //             }.bind(this))
        //         )
        //     )
        // );
    }

    // update (dt) {}
}
