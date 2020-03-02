import bird from "./bird";
import tree from "./tree";
import tree_section from "./tree_section";
import { GhysX } from "../../../../libs/ghysx/GhysX";
import boss from "./boss";

const { ccclass, property } = cc._decorator;

@ccclass
export default class fire extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "火组件",
        tooltip: ""
    })
    fires: cc.Prefab[] = [];

    /**
     * 火
     */
    _fire_index: number = 0;

    // LIFE-CYCLE CALLBACKS:

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter(other, self) {
        // console.log('on collision enter snow');

        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;

        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;

        // 节点碰撞前上一帧 aabb 碰撞框的位置
        var preAabb = world.preAabb;

        // 碰撞框的世界矩阵
        var t = world.transform;

        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;

        switch (other.tag) {
            case 1: // bird
                {
                    let _bird: bird = other.node.getComponent(bird);
                    _bird.death();

                    self.node.destroy();
                }
                break;

            default:
                break;
        }
    }

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay(other: cc.Collider, self: cc.Collider) {
        // let _bird: bird = other.node.getComponent(bird);
        // _bird.death();

        // if (undefined === (_white_ball.rigidBody as any)._prev_linearDamping) {
        //     (_white_ball.rigidBody as any)._prev_linearDamping = _white_ball.rigidBody.linearDamping;
        // }
        // _white_ball.rigidBody.linearDamping = this.friction_coefficient;
    }

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit(other, self) {
        // console.log('on collision exit snow');
        // let _bird: bird = other.node.getComponent(bird);
        // _bird.outside();
        // (_white_ball.rigidBody as any).linearDamping = (_white_ball.rigidBody as any)._prev_linearDamping;
    }

    init(fire_index: number) {
        this._fire_index = fire_index;
    }

    pause() {
        this.node.pauseAllActions();
    }

    resume() {
        this.node.resumeAllActions();
    }

    onLoad() {
        let node = cc.instantiate(this.fires[this._fire_index]);
        this.node.addChild(node);

        let seq = cc.sequence(
            cc.spawn(cc.moveBy(0.9, cc.v2(-900, 0)), cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.7), cc.fadeOut(0.1))),
            cc.callFunc(function (sender) {
                // cc.log(sender);
                sender.destroy();
            }));
        this.node.runAction(seq);
        this.node.opacity = 0;

        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start() {

    }

    // update (dt) {}
}
