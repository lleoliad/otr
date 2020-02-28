import bird_element from "../components/bird_element";
import { GhysX } from "../../../libs/ghysx/GhysX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class bird_selecter extends cc.Component {
    @property({
        type: cc.Prefab,
        displayName: "小鸟选项组件",
        tooltip: ""
    })
    birdPrefab: cc.Prefab = null;

    @property({
        type: cc.Layout,
        displayName: "小鸟列表",
        tooltip: ""
    })
    layout: cc.Layout = null;

    @property({
        type: cc.Button,
        displayName: "开始按钮",
        tooltip: ""
    })
    startbtn: cc.Button = null;

    /**
     * 选择类型
     * 0: 个人
     * 1: 玩家1
     * 2: 玩家2
     */
    _select_type: number = 0;

    /**
     * 选择索引
     */
    _select_index: number = 0;

    /**
     * 被选择的目标
     */
    _select_target: bird_element = null;

    /**
     * 小鸟列表
     */
    _bird_elements: bird_element[] = [];

    // LIFE-CYCLE CALLBACKS:
    onClickStart(event: cc.Event.EventTouch, params: string) {
        // GhysX.graphics.manager.close('player_select')
        this.startbtn.interactable = false;

        for (let c of this._bird_elements) {
            c.btn.interactable = false;
            if (!c._select) {
                GhysX.shader.gray.gray(c.node);
            }
        }

        GhysX.handler.emit('start_battle')
    }

    initBinder(params: { root: cc.Node, data: string, data_source: cc.Component }) {
        this._select_type = ~~params.data || this._select_type;
    }

    onLoad() {
        GhysX.handler.on('select_bird_element', function (bird_element: bird_element) {
            if (this._select_type == bird_element._type) {
                if (this._select_target) {
                    this._select_target.unselect();
                }

                this._select_index = bird_element._index;
                this._select_target = bird_element;
                this._select_target.select();

                switch (bird_element._type) {
                    case 1:
                        break;

                    case 2:
                        GhysX.local.stage_info.bird2 = bird_element._index;
                        break;

                    default:
                        GhysX.local.stage_info.bird1 = bird_element._index;
                        break;
                }
            }
        }, this);

        for (let i = 1; i <= 10; i++) {
            let node = cc.instantiate(this.birdPrefab);
            let c = node.getComponent(bird_element);
            c.init(this._select_type, i);
            this.layout.node.addChild(node);

            switch (this._select_type) {
                case 2:
                    if (GhysX.local.stage_info.bird2 == i) {
                        GhysX.handler.emit('select_bird_element', c);
                    }
                    break;

                default:
                    if (GhysX.local.stage_info.bird1 == i) {
                        GhysX.handler.emit('select_bird_element', c);
                    }
                    break;
            }

            this._bird_elements.push(c);
        }
    }

    start() {

    }

    // update (dt) {}
}
