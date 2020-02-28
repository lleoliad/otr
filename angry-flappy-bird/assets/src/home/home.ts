import { GhysX } from "../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class home extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    init() {
        GhysX.handler.on('open_main_menu', function () {
            GhysX.graphics.draw({
                url: 'prefabs/home/view/main_menu',
                mode: GhysX.graphics.MODE.VIEW,
                group_name: GhysX.graphics.GROUP_NAME.HOME,
                script: 'main_menu', invoke: 'init', params: {}, complete: function (params) {
                    // cc.log('complete', params);
                }
            });
        });

        GhysX.handler.on('open_player_select', function () {
            GhysX.graphics.draw({
                url: 'prefabs/home/view/player_select',
                mode: GhysX.graphics.MODE.VIEW,
                group_name: GhysX.graphics.GROUP_NAME.HOME,
                script: 'player_select', invoke: 'init', params: {}, complete: function (params) {
                    // cc.log('complete', params);
                }
            });
        });

        GhysX.handler.on('open_friends_select', function () {
            GhysX.graphics.draw({
                url: 'prefabs/home/view/friends_select',
                mode: GhysX.graphics.MODE.VIEW,
                group_name: GhysX.graphics.GROUP_NAME.HOME,
                script: 'friends_select', invoke: 'init', params: {}, complete: function (params) {
                    // cc.log('complete', params);
                }
            });
        });
    }

    onLoad() {

    }

    start() {

    }

    onEnable() {
        // GhysX.os.audio.playMusic('sound/bg', true);
        // GhysX.handler.emit('show_banner', { name: '首页底部 Banner', forced: false, adUnitId: 'adunit-781e54f03a457bb3' });
        GhysX.handler.emit('hide_banner', {});
    }

    onDisable() {
        // GhysX.os.audio.stopMusic('sound/bg');
        GhysX.handler.emit('hide_banner', { name: '首页底部 Banner', forced: false, adUnitId: 'adunit-781e54f03a457bb3' });
    }

    // update (dt) {}
}
