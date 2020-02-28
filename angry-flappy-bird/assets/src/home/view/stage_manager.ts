import { GhysX } from "./../../../libs/ghysx/GhysX";
import chapter from "./../components/chapter";
import chapter_element from "./../components/chapter_element";

const { ccclass, property } = cc._decorator;

@ccclass
export default class stage_manager extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "章节组组件",
        tooltip: ""
    })
    chapter_title_prefab: cc.Prefab = null;

    @property({
        type: cc.ScrollView,
        displayName: "列表容器",
        tooltip: ""
    })
    scroll_view: cc.ScrollView = null;

    // LIFE-CYCLE CALLBACKS:    
    onClickBackButton(event: cc.Event.EventTouch, params: string) {
        // GhysX.graphics.manager.close('stage_manager');
        // GhysX.graphics.draw({
        //     url: 'prefabs/common/background',
        //     mode: GhysX.graphics.MODE.VIEW,
        //     script: 'background', invoke: 'init', params: {}, complete: function (params) {
        //         GhysX.graphics.draw({
        //             url: 'prefabs/ui/main_menu',
        //             mode: GhysX.graphics.MODE.VIEW,
        //             group_name: 'ui',
        //             script: 'main_menu', invoke: 'init', params: {}, complete: function (params) {
        //                 // cc.log('complete', params);
        //             }
        //         });

        //         // GhysX.graphics.manager.listener('start', 'main_menu', function(){cc.log('listener');}, null);
        //     }
        // });
    }

    init() {

    }

    createTitle(chapter_moulds: chapter_mould[]) {
        let node = cc.instantiate(this.chapter_title_prefab);
        let c = node.getComponent(chapter);
        c.init(chapter_moulds);
        this.scroll_view.content.addChild(node);
    }

    onLoad () {
        let chapter_mouldss = GhysX.modules.array.group(GhysX.res.chapter_moulds, [{ gkey: 'group', ekey: 'stage'}]);
        for (let key in chapter_mouldss) {
            let chapter_moulds = chapter_mouldss[key];
            this.createTitle(chapter_moulds);
        }
    }

    start() {

    }

    onEnable() {
        GhysX.handler.emit('hide_banner');
    }

    // update (dt) {}
}
