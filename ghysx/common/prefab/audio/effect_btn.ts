import { GhysX } from "../../../GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class effect_btn extends cc.Component {

    @property({
        type: cc.Button,
        displayName: "音效按钮",
        tooltip: ""
    })
    btn: cc.Button = null;

    @property({
        type: cc.Sprite,
        displayName: "音效按钮纹理",
        tooltip: ""
    })
    texture: cc.Sprite = null;

    @property({
        type: cc.SpriteFrame,
        displayName: "音效按钮纹理数组",
        tooltip: ""
    })
    textures: cc.SpriteFrame[] = [];

    // LIFE-CYCLE CALLBACKS:
    onClickButton(event: cc.Event.EventTouch, params: string) {
        if (GhysX.os.audio.effectIsOpen()) {
            GhysX.os.audio.effectOff();
        } else {
            GhysX.os.audio.effectOn();
        }
        this.updateDraw();
    }

    updateDraw() {
        switch (this.btn.transition) {
            case cc.Button.Transition.SCALE:
                {
                    if (GhysX.os.audio.effectIsOpen()) {
                        this.texture.spriteFrame = this.textures[0];
                    } else {
                        this.texture.spriteFrame = this.textures[1];
                    }
                }
                break;
        
            default:
                break;
        }
    }

    onLoad () {
        this.updateDraw();
    }

    start () {

    }

    // update (dt) {}
}
