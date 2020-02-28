import { GhysX } from "../../libs/ghysx/GhysX";
import Binder from "../../libs/ghysx/ui/Binder";

const { ccclass, property } = cc._decorator;

@ccclass
export default class battle extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "教学组件",
        tooltip: ""
    })
    guide: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        displayName: "奖励组件",
        tooltip: ""
    })
    giveSkill: cc.Prefab = null;

    /**
     * 章节信息
     */
    _chapter_mould: chapter_mould = null;

    // LIFE-CYCLE CALLBACKS:
    init(params: { chapter_mould: chapter_mould }) {
        this._chapter_mould = params.chapter_mould;
    }

    enterMap() {
        /**
         * 计分规则说明：
         *      距离：加50积分
         *      击坏树干：加50积分
         */
        GhysX.db.cache.battle_info = {
            id: this._chapter_mould.id,
            type: this._chapter_mould.group,
            mileage: 0,
            score: 0,
            score1: 0,
            score2: 0,
            start_time: 0,
            end_time: 0,
            interval: 0,
            role_count: this._chapter_mould.group,
            lift1: 2,
            lift2: 2,
            lift1_progress: 0,
            lift2_progress: 0,
            kill_boss_count: 0,
            tree_count: 0,
            bird1: null,
            bird2: null,
            revive: true,
        }

        let tree_mould: tree_mould = GhysX.res.tree_moulds[1];
        GhysX.db.cache.tree_info = tree_mould;
        GhysX.db.cache.tree_info.section_infos = tree_mould.section_info.splitss('!', '|', ',', parseInt);
        GhysX.db.cache.tree_info.section_infos[0][2] = GhysX.modules.array.serialize(GhysX.db.cache.tree_info.section_infos[0][1]);
        GhysX.db.cache.tree_info.section_infos[1][2] = GhysX.modules.array.serialize(GhysX.db.cache.tree_info.section_infos[1][1]);
        // cc.log(GhysX.db.cache.tree_info.section_infos);

        GhysX.graphics.manager.close('stage');

        GhysX.handler.emit('battle_ui_remove_all_skill_1');
        GhysX.handler.emit('battle_ui_remove_all_skill_2');

        GhysX.graphics.draw({
            url: 'prefabs/map/stages/stage',
            mode: GhysX.graphics.MODE.VIEW,
            order: GhysX.graphics.ORDER.BACKGROUND,
            group_name: 'battle',
            script: 'stage', invoke: 'init', params: {}, complete: function (params) {
                this.node.active = true;

                // GhysX.graphics.draw({
                //     url: 'prefabs/battle/view/give_skill',
                //     mode: GhysX.graphics.MODE.VIEW,
                //     order: GhysX.graphics.ORDER.VIEW_DIALOG,
                //     group_name: 'battle',
                //     script: 'give_skill', invoke: 'init', params: {}, complete: function (params) {

                //     }.bind(this)
                // });
            }.bind(this)
        });

        GhysX.handler.emit('send_event', { key: 'battle', value: { type: this._chapter_mould.group } });
    }

    nextBattle() {
        let chapter_mould: chapter_mould = GhysX.res.chapter_moulds[this._chapter_mould.id];
        if (chapter_mould) {
            this._chapter_mould = chapter_mould;
            this.enterMap();

            // GhysX.handler.emit('battle_ui_on_update_draw');
            // GhysX.handler.emit('battle_ui_update_draw');
        } else {
            GhysX.graphics.manager.group('close', 'battle');
            GhysX.graphics.manager.group('show', GhysX.graphics.GROUP_NAME.HOME);
        }
    }

    exitBattle() {
        GhysX.graphics.manager.listener('show', 'main_menu', function () {
            GhysX.graphics.manager.group('close', 'battle');
            GhysX.handler.emit(GhysX.local.stage_info.type == 1 ? 'open_player_select' : 'open_friends_select');
        }, null);

        // GhysX.graphics.manager.listener('show', 'player_select', function () {
        //     GhysX.graphics.manager.hide('main_menu')
        // }, null);

        // GhysX.graphics.manager.listener('show', 'friends_select', function () {
        //     GhysX.graphics.manager.hide('main_menu')
        // }, null);

        GhysX.graphics.manager.listener('show', 'main_menu', function () {
            GhysX.gui.frame.node.runAction(cc.callFunc(function () {
                GhysX.graphics.manager.hide('main_menu')
            }.bind(this)));
        }, null);

        if (GhysX.graphics.manager.find('home')) {
            GhysX.graphics.manager.group('show', GhysX.graphics.GROUP_NAME.HOME);
        } else {
            GhysX.graphics.draw({
                url: 'prefabs/home/home',
                mode: GhysX.graphics.MODE.VIEW,
                group_name: GhysX.graphics.GROUP_NAME.HOME,
                script: 'home', invoke: 'init', params: {}, complete: function (params) {
                    // cc.log('complete', params);
                    GhysX.graphics.manager.group('show', GhysX.graphics.GROUP_NAME.HOME);
                }
            });
        }
    }

    pause() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getPhysicsManager().enabled = false;
    }

    resume() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    onLoad() {
        // this.node.active = false;
        this.enterMap();

        GhysX.handler.on('next_battle', this.nextBattle, this);
        GhysX.handler.on('exit_battle', this.exitBattle, this);

        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start() {
        // GhysX.graphics.manager.group('hide', GhysX.graphics.GROUP_NAME.HOME);
    }

    // update (dt) {}

    onDestroy() {
        cc.log('battle');
    }
}
