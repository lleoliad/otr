import { GhysX } from "../GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Closer extends cc.Component {

    @property({
        type: cc.Component,
        displayName: "根组件",
        tooltip: ""
    })
    root: cc.Component = null;

    @property({
        displayName: "窗口名",
        tooltip: "TEXT"
    })
    window_name: string = '';

    @property({
        displayName: "参数",
        tooltip: "JSON/TEXT"
    })
    data: string = '';

    @property({
        type: cc.Component,
        displayName: "数据源",
        tooltip: ""
    })
    dataSource: cc.Component = null;

    @property({
        displayName: "结束事件",
        tooltip: "JSON/TEXT"
    })
    completedEvent: string = '';

    // LIFE-CYCLE CALLBACKS:

    onClick(event: cc.Event.EventTouch, params: string) {
        let component = null;
        let func = null;
        if (this.dataSource) {
            component = this.dataSource;
            func = component['check_' + this.node.name];
        }
        if (!func && this.window_name) {
            component = GhysX.graphics.manager.find(this.window_name);
            if (component) {
                func = component['check_' + this.node.name];
            }
        }
        if (func) {
            let success = func.call(component, event, { target: this });
            if (!success) {
                return;
            }
        }
        
        if (this.completedEvent) {
            GhysX.handler.emit(this.completedEvent, { data: this.data, data_source: this.dataSource });
        }

        if (this.root) {
            this.root.node.destroy();
        } else if (this.window_name) {
            GhysX.graphics.manager.close(this.window_name);
        } else {
            this.node.destroy();
        }
    }

    onLoad() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Closer";
        clickEventHandler.handler = "onClick";
        clickEventHandler.customEventData = "";

        var button = this.node.getComponent(cc.Button);
        if (!button) {
            // button = new cc.Button();
            button = this.node.addComponent(cc.Button);
        }
        button.clickEvents.push(clickEventHandler);
    }

    start() {

    }

    // update (dt) {}
}
