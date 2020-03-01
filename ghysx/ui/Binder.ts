import { GhysX } from "../GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Binder extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "预制体",
        tooltip: ""
    })
    prefab: cc.Prefab = null;

    @property({
        displayName: "预制体路径",
        tooltip: ""
    })
    prefabPath: string = '';

    @property({
        type: cc.Component,
        displayName: "窗口",
        tooltip: "窗口根节点"
    })
    root: cc.Component = null;

    @property({
        displayName: "自动加载",
        tooltip: "自动加载"
    })
    auto: boolean = false;

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
        displayName: "自定义名称",
        tooltip: "JSON/TEXT"
    })
    customName: string = 'default';

    /**
     * 装载结束
     */
    _over: boolean = false;

    /**
     * 
     */
    _target: cc.Node = null;

    _target_class: cc.Component = null;

    // LIFE-CYCLE CALLBACKS:

    load() {
        if (this._over) {
            return;
        }

        if (this.prefab) {
            this._over = true;

            cc.log('binder instantiate:', this.prefab.name);

            let node = cc.instantiate(this.prefab);
            let c = node.getComponent(this.prefab.name);
            if (c.initBinder) {
                c.initBinder({ root: this.root, data: this.data, data_source: this.dataSource });
            }
            this.node.addChild(node);
            this._target = node;
            this._target_class = c;
        } else if (this.prefabPath) {
            cc.log('binder load:', this.prefabPath);
            GhysX.loader.load(this.prefabPath, cc.Prefab, null, this.node, cc.Node, function (component: cc.Component, asset: cc.Asset) {
                this.prefab = asset;
                this.load();
            }.bind(this));
        }
    }

    onLoad() {
        if (this.auto) {
            this.load();
        }
    }

    start() {

    }

    // update (dt) {}
}
