import { GhysX } from "../../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class main_menu extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    onClickMusicButton(event: cc.Event.EventTouch, params: string) {
        let isOpen = GhysX.os.audio.isOpen();
        if (isOpen) {
            GhysX.os.audio.musicOff();
            GhysX.os.audio.effectOff();
        } else {
            GhysX.os.audio.musicOn();
            GhysX.os.audio.effectOn();
        }
    }

    onClickStartButton(event: cc.Event.EventTouch, params: string) {
        // GhysX.graphics.draw({
        //     url: 'prefabs/ui/stage_manager',
        //     mode: GhysX.graphics.MODE.VIEW,
        //     order: GhysX.graphics.ORDER.BACKGROUND,
        //     script: 'stage_manager', invoke: 'init', params: {}, complete: function (params) {
        //         GhysX.graphics.manager.close('main_menu');
        //         GhysX.graphics.manager.close('background');
        //     }
        // });
    }

    onClickShareButton(event: cc.Event.EventTouch, params: string) {
        GhysX.handler.emit('share', {});
    }

    onclick_start() {
        cc.log('onclick_');
    }

    init() {

    }

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
