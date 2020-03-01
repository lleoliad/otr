import Screen from "../common/prefab/screen/screen";
import View from "../common/prefab/view/view";
import Scene from "../common/prefab/scene/scene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Frame extends cc.Component {

    @property({
        type: Scene,
        displayName: "场景",
        tooltip: "场景控制层",
        visible: false
    })
    scene: Scene = null;

    @property({
        type: Scene,
        displayName: "主屏",
        tooltip: "主屏控制层",
        visible: false
    })
    screen: Screen = null;

    /**
     * 起始坐标
     */
    _start_position: cc.Vec2 = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scene = this.node.getChildByName('scene').getComponent('scene');
        this.screen = this.node.getChildByName('screen').getComponent('screen');

        if (this.scene.node.height / this.scene.node.width > 2) {
            this.screen.node.height -= 64;
        }

        if (CC_DEV) {
            this.node.getComponent(cc.Canvas).fitWidth = true;
        }

        this._start_position = this.node.getPosition();
    }

    start() {

    }

    // update (dt) {}
}