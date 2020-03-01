import { GhysX } from "../../../GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Screen extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (CC_DEV) {
            (window as any).GhysX = GhysX;
        }

        GhysX.initialize();
    }

    start() {
        GhysX.handler.emit('launch_success', GhysX);
    }

    // update (dt) {}
}
