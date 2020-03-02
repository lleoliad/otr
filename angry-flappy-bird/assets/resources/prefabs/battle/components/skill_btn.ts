import { GhysX } from "../../../../libs/ghysx/GhysX";
import bird from "../../map/elements/bird";

const { ccclass, property } = cc._decorator;

@ccclass
export default class skill_btn extends cc.Component {

    @property({
        type: cc.Label,
        displayName: "技能数量",
        tooltip: ""
    })
    count: cc.Label = null;

    @property({
        // type: cc.Label,
        displayName: "技能类型",
        tooltip: ""
    })
    skill_type: number = -1;

    /**
     * 小鸟
     */
    _bird: bird = null;

    /**
     * 玩家 ID
     */
    _player_id: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onClickButton(event: cc.Event.EventTouch, params: string) {
        let count = ~~this.count.string;
        if (count > 0) {
            count--;
            this.count.string = '' + count;
            GhysX.handler.emit('battle_ui_add_skill_' + this._player_id, this._player_id == 1 ? GhysX.db.cache.battle_info.bird1 : GhysX.db.cache.battle_info.bird2, ~~this.skill_type);

            if (count <= 0) {
                // this.node.active = false;
            }
        } else {
            GhysX.handler.emit('pause');
            GhysX.graphics.manager.listener('start', 'battle_waiting', function () {
                GhysX.graphics.draw({
                    url: 'prefabs/battle/view/give_skill',
                    mode: GhysX.graphics.MODE.VIEW,
                    order: GhysX.graphics.ORDER.VIEW_DIALOG,
                    group_name: 'battle',
                    script: 'give_skill', invoke: 'init', params: { buy_type: this.skill_type }, complete: function (params) {

                    }.bind(this)
                });
            }.bind(this), null);

            GhysX.graphics.draw({
                url: 'prefabs/battle/battle_waiting',
                mode: GhysX.graphics.MODE.VIEW,
                order: GhysX.graphics.ORDER.BACKGROUND,
                group_name: GhysX.graphics.GROUP_NAME.BATTLE,
                script: 'battle_waiting', invoke: 'init', params: { open_mode: 1 }, complete: function (params) {

                }.bind(this)
            });
        }
    }

    onLoad() {

    }

    start() {

    }

    // update (dt) {}
}
