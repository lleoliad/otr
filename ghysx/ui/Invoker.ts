import { GhysX } from "../GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Invoker extends cc.Component {

    @property({
        displayName: "事件名称",
        tooltip: "事件名称"
    })
    event: string = '';

    @property({
        displayName: "事件参数",
        tooltip: "事件参数"
    })
    args: string = '';

    // LIFE-CYCLE CALLBACKS:

    onClick(event: cc.Event.EventTouch, params: string) {
        if (this.event) {
            GhysX.handler.emit(this.event, this.args);
        }
    }

    onLoad () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Invoker";
        clickEventHandler.handler = "onClick";
        clickEventHandler.customEventData = "";

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    }

    // start () {

    // }

    // update (dt) {}
}
