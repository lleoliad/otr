import { GhysX } from "../../../../libs/ghysx/GhysX";
import bird from "../elements/bird";
import { complete } from "../../../../libs/ghysx/core/Graphics";
import tree from "../elements/tree";
import boss from "../elements/boss";
import spikes from "../elements/spikes";
import grass from "../elements/grass";
import AnimationEventListener from "../../../../libs/ghysx/common/prefab/utils/AnimationEventListener";
import flotage from "../elements/flotage";
import fruits from "../elements/fruits";

const { ccclass, property } = cc._decorator;

@ccclass
export default class stage extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "钢钉组件",
        tooltip: ""
    })
    spikesPrefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "下方青草组件",
        tooltip: ""
    })
    grassPrefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "小鸟组件",
        tooltip: ""
    })
    birdPrefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "树组件",
        tooltip: ""
    })
    treePrefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "boss组件",
        tooltip: ""
    })
    bossPrefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "漂浮组件",
        tooltip: ""
    })
    flotagePrefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "水果漂浮组件",
        tooltip: ""
    })
    fruitsPrefab: cc.Prefab = null;

    @property({
        type: cc.Node,
        displayName: "地图层",
        tooltip: ""
    })
    map: cc.Node = null;

    @property({
        type: cc.Animation,
        displayName: "地图层动画",
        tooltip: ""
    })
    mapAnimation: cc.Animation = null;

    @property({
        type: cc.Node,
        displayName: "顶层",
        tooltip: ""
    })
    top: cc.Node = null;

    @property({
        type: cc.Node,
        displayName: "小鸟-个人战",
        tooltip: ""
    })
    bird: cc.Node = null;

    @property({
        type: cc.Node,
        displayName: "小鸟-好友战",
        tooltip: ""
    })
    birds: cc.Node[] = [];

    @property({
        type: cc.Node,
        displayName: "对象层",
        tooltip: ""
    })
    targets: cc.Node = null;

    @property({
        type: cc.Node,
        displayName: "底层",
        tooltip: ""
    })
    bottom: cc.Node = null;

    /**
     * 战斗结束
     */
    _over: boolean = false;

    /**
     * 出现树的数量
     */
    _tree_count: number = 0;

    /**
     * 出现BOSS的概率
     */
    _boss_rate: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onTouchStart(event: cc.Event.EventTouch, params: string) {
        if (this._over) {
            return;
        }

        // this._white_ball.onTouchStart(event, params);
        GhysX.handler.emit('jump', event);
    }

    onTouchMove(event: cc.Event.EventTouch, params: string) {
        // this._white_ball.onTouchMove(event, params);
    }

    onTouchEnd(event: cc.Event.EventTouch, params: string) {
        // this._white_ball.onTouchEnd(event, params);
    }

    onTouchCancel(event: cc.Event.EventTouch, params: string) {
        // this._white_ball.onTouchCancel(event, params);
    }

    init() {

    }

    createSpikes() {
        let node = cc.instantiate(this.spikesPrefab);
        let c = node.getComponent(spikes);
        this.map.addChild(node);

        node.setPosition(cc.v2(node.x, GhysX.gui.frame.node.height / 2));
    }

    createGrass() {
        let node = cc.instantiate(this.grassPrefab);
        let c = node.getComponent(grass);
        this.map.addChild(node);

        node.setPosition(cc.v2(node.x, -1 * GhysX.gui.frame.node.height / 2));
    }

    createBird(parent: cc.Node, bird_id: number, player_id: number) {
        let node = cc.instantiate(this.birdPrefab);
        let c = node.getComponent(bird);
        c.init(this, bird_id, player_id);
        parent.addChild(node);

        switch (player_id) {
            case 1:
                {
                    GhysX.db.cache.battle_info.bird1 = c;
                }
                break;

            default:
                {
                    GhysX.db.cache.battle_info.bird2 = c;
                }
                break;
        }
    }

    createTree() {
        if (this._over) {
            return;
        }

        let limit_count = 3;
        if (GhysX.db.cache.battle_info.tree_count) {
            limit_count = 6;
        }
        if (this._tree_count > limit_count) {
            this._boss_rate += 10;
            if (this._boss_rate >= GhysX.modules.unit.random(1, 100)) {
                this._tree_count = 0;
                this._boss_rate = 0;
                this.createBoss();
                return;
            }
        }

        let node = cc.instantiate(this.treePrefab);
        let c = node.getComponent(tree);
        c.init();
        this.top.addChild(node);

        let y = -1 * GhysX.gui.frame.node.height / 2 - Math.random() * (1330 - GhysX.gui.frame.node.height);
        let ay = Math.abs(y) - GhysX.gui.frame.node.height / 2;

        // node.setPosition(cc.v2(1000, y));
        node.setPosition(cc.v2(800, y));

        let rnodes: cc.Node[] = [];
        for (let child of node.children) {
            if (ay > child.y + child.height || ay + GhysX.gui.frame.node.height < child.y - child.height) {
                child.active = false;
                rnodes.push(child);
            }
        }

        for (let child of rnodes) {
            child.removeFromParent(true);
        }

        rnodes = null;

        // let t = 5;
        // let pos = cc.v2(-1000, y);
        let t = 4;
        let pos = cc.v2(-800, y);
        let seq = cc.sequence(cc.spawn(cc.moveTo(t, pos), cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            this.createTree();
        }.bind(this)))),
            cc.callFunc(function (sender) {
                sender.destroy();
            }.bind(this)));
        node.runAction(seq);

        this._tree_count++;
        GhysX.db.cache.battle_info.tree_count++;
    }

    createBoss() {
        let node = cc.instantiate(this.bossPrefab);
        let c = node.getComponent(boss);
        c.init(this, GhysX.modules.unit.random(1, 5));
        // c.init(this, 1);
        this.node.addChild(node);

        let y = 0; // -1 * GhysX.gui.frame.node.height / 2;
        node.setPosition(cc.v2(1000, y));

        let t = 1.5;
        let pos = cc.v2(400, y);
        let seq = cc.sequence(cc.moveTo(t, pos),
            cc.callFunc(function (sender) {
                c.play();
            }.bind(this)));
        node.runAction(seq);
    }

    createFlotage() {
        if (30 >= GhysX.modules.unit.random(1, 100)) {
            let node = cc.instantiate(this.flotagePrefab);
            let c = node.getComponent(flotage);
            c.init(this, GhysX.modules.unit.random(1, 4));
            // c.init(this, 4);
            this.targets.addChild(node);

            let h = GhysX.gui.frame.node.height * 4 / 5;
            let half_h = h / 2;
            let start_y = -1 * half_h;
            let y = start_y + Math.random() * h;

            // node.setPosition(cc.v2(1000, y));
            node.setPosition(cc.v2(800, y));

            // let t = 5 + GhysX.modules.unit.random(-100, 100) / 100 * 1;
            // let pos = cc.v2(-1000, y);
            let t = 4 + GhysX.modules.unit.random(-100, 100) / 100 * 1;
            let pos = cc.v2(-800, y);
            let seq = cc.sequence(cc.moveTo(t, pos),
                cc.callFunc(function (sender) {
                    sender.destroy();
                }.bind(this)));
            node.runAction(seq);
        }

        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            this.createFlotage();
        }.bind(this))));
    }

    createFruits() {
        if (80 >= GhysX.modules.unit.random(1, 100)) {
            let node = cc.instantiate(this.fruitsPrefab);
            let c = node.getComponent(fruits);
            c.init(this, GhysX.modules.unit.random(1, 17));
            // c.init(this, 4);
            this.targets.addChild(node);

            let h = GhysX.gui.frame.node.height * 4 / 5;
            let half_h = h / 2;
            let start_y = -1 * half_h;
            let y = start_y + Math.random() * h;

            // node.setPosition(cc.v2(1000, y));
            node.setPosition(cc.v2(800, y));

            // let t = 5 + GhysX.modules.unit.random(-100, 100) / 100 * 1;
            // let pos = cc.v2(-1000, y);
            let t = 4 + GhysX.modules.unit.random(-100, 100) / 100 * 1;
            let pos = cc.v2(-800, y);
            let seq = cc.sequence(cc.moveTo(t, pos),
                cc.callFunc(function (sender) {
                    sender.destroy();
                }.bind(this)));
            node.runAction(seq);
        }

        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            this.createFruits();
        }.bind(this))));
    }

    go() {
        GhysX.db.cache.battle_info.start_time = new Date().getTime();
        this.createTree();
        this.createFlotage();
        this.createFruits();

        GhysX.handler.emit('battle_ui_update_draw');
    }

    pause() {
        this.node.pauseAllActions();
        this.top.pauseAllActions();
        this.bottom.pauseAllActions();
        this.targets.pauseAllActions();

        this.mapAnimation.pause(this.mapAnimation.defaultClip.name);
    }

    resume() {
        this.node.resumeAllActions();
        this.top.resumeAllActions();
        this.bottom.resumeAllActions();
        this.targets.resumeAllActions();

        this.mapAnimation.resume(this.mapAnimation.defaultClip.name);
    }

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel.bind(this), this);

        this.createSpikes();
        this.createGrass();

        GhysX.handler.on('go', this.go, this);
        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);

        GhysX.handler.on('boss-death-over', function (listener: AnimationEventListener, evnet_name: string, args: any) {
            listener.node.destroy();
        }.bind(this));

        GhysX.handler.on('battle_over', function (params) {
            if (this._over) {
                return;
            }

            if (GhysX.db.cache.battle_info.role_count == 1) {
                if (GhysX.db.cache.battle_info.revive) {
                    GhysX.db.cache.battle_info.revive = GhysX.modules.unit.random(1, 100) <= 50;
                    GhysX.graphics.draw({
                        url: 'prefabs/battle/view/give_skill',
                        mode: GhysX.graphics.MODE.VIEW,
                        order: GhysX.graphics.ORDER.VIEW_DIALOG,
                        group_name: 'battle',
                        script: 'give_skill', invoke: 'init', params: { revive: true }, complete: function (params) {

                        }.bind(this)
                    });
                    return;
                }
            }

            GhysX.db.cache.battle_info.role_count--;

            if (GhysX.db.cache.battle_info.role_count == 0) {
                this._over = true;
                GhysX.graphics.draw({
                    url: 'prefabs/battle/battle_result',
                    mode: GhysX.graphics.MODE.VIEW,
                    order: GhysX.graphics.ORDER.VIEW,
                    group_name: 'battle',
                    script: 'battle_result', invoke: 'init', params: {}, complete: function (params) {

                    }
                });
            }
        }, this);

        switch (GhysX.local.stage_info.type) {
            case 1:
                {
                    this.createBird(this.bird, GhysX.local.stage_info.bird1, 1);
                }
                break;

            default:
                {
                    this.createBird(this.birds[0], GhysX.local.stage_info.bird1, 1);
                    this.createBird(this.birds[1], GhysX.local.stage_info.bird2, 2);
                }
                break;
        }
    }

    start() {

    }

    // update (dt) {}

    onDestroy() {
        GhysX.handler.off('beyond-pool');
        GhysX.handler.off('score-effect-play-over');
    }
}
