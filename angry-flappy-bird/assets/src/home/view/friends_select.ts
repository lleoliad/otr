import { GhysX } from "../../../libs/ghysx/GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class friends_select extends cc.Component {

    /**
     * 开战状态，等于2时，表示 player1、player2都已经选择好了小鸟；
     */
    _status: number = 0;

    // LIFE-CYCLE CALLBACKS:

    init() {
        
    }

    onLoad() {
        GhysX.local.stage_info.type = 2;
        GhysX.local.stage_info.id = 2;
        
        GhysX.handler.on('start_battle', function () {
            this._status++;
            if (this._status == 2) {
                GhysX.graphics.draw({
                    url: 'prefabs/battle/battle',
                    mode: GhysX.graphics.MODE.VIEW,
                    order: GhysX.graphics.ORDER.BACKGROUND,
                    group_name: 'battle',
                    script: 'battle', invoke: 'init', params: { chapter_mould: GhysX.res.chapter_moulds[GhysX.local.stage_info.id] }, complete: function (params) {
                        // cc.log('complete', params);
                        GhysX.graphics.manager.close('friends_select')
                    }
                });
            }
        }, this);
    }

    start () {
        GhysX.handler.emit('hide_banner', {});
    }

    // update (dt) {}
}
