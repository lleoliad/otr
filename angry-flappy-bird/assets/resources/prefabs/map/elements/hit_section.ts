const { ccclass, property } = cc._decorator;

@ccclass
export default class hit_section extends cc.Component {

    @property({
        type: cc.RigidBody,
        displayName: "切片钢体",
        tooltip: ""
    })
    rigidBody: cc.RigidBody = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.rigidBody.linearVelocity = cc.v2(300, 0);
        let seq = cc.sequence(cc.rotateBy(0.8, 80), cc.delayTime(2), cc.callFunc(function (sender) {
            sender.destroy();
        }.bind(this)))
        this.node.runAction(seq.easing(cc.easeSineOut()));
    }

    start() {

    }

    // update (dt) {}
}
