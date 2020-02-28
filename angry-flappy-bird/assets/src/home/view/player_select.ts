import { GhysX } from "../../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class player_select extends cc.Component {
    
    // LIFE-CYCLE CALLBACKS:

    init() {

    }

    onLoad() {
        GhysX.local.stage_info.type = 1;
        GhysX.local.stage_info.id = 1;

        GhysX.handler.on('start_battle', function () {
            GhysX.graphics.draw({
                url: 'prefabs/battle/battle',
                mode: GhysX.graphics.MODE.VIEW,
                order: GhysX.graphics.ORDER.BACKGROUND,
                group_name: 'battle',
                script: 'battle', invoke: 'init', params: { chapter_mould: GhysX.res.chapter_moulds[GhysX.local.stage_info.id] }, complete: function (params) {
                    // cc.log('complete', params);
                    GhysX.graphics.manager.close('player_select')
                }
            });
        }, this);
    }

    start() {
        GhysX.handler.emit('hide_banner', {});
    }

    // update (dt) {}
}
