const { ccclass, property } = cc._decorator;

@ccclass
export default class tip_message extends cc.Component {

    @property({
        type: cc.Label,
        displayName: "提示信息",
        tooltip: "提示信息"
    })
    message: cc.Label = null;

    /**
     * 提示文本
     */
    _message_string: string;

    // LIFE-CYCLE CALLBACKS:
    init(params: { message: string }) {
        this._message_string = params.message;
    }

    playOver() {
        this.node.destroy();
    }

    onLoad() {
        this.message.string = this._message_string;
    }

    start() {

    }

    // update (dt) {}
}
