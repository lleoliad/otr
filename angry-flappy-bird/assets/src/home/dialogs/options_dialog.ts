import { GhysX } from "../../../libs/ghysx/GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class options_dialog extends cc.Component {

    @property({
        type: cc.Button,
        displayName: "音效开",
        tooltip: ""
    })
    musicOpen: cc.Button = null;

    @property({
        type: cc.Button,
        displayName: "音效关",
        tooltip: ""
    })
    musicClose: cc.Button = null;

    @property({
        type: cc.Button,
        displayName: "特效音开",
        tooltip: ""
    })
    effectOpen: cc.Button = null;

    @property({
        type: cc.Button,
        displayName: "特效音关",
        tooltip: ""
    })
    effectClose: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:
    onClickMusicOpenButton(event: cc.Event.EventTouch, params: string) {
        GhysX.os.audio.musicOff()
        this.musicOpen.node.active = GhysX.os.audio.musicIsOpen();
        this.musicClose.node.active = !GhysX.os.audio.musicIsOpen();
    }

    onClickMusicCloseButton(event: cc.Event.EventTouch, params: string) {
        GhysX.os.audio.musicOn();
        this.musicOpen.node.active = GhysX.os.audio.musicIsOpen();
        this.musicClose.node.active = !GhysX.os.audio.musicIsOpen();
        GhysX.os.audio.playMusic('sound/bg', true);
    }

    onClickEffectOpenButton(event: cc.Event.EventTouch, params: string) {
        GhysX.os.audio.effectOff();
        this.effectOpen.node.active = GhysX.os.audio.effectIsOpen();
        this.effectClose.node.active = !GhysX.os.audio.effectIsOpen();
    }

    onClickEffectCloseButton(event: cc.Event.EventTouch, params: string) {
        GhysX.os.audio.effectOn();
        this.effectOpen.node.active = GhysX.os.audio.effectIsOpen();
        this.effectClose.node.active = !GhysX.os.audio.effectIsOpen();
    }

    onLoad () {
        this.musicOpen.node.active = GhysX.os.audio.musicIsOpen();
        this.musicClose.node.active = !GhysX.os.audio.musicIsOpen();

        this.effectOpen.node.active = GhysX.os.audio.effectIsOpen();
        this.effectClose.node.active = !GhysX.os.audio.effectIsOpen();
    }

    start () {

    }

    // update (dt) {}
}
