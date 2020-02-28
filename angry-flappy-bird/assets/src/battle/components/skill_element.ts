import bird from "../../../resources/prefabs/map/elements/bird";
import { GhysX } from "../../../libs/ghysx/GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class skill_element extends cc.Component {

    @property({
        type: cc.Sprite,
        displayName: "图标组件",
        tooltip: ""
    })
    icon: cc.Sprite = null;

    @property({
        type: cc.ProgressBar,
        displayName: "技能进度",
        tooltip: ""
    })
    progress: cc.ProgressBar = null;

    /**
     * 停留时间
     */
    @property({ visible: false })
    _duration: number = 4

    /**
     * 当前界面停留时间
     */
    @property({ visible: false })
    _elapsed: number = 0

    /**
     * 运行状态
     */
    @property({ visible: false })
    _running: boolean = false;

    /**
     * 绑定技能的小鸟
     */
    _bird: bird = null;

    /**
     * 技能类型
     */
    _skill_type: number = 0;

    /**
     * 暂停
     */
    _is_pause: boolean = false;

    // LIFE-CYCLE CALLBACKS:
    
    init(bird: bird, skill_type: number) {
        this._bird = bird;
        this._skill_type = skill_type;
    }

    isDone() {
        this._running = false;

        // switch (this._skill_type) {
        //     case 1:
        //         {
        //             if (this._bird && this._bird.isValid) {
        //                 this._bird.removeShield();
        //             }
        //         }
        //         break;

        //     default:
        //         {
        //             if (this._bird && this._bird.isValid) {
        //                 this._bird._bullet_type = 1;
        //             }
        //         }
        //         break;
        // }

        this.clean();
        
        this.node.destroy();
    }

    clean() {
        GhysX.handler.emit('battle_ui_remove_skill_' + this._bird._player_id, this);
        switch (this._skill_type) {
            case 1:
                {
                    if (this._bird && this._bird.isValid) {
                        this._bird.removeShield();
                    }
                }
                break;

            default:
                {
                    if (this._bird && this._bird.isValid) {
                        this._bird._bullet_type = 1;
                    }
                }
                break;
        }
    }

    pause() {
        this._is_pause = true;
    }

    resume() {
        this._is_pause = false;
    }

    onLoad () {
        GhysX.graphics.draw({
            url: 'effects/skill/skill',
            mode: GhysX.graphics.MODE.ATLAS,
            asset_type: cc.SpriteAtlas,
            asset_name: '' + this._skill_type,
            target: this.icon
        });

        GhysX.handler.on('pause', this.pause, this);
        GhysX.handler.on('resume', this.resume, this);
    }

    start () {
        this._running = true;
    }

    update (dt) {
        if (this._running && !this._is_pause) {
            this._elapsed += dt;
            if (this._elapsed > this._duration) {
                this.progress.progress = 0;
                this.isDone();
            } else {
                this.progress.progress = 1 - this._elapsed / this._duration;
            }
        }
    }

    onDestroy() {
        if (this._running) {
            this.clean();
        }
    }
}
