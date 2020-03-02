import { GhysX } from "../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class launch extends cc.Component {
    
    // LIFE-CYCLE CALLBACKS:
    _progressDatasCallback(completedCount: number, totalCount: number, item: any) {
        // cc.log(completedCount, totalCount, asset);

        let asset: cc.TextAsset = item.content;
        let name = asset.name;

        let resKey = '' + name + 's';
        let keyIndex = 0;
        let json = GhysX.modules.t2j.parse((asset.text as any).splits("\r\n", "\t"), keyIndex);
        GhysX.res[resKey] = json;
        GhysX.res.caches[resKey] = {};

        // cc.log(name);
        // cc.log(json);
    }

    downloadDatas() {
        cc.loader.loadResDir('data/mould', cc.TextAsset, this._progressDatasCallback.bind(this), function (err, assets) {
            if (err) {
                this.downloadDatas();
                cc.error(err);
                return;
            }
            this.initGame();
        }.bind(this));
    }

    initGame() {
        // cc.log('launch_success', params);
        
        (cc.Button as any).prototype.__onTouchBegan = (cc.Button as any).prototype._onTouchBegan;
        (cc.Button as any).prototype._onTouchBegan = function (event, params) {
            this.__onTouchBegan(event, params);
            GhysX.os.audio.playEffect('music/button/touch', false);
        }

        GhysX.db.cache.heartbeat = 0;

        let self = this;

        let local = cc.sys.localStorage.getItem('local');
        if (local) {
            GhysX.local = JSON.parse(local);

            if (!GhysX.local.user_info) {
                GhysX.local.user_info = {
                    heartbeat: 0,
                    shield: 0,
                    bullet: 0,
                    multiple_bullet: 0,
                    bomb: 0,
                }
            }

            // GhysX.graphics.draw({
            //     url: 'prefabs/common/background', 
            //     mode: GhysX.graphics.MODE.VIEW,
            //     order: GhysX.graphics.ORDER.BACKGROUND,
            //     script: 'background', invoke: 'init', params: {}, complete: function (params) {
            //         GhysX.graphics.draw({
            //             url: 'prefabs/ui/main_menu', 
            //             mode: GhysX.graphics.MODE.VIEW, 
            //             group_name: 'ui',
            //             script: 'main_menu', invoke: 'init', params: {}, complete: function (params) {
            //                 // cc.log('complete', params);
            //                 self.node.destroy();
            //             }
            //         });

            //         // GhysX.graphics.manager.listener('start', 'main_menu', function(){cc.log('listener');}, null);
            //     }
            // });

            GhysX.graphics.draw({
                url: 'prefabs/home/home',
                mode: GhysX.graphics.MODE.VIEW,
                group_name: GhysX.graphics.GROUP_NAME.HOME,
                script: 'home', invoke: 'init', params: {}, complete: function (params) {
                    // cc.log('complete', params);
                    self.node.destroy();
                }
            });
        } else {
            GhysX.local = {
                user_info: {
                    heartbeat: 0,
                    shield: 0,
                    bullet: 0,
                    multiple_bullet: 0,
                    bomb: 0,
                },
                stage_info: {
                    type: 1,
                    id: 1,
                    bird1: 9,
                    bird2: 9,
                    highest_score: 0
                }
            } as any;

            GhysX.graphics.draw({
                url: 'prefabs/battle/battle',
                mode: GhysX.graphics.MODE.VIEW,
                order: GhysX.graphics.ORDER.BACKGROUND,
                group_name: 'battle',
                script: 'battle', invoke: 'init', params: { chapter_mould: GhysX.res.chapter_moulds[GhysX.local.stage_info.id]}, complete: function (params) {
                    // cc.log('complete', params);
                    self.node.destroy();
                }
            });
        }

        GhysX.graphics.draw({
            url: 'prefabs/navigate/navigate',
            mode: GhysX.graphics.MODE.VIEW,
            order: GhysX.graphics.ORDER.TASKBAR,
            group_name: GhysX.graphics.GROUP_NAME.HOME,
            script: 'navigate', invoke: 'init', params: {}, complete: function (params) {
                // cc.log('complete', params);
            }
        });
    }

    onLoad() {
        GhysX.handler.on('launch_success', function (params) {
            this.downloadDatas();
        }.bind(this));
    }

    start() {
        GhysX.os.audio.playMusic('sound/bg', true);
    }

    // update (dt) {}
}
