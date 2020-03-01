import * as Unit from "./../common/utils/Unit";

export namespace Network {
    export let handler = null;
    // export let http = Http;
    // export let socket = NSocket;
    export let protocol;
    export let option = {};

    export let Crypto = null;

    export namespace Http {
        export function request(path, data, handler, errorHandler, extraUrl) {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for (var k in data) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if (extraUrl == null) {
                extraUrl = this.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            // cc.log("RequestURL:" + requestURL);
            xhr.open("GET", requestURL, true);
            if (cc.sys.isNative) {
                // xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if ((xhr.status >= 200 && xhr.status < 300)) {
                        // cc.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                        try {
                            var ret = JSON.parse(xhr.responseText);
                            if (handler !== null) {
                                handler(ret);
                            } /* code */
                        } catch (e) {
                            // cc.log("err:" + e);
                            handler(null, xhr);
                        } finally {

                        }
                    } else {
                        if (undefined !== errorHandler && errorHandler !== null) {
                            errorHandler(xhr);
                        }
                    }
                }
            };

            xhr.send();
            return xhr;
        }
    }

    export namespace Socket {
        export let protobuf = null;
        export let message = null;
        export let sessionId = 0;
        export let url = '';
        export let defaultContext: 'proto' = null;
        
        export function ctor() {
            this.dir = '';
            this.sockets = {};
            this.invokes = {};
        }

        export function init(address) {
            this.address = address;
        }

        export function connect(path) {
            path = path || '';

            var self = this;
            if (self.sockets[path]) {
                return this;
            }

            // var address = 'wss://' + this.address + path;
            var address = this.address + path;
            var opts = {
                'reconnection': false,
                'force new connection': true,
                'transports': ['websocket', 'polling'],
                'heartbeat': 5000
            }

            // cc.log('connect:', address);

            function analytic(message) {
                let messageType = typeof message;
                if ('object' === messageType && undefined === message.status) {
                    message = self.message.decode(new Uint8Array(message));

                    try {
                        message.data = JSON.parse(message.data);
                    } catch (e) { } finally { }
                } else if ('string' === messageType) {
                    try {
                        message = JSON.parse(message);
                    } catch (e) {
                        cc.log('message is string.');
                    }
                } else {
                    try {
                        if (typeof message.data === 'string' && message.data.length > 0 && '{' == message.data.charAt(0)) {
                            message.data = JSON.parse(message.data);
                        }
                    } catch (e) { } finally { }
                }
                // cc.log("recv message", message);
                recv(socket, message.invoke, message);
            }

            function recv(socket, event, args?: any) {
                if (socket) {
                    let tpath = socket.path || '';
                    if (0 < tpath.length) {
                        tpath = tpath + '/'
                    }
                    if (event) {
                        let fkey = tpath + event;
                        let fu = self.invokes[fkey];
                        // // cc.log(fkey, fu)
                        if (fu) {
                            fu(args);

                            if (fu.of) {
                                delete self.invokes[fkey];
                                // cc.log('delete fun.', fkey);
                            }
                        } else {
                            handler.emit(event, args);
                        }
                    }

                    if (args && args.event) {
                        let fkey = tpath + args.event;
                        let fu = self.invokes[fkey];
                        // // cc.log(fkey, fu)
                        if (fu) {
                            fu(args);

                            if (fu.of) {
                                delete self.invokes[fkey];
                                // cc.log('delete fun.', fkey);
                            }
                        } else {
                            handler.emit(args.event, args);
                        }
                    }
                }
            }

            var socket = window['io'].connect(address, opts);

            socket.on('reconnect', function () {
                cc.log('reconnection');
                recv(socket, 'reconnect');
            });

            socket.on('connect', function () {
                cc.log('connect');
                socket.connected = true;
                recv(socket, 'connect');
            });

            socket.on('connect_failed', function () {
                cc.log('connect_failed');
                recv(socket, 'connect_failed');
            });

            socket.on('connect_error', function () {
                cc.log('connect_error');
                recv(socket, 'connect_error');
            });

            socket.on('connect_timeout', function () {
                cc.log('connect_timeout');
                recv(socket, 'connect_timeout');
            });

            socket.on('error', function () {
                cc.log('error');
                recv(socket, 'error');
            });

            socket.on('connection', function () {
                cc.log('connection');
                recv(socket, 'connection');
            });

            socket.on('disconnect', function (data) {
                cc.log("disconnect", data);

                recv(socket, 'disconnect', data);
                if (this.socket == socket) {
                    this.socket = null;
                }
                delete self.sockets[self.path];
                socket.connected = false;
            });

            socket.on('reconnect', function () {
                cc.log('reconnect');
                recv(socket, 'reconnect');
            });

            socket.on('reconnect_attempt', function () {
                cc.log('reconnect_attempt');
                recv(socket, 'reconnect_attempt');
            });

            socket.on('reconnecting', function () {
                cc.log('reconnecting');
                recv(socket, 'reconnecting');
            });

            socket.on('reconnect_error', function () {
                cc.log('reconnect_error');
                recv(socket, 'reconnect_error');
            });

            socket.on('reconnect_failed', function () {
                cc.log('reconnect_failed');
                recv(socket, 'reconnect_failed');
            });

            // socket.on('ping', function () {
            //     cc.log('ping');
            //     recv(socket, 'ping');
            // });

            // socket.on('pong', function () {
            //     cc.log('pong');
            //     recv(socket, 'pong');
            // });

            socket.on('message', function (message) {
                analytic(message);
            });

            socket.on('broadcast', function (message) {
                // cc.log('broadcast');

                // recv(socket, 'broadcast');
                // recv(socket, message.invoke, message);
                analytic(message);
            });

            socket.path = path;
            self.sockets[path] = socket;

            if (undefined === self.socket || null === self.socket) {
                self.socket = socket;
            }
            return this;
        }

        export function isConnected(path) {
            let socket = path ? this.sockets[path] : this.socket;
            let result = socket && socket.connected;
            return result;
        }

        export function of(path) {
            this.dir = path || '';
            if (0 < this.dir.length) {
                this.dir = this.dir + '/'
            }
            return this;
        }

        export function on(event, fn) {
            this.invokes[this.dir + event] = fn;
            return this;
        }

        export function once(event, fn) {
            fn.of = true;
            this.invokes[this.dir + event] = fn;
            return this;
        }

        export function off(event) {
            delete this.invokes[this.dir + event];
            return this;
        }

        export function use(path) {
            this.socket = this.sockets[path];
            return this;
        }

        export function emit(event, data) {
            // cc.log("emit:", event, data);
            data.context = 'json';
            if (this.socket) {
                this.socket.emit(event, data);
            }
            return this;
        }

        export function send(event, data, context) {
            var socket = this.socket;
            if (socket && socket.connected) {
                // if (data != null && (typeof (data) == "object")) {
                //     data = JSON.stringify(data);       
                // }

                data.context = context || this.defaultContext;

                if (undefined === data.context) {
                    data.context = 'json';
                }

                if (window['wx'] !== undefined) {
                    data.context = 'json';
                }

                // cc.log("send:", event, data);
                if ('json' !== data.context) {
                    data.context = 'proto';
                    data.data = JSON.stringify(data.data);
                    var message = this.message.create(data)
                    var buffer = this.message.encode(message).finish();
                    data = buffer;
                }

                socket.emit(event, data);
            }
            return this;
        }

        export function close(path?: any) {
            // cc.log('close');
            let socket = path ? this.sockets[path] : this.socket;
            if (socket) {
                if (socket == this.socket) {
                    this.socket = null;
                }
                if (socket.connected) {
                    socket.connected = false;
                    socket.disconnect();
                }
                delete this.sockets[socket.path];
                socket = null;
            }
            return this;
        }

        export function initNetwork(asset) {
            var self = this;
            // Network.url = "http://localhost:4309";
            // Network.url = "https://101.132.105.207:4309";
            // Network.url = "http://qys.91xixifun.com:4309";
            // Network.url = 'https://arithmetic.vinxin.cn'
            this.url = asset.network.url;
            Http.request(asset.network.route, {
                account: asset.network.account,
                password: asset.network.password,
                env: asset.network.env
            }, function (ret) {
                // cc.log('HTTP: RESULT', ret);

                // var url = cc.url.raw(GhysX.Data.network.proto);
                cc.loader.loadRes(asset.network.proto, function (err, tex) {
                    var protobuf = window['protobuf']; // || require('protobuf');

                    if (protobuf != undefined) {
                        var builder = protobuf.parse(tex.text);
                        var Message = builder.root.lookupType(asset.network.message);

                        Network.Socket.protobuf = protobuf;
                        Network.Socket.message = Message;
                    }

                    delete asset.network;

                    // cc.log(GhysX.Network);
                    ret.scoket_url = 'ws://qys.91xixifun.com:4100'

                    loginGate(asset, ret.scoket_url);
                });
            }, function (xhr) {
                cc.log('网络异常：', xhr.status);
                setTimeout(function (params) {
                    initNetwork(asset);
                }, 1500);
            }, asset.network.url);
        }
    }

    function parseOption(url: string): any {
        let result = {};
        let pos = url.indexOf('?');
        if (pos) {
            let params = url.slice(pos + 1).splits('&', '=');
            for (let rkey in params) {
                let param = params[rkey];
                result[param[0]] = param[1];
            }
        }
        return result;
    }

    export function loginGate(asset, scoket_url) {
        var self = this;
        Network.Socket.of('/index').once('connection_success', function (message) {
            cc.log('connection_success', message);
            Crypto.RSA.setPublicKey(message.data.publicKey);
            Crypto.RC4.key = Unit.password(32);
            Crypto.RC4.inst = Unit.rc4;
            let encryptData = Crypto.RSA.encrypt(Crypto.RC4.key);
            Network.Socket.send("message", {
                gate: '$', // * shouting; $ reset; name to; null def
                handler: 'join',
                // invoke: "close",
                data: {
                    msg: asset.platform.type,
                    version: asset.version.version,
                    resouce_version: asset.resouce_version,
                    password: encryptData
                }
            }, 'json');
        }).once('join_success', function (message) {
            cc.log('join_success', message);
            handler.emit("open", message);
        }).once("close", function (message) {
            cc.log('close', message);
            Network.Socket.close();
        }).once("connect_error", function (message) {
            cc.log('error', message);
            Network.Socket.close('/index');
            setTimeout(function () {
                loginGate(asset, scoket_url);
            }, 3000);
        });

        // Network.init('wss://arithmetic.vinxin.cn:4200');
        // Network.init('ws://localhost:4100');
        Network.Socket.init(scoket_url);
        Network.Socket.connect('/index').use('/index');
    }

    export function initialize(GhysX) {
        handler = GhysX.handler;
        Crypto = {
            RSA: new JSEncrypt(),
            RC4: { key: '', inst: null }
        };
        
        // 解析当前的 URL 参数
        let url = window.location.href;
        parseOption(url);

        Network.Socket.ctor();

        handler.on('network-handshake-request', function (asset) {
            Network.Socket.initNetwork(asset);
        });

        return this;
    }
}