import { GhysX } from "../../../../libs/ghysx/GhysX";
import bullet from "./bullet";
import stage from "../stages/stage";
import { INFO } from "../../../../libs/ghysx/core/Graphics";

const { ccclass, property } = cc._decorator;

@ccclass
export default class bird extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "子弹组件",
        tooltip: ""
    })
    bulletPrefab: cc.Prefab = null;

    @property({
        type: cc.RigidBody,
        displayName: "小鸟钢体",
        tooltip: ""
    })
    body: cc.RigidBody = null;

    @property({
        type: cc.Node,
        displayName: "护盾",
        tooltip: ""
    })
    shield: cc.Node = null;

    /**
     * 玩家编号
     * 1：1号玩家
     * 2：2号玩家
     */
    _player_id: number = 0;

    /**
     * 小鸟动画
     */
    _sprite: INFO = null;

    /**
     * 舞台对象
     */
    _stage: stage = null;

    /**
     * 小鸟 ID
     */
    _bird_id: number = 0;

    /**
     * 弹跳高度
     */
    _jump_y: number = 0;

    /**
     * 技能类型
     * 1：普通直线子弹
     * 2：加速直线子弹
     * 3：散弹
     * 4：炮弹
     */
    _bullet_type: number = 1;

    /**
     * 是否有护盾
     */
    _shield: boolean = false;

    /**
     * 是否死亡
     */
    _death: boolean = false;

    /**
     * 复活中
     */
    _reviving: boolean = false;

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
            case 8: // tree
                {
                    let _bird: bird = self.node.getComponent(bird);
                    if (!_bird._death) {
                        _bird.death();

                        let x = _bird.node.x;// + aabb.width / 2;
                        let y = _bird.node.y;// + aabb.height / 2;

                        GhysX.graphics.draw({
                            url: 'effects/hit/hit',
                            mode: GhysX.graphics.MODE.PREFAB,
                            asset_type: cc.Prefab,
                            parent: this.node.parent,
                            complete: function (info: INFO) {
                                info.node.setPosition(cc.v2(x, y));
                            }.bind(this)
                        });

                        GhysX.os.audio.playEffect('music/effect/hit', false);
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

    init(stage: stage, bird_id: number, player_id: number) {
        this._stage = stage;
        this._bird_id = bird_id;
        this._player_id = player_id;
    }

    initSprite(info: INFO) {
        this._sprite = info;
        // let birdPolygonCollider = this.node.getComponent(cc.PolygonCollider);
        let spritePolygonCollider = info.node.getComponent(cc.PolygonCollider);
        // birdPolygonCollider.points = spritePolygonCollider.points;
        spritePolygonCollider.enabled = false;
        // this.node.addComponent(cc.PolygonCollider).points = spritePolygonCollider.points;
    }

    addShield() {
        this._shield = true;
        this.shield.active = true;
    }

    removeShield() {
        this._shield = false;
        this.shield.active = this._reviving;
    }

    go() {
        this.shoot();
    }

    revive() {
        this._death = false;
        this._reviving = true;
        
        this.node.active = true;

        this.node.rotation = 0;
        this.body.awake = false;

        this._shield = false;
        this.shield.active = true;

        this.node.y = 0;

        this._bullet_type = 1;

        this.shoot();

        let seq = cc.sequence(cc.delayTime(3), cc.callFunc(function (sender) {
            this._reviving = false;
            this.shield.active = this._shield;
            this.body.awake = true;
        }.bind(this)));

        this.node.runAction(seq);

        this.node.opacity = 0;
        this.node.runAction(cc.repeat(cc.sequence(cc.fadeIn(0.1), cc.fadeOut(0.1), cc.fadeIn(0.1)), 3));
        this.node.runAction(cc.sequence(cc.delayTime(2.1), cc.repeat(cc.sequence(cc.fadeIn(0.1), cc.fadeOut(0.1), cc.fadeIn(0.1)), 3)));
    }

    death() {
        if (this._death) {
            return;
        }

        if (this._shield) {
            return;
        }

        if (this._reviving) {
            return;
        }

        this._death = true;
        this.node.rotation = 90;
        let animation: cc.Animation = this._sprite.node.getComponent(cc.Animation);
        animation.stop(animation.defaultClip.name);

        this.node.stopAllActions();

        switch (this._player_id) {
            case 1:
                {
                    GhysX.db.cache.battle_info.lift1--;
                }
                break;

            case 2:
                {
                    GhysX.db.cache.battle_info.lift2--;
                }
                break;

            default:
                break;
        }
        GhysX.handler.emit('battle_ui_update_draw_hp' + this._player_id);
        GhysX.handler.emit('battle_ui_update_draw_hp_progress' + this._player_id);
    }

    kill() {
        if (this._death) {
            return;
        }
        this._reviving = false;
        this.death();

        GhysX.os.audio.playEffect('music/effect/fall', false);
    }

    jump(event: cc.Event.EventTouch) {
        if (this._death) {
            return;
        }

        switch (GhysX.local.stage_info.type) {
            case 1:
                {

                }
                break;

            default:
                {
                    if (event) {
                        if (event.getLocationX() >= GhysX.gui.frame.node.width / 2) {
                            if (this._player_id == 1) {
                                return;
                            }
                        } else {
                            if (this._player_id == 2) {
                                return;
                            }
                        }
                    }
                }
                break;
        }

        // this.node.stopActionByTag(100);

        // let seq = cc.sequence(cc.jumpBy(0.5, cc.v2(0, 45), 45, 1), cc.callFunc(function () {
        //     cc.log('jump over');
        // }.bind(this)));
        // this.node.runAction(seq);

        // this.body.linearVelocity = cc.v2(0, 410);
        this.body.linearVelocity = cc.v2(0, 380);
        // this.body.awake = true;
    }

    outside() {

        let lift = 0;
        switch (this._player_id) {
            case 1:
                {
                    lift = GhysX.db.cache.battle_info.lift1;
                }
                break;

            case 2:
                {
                    lift = GhysX.db.cache.battle_info.lift2;
                }
                break;

            default:
                break;
        }
        
        GhysX.handler.emit('battle_ui_remove_all_skill_' + this._player_id);

        if (lift <= 0) {
            // this.body.active = false;
            // this.node.destroy();
            this.node.active = false;

            GhysX.handler.emit('battle_over');
        } else {
            this.revive();
        }
    }

    createBullet(start_x: number, start_y: number, move_x: number = 900, move_y: number = 0): bullet {
        let node = cc.instantiate(this.bulletPrefab);
        let c = node.getComponent(bullet);
        c.init(this, move_x, move_y);
        node.setPosition(cc.v2(start_x, start_y));
        this._stage.node.addChild(node);
        return c;
    }

    shoot() {
        if (this._death) {
            return;
        }

        let interval = 0.17;

        let start_pos = this.node.parent.getPosition().add(this.node.getPosition())

        let ms = 900;

        switch (this._bullet_type) {
            case 1:
                {
                    let bullet = this.createBullet(start_pos.x, start_pos.y, ms, 0);
                    // bullet.node.setPosition(this.node.parent.getPosition().add(this.node.getPosition()));
                    GhysX.os.audio.playEffect('music/effect/gun', false);
                }
                break;

            case 2:
                {
                    interval = 0.09;
                    let bullet = this.createBullet(start_pos.x, start_pos.y, ms, 0);
                    // bullet.node.setPosition(this.node.parent.getPosition().add(this.node.getPosition()));
                    // GhysX.os.audio.playEffect('music/effect/gun', false);
                    GhysX.os.audio.playEffect('music/effect/uzi', false);
                }
                break;

            case 3:
                {
                    interval = 0.09;
                    let bullet1 = this.createBullet(start_pos.x, start_pos.y, ms, 0);
                    let bullet2 = this.createBullet(start_pos.x, start_pos.y, ms, 200);
                    let bullet3 = this.createBullet(start_pos.x, start_pos.y, ms, -200);
                    // bullet.node.setPosition(this.node.parent.getPosition().add(this.node.getPosition()));
                    // GhysX.os.audio.playEffect('music/effect/gun', false);
                    GhysX.os.audio.playEffect('music/effect/uzi', false);
                }
                break;

            case 4:
                {
                    interval = 0.8;
                    let bullet1 = this.createBullet(start_pos.x + Math.random() * 30, start_pos.y - 5 + Math.random() * 10 + 65, ms, 0);
                    let bullet2 = this.createBullet(start_pos.x + Math.random() * 30, start_pos.y - 5 + Math.random() * 10 + 10, ms, 0);
                    let bullet3 = this.createBullet(start_pos.x + Math.random() * 30, start_pos.y - 5 + Math.random() * 10 + -35, ms, 0);
                    let bullet4 = this.createBullet(start_pos.x + Math.random() * 30, start_pos.y - 5 + Math.random() * 10 - 80, ms, 0);
                    // bullet.node.setPosition(this.node.parent.getPosition().add(this.node.getPosition()));
                    GhysX.os.audio.playEffect('music/effect/shoot', false);
                }
                break;

            default:
                break;
        }

        let seq = cc.sequence(cc.delayTime(interval), cc.callFunc(function (sender) {
            this.shoot();
        }.bind(this)));
        this.node.runAction(seq);
    }

    pause() {
        this.node.pauseAllActions();
    }

    resume() {
        this.node.resumeAllActions();
    }

    onLoad() {
        GhysX.graphics.draw({
            url: 'sprites/%s/%s'.format(1000 + this._bird_id, 1000 + this._bird_id),
            mode: GhysX.graphics.MODE.PREFAB,
            asset_type: cc.Prefab,
            parent: this.node,
            order: -1,
            complete: function (info: INFO) {
                this.initSprite(info);
            }.bind(this)
        });

        GhysX.handler.on('go', this.go, this);
        GhysX.handler.on('jump', this.jump, this);

        GhysX.handler.on('revive', this.revive, this);

        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start() {

    }

    // update (dt) {}
}
