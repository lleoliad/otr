const {ccclass, property} = cc._decorator;

@ccclass
export default class Timer extends cc.Component {
    
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = '00:00:00';

    // LIFE-CYCLE CALLBACKS:
    init() {

    }

    onLoad () {

    }

    start () {

    }

    update (dt: number) {

    }
}
