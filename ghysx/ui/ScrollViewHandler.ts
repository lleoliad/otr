import { GhysX } from "../GhysX";

const { ccclass, property } = cc._decorator;

declare class scroll_view_item_info {
    item_index: number;
    prefab: cc.Prefab;
    parent: cc.Node;
    params: any
}

@ccclass
export default class ScrollViewHandler extends cc.Component {

    @property({
        type: cc.Component,
        displayName: "目标组件",
        tooltip: "目标组件"
    })
    componet: cc.Component = null;

    @property({
        type: cc.ScrollView,
        displayName: "滚动窗口",
        tooltip: "滚动窗口"
    })
    scrollView: cc.ScrollView = null;

    @property({
        // type: cc.Boolean,
        displayName: "启动加载",
        tooltip: "是否在界面启动的时候自动加载界面"
    })
    startLoad: boolean = false;

    @property({
        displayName: "创建元素事件",
        tooltip: ""
    })
    createEventName: string = '';

    @property({
        displayName: "创建元素事件参数",
        tooltip: ""
    })
    createEventParam: string = '';

    /**
     * 绘图数据列表
     */
    @property({ visible: false })
    _item_infos: scroll_view_item_info[] = [];

    /**
     * 列表对象
     */
    @property({ visible: false })
    _item_cells: cc.Component[] = [];

    // LIFE-CYCLE CALLBACKS:
    
    /**
     * 列表效率优化绘图方案
     * @param scrollView 
     * @param event 
     */
    scrollingCallback(scrollView: cc.ScrollView, event: cc.ScrollView.EventType) {
        // this.scrollNpcListView();
        switch (event) {
            case cc.ScrollView.EventType.SCROLL_BEGAN:
                // cc.log('SCROLL_BEGAN');
                break;

            case cc.ScrollView.EventType.SCROLLING:
                // cc.log('SCROLLING');
                break;

            case cc.ScrollView.EventType.SCROLL_ENDED:
                // cc.log('SCROLL_ENDED');
                break;

            default:
                break;
        }

        let view_top = -scrollView.content.y;
        let view_bottom = view_top - scrollView.node.height;
        this._item_cells.forEach((value, key) => {
            // cc.log(key, value.node.y, value.node.height);
            let ty = value.node.parent.y + value.node.parent.height / 2;
            let by = value.node.parent.y - value.node.parent.height / 2;
            let active = value.node.active;
            if (view_top >= ty && ty >= view_bottom || view_top >= by && by >= view_bottom) {
                active = true;
            } else {
                active = false;
            }

            if (active != value.node.active) {
                value.node.active = active;
            }
        });
    }

    createCell(item_info: scroll_view_item_info) {
        let func = this.componet['createCell'];
        if (func) {
            let c = func(item_info);
            
            this._item_cells.push(c);

            let item = c.node;

            let view_top = -this.scrollView.content.y;
            let view_bottom = view_top - this.scrollView.node.height;
            let ty = item.parent.y + item.parent.height / 2;
            let by = item.parent.y - item.parent.height / 2;
            if (view_top >= ty && ty >= view_bottom || view_top >= by && by >= view_bottom) {
                item.active = true;
            } else {
                item.active = false;
            }
        }
    }

    createItem() {
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function (sender) {
            if (this._item_infos.length > 0) {
                let item_info: scroll_view_item_info = this._item_infos[0];
                this._item_infos.splice(0, 1);
                this.createCell(item_info);
            }
            if (this._item_infos.length > 0) {
                this.createItem();
            }
        }.bind(this))));
    }

    createNode() {
        let index = 0;
        for (let key in this._item_infos) {
            let item_info: scroll_view_item_info = this._item_infos[key];

            let item = new cc.Node();
            // item.anchorX = item_info.prefab.data.anchorX;
            // item.anchorY = item_info.prefab.data.anchorY;
            // item.x = item_info.prefab.data.x;
            // item.y = item_info.prefab.data.y;
            item.width = item_info.prefab.data.width;
            item.height = item_info.prefab.data.height;
            this.scrollView.content.addChild(item);

            item_info.item_index = index++;
            item_info.parent = item;
        }
    }

    onLoad() {
        if (this.createEventName) {
            GhysX.handler.on(this.createEventName, this.createItem, this);
        }
    }

    start() {
        this.createNode();
        if (this.startLoad) {
            this.createItem();
        }
    }

    // update (dt) {}
}