import { GhysX } from "../GhysX";

const {ccclass, property} = cc._decorator;

var ScriptExecuteModeEnum = cc.Enum({
    DEFAULT: 0,
    ONLOAD: 1,
    START: 2,
    ONENABLE: 3,
    ONDISABLE: 4,
    ONCLICK: 5,
    ONDESTROY: 6
});

declare class script_info {
    /**
     * 可选参数
     */
    group_name: string;
    handler: string;
    event: string;
    args: {
        event: string;
        window_name: string;
        params: {

        };
    };
}

@ccclass
export default class Scripter extends cc.Component {

    @property({
        displayName: "脚本",
        tooltip: "脚本是一段JSON 文本，结构是参数为：\n"
            + "[{\n"
            + "  group_name: group name\n"
            + "  event: show/hide/close/open\n"
            + "  args:{\n"
            + "    window_name: string\n"
            + "    params: {\n"
            + "      }\n"
            + "  }\n"
            + "}]\n"
    })
    script: string = '[{}]';

    @property({
        type: ScriptExecuteModeEnum,
        displayName: "脚本",
        tooltip: "脚本执行方式"
    })
    executeMode = ScriptExecuteModeEnum.DEFAULT;

    /**
     * 脚本对象
     */
    _script_infos: script_info[] = null;


    // LIFE-CYCLE CALLBACKS:

    onClick(event: cc.Event.EventTouch, params: string) {
        this.execute();
    }

    execute() {
        for (let script_info of this._script_infos) {
            if (script_info) {
                if (script_info.event) {
                    if (script_info.group_name) {
                        GhysX.graphics.manager.group(script_info.event, script_info.group_name);
                    } else {
                        switch (script_info.event) {
                            case 'show':
                                {
                                    GhysX.graphics.manager.show(script_info.args.window_name);
                                }
                                break;
                            
                            case 'hide':
                                {
                                    GhysX.graphics.manager.hide(script_info.args.window_name);
                                }
                                break;
            
                            case 'close':
                                {
                                    GhysX.graphics.manager.close(script_info.args.window_name);
                                }
                                break;
            
                            case 'open':
                                {
                                    GhysX.graphics.draw(script_info.args);
                                }
                                break;
                        
                            default:
                                break;
                        }
                    }
                } else if (script_info.handler) {
                    GhysX.handler.emit(script_info.handler, script_info.args);
                }
            }
        }
    }

    onLoad () {
        try {
            this._script_infos = JSON.parse(this.script || '{}') as script_info[];
        } catch (error) {
            cc.log(error);            
        }

        switch (this.executeMode) {
            case ScriptExecuteModeEnum.DEFAULT:
                {

                }
                break;

            case ScriptExecuteModeEnum.ONLOAD:
                {
                    this.execute();
                }
                break;

            case ScriptExecuteModeEnum.START:
                {
                    
                }
                break;

            case ScriptExecuteModeEnum.ONCLICK:
                {
                    var clickEventHandler = new cc.Component.EventHandler();
                    clickEventHandler.target = this.node;
                    clickEventHandler.component = "Scripter";
                    clickEventHandler.handler = "onClick";
                    clickEventHandler.customEventData = "";

                    var button = this.node.getComponent(cc.Button);
                    if (!button) {
                        button = this.node.addComponent(cc.Button);
                    }
                    button.clickEvents.push(clickEventHandler);
                }
                break;
        
            default:
                break;
        }
    }

    start () {
        if (ScriptExecuteModeEnum.START == this.executeMode) {
            this.execute();
        }
    }

    onEnable() {
        if (ScriptExecuteModeEnum.ONENABLE == this.executeMode) {
            this.execute();
        }
    }

    onDisable() {
        if (ScriptExecuteModeEnum.ONDISABLE == this.executeMode) {
            this.execute();
        }
    }

    // update (dt) {}

    onDestroy() {
        if (ScriptExecuteModeEnum.ONDESTROY == this.executeMode) {
            this.execute();
        }
    }
}
