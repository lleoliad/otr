const { ccclass, property } = cc._decorator;

@ccclass
export default class Resources extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "场景",
        tooltip: "场景控制层",
        visible: true
    })
    view: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "游戏组件",
        tooltip: "游戏公共组件",
        visible: true
    })
    prefabs: cc.Prefab[] = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    }

    start() {

    }

    // update (dt) {}
}