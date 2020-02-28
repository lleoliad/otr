import { GhysX } from "../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class battle_result extends cc.Component {

    @property({
        type: cc.Label,
        displayName: "飞行时间",
        tooltip: "飞行时间"
    })
    time: cc.Label = null;

    @property({
        type: cc.Label,
        displayName: "积分",
        tooltip: "积分"
    })
    score: cc.Label = null;

    @property({
        type: cc.Label,
        displayName: "最高积分",
        tooltip: "最高积分"
    })
    highest_score: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:
    onClickStartButton(event: cc.Event.EventTouch, params: string) {
        // GhysX.graphics.draw({
        //     url: 'prefabs/battle/battle',
        //     mode: GhysX.graphics.MODE.VIEW,
        //     order: GhysX.graphics.ORDER.BACKGROUND,
        //     group_name: 'battle',
        //     script: 'battle', invoke: 'init', params: {}, complete: function (params) {
        //         GhysX.graphics.manager.close('battle_result');
        //         GhysX.graphics.manager.close('background');
        //     }
        // });

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (GhysX.local.stage_info.id <= GhysX.db.cache.battle_info.id) {
                // 校验三分之一的关卡
                if (GhysX.db.cache.battle_info.id % 9 == 0) {
                    GhysX.handler.emit('create_video', {
                        adUnitId: 'adunit-32a72c3327fadca2',
                        success: function (res) {
                            this.unlockNextStage();

                            GhysX.graphics.manager.close('battle_result');
                            GhysX.handler.emit('next_battle');
                        }.bind(this),
                        cancel: function (res) {

                        }.bind(this),
                        fail: function (res) {
                            if (res && res.errCode == 1005) {
                                this.unlockNextStage();

                                GhysX.graphics.manager.close('battle_result');
                                GhysX.handler.emit('next_battle');
                                
                                GhysX.graphics.draw({
                                    url: 'prefabs/common/tip_message',
                                    mode: GhysX.graphics.MODE.VIEW,
                                    order: GhysX.graphics.ORDER.DIALOG,
                                    group_name: 'active',
                                    script: 'tip_message', invoke: 'init', params: { message: '当前无视频广告！' }, complete: function (params) {

                                    }
                                });
                            }
                        }.bind(this)
                    });
                } else if (GhysX.local.stage_info.id % 3 == 0) {
                    GhysX.handler.emit('create_video', {
                        adUnitId: 'adunit-70cc817cb8ec3c36',
                        success: function (res) {
                            this.unlockNextStage();

                            GhysX.graphics.manager.close('battle_result');
                            GhysX.handler.emit('next_battle');
                        }.bind(this),
                        cancel: function (res) {

                        }.bind(this),
                        fail: function (res) {
                            if (res && res.errCode == 1005) {
                                this.unlockNextStage();

                                GhysX.graphics.manager.close('battle_result');
                                GhysX.handler.emit('next_battle');
                                GhysX.graphics.draw({
                                    url: 'prefabs/common/tip_message',
                                    mode: GhysX.graphics.MODE.VIEW,
                                    order: GhysX.graphics.ORDER.DIALOG,
                                    group_name: 'active',
                                    script: 'tip_message', invoke: 'init', params: { message: '当前无视频广告！' }, complete: function (params) {

                                    }
                                });
                            }
                        }.bind(this)
                    });
                } else {
                    this.unlockNextStage();

                    GhysX.graphics.manager.close('battle_result');
                    GhysX.handler.emit('next_battle');
                }
            } else {
                this.unlockNextStage();

                GhysX.graphics.manager.close('battle_result');
                GhysX.handler.emit('next_battle');
            }
        } else {
            this.unlockNextStage();

            GhysX.graphics.manager.close('battle_result');
            GhysX.handler.emit('next_battle');
        }
    }

    onClickBackButton(event: cc.Event.EventTouch, params: string) {
        // GhysX.graphics.draw({
        //     url: 'prefabs/ui/main_menu',
        //     mode: GhysX.graphics.MODE.VIEW,
        //     script: 'main_menu', invoke: 'init', params: {}, complete: function (params) {
        //         GhysX.graphics.manager.close('battle_result');
        //     }
        // });

        // GhysX.graphics.manager.listener('show', 'home', function () {
        //     cc.log('listener');
        //     GhysX.graphics.manager.group('close', 'battle');
        // }, null);

        // if (GhysX.graphics.manager.find('home')) {
        //     GhysX.graphics.manager.group('show', GhysX.graphics.GROUP_NAME.HOME);
        // } else {
        //     GhysX.graphics.draw({
        //         url: 'prefabs/home/home',
        //         mode: GhysX.graphics.MODE.VIEW,
        //         group_name: GhysX.graphics.GROUP_NAME.HOME,
        //         script: 'home', invoke: 'init', params: {}, complete: function (params) {
        //             // cc.log('complete', params);
        //             GhysX.graphics.manager.group('show', GhysX.graphics.GROUP_NAME.HOME);
        //         }
        //     });
        // }

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (GhysX.local.stage_info.id <= GhysX.db.cache.battle_info.id) {
                // 校验三分之一的关卡
                if (GhysX.db.cache.battle_info.id % 9 == 0) {

                } else if (GhysX.local.stage_info.id % 3 == 0) {

                } else {
                    this.unlockNextStage();
                }
            } else {
                this.unlockNextStage();
            }
        } else {
            this.unlockNextStage();
        }
        GhysX.handler.emit('exit_battle');
    }

    onClickShareButton(event: cc.Event.EventTouch, params: string) {
        GhysX.handler.emit('share', {});
    }

    unlockNextStage() {
        // if (GhysX.local.stage_info.id <= GhysX.db.cache.battle_info.id) {
        //     GhysX.local.stage_info.id++;
        //     cc.sys.localStorage.setItem('local', JSON.stringify(GhysX.local));
        // }
        cc.sys.localStorage.setItem('local', JSON.stringify(GhysX.local));
    }

    init() {

    }

    onUpdateDraw() {
        GhysX.db.cache.battle_info.end_time = new Date().getTime();
        let interval = GhysX.db.cache.battle_info.end_time - GhysX.db.cache.battle_info.start_time
        GhysX.db.cache.battle_info.interval = interval;

        GhysX.local.stage_info.highest_score = Math.max(GhysX.local.stage_info.highest_score, GhysX.db.cache.battle_info.score)

        this.time.string = interval / 1000 + '秒';
        this.score.string = GhysX.db.cache.battle_info.score;
        this.highest_score.string = GhysX.local.stage_info.highest_score;
    }

    onLoad() {
        cc.log('total-score: ', GhysX.db.cache.battle_info.score);
        this.onUpdateDraw();

        GhysX.handler.emit('show_banner', { name: '战斗结束界面-Bannder', forced: true, adUnitId: 'adunit-75758fcb425cfc0b' });

        GhysX.handler.emit('send_event', { key: 'battle', value: GhysX.db.cache.battle_info });
    }

    start() {

    }

    // update (dt) {}

    onDestroy() {
        GhysX.handler.emit('hide_banner', { name: '战斗结束界面-Bannder', forced: true, adUnitId: 'adunit-75758fcb425cfc0b' });
    }
}
