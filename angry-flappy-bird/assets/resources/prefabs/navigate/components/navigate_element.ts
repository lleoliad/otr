const {ccclass, property} = cc._decorator;

@ccclass
export default class navigate_element extends cc.Component {

    @property({
        type: cc.Asset,
        displayName: "图标资源",
        tooltip: ""
    })
    asset: cc.Asset = null;

    @property({
        type: cc.Sprite,
        displayName: "图标",
        tooltip: ""
    })
    icon: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.icon.spriteFrame = (this.asset as cc.SpriteFrame);
    }

    start () {

    }

    // update (dt) {}
}
