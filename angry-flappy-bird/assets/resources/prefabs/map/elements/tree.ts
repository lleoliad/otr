import tree_section from "./tree_section";
import { GhysX } from "../../../../libs/ghysx/GhysX";
import hit_section from "./hit_section";
import bullet from "./bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class tree extends cc.Component {
    
    @property({
        type: cc.Prefab,
        displayName: "切片组件",
        tooltip: ""
    })
    hitSection: cc.Prefab = null;

    /**
     * 是否检验坐标
     */
    _check: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    init() {
        
    }

    hit(bullet: bullet, tree_section: tree_section) {
        // cc.log(bullet._bullet_type, tree_section._section_id, tree_section._bullet_type, tree_section._bullet_count);
        if (bullet._bullet_type >= tree_section._bullet_type) {
            if (tree_section.enabled && tree_section.node.active) {
                tree_section._bullet_count--;
                if (tree_section._bullet_count == 0) {
                    // cc.log(tree_section.enabled, tree_section.node.active);
                    let node = cc.instantiate(this.hitSection);
                    let c = node.getComponent(hit_section);
                    tree_section.node.parent.addChild(node);
                    node.setPosition(cc.v2(tree_section.node.x, tree_section.node.y + tree_section.node.height / 2));
    
                    tree_section.node.destroy();

                    GhysX.db.cache.battle_info.score += tree_section._score;

                    switch (bullet._bird._player_id) {
                        case 1:
                            {
                                GhysX.db.cache.battle_info.score1 += tree_section._score;
                            }
                            break;

                        case 2:
                            {
                                GhysX.db.cache.battle_info.score2 += tree_section._score;
                            }
                            break;
                    
                        default:
                            break;
                    }
                    
                    GhysX.handler.emit('battle_ui_update_draw');

                    if (bullet._bullet_type < 4) {
                        GhysX.os.audio.playEffect('music/effect/wood', false);
                    } else {
                        GhysX.os.audio.playEffect('music/effect/bomb1', false);
                    }
                }
            }
        }
    }

    pause() {
        this.node.pauseAllActions();
    }

    resume() {
        this.node.resumeAllActions();
    }

    onLoad () {
        GhysX.handler.on('hit', this.hit, this);
        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start () {

    }

    update (dt) {
        if (this._check) {
            if (this.node.x < -300) {
                this._check = false;
                for (let child of this.node.children) {
                    if (child.isValid) {
                        child.removeComponent(cc.PolygonCollider);
                    }
                }
            }
        }
    }
}
