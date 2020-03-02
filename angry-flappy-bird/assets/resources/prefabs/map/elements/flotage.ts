import bird from "./bird";
import stage from "../stages/stage";
import { GhysX } from "../../../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class flotage extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "技能组件",
        tooltip: ""
    })
    skillPrefab: cc.Prefab = null;

    /**
     * 技能类型
     * 1：普通直线子弹
     * 2：调整直线子弹
     * 3：散弹
     * 4：炮弹
     */
    _skill_type: number = 1;

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
                        // _bird.hit(this);
    
                        GhysX.handler.emit('battle_ui_add_skill_' + _bird._player_id, _bird, this._skill_type);
    
                        if (this._skill_type == 1) {
                            GhysX.os.audio.playEffect('music/effect/shield', false);
                        } else {
                            GhysX.os.audio.playEffect('music/effect/powers', false);
                        }
    
                        self.node.destroy();
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

    init(stage: stage, skill_type: number) {
        this._stage = stage;
        this._skill_type = skill_type;
    }

    createSkill() {
        let node = cc.instantiate(this.skillPrefab);
        this.node.addChild(node);

        GhysX.graphics.draw({
            url: 'effects/skill/skill',
            mode: GhysX.graphics.MODE.ATLAS,
            asset_type: cc.SpriteAtlas,
            asset_name: '' + this._skill_type,
            target: node.getComponent(cc.Sprite)
        });
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

        this.createSkill();

        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start() {

    }

    // update (dt) {}
}
