export let sys = null;
export let info =  null;

function auth() {

}

export function initialize(GhysX) {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        info = require('WeiXinPlatform');
        info.initWeiXinPlatform(GhysX);
    } else {
        this.sys = {
            // platform: 'unknown',
            platform: cc.sys.os,
            options: {}
        };

        GhysX.handler.on('share', function (args) {
            args.share_type = args.share_type || 'share_app_message';
            if (args.share_type === 'share_app_message') {
                if (typeof args.complete === 'string') {
                    GhysX.handler.emit(args.complete);
                } else if (typeof args.complete === 'function') {
                    args.complete();
                }
            }
        });

        /**
         * 充值
         */
        GhysX.handler.on("recharge", function (args) {
            let server_number = args.server_number;
            let order_number = args.order_number;
            let order_money = args.order_money;
            let goods_name = args.goods_name;
            let goods_desc = args.goods_desc;
            let callback_handler = args.callback_handler;
            let params_handler = args.params_handler;

            if (callback_handler) {
                if (typeof (callback_handler) === 'function') {
                    callback_handler(params_handler);
                } else {
                    GhysX.handler.emit(callback_handler, params_handler);
                }
            }
        });

        // GhysX.handler.on("recharge_success", function (args) {
        //     cc.log(args);
        //     GhysX.handler.emit('location-message', {
        //         handler: 'recharge_success',
        //         args: args.top_up_order
        //     });
        // });

        GhysX.handler.on('recharge_success', function (args) {
            cc.log(args);
            let params = {};
            params.handler = 'recharge_success';
            cc.m.utils.merge(args.top_up_order, params);
            cc.log(params);
            GhysX.handler.emit('location-message', params);
        });

        GhysX.handler.on('create_video', function (args) {
            args.success(null, args);
        });

        GhysX.handler.on("login", function (args) {
            GhysX.handler.emit('login_complete', args);
        });

        GhysX.handler.on("authorize", function (args) {
            GhysX.handler.emit('authorize_success', args);
        });

        /** 下载压缩文件 */
        GhysX.handler.on('download_task', function (args) {
            if (args.download_progress) {
                args.download_progress({
                    progress: 100
                });
            }
            if (args.download_success) {
                args.download_success({});
            }
            if (args.uncompress_success) {
                args.uncompress_success({});
            }
        });

        GhysX.handler.on('location-message', function (args) {
            if (this.sys.options.platform === 'iOS') {
                window.webkit.messageHandlers.onWebViewMessage.postMessage({
                    "params": JSON.stringify(args)
                });
            } else if (this.sys.options.platform === 'android') {
                let f = function (param) {
                    let result = '';
                    for (let key in param) {
                        let pvalue = param[key];
                        if ('function' !== typeof pvalue) {
                            if ('object' === typeof pvalue) {
                                let ret = f(pvalue);
                                if (ret) {
                                    if (result.length > 0) {
                                        result = result + '&';
                                    }
                                    result = result + ret;
                                }
                            } else {
                                if (result.length > 0) {
                                    result = result + '&';
                                }
                                result = result + key + '=' + pvalue;
                            }
                        }
                    }
                    return result;
                };
                let params = f(args);
                cc.log(params);
                document.location = 'location-scheme://' + params;
            }
        }.bind(this));

        GhysX.handler.on('location-scheme', function (args) {
            cc.log(args);
            // cc.log(args, JSON.parse(args));
            if (args && args.handler) {
                GhysX.handler.emit(args.handler, args);
            }
        }.bind(this));

        auth();
    }
}

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         target: {
//             default: null,
//             type: Object
//         },
//         systemInfo: {
//             default: null,
//             type: Object
//         },
//         type: '',
//         info: null
//     },

//     // LIFE-CYCLE CALLBACKS:

//     // onLoad () {},

//     start () {
        
//     },
    
//     init: function () {
//         if ('weixin' === GhysX.Data.platform.name) {
//             this.target = this.node.addComponent('WXPlatform');
//         }
    
//         this.getSystemInfo();

//         if (cc.sys.platform === cc.sys.WECHAT_GAME) {
//             this.info = require('WeiXinPlatform');
//             this.info.initWeiXinPlatform();
//         } else {
//             GhysX.Handler.on('share', function (args) {
//                 args.share_type = args.share_type || 'share_app_message';
//                 if (args.share_type === 'share_app_message') {
//                     if (typeof args.complete === 'string') {
//                         GhysX.Handler.emit(args.complete);
//                     } else if (typeof args.complete === 'function') {
//                         args.complete();
//                     }
//                 }
//             });

//             GhysX.Handler.on('create_video', function (args) {
//                 if (typeof args.success === 'string') {
//                     GhysX.Handler.emit(args.success, {});
//                 } else if (typeof args.success === 'function') {
//                     args.success({});
//                 }
//             });

//             this.sys = {
//                 platform: 'unknown'
//             };

//             GhysX.handler.on('share', function (args) {
//                 args.share_type = args.share_type || 'share_app_message';
//                 if (args.share_type === 'share_app_message') {
//                     if (typeof args.complete === 'string') {
//                         GhysX.handler.emit(args.complete);
//                     } else if (typeof args.complete === 'function') {
//                         args.complete();
//                     }
//                 }
//             });


//             /**
//              * 充值
//              */
//             GhysX.handler.on("recharge", function (args) {
//                 let server_number = args.server_number;
//                 let order_number = args.order_number;
//                 let order_money = args.order_money;
//                 let goods_name = args.goods_name;
//                 let goods_desc = args.goods_desc;
//                 let callback_handler = args.callback_handler;
//                 let params_handler = args.params_handler;

//                 if (callback_handler) {
//                     if (typeof (callback_handler) === 'function') {
//                         callback_handler(params_handler);
//                     } else {
//                         GhysX.handler.emit(callback_handler, params_handler);
//                     }
//                 }
//             });

//             GhysX.handler.on("login", function (args) {
//                 GhysX.handler.emit('login_complete', args);
//             });

//             GhysX.handler.on("authorize", function (args) {
//                 GhysX.handler.emit('authorize_success', args);
//             });

//             /** 下载压缩文件 */
//             GhysX.handler.on('download_task', function (args) {
//                 if (args.download_progress) {
//                     args.download_progress({
//                         progress: 100
//                     });
//                 }
//                 if (args.download_success) {
//                     args.download_success({});
//                 }
//                 if (args.uncompress_success) {
//                     args.uncompress_success({});
//                 }
//             });

//             this.auth();
//         }
//     },

//     // LIFE-CYCLE CALLBACKS:
//     auth: function () {
//         let account_code = cc.sys.localStorage.getItem('account_code');
//         if (!account_code) {
//             if (this.info) {
//                 GhysX.Handler.emit('authorize', this); //进入授权
//                 return;
//             } else {
//                 account_code = cc.m.utils.guid();
//                 cc.sys.localStorage.setItem('account_code', account_code);
//             }
//         }

//         this.info = {
//             code: '',
//             user_info: {}
//         };

//         this.info.code = account_code;

//         let url = window.location.href;
//         let pos = url.indexOf('?');
//         if (pos > -1) {
//             let option_info = url.substring(pos + 1);
//             let options = option_info.splits('&', '=');
//             for (let key in options) {
//                 if (options[key][0] === 'account') {
//                     this.info.code = options[key][1];
//                 }
//             }
//         }

//         GhysX.Handler.emit('auth_success', this.info);
//     },

//     /**
//      * 浏览器获得设备信息
//      * https://www.baidu.com/s?wd=%E6%B5%8F%E8%A7%88%E5%99%A8%E8%8E%B7%E5%BE%97%E8%AE%BE%E5%A4%87%E4%BF%A1%E6%81%AF&rsv_spt=1&rsv_iqid=0xa66eeae900016301&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=28&rsv_sug1=23&rsv_sug7=101&rsv_t=25e7bxH%2B%2BCsFBTGwoM8%2BvNglLa5TuRTwvkpaJ%2FtRWHyCU6j2AOs3iDuzLLPzOw%2Bc1FDh
//      * https://www.douban.com/note/266639449/
//      * https://blog.csdn.net/fdipzone/article/details/78397542?locationNum=6&fps=1
//      * https://zhidao.baidu.com/question/1767335797735556740.html
//      * http://www.cnblogs.com/niuniu1985/archive/2010/08/20/1804431.html
//      * @param {*} args 
//      */
//     getSystemInfo(...args) {
//         if (this.target && this.target.getSystemInfo) {
//             this.target.getSystemInfo(args);
//         }
//     },

//     /**
//      * 版本更新
//      */
//     updateVersion() {
//         if (this.target && this.target.updateVersion) {
//             this.target.updateVersion(args);
//         }
//     },

//     /**
//      * 发送消息
//      * @param {*} args 
//      */
//     message(...args) {
//         if (this.target && this.target.message) {
//             this.target.message(args);
//         }
//     },

//     /**
//      * 储存平台数据
//      * @param {*} args 
//      */
//     storage(...args) {
//         if (this.target && this.target.storage) {
//             this.target.storage(args);
//         }
//     },

//     /**
//      * 分享
//      * @param {*} args 
//      */
//     share(...args) {
//         if (this.target && this.target.share) {
//             this.target.share(args);
//         } else {
//             let callback = args[args.length - 1];
//             if (typeof callback === 'function') {
//                 callback({
//                     success: true
//                 })
//             }
//         }
//     },

//     /**
//      * 圈子
//      * @param {*} args 
//      */
//     circles (...args) {
//         if (this.target && this.target.circles) {
//             this.target.circles(args);
//         }
//     },

//     /**
//      * 社交
//      * @param {*} args 
//      */
//     social(...args) {
//         if (this.target && this.target.social) {
//             this.target.social(args);
//         }
//     },

//     /**
//      * 二维码
//      * @param {*} args 
//      */
//     qrcode(...args) {
//         if (this.target && this.target.qrcode) {
//             this.target.qrcode(args);
//         }
//     },

//     /**
//      * 支付
//      * @param {*} args 
//      */
//     payment(...args) {
//         if (this.target && this.target.payment) {
//             this.target.payment(args);
//         }
//     },

//     /**
//      * 平台账号登录
//      * @param {*} args 
//      */
//     login(...args) {
//         // if (this.target && this.target.login) {
//         //     GhysX.Data.platform.inlogin = true
//         //     this.target.login(args);
//         // } else {
//         //     this.guest(args);
//         // }

//         let account_code = cc.sys.localStorage.getItem('account_code');
//         if (!account_code) {
//             if (this.info) {
//                 GhysX.Handler.emit('authorize', this); //进入授权
//                 return;
//             } else {
//                 account_code = GhysX.Unit.ugid.guid();
//                 cc.sys.localStorage.setItem('account_code', account_code);
//             }
//         }

//         this.info = {
//             code: '',
//             user_info: {}
//         };

//         this.info.code = account_code;

//         GhysX.Handler.emit('auth_success', this.info);
//         this.guest(args);
//     },

//     /**
//      * 平台账号登出
//      * @param {*} args 
//      */
//     logout(...args) {
//         if (this.target && this.target.logout) {
//             this.target.logout(args);
//         }
//     },

//     /**
//      * 游客账号登出
//      * @param {*} args 
//      */
//     guest(...args) {
//         // cc.log('guest account login.');
//         GhysX.Data.platform.inlogin = true
//         GhysX.Network.of('/index').once('guest', function (message) {
//             // cc.log('guest:', message);
//             GhysX.Data.platform.inlogin = false
//             if (0 == message.status) {
//                 GhysX.Data.platform.userInfo = {
//                     account: message.data.guest.account,
//                     account_type: 'guest',
//                     nickName: GhysX.i18n.t('guest_nickname') || 'Guest'
//                 };
//                 GhysX.Storage.write('guest_account', message.data.guest.account);
//                 GhysX.Handler.emit('login_guest_success', message);
//             }
//         })

//         let guest_account = GhysX.Storage.read('guest_account', '');

//         GhysX.Network.send("message", {
//             gate: 'login', // * shouting; $ reset; name to; null def
//             handler: 'guest',
//             invoke: "guest",
//             data: {
//                 guest: {
//                     account: guest_account
//                 }
//             }
//         }, 'proto');
//     },

//     // update (dt) {},
// });
