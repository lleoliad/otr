import { GhysX } from "../../libs/ghysx/GhysX";
import guide from "../../resources/prefabs/tutorial/guide";
import Opener from "../../libs/ghysx/ui/Opener";

const { ccclass, property } = cc._decorator;

@ccclass
export default class battle_waiting extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "手指",
        tooltip: ""
    })
    guidePrefab: cc.Prefab = null;

    @property({
        type: cc.Node,
        displayName: "个人战",
        tooltip: ""
    })
    player: cc.Node = null;

    @property({
        type: cc.Node,
        displayName: "好友战",
        tooltip: ""
    })
    friends: cc.Node = null;

    /**
     * 开启类型：
     * 0: 战斗开始
     * 1: 战斗暂停
     */
    _open_mode: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onClick(event: cc.Event.EventTouch, params: string) {
        switch (this._open_mode) {
            case 0:
                {
                    GhysX.handler.emit('go');
                    GhysX.handler.emit('jump', null);
                }
                break;

            case 1:
                {
                    GhysX.handler.emit('jump', null);
                }
                break;

            default:
                break;
        }
        GhysX.graphics.manager.close('battle_waiting');
    }

    initOpener(params: { root: cc.Node, data: string, data_source: cc.Component, opener: Opener }) {
        this._open_mode = ~~params.data;
    }

    init(params: { open_mode: number }) {
        this._open_mode = params.open_mode;
    }

    createGuide(parent: cc.Node, position: cc.Vec2) {
        let node = cc.instantiate(this.guidePrefab);
        let c = node.getComponent(guide);
        c.init();
        parent.addChild(node);

        node.setPosition(position || cc.Vec2.ZERO);
    }

    onLoad() {
        switch (GhysX.local.stage_info.type) {
            case 2:
                {
                    this.createGuide(this.friends, cc.v2(-1 * GhysX.gui.frame.node.width / 4, 0));
                    this.createGuide(this.friends, cc.v2(GhysX.gui.frame.node.width / 4, 0));
                }
                break;

            default:
                {
                    this.createGuide(this.player, cc.v2(0, 0));
                }
                break;
        }

        GhysX.handler.emit('battle_ui_off_pause');

        GhysX.handler.emit('show_banner', { name: '战斗等待界面 Banner', forced: true, adUnitId: 'adunit-bea341f00ce5a4ba' });
    }

    start() {

    }

    // update (dt) {}

    onDestroy() {
        GhysX.handler.emit('resume');
        GhysX.handler.emit('hide_banner', { });
        GhysX.handler.emit('battle_ui_on_pause');
    }
}
