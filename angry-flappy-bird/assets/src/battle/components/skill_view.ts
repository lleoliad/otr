import { GhysX } from "../../../libs/ghysx/GhysX";
import skill_element from "./skill_element";
import bird from "../../../resources/prefabs/map/elements/bird";

const {ccclass, property} = cc._decorator;

@ccclass
export default class skill_view extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "技能组件",
        tooltip: ""
    })
    skillElementPrefab: cc.Prefab = null;

    @property({
        type: cc.Layout,
        displayName: "技能列表",
        tooltip: ""
    })
    skills: cc.Layout = null;

    /**
     * 技能实例
     */
    _skill_elements: skill_element[] = [];

    /**
     * 玩家编号
     * 1：1号玩家
     * 2：2号玩家
     */
    _player_id: number = 0;

    // LIFE-CYCLE CALLBACKS:

    init(player_id: number) {
        this._player_id = player_id;
    }

    addSkill(bird: bird, skill_type: number) {
        // if (bird._player_id != this._player_id) {
        //     return;
        // }

        if (this._skill_elements[skill_type]) {
            this._skill_elements[skill_type]._elapsed = 0;
            return;
        }

        switch (skill_type) {
            case 1:
                {
                    bird.addShield();
                }
                break;

            default:
                {
                    for (let key in this._skill_elements) {
                        let skill_element: skill_element = this._skill_elements[key];
                        if (skill_element && skill_element._skill_type != 1) {
                            skill_element.isDone();
                        }
                    }
                    bird._bullet_type = skill_type;
                }
                break;
        }

        let node = cc.instantiate(this.skillElementPrefab);
        let c = node.getComponent(skill_element);
        c.init(bird, skill_type);
        this.skills.node.addChild(node);

        this._skill_elements[skill_type] = c;
    }

    removeSkill(skill_element: skill_element) {
        // if (skill_element._bird._player_id != this._player_id) {
        //     return;
        // }

        this._skill_elements[skill_element._skill_type] = null;

        // switch (skill_element._skill_type) {
        //     case 1:
        //         {
        //             skill_element._bird.removeShield();
        //         }
        //         break;

        //     default:
        //         {
        //             skill_element._bird._bullet_type = 1;
        //         }
        //         break;
        // }
    }

    removeAllSkill(bird: bird) {
        // if (bird._player_id != this._player_id) {
        //     return;
        // }

        for (let key in this._skill_elements) {
            let skill_element = this._skill_elements[key];
            if (skill_element) {
                skill_element.node.destroy();
            }
        }

        // this.skills.node.removeAllChildren(true);
    }

    onLoad() {
        GhysX.handler.on('battle_ui_add_skill_' + this._player_id, this.addSkill, this);
        GhysX.handler.on('battle_ui_remove_skill_' + this._player_id, this.removeSkill, this);
        GhysX.handler.on('battle_ui_remove_all_skill_' + this._player_id, this.removeAllSkill, this);
    }

    start () {

    }

    // update (dt) {}
}
