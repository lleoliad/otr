import { GhysX } from "../../../libs/ghysx/GhysX";
import chapter_element from "./chapter_element";

const { ccclass, property } = cc._decorator;

@ccclass
export default class chapter extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "章节组件",
        tooltip: ""
    })
    chapter_element_prefab: cc.Prefab = null;

    @property({
        type: cc.Label,
        displayName: "章节级名称",
        tooltip: ""
    })
    title: cc.Label = null;

    @property({
        // type: cc.String,
        displayName: "章节名称文本",
        tooltip: ""
    })
    title_string: string = '';

    @property({
        type: cc.Layout,
        displayName: "列表容器",
        tooltip: ""
    })
    layout: cc.Layout = null;

    /**
     * 章节信息
     */
    _chapter_moulds: chapter_mould[] = null;

    // LIFE-CYCLE CALLBACKS:

    init(chapter_moulds: chapter_mould[]) {
        this._chapter_moulds = chapter_moulds;
    }

    createElement(chapter_mould: chapter_mould) {
        let node = cc.instantiate(this.chapter_element_prefab);
        let c = node.getComponent(chapter_element);
        c.init(chapter_mould);
        this.layout.node.addChild(node);
    }

    onLoad () {
        this.title.string = this.title_string.format(this._chapter_moulds[0].group);

        for (let key in this._chapter_moulds) {
            let chapter_mould = this._chapter_moulds[key];
            this.createElement(chapter_mould);
        }
    }

    start() {

    }

    // update (dt) {}
}
