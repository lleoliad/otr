import { GhysX } from "../../../../libs/ghysx/GhysX";
import bird from "./bird";

const {ccclass, property} = cc._decorator;

@ccclass
export default class spikes extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter(other, self) {
        console.log('on collision enter snow');

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
    }

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay(other: cc.Collider, self: cc.Collider) {
        let _bird: bird = other.node.getComponent(bird);
        _bird.body.linearVelocity = cc.v2(0, -100);
        _bird.death();

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
        console.log('on collision exit snow');
        let _bird: bird = other.node.getComponent(bird);
        // (_white_ball.rigidBody as any).linearDamping = (_white_ball.rigidBody as any)._prev_linearDamping;
    }

    go() {
        let animation: cc.Animation = this.node.getComponent(cc.Animation);
        animation.play(animation.defaultClip.name);
    }

    pause() {
        let animation: cc.Animation = this.node.getComponent(cc.Animation);
        animation.pause(animation.defaultClip.name);
    }

    resume() {
        let animation: cc.Animation = this.node.getComponent(cc.Animation);
        animation.resume(animation.defaultClip.name);
    }

    onLoad () {
        // GhysX.handler.on('go', this.go, this);
        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start () {

    }

    // update (dt) {}
}
