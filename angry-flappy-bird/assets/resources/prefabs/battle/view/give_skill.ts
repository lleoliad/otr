import { GhysX } from "../../../../libs/ghysx/GhysX";
import { INFO } from "../../../../libs/ghysx/core/Graphics";

const { ccclass, property } = cc._decorator;

let __skill_infos = [
    { skill_id: 0, video_type: 2},
    { skill_id: 1, video_type: 0 },
    { skill_id: 2, video_type: 0 },
    { skill_id: 3, video_type: 0 },
    { skill_id: 4, video_type: 0 },
];

let __video_ad_unit_ids = [
    "adunit-7c5b4d7a6d008419",
    "adunit-dd2da86122f534b1",
    "adunit-6a6c772a200d08a9"
];

let __revive_video_ad_unit_ids = [
    "adunit-7ee2fae807f036dc",
    "adunit-6931189f8a4171df",
    "adunit-129372d49bee9656",
];

@ccclass
export default class give_skill extends cc.Component {

    @property({
        type: cc.Sprite,
        displayName: "技能图标",
        tooltip: ""
    })
    skill: cc.Sprite = null;

    @property({
        type: cc.Label,
        displayName: "技能数量",
        tooltip: ""
    })
    count: cc.Label = null;

    @property({
        type: cc.Node,
        displayName: "复活提示",
        tooltip: ""
    })
    reviveTip: cc.Node = null;

    /**
     * 技能 ID
     */
    _skill_id: number = 0;

    /**
     * 复活
     */
    _revive: boolean = false;

    /**
     * 购买类型
     */
    _buy_type: number = -1;

    // LIFE-CYCLE CALLBACKS:
    onClickGiveSkillButton(event: cc.Event.EventTouch, params: string) {
        // 战斗开始前获得奖励3-激励式视频 adunit-6a6c772a200d08a9
        // 战斗开始前获得奖励2-激励式视频 adunit-dd2da86122f534b1
        // 战斗开始前获得奖励1-激励式视频 adunit-7c5b4d7a6d008419
        // 战斗中死亡获得复活机会3-激励式视频 adunit-129372d49bee9656
        // 战斗中死亡获得复活机会2-激励式视频 adunit-6931189f8a4171df
        // 战斗中死亡获得复活机会1-激励式视频 adunit-7ee2fae807f036dc

        let __skill_info = __skill_infos[this._skill_id];
        let unitId = __video_ad_unit_ids[__skill_info.video_type];
        if (this._revive) {
            // unitId = __revive_video_ad_unit_ids[GhysX.modules.unit.random(0, __revive_video_ad_unit_ids.length - 1)];
            unitId = __revive_video_ad_unit_ids[__revive_video_ad_unit_ids.length - 1];
        }
        GhysX.handler.emit('create_video', {
            adUnitId: unitId,
            success: function (res) {
                this.give();
            }.bind(this),
            cancel: function (res) {
                this.close();
            }.bind(this),
            fail: function (res) {
                if (res && res.errCode == 1005) {
                    // 广告审核中
                    this.close();
                }
                GhysX.graphics.draw({
                    url: 'prefabs/common/tip_message',
                    mode: GhysX.graphics.MODE.VIEW,
                    order: GhysX.graphics.ORDER.DIALOG,
                    group_name: 'active',
                    script: 'tip_message', invoke: 'init', params: { message: '无视频广告！' }, complete: function (params) {

                    }
                });
            }.bind(this)
        });
    }

    onClickCloseButton(event: cc.Event.EventTouch, params: string) {
        this.close();
    }

    give() {
        let count = ~~this.count.string;
        GhysX.db.cache.give_skill_type = this._skill_id;
        switch (this._skill_id) {
            case 0:
                {
                    GhysX.db.cache.heartbeat = count;
                    GhysX.local.user_info.heartbeat += count;
                }
                break;

            case 1:
                {
                    GhysX.db.cache.shield = count;
                }
                break;

            case 2:
                {
                    GhysX.db.cache.bullet = count;
                }
                break;

            case 3:
                {
                    GhysX.db.cache.multiple_bullet = count;
                }
                break;

            case 4:
                {
                    GhysX.db.cache.bomb = count;
                }
                break;
        
            default:
                break;
        }
        GhysX.db.cache.give_skill_count = count;
        GhysX.handler.emit('battle_ui_show_skills', this._revive);

        if (this._revive) {
            switch (GhysX.db.cache.battle_info.type) {
                case 1:
                    GhysX.db.cache.battle_info.role_count = 1;
                    break;
            
                default:
                    GhysX.db.cache.battle_info.role_count = 2;
                    break;
            }
            GhysX.handler.emit('revive');
            this._revive = false;
        } else {
            
        }

        if (this._buy_type > 0) {
            GhysX.handler.emit('battle_ui_add_skill_' + 1, GhysX.db.cache.battle_info.bird1, 1);
            GhysX.handler.emit('battle_ui_add_skill_' + 2, GhysX.db.cache.battle_info.bird2, 2);
        }

        this.close();
    }

    close() {
        if (this._revive) {
            GhysX.db.cache.battle_info.revive = false;
            GhysX.handler.emit('battle_over');
        }
        this.node.destroy();
    }

    init(params: { revive: boolean, buy_type: number }) {
        this._revive = params.revive;
        if (undefined !== params.buy_type && null !== params.buy_type) {
            this._buy_type = params.buy_type;
        }
    }

    onLoad() {
        GhysX.db.cache.heartbeat = 0;
        if (this._revive) {
            this._skill_id = 0;
            this.reviveTip.active = true;
        } else {
            if (this._buy_type > 0) {
                this._skill_id = this._buy_type;
            } else {
                this._skill_id = GhysX.modules.unit.random(0, 4);
            }
        }
        let count = GhysX.modules.unit.random(1, 3);
        
        let __skill_info = __skill_infos[this._skill_id];
        __skill_info.video_type = count - 1;
        if (this._skill_id == 0) {
            __skill_info.video_type = 2;
            count = 1;
        }

        this.count.string = '' + count;
        GhysX.graphics.draw({
            url: 'images/battle/give-skills/extras%s'.format(this._skill_id),
            mode: GhysX.graphics.MODE.SPRITE,
            asset_type: cc.SpriteFrame,
            target: this.skill,
            complete: function (info: INFO) {
                
            }.bind(this)
        });
    }

    start() {

    }

    // update (dt) {}
}
