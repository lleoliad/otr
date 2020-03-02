cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:
    init (thirdpartyName) {
        if (thirdpartyName === 'aladin') {
            let aladin = require('aladin');
            aladin.initAladin();
        }
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
