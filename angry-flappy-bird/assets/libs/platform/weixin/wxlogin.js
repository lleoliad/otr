cc.Class({
    extends: cc.Component,

    properties: {
        playerHead: {
            default: null,
            type: cc.Sprite
        },
        playerName: {
            default: null,
            type: cc.Label
        },
        playerScore: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:
    init (home) {
        let self = this;
        this.home = home;

        cc.ql.net.of('/index').on('login_success', function (message) {
            cc.log('login:', message);
            if (0 == message.status) {
                self.playerScore.string = message.data.user.gems;
            }
        })

        cc.state_machine.add({
            _name: "login_guest_success",
            _init: function (terminal) {

            },
            _inited: false,
            _instance: this,
            _state: 0,
            _invoke: function (terminal, instance, params) {
                cc.sys.localStorage.setItem("guest_account", params.data.guest.account)
                cc.ql.net.send("message", {
                    gate: 'login', // * shouting; $ reset; name to; null def
                    handler: 'login',
                    invoke: "login_success",
                    data: {
                        account: params.data.guest.account
                    }
                }, 'proto');
                return true;
            },
            _terminal: null,
            _terminals: null
        });

        cc.state_machine.add({
            _name: "login_account_success",
            _init: function (terminal) {

            },
            _inited: false,
            _instance: this,
            _state: 0,
            _invoke: function (terminal, instance, params) {
                
                return true;
            },
            _terminal: null,
            _terminals: null
        });

        cc.state_machine.init();
    },

    onLoad () {
        var self = this;
        if (window.wx != undefined) {
            wx.authorize({
                scope: 'scope.record',
                fail: function (res) {
                    // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                    if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                        // 处理用户拒绝授权的情况
                    }
                },
                success: function (res) {
                    wx.login({
                        success: function () {
                            // var userInfo = wx.getUserInfo();
                            // var avatarUrl = userInfo.res.avatarUrl;
                            wx.getUserInfo({
                                success: function (res) {
                                    var userInfo = res.userInfo
                                    var nickName = userInfo.nickName
                                    var avatarUrl = userInfo.avatarUrl
                                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                                    var province = userInfo.province
                                    var city = userInfo.city
                                    var country = userInfo.country
                                    self.playerName.string = nickName;

                                    cc.loader.load({
                                        url: avatarUrl,
                                        type: 'jpg'
                                    }, (err, texture) => {
                                        self.playerHead.spriteFrame = new cc.SpriteFrame(texture);
                                    });

                                    cc.ql.net.of('/index').once('user', function (message) {
                                        cc.log('guest:', message);
                                        if (0 == message.status) {
                                            cc.state_machine.execute("login_account_success", 0, message);
                                        }
                                    })

                                    cc.ql.net.send("message", {
                                        gate: 'login', // * shouting; $ reset; name to; null def
                                        handler: 'user',
                                        invoke: "user",
                                        data: {
                                            weixin: res,
                                            platform: {
                                                account: userInfo.account
                                            }
                                        }
                                    }, 'proto');
                                }
                            })
                        }
                    })
                }
            })
        } else {
            cc.ql.net.of('/index').once('guest', function (message) {
                cc.log('guest:', message);
                if (0 == message.status) {
                    self.playerName.string = 'guest';
                    cc.state_machine.execute("login_guest_success", 0, message);
                }
            })
            
            let guest_account = cc.sys.localStorage.getItem("guest_account") || '';

            cc.ql.net.send("message", {
                gate: 'login', // * shouting; $ reset; name to; null def
                handler: 'guest',
                invoke: "guest",
                data: {
                    guest: {
                        account: guest_account
                    }
                }
            }, 'proto');
        }
    },

    start () {

    },

    // update (dt) {},
});
