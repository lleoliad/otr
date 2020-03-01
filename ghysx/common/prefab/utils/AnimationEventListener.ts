import { GhysX } from "../../../GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimationEventListener extends cc.Component {

    @property({
        type: cc.Node,
        displayName: "动画根节点",
        tooltip: ""
    })
    root: cc.Node = null;

    @property({
        // type: cc.String,
        displayName: "脚本",
        tooltip: ""
    })
    script: string = "";

    // LIFE-CYCLE CALLBACKS:
    listener(...args) {
        if (args && args.length) {
            let event_name = args.shift();
            if (this.root) {
                let scriptComponent = this.root.getComponent(this.script || this.root.name);
                if (scriptComponent) {
                    let func = scriptComponent[event_name];
                    if (func) {
                        func.apply(scriptComponent, this, event_name, Array.prototype.slice.call(args));
                        return;
                    }
                }
            } else {
                GhysX.handler.emit(this.script, this, event_name, Array.prototype.slice.call(args));
            }
        }
    }

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
