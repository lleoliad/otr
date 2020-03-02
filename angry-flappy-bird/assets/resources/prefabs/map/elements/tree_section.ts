import { GhysX } from "../../../../libs/ghysx/GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class tree_section extends cc.Component {
    
    /**
     * 切片 ID
     */
    _section_id: number = 0;

    /**
     * 击穿需要的最低子弹类型
     */
    _bullet_type: number = 0;

    /**
     * 击穿需要的子弹数据
     */
    _bullet_count: number = 1;

    /**
     * 积分
     */
    _score: number = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._section_id = ~~this.node.name;
        // cc.log('tree_section:', this._id);

        let section_type = -1

        let section_infos = GhysX.db.cache.tree_info.section_infos;

        if (section_infos[0][2][this._section_id]) {
            section_type = 0;
        } else if (section_infos[1][2][this._section_id]) {
            section_type = 1;
        }

        let rate = 50;
        if (GhysX.db.cache.battle_info.tree_count < 10) {
            rate = 10;
        } else {
            rate = Math.min(100, 50 + 10 * Math.floor((GhysX.db.cache.battle_info.tree_count - 10) / 10));
        }

        if (section_type > -1 && GhysX.modules.unit.random(1, 100) <= rate) {
            let pic = this.node.getComponent(cc.Sprite);
            GhysX.graphics.draw({
                url: 'images/map/elements/tree',
                mode: GhysX.graphics.MODE.ATLAS,
                asset_type: cc.SpriteAtlas,
                asset_name: 's' + this._section_id,
                target: pic
            });
            this._bullet_type = section_infos[section_type][0][0];
            this._bullet_count = section_infos[section_type][0][1];
            this._score = section_infos[section_type][0][1];
        }
        // cc.log(this._section_id, this._bullet_type, this._bullet_count);
    }

    start () {

    }

    // update (dt) {}
}
