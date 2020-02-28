import { GhysX } from "../../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class bird_element extends cc.Component {

    @property({
        type: cc.Node,
        displayName: "图标背景框组件",
        tooltip: ""
    })
    boxs: cc.Node[] = [];

    @property({
        type: cc.Sprite,
        displayName: "图标组件",
        tooltip: ""
    })
    icon: cc.Sprite = null;

    @property({
        type: cc.Button,
        displayName: "选择按钮",
        tooltip: ""
    })
    btn: cc.Button = null;

    @property({
        type: cc.Label,
        displayName: "解锁提示文字",
        tooltip: ""
    })
    unlock: cc.Label = null;

    /**
     * 类型
     * 0: 个人
     * 1: 玩家1
     * 2: 玩家2
     */
    _type: number = 0;

    /**
     * 编号
     */
    _index: number = 0;

    /**
     * 选中状态
     */
    _select: boolean = false;

    // LIFE-CYCLE CALLBACKS:
    onClickButton(event: cc.Event.EventTouch, params: string) {
        GhysX.handler.emit('select_bird_element', this);
        GhysX.os.audio.playEffect('music/effect/select', false);
    }

    init(_type: number, index: number) {
        this._type = _type;
        this._index = index;
    }

    select() {
        this.boxs[0].active = false;
        this.boxs[1].active = true;

        this._select = true;
    }

    unselect() {
        this.boxs[0].active = true;
        this.boxs[1].active = false;

        this._select = false;
    }

    onLoad () {
        GhysX.graphics.draw({
            url: 'sprites/%s/%s'.format(1000 + this._index, 1000 + this._index),
            mode: GhysX.graphics.MODE.ATLAS,
            asset_type: cc.SpriteAtlas,
            asset_name: '1',
            target: this.icon
        });

        (this.btn as any)._onTouchBegan = (this.btn as any).__onTouchBegan;
    }

    start() {

    }

    // update (dt) {}
}
