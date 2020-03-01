import * as Graphics from "../core/Graphics";
import { GhysX } from "../GhysX";

const { ccclass, property } = cc._decorator;

var OrderEnum = cc.Enum(Graphics.ORDER);
var GroupNameEnum = cc.Enum({
    DEFAULT: 0,
    BACKGROUND: 1,
    WORLD: 2,
    HOME: 3,
    UI: 4,
    BATTLE: 5,
    ACTIVE: 6,
    NOTIFICATION: 7
});

@ccclass
export default class Opener extends cc.Component {

    @property({
        displayName: "预制资源路径",
        tooltip: "预制资源路径"
    })
    prefabPath: string = '';

    @property({
        type: cc.Prefab,
        displayName: "预制资源路径",
        tooltip: "预制资源路径"
    })
    windowPrefab: cc.Prefab = null;

    @property({
        displayName: "打开的窗口名",
        tooltip: "打开的窗口名"
    })
    window_name: string = '';

    @property({
        type: GroupNameEnum,
        displayName: "窗口所属分组",
        tooltip: "窗口所属分组名"
    })
    group_name = GroupNameEnum.DEFAULT;

    @property({
        type: cc.Component,
        displayName: "绘图根组件",
        tooltip: "绘图根组件"
    })
    root: cc.Component = null;

    @property({
        type: OrderEnum,
        displayName: "绘图层级",
        tooltip: "绘图层级:\n_frameview: 0;\n_background: 100;\n_view: 200;\n_dview: 300;\n_viewdialog: 400;\n_taskbar: 500;\n_ui: 600;\n_windows: 700;\n_dialog: 800;\n_notification: 900;\n_screen: 1000;\n_system: 1100;\n_display_log: 1200;\n_border: 1300;\n"
    })
    order = OrderEnum.VIEW;

    @property({
        displayName: "窗口参数",
        tooltip: "窗口参数JSON/TEXT"
    })
    data: string = '';

    @property({
        // type: cc.Boolean,
        displayName: "启动加载",
        tooltip: "是否在界面启动的时候自动加载界面"
    })
    startLoad: boolean = false;

    @property({
        type: cc.Component,
        displayName: "数据源",
        tooltip: "数据源"
    })
    dataSource: cc.Component = null;

    @property({
        displayName: "当前的窗口名",
        tooltip: "当前的窗口名"
    })
    current_window_name: string = '';

    @property({
        displayName: "按钮响应参数",
        tooltip: "按钮响应参数"
    })
    event_param: string = '';

    @property({
        displayName: "按钮响应消息",
        tooltip: "按钮响应消息，可能共用事件组响应"
    })
    click_event: string = '';

    @property({
        displayName: "加载结束事件",
        tooltip: "JSON/TEXT"
    })
    completedEvent: string = '';

    @property({
        displayName: "关闭窗口",
        tooltip: "关闭窗口名称"
    })
    close_window_name: string = '';

    /**
     * 当前响应的按钮
     */
    _button: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onClick(event: cc.Event.EventTouch, params: string) {
        let component = null;
        let func = null;
        if (this.dataSource) {
            component = this.dataSource;
            func = component['check_' + this.node.name];
        }
        if (!func && this.current_window_name) {
            let info: Graphics.INFO = GhysX.graphics.manager.find(this.current_window_name);
            if (info && info.component) {
                func = info.component['check_' + this.node.name];
            }
        }
        if (func) {
            let success = func.call(component, event, { target: this });
            if (!success) {
                return;
            }
        }

        if (this.window_name) {
            let view = GhysX.graphics.manager.find(this.window_name);
            if (view) {
                if (!view.node.active) {
                    GhysX.graphics.manager.show(this.window_name);
                }
                this.click(event, { view: view, data: null, data_source: this.dataSource, target: this });
                return;
            }
        }

        GhysX.graphics.draw({
            url: this.prefabPath,
            mode: GhysX.graphics.MODE.VIEW,
            order: this.order < 0 ? GhysX.graphics.ORDER.VIEW : this.order , // GhysX.graphics.ORDER.BACKGROUND,
            group_name: this.group_name,
            canvas: this.root ? this.root.node : null,
            script: this.window_name, invoke: 'initOpener', params: { root: this.root, data: this.data, data_source: this.dataSource, opener: this }, complete: function (info: Graphics.INFO) {
                let args = { view: info, data: this.data, data_source: this.dataSource, target: this };
                let completed_event = this.completedEvent;
                if (completed_event) {
                    GhysX.handler.emit(completed_event, event, args);
                }
                this.click(event, args);
                if (this.close_window_name) {
                    GhysX.graphics.manager.close(this.close_window_name);
                }
            }.bind(this)
        });
    }

    click(event: cc.Event.EventTouch, args: { view: Graphics.INFO, data: any, data_source: cc.Component, target: Opener }) {
        // let completed_event = this.completedEvent;
        // if (completed_event) {
        //     jkit.handler.emit(completed_event, event, args);
        // }

        if (this.click_event) {
            GhysX.handler.emit(this.click_event, event, args);
        }

        let component = null;
        let func = null;
        if (this.dataSource) {
            component = this.dataSource;
            func = component['onclick_' + this.node.name];
        }
        if (!func && this.current_window_name) {
            component = GhysX.graphics.manager.find(this.current_window_name).component;
            if (component) {
                func = component['onclick_' + this.node.name];
            }
        }
        if (func) {
            func.call(component, event, args);
        }
    }

    onLoad() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Opener";
        clickEventHandler.handler = "onClick";
        clickEventHandler.customEventData = "";

        var button = this.node.getComponent(cc.Button);
        if (button) {
            button.clickEvents.push(clickEventHandler);
            this._button = button;
        }

        this.group_name = Graphics.GROUP_NAME[GroupNameEnum[this.group_name]];
        cc.log(this.group_name);
    }

    start() {
        if (this.startLoad) {
            this.onClick(null, null);
        }
    }

    // update (dt) {}
}