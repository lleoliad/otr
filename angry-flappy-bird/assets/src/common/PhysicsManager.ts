const {ccclass, property} = cc._decorator;

@ccclass
export default class PhysicsManager extends cc.Component {

    @property({ tooltip: '是否启用物理引擎'})
    active: boolean = true;

    @property({ tooltip: '是否显示包围盒' })
    aabb: boolean = false;

    @property({ tooltip: '' })
    pair: boolean = false;

    @property({ tooltip: '是否显示中心点' })
    centerOfMass: boolean = false;

    @property({ tooltip: '是否显示关节连接线' })
    joint: boolean = false;

    @property({ tooltip: '是否填充形状' })
    shape: boolean = false;

    @property({ tooltip: '是否开启鼠标关节，可以拖动动态刚体' })
    mouseJoint: boolean = false;

    @property({ tooltip: '重力' })
    gravity: cc.Vec2 = cc.v2(0, -960);

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启或关闭物理系统
        let physicsManager = cc.director.getPhysicsManager();
        if (physicsManager.enabled && this.active) {
            cc.warn('The physical system is enabled！');
        }
        physicsManager.enabled = this.active;

        if (!this.active) {
            return;
        }
        //设置物理系统的重力属性
        physicsManager.gravity = this.gravity;

        //设置调试标志
        let drawBits = cc.PhysicsManager.DrawBits;
        if (CC_PREVIEW) {
            physicsManager.debugDrawFlags =
                (this.aabb && drawBits.e_aabbBit) |
                // (this.pair && drawBits.e_pairBit) |
                // (this.centerOfMass && drawBits.e_centerOfMassBit) |
                (this.joint && drawBits.e_jointBit) |
                (this.shape && drawBits.e_shapeBit);
        } else {
            physicsManager.debugDrawFlags = 0;
        }  
    }

    start () {
        
    }

    onDisable() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.debugDrawFlags = 0;
        physicsManager.enabled = false;
    }

    // update (dt) {}
}
