import { GhysX } from "../../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class chapter_element extends cc.Component {

    @property({
        type: cc.Sprite,
        displayName: "章节组组件",
        tooltip: ""
    })
    icon: cc.Sprite = null;

    @property({
        type: cc.Label,
        displayName: "解锁提示文字",
        tooltip: ""
    })
    unlock: cc.Label = null;

    /**
     * 章节数据
     */
    _chapter_mould: chapter_mould = null;

    // LIFE-CYCLE CALLBACKS:
    onClickStartButton(event: cc.Event.EventTouch, params: string) {
        if (this.unlock.node.active) {
            GhysX.handler.emit('create_video', {
                adUnitId: 'adunit-c3fdf0afb3e8124e',
                success: function (res) {
                    GhysX.local.stage_info.id = this._chapter_mould.id;
                    cc.sys.localStorage.setItem('local', JSON.stringify(GhysX.local));
                    this.unlock.node.active = false;
                    GhysX.handler.emit('chapter_element_update_draw');
                }.bind(this),
                cancel: function (res) {

                }.bind(this),
                fail: function (res) {
                    if (res && res.errCode == 1005) {
                        // GhysX.local.stage_info.id = this._chapter_mould.id;
                        // cc.sys.localStorage.setItem('local', JSON.stringify(GhysX.local));
                        // this.unlock.node.active = false;
                        // GhysX.handler.emit('chapter_element_update_draw');
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
            return;
        }

        if (GhysX.local.stage_info.id < this._chapter_mould.id) {
            GhysX.graphics.draw({
                url: 'prefabs/common/tip_message',
                mode: GhysX.graphics.MODE.VIEW,
                order: GhysX.graphics.ORDER.DIALOG,
                group_name: 'active',
                script: 'tip_message', invoke: 'init', params: { message: '请通关上一关卡' }, complete: function (params) {

                }
            });
            return;
        }

        this.startBattle();
    }

    startBattle() {
        GhysX.graphics.draw({
            url: 'prefabs/battle/battle',
            mode: GhysX.graphics.MODE.VIEW,
            order: GhysX.graphics.ORDER.BACKGROUND,
            group_name: 'battle',
            script: 'battle', invoke: 'init', params: { chapter_mould: this._chapter_mould }, complete: function (params) {
                // GhysX.graphics.manager.close('stage_manager');
                // GhysX.graphics.manager.close('background');
            }
        });
    }

    init(chapter_mould: chapter_mould) {
        this._chapter_mould = chapter_mould;
    }

    updateDraw() {
        this.unlock.node.active = false;
        if (GhysX.local.stage_info.id < this._chapter_mould.id) {
            if (GhysX.local.stage_info.id + 1 == this._chapter_mould.id) {
                // if (this._chapter_mould.id % 9 == 1) {
                //     this.unlock.node.active = true;
                // } else if (this._chapter_mould.id % 3 == 1) {
                //     this.unlock.node.active = true;
                // } else {
                //     GhysX.shader.gray.gray(this.node);    
                // }
                this.unlock.node.active = true;
            } else {
                GhysX.shader.gray.gray(this.node);
            }
        } else {
            GhysX.shader.gray.ungray(this.node);
        }
    }

    onLoad() {
        GhysX.loader.load('images/icons/stage/' + this._chapter_mould.icon, cc.SpriteFrame, this._chapter_mould.icon.toString(), this.icon);

        GhysX.handler.on('chapter_element_update_draw', this.updateDraw, this);
    }

    start() {

    }

    onEnable() {
        this.updateDraw();
    }

    // update (dt) {}
}
