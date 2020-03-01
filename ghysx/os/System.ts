import * as Storage from "./Storage";
import { Audio } from "./Audio";

export namespace System {
    export let storage = Storage
    export let audio = Audio;

    export namespace time {
        export let local = new Date();

        export function sstime(): number {
            let t = new Date().getTime();
            // let st = jkit.db.user_info.login_time + (t - (jkit.db.user_info as any).system_time);
            // return st;
            return 0;
        }

        export function difftime(newtime: number, prevtime?: any): number {
            let r = 0;
            if (!prevtime) {
                prevtime = sstime();
            }
            r = newtime - prevtime;
            return r;
        }
        
        export function formatTime(time: number, match_info?: any) {

        }

        export function getHour(time: number) {
            
        }

        export function timeZone(time_zone: number): number {
            var d = new Date(sstime());
            var localTime = d.getTime();
            var localOffset = d.getTimezoneOffset() * 60000; //获得服务器时间偏移的毫秒数
            var utc = localTime + localOffset; //utc即GMT时间
            var offset = time_zone; //取当前服务器时区
            var server_time = utc + (3600000 * offset);
            return server_time;
        }
    }

    export function initialize(GhysX) {
        audio.initialize();
    }
}