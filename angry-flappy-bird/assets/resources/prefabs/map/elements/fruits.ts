import bird from "./bird";
import stage from "../stages/stage";
import { GhysX } from "../../../../libs/ghysx/GhysX";
import { INFO } from "../../../../libs/ghysx/core/Graphics";

const { ccclass, property } = cc._decorator;

@ccclass
export default class fruits extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "水果组件",
        tooltip: ""
    })
    fruitPrefab: cc.Prefab = null;

    @property({
        type: cc.PolygonCollider,
        displayName: "水果多边形碰撞",
        tooltip: ""
    })
    polygonCollider: cc.PolygonCollider = null;

    /**
     * 水果类型
     */
    _fruit_type: number = 1;

    /**
     * 舞台对象
     */
    _stage: stage = null;

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
                    if (_bird && !_bird._death) {
                        // // _bird.hit(this);
                        
                        GhysX.handler.emit('battle_ui_eating_fruit', _bird, this);
    
                        // self.node.destroy();
                        self.enabled = false;
                    }
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

    init(stage: stage, fruit_type: number) {
        this._stage = stage;
        this._fruit_type = fruit_type;
    }

    createFruit() {
        let node = cc.instantiate(this.fruitPrefab);
        this.node.addChild(node);

        node.scale = 0.3;

        GhysX.graphics.draw({
            url: 'effects/fruit/fruit',
            mode: GhysX.graphics.MODE.ATLAS,
            asset_type: cc.SpriteAtlas,
            asset_name: '' + this._fruit_type,
            target: node.getComponent(cc.Sprite),
            complete: function(info: INFO) {
                this.polygonCollider.points[0].x = -1 * info.node.width / 2 * 0.3;
                this.polygonCollider.points[0].y = -1 * info.node.height / 2 * 0.3;

                this.polygonCollider.points[1].x = info.node.width / 2 * 0.3;
                this.polygonCollider.points[1].y = -1 * info.node.height / 2 * 0.3;

                this.polygonCollider.points[2].x = info.node.width / 2 * 0.3;
                this.polygonCollider.points[2].y = info.node.height / 2 * 0.3;

                this.polygonCollider.points[3].x = -1 * info.node.width / 2 * 0.3;
                this.polygonCollider.points[3].y = info.node.height / 2 * 0.3;
            }.bind(this)
        });

        this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 10)), cc.rotateBy(0.3, 10), cc.rotateBy(0.3, -20), cc.rotateBy(0.3, 10))));
    }

    pause() {
        this.node.pauseAllActions();
    }

    resume() {
        this.node.resumeAllActions();
    }

    onLoad() {
        // let seq = cc.sequence(cc.moveBy(0.8, cc.v2(800, 0)), cc.callFunc(function (sender) {
        //     // cc.log(sender);
        //     sender.destroy();
        // }));
        // this.node.runAction(seq);

        this.createFruit();
        
        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start() {

    }

    // update (dt) {}
}
