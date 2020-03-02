const {ccclass, property} = cc._decorator;

@ccclass
export default class CollisionManager extends cc.Component {

    @property({ tooltip: '碰撞检测器' })
    openCollisionManager: boolean = false;

    @property({ tooltip: '碰撞检测器调试' })
    openDebugDraw: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = this.openCollisionManager;
        manager.enabledDebugDraw = this.openDebugDraw;
    }

    start () {

    }

    // update (dt) {}
}
