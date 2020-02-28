import { GhysX } from "../../libs/ghysx/GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class battle_pause extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    onClickShareButton(event: cc.Event.EventTouch, params: string) {
        GhysX.handler.emit('share', {});
    }

    onClickExitButton(event: cc.Event.EventTouch, params: string) {
        
    }
    
    init() {
        // [{"group_name":"battle","event":"close","args":{}},{"group_name":"home","event":"show","args":{}}]
        // [{"handler":"exit_battle","args":{}}]
    }

    onLoad () {
        // if (50 < GhysX.modules.unit.random(1, 100)) {
        //     GhysX.handler.emit('show_banner', { name: '战斗暂停界面 Banner', forced: true, adUnitId: 'adunit-296dc29e08573227' });
        // } else {
        //     GhysX.handler.emit('create_interstitial_ad', { name: '战斗暂停界面-插屏', adUnitId: 'adunit-11916d5ff8fb319b' });
        // }
        GhysX.handler.emit('show_banner', { name: '战斗暂停界面 Banner', forced: true, adUnitId: 'adunit-296dc29e08573227' });
        GhysX.handler.emit('create_interstitial_ad', { name: '战斗暂停界面-插屏', adUnitId: 'adunit-11916d5ff8fb319b' });
    }

    start () {

    }

    // update (dt) {}
}
