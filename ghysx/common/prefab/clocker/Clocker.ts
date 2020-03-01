import { GhysX } from "../../../GhysX";

const { ccclass, property } = cc._decorator;

var DisplayMode = cc.Enum({
    NONE: 0,
    HHMMSS: 1,
    SS: 2,
    Hour: 3
});

@ccclass
export default class Clocker extends cc.Component {

    @property({
        type: cc.Label,
        displayName: "文本对象",
        tooltip: "定时器cc.Label节点;\n默认为当前节点的 cc.Label;"
    })
    text: cc.Label = null;

    @property({
        // type: cc.String,
        displayName: "内容",
        tooltip: "内容:\n默认%s,如有其他显示需求，添加以%s的组合文件：例如：%s秒后"
    })
    content: string = '%s';

    @property({
        // type: cc.String,
        displayName: "样式",
        tooltip: "呈现样式:\n默认HH:MM:SS的样式{\"hour\":\":\",\"minute\":\":\",\"second\":\"\"}; \n如需要配置样式，内容为:{\"year\":\"年\",\"month\":\"月\",\"day\":\"天\",\"hour\":\"小时\",\"minute\":\"分钟\",\"second\":\"秒\",}"
    })
    style: string = '{\"hour\":\":\",\"minute\":\":\",\"second\":\"\"}';

    @property({
        type: DisplayMode,
        displayName: "显示模式",
        tooltip: "显示模式:\n0.NONE:不显示;\n1.HHMMSS:小时:分钟:秒钟;\n1.SS:秒钟,Hour:小时;"
    })
    displayMode = DisplayMode.HHMMSS;

    @property({
        type: cc.String,
        displayName: "星期",
        tooltip: ""
    })
    weekInfos: string[] = [];

    /**
     * 停留时间
     */
    @property({ visible: false })
    _duration: number = 5

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

    // LIFE-CYCLE CALLBACKS:

    updateDrawTimer() {
        if (!this.text || !this.text.enabled) {
            return;
        }

        let info = null;
        if (this._duration < 0) {
            this._duration = 0;
        }

        switch (this.displayMode) {
            case DisplayMode.HHMMSS:
                {
                    let day_time = Math.floor(this._duration * 1000);
                    let time = GhysX.os.time.formatTime(day_time, this.style);
                    // let week_info = this.weekInfos[time.week] || '';
                    // info = week_info + time.info;
                }
                break;

            case DisplayMode.SS:
                {
                    info = this._duration;
                }
                break;

            case DisplayMode.Hour:
                {
                    info = GhysX.os.time.getHour(this._duration * 1000);
                }
                break;

            default:
                break;
        }

        this.text.string = ('' as any).format(this.content, info);
    }

    onLoad() {
        var d = new Date(GhysX.os.time.sstime());
        var localTime = d.getTime();
        var localOffset = d.getTimezoneOffset() * 60000; //获得服务器时间偏移的毫秒数
        var utc = localTime + localOffset; //utc即GMT时间
        var offset = GhysX.db.user.time_zone; //取当前服务器时区
        var server_time = utc + (3600000 * offset);

        this._elapsed = GhysX.db.user.server_date.millisecond / 1000;
        this._duration = (server_time - GhysX.db.user.server_date.millisecond) / 1000;

        if (this.style && typeof this.style == 'string') {
            this.style = JSON.parse(this.style);
        }

        if (!this.text) {
            this.text = this.node.getComponent(cc.Label);
        }

        if (this.text) {
            if (!this.content) {
                this.content = this.text.string;
            }

            if (!this.style) {
                this.style = { hour: ':', minute: ':', second: '' } as any;
            }

            this.updateDrawTimer();
        }

        this._running = true;
    }

    start() {

    }

    update(dt) {
        if (!this._running) {
            return;
        }

        this._elapsed = this._elapsed + dt;
        if (this._elapsed >= 1) {
            this._duration = this._duration + 1;
            this.updateDrawTimer();
            this._elapsed -= 1;
        }
    }
}
