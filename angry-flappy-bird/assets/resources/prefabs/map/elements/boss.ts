import { GhysX } from "../../../../libs/ghysx/GhysX";
import { INFO } from "../../../../libs/ghysx/core/Graphics";
import stage from "../stages/stage";
import bullet from "./bullet";
import fire from "./fire";

const { ccclass, property } = cc._decorator;

@ccclass
export default class boss extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "子弹组件",
        tooltip: ""
    })
    bulletPrefab: cc.Prefab = null;

    @property({
        type: cc.Animation,
        displayName: "循环跳动",
        tooltip: ""
    })
    jumpLoop: cc.Animation = null;

    @property({
        type: cc.ProgressBar,
        displayName: "循环跳动",
        tooltip: ""
    })
    hp: cc.ProgressBar = null;

    /**
     * 小鸟动画
     */
    _sprite: INFO = null;

    /**
     * 舞台对象
     */
    _stage: stage = null;

    /**
     * BOSS ID
     */
    _boss_id: number = 0;

    /**
     * 弹跳高度
     */
    _jump_y: number = 0;

    /**
     * 技能类型
     * 1：普通直线子弹
     * 2：调整直线子弹
     * 3：散弹
     * 4：炮弹
     */
    _skill_type: number = 1;

    /**
     * 开始作战
     */
    _start: boolean = false;

    /**
     * 是否死亡
     */
    _death: boolean = false;

    /**
     * 火
     */
    _fire_index: number = 0;

    /**
     * 发射次数
     */
    _shoot_count: number = 0;

    /**
     * 积分
     */
    _score: number = 30;

    // LIFE-CYCLE CALLBACKS:

    init(stage: stage, boss_id: number) {
        this._stage = stage;
        this._boss_id = boss_id;

        this._fire_index = GhysX.modules.unit.random(0, 3);
    }

    play() {
        this.jumpLoop.play(this.jumpLoop.defaultClip.name);

        let seq = cc.sequence(
            cc.moveBy(0.3, cc.v2(-40, 0)),
            cc.moveBy(0.3, cc.v2(0, 0)),
            cc.moveBy(0.3, cc.v2(40, 0)),
            cc.moveBy(0.3, cc.v2(0, 0)),
        );
        this.node.runAction(cc.repeatForever(seq));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.6), cc.callFunc(function () { 
            GhysX.os.audio.playEffect('music/effect/fly', false);
        }))));

        this._start = true;

        this.shoot();
    }

    createBullet() {
        let node = cc.instantiate(this.bulletPrefab);
        let c = node.getComponent(fire);
        c.init(this._fire_index);
        node.setPosition(this.node.getPosition());
        this.node.parent.addChild(node);
    }

    shoot() {
        this._shoot_count++;
        let interval = 0.5;
        if (this._shoot_count == 2) {
            this._shoot_count = 0;
            interval = interval + Math.random() * 2;
        }

        interval = Math.max(interval, Math.max(0.5, interval - interval * (GhysX.db.cache.battle_info.kill_boss_count - 1) / 10));

        this.createBullet();
        let seq = cc.sequence(cc.delayTime(interval), cc.callFunc(function () {
            this.shoot();
        }.bind(this)));
        this.node.runAction(seq);

        GhysX.os.audio.playEffect('music/effect/bossfire', false);
    }

    initSprite(info: INFO) {
        this._sprite = info;
        // let birdPolygonCollider = this.node.getComponent(cc.PolygonCollider);
        let spritePolygonCollider = info.node.getComponent(cc.PolygonCollider);
        // birdPolygonCollider.points = spritePolygonCollider.points;
        spritePolygonCollider.enabled = false;
        let polygonCollider = this.node.addComponent(cc.PolygonCollider);
        polygonCollider.points = spritePolygonCollider.points;
        polygonCollider.tag = 4;
    }

    hit(bullet: bullet) {
        if (this._start) {
            if (GhysX.db.cache.battle_info.kill_boss_count == 0) {
                this.hp.progress -= 0.3;
            } else {
                this.hp.progress -= Math.max(0.1 - (GhysX.db.cache.battle_info.kill_boss_count - 1) / 100, 0.03);
            }

            if (bullet._bullet_type == 4) {
                this.hp.progress = 0;
            }

            if (this.hp.progress <= 0) {
                GhysX.db.cache.battle_info.score += this._score;

                GhysX.db.cache.battle_info.kill_boss_count++;

                switch (bullet._bird._player_id) {
                    case 1:
                        {
                            GhysX.db.cache.battle_info.score1 += this._score;
                        }
                        break;

                    case 2:
                        {
                            GhysX.db.cache.battle_info.score2 += this._score;
                        }
                        break;

                    default:
                        break;
                }

                GhysX.handler.emit('battle_ui_update_draw');

                let stage = this._stage;
                stage.node.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
                    stage.createTree();
                })));

                let x = this.node.x;
                let y = this.node.y;
                let parent = this.node.parent;
                GhysX.graphics.draw({
                    url: 'effects/boss_death/boss_death',
                    mode: GhysX.graphics.MODE.PREFAB,
                    asset_type: cc.Prefab,
                    parent: parent,
                    complete: function (info: INFO) {
                        info.node.x = x;
                        info.node.y = y;
                    }.bind(this)
                });

                this.node.destroy();

                GhysX.os.audio.playEffect('music/effect/bossdie', false);
            } else {
                // this.node.runAction(cc.blink(0.1, 3));
            }
        }
    }

    pause() {
        this.node.pauseAllActions();
    }

    resume() {
        this.node.resumeAllActions();
    }

    onLoad() {
        GhysX.graphics.draw({
            url: 'sprites/%s/%s'.format(2000 + this._boss_id, 2000 + this._boss_id),
            mode: GhysX.graphics.MODE.PREFAB,
            asset_type: cc.Prefab,
            parent: this.node,
            complete: function (info: INFO) {
                this.initSprite(info);
            }.bind(this)
        });

        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start() {

    }

    // update (dt) {}
}
