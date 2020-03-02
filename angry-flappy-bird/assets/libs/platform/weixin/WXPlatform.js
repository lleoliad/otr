cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var self = this;
        if (window.wx != undefined) {
            wx.showShareMenu();

            // 监听主动触发平台分享
            wx.onShareAppMessage(function () {
                setTimeout(1000, function () {
                    self.shareListener();
                });
                return {
                    title: '转发标题',
                    imageUrl: '',
                    query: '',
                    success: function (res) {

                    },
                    fail: function (res) {

                    },
                    complete: function (res) {

                    }
                }
            })

            // 开放域监听主域发来的消息
            wx.onMessage(data => {
                cc.log(data)
                if ('show_rank' == data.type) {

                }
            })

            // 设置 withShareTicket: true
            wx.updateShareMenu({
                withShareTicket: true
            })
        }
    },

    getSystemInfo(...args) {
        let self = this;
        if (window.wx != undefined) {
            wx.getSystemInfo({
                success: function (res) {
                    self.systemInfo = res
                    cc.log(res.model) //  手机型号
                    cc.log(res.pixelRatio)
                    cc.log(res.windowWidth)
                    cc.log(res.windowHeight)
                    cc.log(res.language)
                    cc.log(res.version)
                    cc.log(res.platform)
                    cc.log(res.system) //  操作系统版本
                    self.build = res;
                }
            })
        }
    },

    /**
     * 版本更新
     * https://developers.weixin.qq.com/minigame/dev/tutorial/usability/update.html
     */
    updateVersion() {
        var self = this;
        if (window.wx != undefined) {
            if (typeof wx.getUpdateManager === 'function') {
                const updateManager = wx.getUpdateManager()

                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    cc.log(res.hasUpdate)
                })

                updateManager.onUpdateReady(function () {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                })

                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                })
            }
        }
    },

    /**
     * 微信开放域的使用
     * https://developers.weixin.qq.com/minigame/dev/tutorial/usability/update.html
     * https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/open-data.html
     * 
     * 接入微信小游戏的开放数据域
     * http://docs.cocos.com/creator/manual/zh/publish/publish-wechatgame-sub-domain.html
     * @param {*} args 
     */
    message(...args) {
        var self = this;
        if (window.wx != undefined) {
            let data = arguments[0];
            let openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage(data)
        }
    },

    /**
     * 储存平台数据
     * https: //blog.csdn.net/qq_34550847/article/details/79628805
     * @param {*} args 
     */
    storage(...args) {
        var self = this;
        if (window.wx != undefined) {
            let command = arguments[0];
            let type = arguments[1];
            let dataList = arguments[1];
            let callback = arguments[2];
            if ('set' === command) {
                if ('user' === type) {
                    // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.setUserCloudStorage.html
                    wx.setUserCloudStorage({
                        // KVDataList: [
                        //     {
                        //         key: 'score',
                        //         value: {
                        //             "wxgame": {
                        //                 "score": 16,
                        //                 "update_time": 1513080573
                        //             },
                        //             "cost_ms": 36500
                        //         }
                        //     }
                        // ],
                        KVDataList: dataList,
                        success: function (res) {
                            
                        },
                        fail: function (res) {
    
                        },
                        complete: function (res) {
    
                        }
                    })
                }
            } else if ('get' === command) {
                if ('user' === type) {
                    // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserCloudStorage.html
                    wx.getUserCloudStorage({
                        // keyList: ['score'],
                        keyList: dataList,
                        success: function (res) {
                            let KVDataList = res;
                        },
                        fail: function (res) {

                        },
                        complete: function (res) {

                        }
                    })
                }
            } else if ('remove' === command) {
                if ('user' === type) {
                    // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.removeUserCloudStorage.html
                    wx.removeUserCloudStorage({
                        // keyList: ['score'],
                        keyList: dataList,
                        success: function (res) {
                            let KVDataList = res;
                        },
                        fail: function (res) {

                        },
                        complete: function (res) {

                        }
                    })
                }
            }
        }
    },

    /**
     * 分享
     * https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/share.html
     * @param {*} args 
     */
    share(args) {
        var self = this;
        if (window.wx != undefined) {
            cc.log('weixin share.');
            let command = args[0];
            if ('show_menu' === command) {
                // https://developers.weixin.qq.com/minigame/dev/document/share/wx.showShareMenu.html
                wx.showShareMenu({
                    // withShareTicket: true,
                    success: function (res) {

                    },
                    fail: function (res) {

                    },
                    complete: function (res) {

                    }
                });
            } else if ('hide_menu' === command) {
                wx.hideShareMenu({
                    success: function (res) {

                    },
                    fail: function (res) {

                    },
                    complete: function (res) {

                    }
                });
            } else if ('share' === command) {
                let title = args[1];
                let imageUrl = args[2];
                let query = args[3];
                let invoke = args[4];
                // if (invoke) {
                //     invoke({
                //         success: true
                //     });
                // } else {
                    wx.shareAppMessage({
                        title: title,
                        imageUrl: imageUrl,
                        query: query,
                        success: function (res) {
                            invoke({
                                success: true
                            });
                        },
                        fail: function (res) {
                            invoke({
                                success: true
                            });
                        },
                        complete: function (res) {
                            invoke({
                                success: true
                            });
                        }
                    })
    
                    self.shareListener();
                // }
            } else if ('share_canvas' === command) {
                let title = args[1];
                let query = args[2];
                wx.onShareAppMessage(function () {
                    return {
                        title: title,
                        imageUrl: canvas.toTempFilePathSync({
                            destWidth: 500,
                            destHeight: 400
                        }),
                        query: query,
                        success: function (res) {

                        },
                        fail: function (res) {

                        },
                        complete: function (res) {

                        }
                    }
                })
                
                self.shareListener();
            }
        }
    },

    /**
     * 监听分享结果
     */
    shareListener() {
        // https://developers.weixin.qq.com/minigame/dev/document/share/wx.getShareInfo.html
        // wx.updateShareMenu({
        //     shareTicket: true,
        //     success: function (res) {

        //     },
        //     fail: function (res) {

        //     },
        //     complete: function (res) {

        //     }
        // });
    },

    /**
     * 圈子
     * https://blog.csdn.net/qq_34550847/article/details/79628805
     * 游戏圈使用指南: https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/game-club.html
     * API DOC: https://developers.weixin.qq.com/minigame/dev/document/open-api/game-club/wx.createGameClubButton.html
     */
    circles(...args) {
        var self = this;
        if (window.wx != undefined) {
            self.button = wx.createGameClubButton({
                type: 1, // 按钮的类型
                text: '', // 按钮上的文本，仅当 type 为 text 时有效
                image: '', // 按钮的背景图片，仅当 type 为 image 时有效
                style: '', // 按钮的样式
                icon: '' // 游戏圈按钮的图标，仅当 object.type 参数为 image 时有效。
            });
        }
    },

    /**
     * 社交
     * 关系链数据使用指南: https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/open-data.html
     */
    social(...args) {
        var self = this;
        if (window.wx != undefined) {
            let command = arguments[0];
            let callback = arguments[1];

            /**
             * result:
             * openId
             * avatarUrl
             * nickName
             * data
             */

            if ('friend' === command) {
                // 获取当前用户也玩该小游戏的好友的用户数据
                let friends = wx.getFriendCloudStorage({
                    success: res => {
                        let data = res.data;
                        if (callback) {
                            callback(data);
                        }
                    }
                });
            } else if ('group' === command) {
                let groups = wx.getGroupCloudStorage({
                    success: res => {
                        let data = res.data;
                        if (callback) {
                            callback(data);
                        }
                    }
                });
            }
        }
    },

    /**
     * 支付
     * https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/payment.html
     * @param {*} args 
     */
    payment(...args) {
        var self = this;
        if (window.wx != undefined) {
            // https://developers.weixin.qq.com/minigame/dev/document/midas-payment/wx.requestMidasPayment.html
            wx.requestMidasPayment({
                mode: 'game',
                offerId: '',
                buyQuantity: 10,
                zoneId: 1,
                success(res) {
                    // 支付成功
                },
                fail({errMsg, errCode}) {
                    // 支付失败
                    cc.log(errMsg, errCode)
                }
            })
        }
    },

    login(...args) {
        cc.log('weixin login.');
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
                        fail: function (res) {
                            GhysX.Data.platform.inlogin = false
                        },
                        success: function (res) {
                            var code = res.code; //返回code
                            // // var userInfo = wx.getUserInfo();
                            // // var avatarUrl = userInfo.res.avatarUrl;
                            // wx.getUserInfo({
                            //     fail: function (res) {
                            //         GhysX.Data.platform.inlogin = false
                            //     },
                            //     success: function (res) {
                            //         GhysX.Data.platform.inlogin = false
                            //         var userInfo = res.userInfo //用户基本信息
                            //         var nickName = userInfo.nickName //用户名
                            //         var avatarUrl = userInfo.avatarUrl //头像链接
                            //         var gender = userInfo.gender //性别 0：未知、1：男、2：女
                            //         var province = userInfo.province //所在省
                            //         var city = userInfo.city //所在市
                            //         var country = userInfo.country //所在市

                            //         userInfo.code = code;
                            //         GhysX.Data.platform.userInfo = userInfo

                            //         cc.loader.load({url: avatarUrl, type: 'jpg'}, (err, texture) => {
                            //             if (!err) {
                            //                 GhysX.Data.platform.userInfo.texture = texture
                            //             }
                            //         });

                            //         GhysX.Network.of('/index').once('user', function (message) {
                            //             cc.log('weixin account:', message);
                            //             if (0 == message.status) {
                            //                 GhysX.Data.platform.userInfo.account = message.data.platform.account;
                            //                 GhysX.Handler.emit('login_account_success', message);
                            //             }
                            //         })

                            //         GhysX.Network.send("message", {
                            //             gate: 'login', // * shouting; $ reset; name to; null def
                            //             handler: 'user',
                            //             invoke: "user",
                            //             data: {
                            //                 system_info: self.systemInfo,
                            //                 platform: {
                            //                     res: res,
                            //                     userInfo: userInfo,
                            //                     name: 'weixin',
                            //                     code: code
                            //                     // account: userInfo.code // userInfo.account
                            //                 }
                            //             }
                            //         }, 'proto');
                            //     }
                            // })

                            // https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/UserInfoButton.html
                            let button = wx.createUserInfoButton({
                                type: 'text',
                                text: '微信登录',
                                style: {
                                    left: (self.build.windowWidth - 200) / 2,
                                    top: self.build.windowHeight - 200,
                                    width: 200,
                                    height: 40,
                                    lineHeight: 40,
                                    backgroundColor: '#47c432',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    fontSize: 16,
                                    borderRadius: 4
                                }
                            })

                            button.onTap(function (res){
                                console.log(res)
                                GhysX.Data.platform.inlogin = false
                                var userInfo = res.userInfo //用户基本信息
                                var nickName = userInfo.nickName //用户名
                                var avatarUrl = userInfo.avatarUrl //头像链接
                                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                                var province = userInfo.province //所在省
                                var city = userInfo.city //所在市
                                var country = userInfo.country //所在市

                                userInfo.code = code;
                                GhysX.Data.platform.userInfo = userInfo

                                cc.loader.load({
                                    url: avatarUrl,
                                    type: 'jpg'
                                }, (err, texture) => {
                                    if (!err) {
                                        GhysX.Data.platform.userInfo.texture = texture
                                    }
                                });

                                GhysX.Network.of('/index').once('user', function (message) {
                                    cc.log('weixin account:', message);
                                    if (0 == message.status) {
                                        GhysX.Data.platform.userInfo.account = message.data.platform.account;
                                        GhysX.Handler.emit('login_account_success', message);
                                    }
                                })

                                GhysX.Network.send("message", {
                                    gate: 'login', // * shouting; $ reset; name to; null def
                                    handler: 'user',
                                    invoke: "user",
                                    data: {
                                        system_info: self.systemInfo,
                                        platform: {
                                            res: res,
                                            userInfo: userInfo,
                                            name: 'weixin',
                                            code: code
                                            // account: userInfo.code // userInfo.account
                                        }
                                    }
                                }, 'proto');

                                button.destroy();
                            })
                        }
                    })
                }
            })
        }
    },

    logout(...args) {
        cc.log('weixin logout.');
    },
    // update (dt) {},
});
