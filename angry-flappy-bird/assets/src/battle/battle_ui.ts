import { GhysX } from "../../libs/ghysx/GhysX";
import skill_element from "./components/skill_element";
import skill_view from "./components/skill_view";
import bird from "../../resources/prefabs/map/elements/bird";
import fruits from "../../resources/prefabs/map/elements/fruits";
import skill_btn from "../../resources/prefabs/battle/components/skill_btn";
import { INFO } from "../../libs/ghysx/core/Graphics";

const { ccclass, property } = cc._decorator;

@ccclass
export default class battle_ui extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "技能组件",
        tooltip: ""
    })
    skillViewPrefab: cc.Prefab = null;

    @property({
        type: cc.Node,
        displayName: "玩家1",
        tooltip: ""
    })
    player_1: cc.Node = null;

    @property({
        type: cc.Node,
        displayName: "玩家2",
        tooltip: ""
    })
    player_2: cc.Node = null;

    @property({
        type: cc.Sprite,
        displayName: "玩家1图标",
        tooltip: ""
    })
    player_1_sprite: cc.Sprite = null;

    @property({
        type: cc.Sprite,
        displayName: "玩家2图标",
        tooltip: ""
    })
    player_2_sprite: cc.Sprite = null;

    @property({
        type: cc.Node,
        displayName: "玩家1技能",
        tooltip: ""
    })
    player_1_skills: cc.Node = null;

    @property({
        type: cc.Node,
        displayName: "玩家2玩家",
        tooltip: ""
    })
    player_2_skills: cc.Node = null;

    @property({
        type: skill_btn,
        displayName: "玩家1技能实例",
        tooltip: ""
    })
    skillBtns1: skill_btn[] = [];

    @property({
        type: skill_btn,
        displayName: "玩家2玩家实例",
        tooltip: ""
    })
    skillBtns2: skill_btn[] = [];

    @property({
        type: cc.Label,
        displayName: "积分",
        tooltip: ""
    })
    score: cc.Label = null;

    @property({
        type: cc.Label,
        displayName: "积分2",
        tooltip: ""
    })
    score2: cc.Label = null;

    @property({
        type: cc.Label,
        displayName: "生命",
        tooltip: ""
    })
    lift: cc.Label = null;

    @property({
        type: cc.Label,
        displayName: "生命2",
        tooltip: ""
    })
    lift2: cc.Label = null;

    @property({
        type: cc.ProgressBar,
        displayName: "生命进度",
        tooltip: ""
    })
    liftProgress: cc.ProgressBar = null;

    @property({
        type: cc.ProgressBar,
        displayName: "生命进度",
        tooltip: ""
    })
    liftProgress2: cc.ProgressBar = null;

    @property({
        type: cc.Label,
        displayName: " 里程",
        tooltip: ""
    })
    mileage: cc.Label = null;

    @property({
        type: cc.Layout,
        displayName: "技能列表",
        tooltip: ""
    })
    skills: cc.Layout = null;

    @property({
        type: cc.Button,
        displayName: "暂停按钮",
        tooltip: ""
    })
    pauseBtn: cc.Button = null;

    /**
     * 章节信息
     */
    _chapter_mould: chapter_mould = null;

    // LIFE-CYCLE CALLBACKS:

    init() {
        this._chapter_mould = GhysX.res.chapter_moulds[GhysX.local.stage_info.id];
    }

    createSkillView(player_id: number) {
        let node = cc.instantiate(this.skillViewPrefab);
        let c = node.getComponent(skill_view);
        c.init(player_id);
        this.skills.node.addChild(node);
    }

    createSkillViews() {
        this.player_1_skills.active = true;
        switch (GhysX.local.stage_info.type) {
            case 1:
                {
                    this.createSkillView(1);
                    if (GhysX.platform.sys.pixelRatio >= 3) {
                        this.player_1_skills.x += 100;
                    }
                }
                break;

            default:
                {
                    this.player_2.active = true;
                    this.player_2_skills.active = true;
                    this.createSkillView(1);
                    this.createSkillView(2);
                }
                break;
        }
    }

    updateDraw() {
        // this.score.string = '' + GhysX.db.cache.battle_info.score;
        this.score.string = '' + GhysX.db.cache.battle_info.score1;
        this.score2.string = '' + GhysX.db.cache.battle_info.score2;

        let need_buy = false;
        if (GhysX.db.cache.battle_info.score1 >= 150 && !GhysX.db.cache.battle_info.score1_buy1) {
            GhysX.db.cache.battle_info.score1_buy1 = true;
            need_buy = true;
        }

        if (GhysX.db.cache.battle_info.score1 >= 300 && !GhysX.db.cache.battle_info.score1_buy2) {
            GhysX.db.cache.battle_info.score1_buy2 = true;
            need_buy = true;
        }

        if (GhysX.db.cache.battle_info.score1 >= 500 && !GhysX.db.cache.battle_info.score1_buy3) {
            GhysX.db.cache.battle_info.score1_buy3 = true;
            need_buy = true;
        }

        if (need_buy) {
            GhysX.handler.emit('pause');
            GhysX.graphics.manager.listener('start', 'battle_waiting', function () {
                GhysX.graphics.draw({
                    url: 'prefabs/battle/view/give_skill',
                    mode: GhysX.graphics.MODE.VIEW,
                    order: GhysX.graphics.ORDER.VIEW_DIALOG,
                    group_name: 'battle',
                    script: 'give_skill', invoke: 'init', params: { buy_type: GhysX.modules.unit.random(3, 4) }, complete: function (params) {

                    }.bind(this)
                });
            }.bind(this), null);

            GhysX.graphics.draw({
                url: 'prefabs/battle/battle_waiting',
                mode: GhysX.graphics.MODE.VIEW,
                order: GhysX.graphics.ORDER.BACKGROUND,
                group_name: GhysX.graphics.GROUP_NAME.BATTLE,
                script: 'battle_waiting', invoke: 'init', params: { open_mode: 1 }, complete: function (params) {

                }.bind(this)
            });
        }
    }

    updateDrawHp1() {
        this.lift.string = '' + GhysX.db.cache.battle_info.lift1;
    }

    updateDrawHp2() {
        this.lift2.string = '' + GhysX.db.cache.battle_info.lift2;
    }

    updateDrawHpProgress1() {
        this.liftProgress.progress = GhysX.db.cache.battle_info.lift1_progress;

        if (this.liftProgress.progress >= 1) {
            if (GhysX.db.cache.battle_info.lift1 < 3) {
                GhysX.db.cache.battle_info.lift1++;
                this.liftProgress.progress = 0;
                GhysX.db.cache.battle_info.lift1_progress = 0;
                this.updateDrawHp1();
            }
        }
    }

    updateDrawHpProgress2() {
        this.liftProgress2.progress = GhysX.db.cache.battle_info.lift2_progress;

        if (this.liftProgress2.progress >= 1) {
            if (GhysX.db.cache.battle_info.lift2 < 3) {
                GhysX.db.cache.battle_info.lift2++;
                this.liftProgress2.progress = 0;
                GhysX.db.cache.battle_info.lift2_progress = 0;
                this.updateDrawHp2();
            }
        }
    }

    eatingFruit(bird: bird, fruits: fruits) {
        fruits.node.stopAllActions();

        // let pos = fruits.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        // let mpos = this.liftProgress.node.convertToNodeSpaceAR(cc.Vec2.ZERO);

        // let mbpos = cc.v2(mpos.x - pos.x, mpos.y - pos.y);
        // let seq = cc.sequence(cc.bezierBy(1, [cc.v2(0, 0), cc.v2(mbpos.x / 2, mbpos.y / 2), mbpos]), cc.callFunc(function (sender) {
        //     sender.destroy();
        // }.bind(this)));

        let liftProgress = null;
        switch (bird._player_id) {
            case 1:
                {
                    liftProgress = this.liftProgress;
                }
                break;

            case 2:
                {
                    liftProgress = this.liftProgress2;
                }
                break;

            default:
                break;
        }
        

        let mpos = fruits.node.parent.convertToNodeSpaceAR(liftProgress.node.convertToWorldSpaceAR(cc.Vec2.ZERO));

        let seq = cc.sequence(cc.bezierTo(1, [cc.v2(0, 0), cc.v2(mpos.x / 2, mpos.y / 2), mpos]), cc.callFunc(function (sender) {
            let add_progress = GhysX.modules.unit.random(1, 5) / 50;
            switch (bird._player_id) {
                case 1:
                    {
                        GhysX.db.cache.battle_info.lift1_progress += add_progress;
                        this.updateDrawHpProgress1();
                    }
                    break;

                case 2:
                    {
                        GhysX.db.cache.battle_info.lift2_progress += add_progress;
                        this.updateDrawHpProgress2();
                    }
                    break;

                default:
                    break;
            }
            sender.destroy();
        }.bind(this)));
        fruits.node.runAction(seq);
    }

    addSkill(skills: skill_btn[], player_id: number, revive: boolean) {
        for (let key in skills) {
            let skill_btn = skills[key];
            if (skill_btn) {
                if (skill_btn.skill_type == GhysX.db.cache.give_skill_type) {
                    skill_btn.count.string = '' + GhysX.db.cache.give_skill_count;
                    skill_btn.node.active = true;
                } else {
                    // if (!revive) {
                    //     skill_btn.node.active = false;
                    // }
                }
                skill_btn._player_id = player_id;
            }
        }
    }

    showSkills(revive: boolean) {
        switch (GhysX.local.stage_info.type) {
            case 1:
                {
                    this.player_1_skills.active = true;
                    this.addSkill(this.skillBtns1, 1, revive);

                    GhysX.db.cache.battle_info.lift1 += GhysX.db.cache.heartbeat;
                    this.updateDrawHp1();
                }
                break;

            default:
                {
                    this.player_1_skills.active = true;
                    this.player_2_skills.active = true;

                    GhysX.db.cache.battle_info.lift1 += GhysX.db.cache.heartbeat;
                    GhysX.db.cache.battle_info.lift2 += GhysX.db.cache.heartbeat;

                    this.updateDrawHp1();
                    this.updateDrawHp2();

                    this.addSkill(this.skillBtns1, 1, revive);
                    this.addSkill(this.skillBtns2, 2, revive);
                }
                break;
        }

        if (GhysX.platform.sys.pixelRatio >= 3) {
            this.player_1_skills.x = 50;
        }
    }

    onUpdateDraw() {
        this.score.string = '' + GhysX.local.stage_info.highest_score;
        this.mileage.string = '' + GhysX.db.cache.battle_info.mileage;

        this.lift.string = '' + GhysX.db.cache.battle_info.lift1;
        this.lift2.string = '' + GhysX.db.cache.battle_info.lift2;

        this.liftProgress.progress = GhysX.db.cache.battle_info.lift1_progress;
        this.liftProgress2.progress = GhysX.db.cache.battle_info.lift2_progress;


        GhysX.graphics.draw({
            url: 'sprites/%s/%s'.format(1000 + GhysX.local.stage_info.bird1, 1000 + GhysX.local.stage_info.bird1),
            mode: GhysX.graphics.MODE.ATLAS,
            asset_type: cc.SpriteAtlas,
            asset_name: '1',
            target: this.player_1_sprite,
            complete: function (info: INFO) {

            }.bind(this)
        });

        if (GhysX.local.stage_info.type == 2) {
            GhysX.graphics.draw({
                url: 'sprites/%s/%s'.format(1000 + GhysX.local.stage_info.bird2, 1000 + GhysX.local.stage_info.bird2),
                mode: GhysX.graphics.MODE.ATLAS,
                asset_type: cc.SpriteAtlas,
                asset_name: '1',
                target: this.player_2_sprite,
                complete: function (info: INFO) {
    
                }.bind(this)
            });
        }
    }

    onPause() {
        this.pauseBtn.node.active = true;
    }

    offPause() {
        this.pauseBtn.node.active = false;
    }

    go() {
        this.onUpdateDraw();
    }

    pause() {

    }

    resume() {

    }

    onLoad() {
        this.createSkillViews();
        this.onUpdateDraw();

        // this.updateDraw();

        // this.musicOpen.node.active = GhysX.os.audio.musicIsOpen();
        // this.musicClose.node.active = !GhysX.os.audio.musicIsOpen();

        GhysX.handler.on('go', this.go, this);
        // GhysX.handler.on('battle_ui_on_update_draw', this.onUpdateDraw, this);
        GhysX.handler.on('battle_ui_update_draw', this.updateDraw, this);
        GhysX.handler.on('battle_ui_update_draw_hp1', this.updateDrawHp1, this);
        GhysX.handler.on('battle_ui_update_draw_hp2', this.updateDrawHp2, this);
        GhysX.handler.on('battle_ui_update_draw_hp_progress1', this.updateDrawHpProgress1, this);
        GhysX.handler.on('battle_ui_update_draw_hp_progress2', this.updateDrawHpProgress2, this);
        GhysX.handler.on('battle_ui_eating_fruit', this.eatingFruit, this);
        GhysX.handler.on('battle_ui_show_skills', this.showSkills, this);

        GhysX.handler.on('battle_ui_on_pause', this.onPause, this);
        GhysX.handler.on('battle_ui_off_pause', this.offPause, this);

        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);

    }

    start() {
        GhysX.graphics.manager.group('hide', GhysX.graphics.GROUP_NAME.HOME);
        GhysX.graphics.manager.show('main_menu')
    }

    // update (dt) {}
}
