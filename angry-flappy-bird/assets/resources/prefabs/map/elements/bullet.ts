import bird from "./bird";
import tree from "./tree";
import tree_section from "./tree_section";
import { GhysX } from "../../../../libs/ghysx/GhysX";
import boss from "./boss";
import { INFO } from "../../../../libs/ghysx/core/Graphics";

const { ccclass, property } = cc._decorator;

@ccclass
export default class bullet extends cc.Component {

    @property({
        type: cc.Sprite,
        displayName: "图标",
        tooltip: ""
    })
    icon: cc.Sprite = null;

    @property({
        type: cc.CircleCollider,
        displayName: "碰撞",
        tooltip: ""
    })
    collider: cc.CircleCollider = null;

    /**
     * 子弹类型
     * 1：子弹
     * 4：炮弹
     */
    _bullet_type: number = 1;

    /**
     * 子弹方向
     * 1：向右
     * 2：向左
     */
    _bullet_dir: number = 1;

    /**
     * 小鸟
     */
    _bird: bird = null;

    /**
     * 结束点 x
     */
    _move_x: number = 900;

    /**
     * 结束点 y
     */
    _move_y: number = 0;

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
            case 4: // boss
                {
                    let _boss: boss = other.node.getComponent(boss);
                    _boss.hit(this);

                    self.node.destroy();
                }
                break;
            case 8: // tree
                {
                    let _tree_section: tree_section = other.node.getComponent(tree_section);
                    GhysX.handler.emit('hit', this, _tree_section);
                    // other.node.destroy();
                    self.node.destroy();
                }
                break;

            default:
                break;
        }

        if (this._bullet_type == 4) {
            let x = self.node.x;// + aabb.width / 2;
            let y = self.node.y;// + aabb.height / 2;

            GhysX.graphics.draw({
                url: 'effects/bomb/bomb',
                mode: GhysX.graphics.MODE.PREFAB,
                asset_type: cc.Prefab,
                parent: this.node.parent,
                complete: function (info: INFO) {
                    info.node.setPosition(cc.v2(x, y));
                }.bind(this)
            });
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

    init(bird: bird, move_x: number = 900, move_y: number = 0) {
        this._bird = bird;
        this._move_x = move_x;
        this._move_y = move_y;
        this._bullet_type = bird._bullet_type;
    }

    pause() {
        this.node.pauseAllActions();
    }

    resume() {
        this.node.resumeAllActions();
    }

    onLoad() {
        let t = 0.9;
        let dt = 0.7;
        switch (this._bird._bullet_type) {
            case 1:
                {
                    t = 1.5;
                    dt = 1.3;
                }
                break;

            case 2:
                {
                    t = 0.9;
                }
                break;

            case 3:
                {
                    t = 0.9;
                }
                break;

            case 4:
                {
                    t = 1.8;
                    dt = 1.6;
                    this.icon.spriteFrame = null;
                    this.collider.radius = 20;
                    GhysX.graphics.draw({
                        url: 'images/map/elements/bomb',
                        mode: GhysX.graphics.MODE.SPRITE,
                        asset_type: cc.SpriteFrame,
                        target: this.icon
                    });

                    this.node.scale = 0.7;

                    this.node.runAction(cc.repeatForever(cc.rotateBy(1,360)));
                }
                break;

            default:
                break;
        }
        let seq = cc.sequence(
            // cc.moveBy(0.8, cc.v2(800, 0)),
            cc.spawn(cc.moveBy(t, cc.v2(this._move_x, this._move_y)), cc.sequence(cc.fadeIn(0.1), cc.delayTime(dt), cc.fadeOut(0.1))),
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
