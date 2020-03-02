window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AnimationEventListener: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2acb7qELkZOBoqpIunirRie", "AnimationEventListener");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AnimationEventListener = function(_super) {
      __extends(AnimationEventListener, _super);
      function AnimationEventListener() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.root = null;
        _this.script = "";
        return _this;
      }
      AnimationEventListener.prototype.listener = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        if (args && args.length) {
          var event_name = args.shift();
          if (this.root) {
            var scriptComponent = this.root.getComponent(this.script || this.root.name);
            if (scriptComponent) {
              var func = scriptComponent[event_name];
              if (func) {
                func.apply(scriptComponent, this, event_name, Array.prototype.slice.call(args));
                return;
              }
            }
          } else GhysX_1.GhysX.handler.emit(this.script, this, event_name, Array.prototype.slice.call(args));
        }
      };
      AnimationEventListener.prototype.start = function() {};
      __decorate([ property({
        type: cc.Node,
        displayName: "\u52a8\u753b\u6839\u8282\u70b9",
        tooltip: ""
      }) ], AnimationEventListener.prototype, "root", void 0);
      __decorate([ property({
        displayName: "\u811a\u672c",
        tooltip: ""
      }) ], AnimationEventListener.prototype, "script", void 0);
      AnimationEventListener = __decorate([ ccclass ], AnimationEventListener);
      return AnimationEventListener;
    }(cc.Component);
    exports.default = AnimationEventListener;
    cc._RF.pop();
  }, {
    "../../../GhysX": "GhysX"
  } ],
  Array: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2453cL4nrJCqqh/r7fKRa3k", "Array");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function count(src) {
      var count = 0;
      if (src) if (Array.isArray(src)) count = src.length; else {
        var keys = Object.keys(src);
        count = keys.length;
      }
      return count;
    }
    exports.count = count;
    function contain(src, value, key) {
      for (var ikey in src) if (!key || ikey === key) {
        var ivalue = src[ikey];
        if (ivalue === value) return true;
      }
      return false;
    }
    exports.contain = contain;
    function remove(src, value) {
      for (var key in src) {
        var item = src[key];
        if (item === value) {
          Array.isArray(src) && src.length ? src.splice(key, 1) : delete src[key];
          return item;
        }
      }
      return null;
    }
    exports.remove = remove;
    function clear(src) {
      src && (src.length = 0);
      return src;
    }
    exports.clear = clear;
    function clone(src, dest) {
      if (void 0 === dest || null === dest) {
        var result = Object.prototype.toString.call(src);
        if ("[object Array]" === result) dest = []; else {
          if ("object" != typeof src) {
            dest = src;
            return dest;
          }
          dest = {};
        }
      }
      for (var key in src) {
        var value = src[key];
        value && "object" == typeof value && (value = clone(value));
        dest[key] = value;
      }
      return dest;
    }
    exports.clone = clone;
    function copy(desc, src) {
      src = src || new Array();
      for (var key in desc) {
        var value = desc[key];
        null == value && void 0 == value || src.push(value);
      }
      return src;
    }
    exports.copy = copy;
    function merge(desc, src) {
      src = src || [];
      for (var key in desc) {
        var value = desc[key];
        src[key] = value;
      }
      return src;
    }
    exports.merge = merge;
    function concat(arr, separate) {
      var r = "";
      var a = false;
      for (var key in arr) {
        a ? r += separate : a = true;
        r += arr[key];
      }
      return r;
    }
    exports.concat = concat;
    function concats(arr, separate, delimeter) {
      var r = "";
      var a = false;
      for (var key in arr) {
        var t = arr[key];
        var rt = concat(t, delimeter);
        if (rt) {
          a ? r += separate : a = true;
          r += rt;
        }
      }
      return r;
    }
    exports.concats = concats;
    function serialize(desc, key, defaultValue) {
      var r = [];
      for (var k in desc) {
        var t = desc[k];
        if (t) if (key) {
          var tk = t[key];
          void 0 !== tk && null !== tk && (r[tk] = t);
        } else r[t] = void 0 !== defaultValue && null !== defaultValue ? defaultValue : t;
      }
      return r;
    }
    exports.serialize = serialize;
    function search_value(src, key, value) {
      if (src) for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
        var obj = src_1[_i];
        var v = obj[key];
        if (v && v === value) return obj;
      }
      return null;
    }
    exports.search_value = search_value;
    function search(src, tmatchs) {
      var matchss = [];
      for (var _i = 2; _i < arguments.length; _i++) matchss[_i - 2] = arguments[_i];
      var result = new Array();
      var datas = src;
      matchss = matchss || [];
      matchss.unshift(tmatchs);
      for (var _a = 0, matchss_1 = matchss; _a < matchss_1.length; _a++) {
        var matchs = matchss_1[_a];
        if (!datas) {
          datas = result;
          result = new Array();
        }
        for (var key in datas) {
          var mould = datas[key];
          for (var mkey in matchs) {
            var match = matchs[mkey];
            mould[match.key] === match.value && result.push(mould);
          }
        }
        datas = null;
      }
      return result;
    }
    exports.search = search;
    function group(src, matchs) {
      var result = new Array();
      for (var key in src) {
        var data = src[key];
        if (data) for (var mkey in matchs) {
          var match = matchs[mkey];
          var gkey = data[match.gkey];
          if (gkey) {
            var group_1 = result[gkey];
            if (!group_1) {
              group_1 = [];
              result[gkey] = group_1;
            }
            var ekey = null;
            match.ekey && (ekey = data[match.ekey]);
            void 0 !== ekey && null !== ekey ? group_1[ekey] = data : group_1.push(data);
          }
        }
      }
      return result;
    }
    exports.group = group;
    cc._RF.pop();
  }, {} ],
  Assets: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7547920XxM+K68BSV/qLPw", "Assets");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Unit = require("./../common/utils/Unit");
    var Assets;
    (function(Assets) {
      Assets.handler = null;
      var cdnUrl = "";
      Assets.data = null;
      var Version;
      (function(Version) {
        function hotUpdate(res) {
          window["_CCSettings"] = res;
          (function(e) {
            var t = e.uuids, i = e.md5AssetsMap;
            for (var s in i) for (var n = i[s], r = 0; r < n.length; r += 2) "number" == typeof n[r] && (n[r] = t[n[r]]);
          })(window["_CCSettings"]);
          var settings = window["_CCSettings"];
          window["_CCSettings"] = void 0;
          if (!settings.debug) {
            var uuids = settings.uuids;
            var rawAssets = settings.rawAssets;
            var assetTypes = settings.assetTypes;
            var realRawAssets = settings.rawAssets = {};
            for (var mount in rawAssets) {
              var entries = rawAssets[mount];
              var realEntries = realRawAssets[mount] = {};
              for (var id in entries) {
                var entry = entries[id];
                var type = entry[1];
                "number" === typeof type && (entry[1] = assetTypes[type]);
                realEntries[uuids[id] || id] = entry;
              }
            }
            var scenes = settings.scenes;
            for (var i = 0; i < scenes.length; ++i) {
              var scene = scenes[i];
              "number" === typeof scene.uuid && (scene.uuid = uuids[scene.uuid]);
            }
            var packedAssets = settings.packedAssets;
            for (var packId in packedAssets) {
              var packedIds = packedAssets[packId];
              for (var j = 0; j < packedIds.length; ++j) "number" === typeof packedIds[j] && (packedIds[j] = uuids[packedIds[j]]);
            }
          }
          cc.loader.downloader._subpackages = settings.subpackages;
          cc["AssetLibrary"].init({
            libraryPath: "res/import",
            rawAssetsBase: "res/raw-",
            rawAssets: settings.rawAssets,
            packedAssets: settings.packedAssets,
            md5AssetsMap: settings.md5AssetsMap
          });
        }
      })(Version = Assets.Version || (Assets.Version = {}));
      function initAssets(error, asset) {
        error || (Assets.data = asset);
      }
      function initialize(GhysX) {
        Assets.handler = GhysX.handler;
        var assetsUrl = null;
        if (cc.sys.platform === cc.sys.WECHAT_GAME && false) {
          assetsUrl = wxDownloader.REMOTE_SERVER_ROOT + "data/assets.json?v=" + Unit.random(1, 1e6);
          cc.loader.load(assetsUrl, function(error, asset) {
            if (error) return;
            initAssets(error, asset);
          }.bind(this));
        } else {
          assetsUrl = "data/assets?v=" + Unit.random(1, 1e6);
          cc.loader.loadRes(assetsUrl, cc.JsonAsset, function(error, asset) {
            if (error) return;
            initAssets(error, asset.json);
          }.bind(this));
        }
      }
      Assets.initialize = initialize;
    })(Assets = exports.Assets || (exports.Assets = {}));
    cc._RF.pop();
  }, {
    "./../common/utils/Unit": "Unit"
  } ],
  Audio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "941dalkb6JMr5ZfNMLnYBcq", "Audio");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Storage = require("./Storage");
    var Audio;
    (function(Audio) {
      var state = 1;
      var effect = 1;
      var music = 1;
      var current = null;
      var assets = {};
      function setState(state) {
        state instanceof Number && (state = state);
      }
      Audio.setState = setState;
      function getState() {
        return state;
      }
      Audio.getState = getState;
      function isOpen() {
        return 1 === state;
      }
      Audio.isOpen = isOpen;
      function effectIsOpen() {
        return 1 === effect;
      }
      Audio.effectIsOpen = effectIsOpen;
      function musicIsOpen() {
        return 1 === music;
      }
      Audio.musicIsOpen = musicIsOpen;
      function stop() {
        stopEffect();
        stopMusic();
        state = -1;
        Storage.write("audio_state", state);
      }
      Audio.stop = stop;
      function open() {
        state = 1;
        Storage.write("audio_state", state);
      }
      Audio.open = open;
      function effectOn() {
        effect = 1;
        Storage.write("effect_state", effect);
      }
      Audio.effectOn = effectOn;
      function effectOff() {
        effect = -1;
        Storage.write("effect_state", effect);
      }
      Audio.effectOff = effectOff;
      function musicOn() {
        music = 1;
        current && playMusic(current.url, current.loop);
        Storage.write("music_state", music);
      }
      Audio.musicOn = musicOn;
      function musicOff() {
        stopMusic();
        music = -1;
        Storage.write("music_state", music);
      }
      Audio.musicOff = musicOff;
      function playMusic(url, loop) {
        current = {
          url: url,
          loop: loop
        };
        if (1 != state || 1 != music) return;
        var asset = {
          url: url,
          audioId: -1,
          type: "music"
        };
        assets[url] = asset;
        var clip = cc.loader.getRes(asset.url);
        clip ? asset.audioId = cc.audioEngine.playMusic(clip, loop) : cc.loader.loadRes(asset.url, cc.AudioClip, function(err, clip) {
          err || 1 == music && (asset.audioId = cc.audioEngine.playMusic(clip, loop));
        });
      }
      Audio.playMusic = playMusic;
      function stopMusic(url) {
        if (!url) for (var key in assets) {
          var asset = assets[key];
          "music" === asset.type && (url = asset.url);
        }
        cc.audioEngine.stopMusic();
        uncache(url);
      }
      Audio.stopMusic = stopMusic;
      function playEffect(url, loop) {
        if (1 != state || 1 != effect) return;
        var asset = {
          url: url,
          audioId: -1,
          type: "effect"
        };
        assets[url] = asset;
        var clip = cc.loader.getRes(asset.url);
        clip ? asset.audioId = cc.audioEngine.playEffect(clip, loop) : cc.loader.loadRes(asset.url, cc.AudioClip, function(err, clip) {
          err || (asset.audioId = cc.audioEngine.playEffect(clip, loop));
        });
      }
      Audio.playEffect = playEffect;
      function stopEffect(url) {
        var asset = assets[url];
        if (asset) {
          cc.audioEngine.stopEffect(asset.audioId);
          asset.audioId = -1;
        }
        uncache(url);
      }
      Audio.stopEffect = stopEffect;
      function uncache(url) {
        if (!url) return;
        var asset = assets[url];
        if (asset) {
          cc.audioEngine.uncache(asset.url);
          delete assets[url];
        }
      }
      Audio.uncache = uncache;
      function initialize() {
        state = parseInt(Storage.read("audio_state", "1"));
        effect = parseInt(Storage.read("effect_state", "1"));
        music = parseInt(Storage.read("music_state", "1"));
      }
      Audio.initialize = initialize;
    })(Audio = exports.Audio || (exports.Audio = {}));
    cc._RF.pop();
  }, {
    "./Storage": "Storage"
  } ],
  Base64: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae5eeKF+41L3IQ9Xd7FJKEJ", "Base64");
    "use strict";
    function Base64() {
      var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (3 & chr1) << 4 | chr2 >> 4;
          enc3 = (15 & chr2) << 2 | chr3 >> 6;
          enc4 = 63 & chr3;
          isNaN(chr2) ? enc3 = enc4 = 64 : isNaN(chr3) && (enc4 = 64);
          output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
      };
      this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (15 & enc2) << 4 | enc3 >> 2;
          chr3 = (3 & enc3) << 6 | enc4;
          output += String.fromCharCode(chr1);
          64 != enc3 && (output += String.fromCharCode(chr2));
          64 != enc4 && (output += String.fromCharCode(chr3));
        }
        output = this._utf8_decode(output);
        return output;
      };
      this._utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) utftext += String.fromCharCode(c); else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(63 & c | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(63 & c | 128);
          }
        }
        return utftext;
      };
      this._utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((31 & c) << 6 | 63 & c2);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((15 & c) << 12 | (63 & c2) << 6 | 63 & c3);
            i += 3;
          }
        }
        return string;
      };
    }
    module.exports = Base64;
    cc._RF.pop();
  }, {} ],
  Binder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e863fLKPxEuKFZ/p9f4LUU", "Binder");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Binder = function(_super) {
      __extends(Binder, _super);
      function Binder() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.prefabPath = "";
        _this.root = null;
        _this.auto = false;
        _this.data = "";
        _this.dataSource = null;
        _this.customName = "default";
        _this._over = false;
        _this._target = null;
        _this._target_class = null;
        return _this;
      }
      Binder.prototype.load = function() {
        if (this._over) return;
        if (this.prefab) {
          this._over = true;
          cc.log("binder instantiate:", this.prefab.name);
          var node = cc.instantiate(this.prefab);
          var c = node.getComponent(this.prefab.name);
          c.initBinder && c.initBinder({
            root: this.root,
            data: this.data,
            data_source: this.dataSource
          });
          this.node.addChild(node);
          this._target = node;
          this._target_class = c;
        } else if (this.prefabPath) {
          cc.log("binder load:", this.prefabPath);
          GhysX_1.GhysX.loader.load(this.prefabPath, cc.Prefab, null, this.node, cc.Node, function(component, asset) {
            this.prefab = asset;
            this.load();
          }.bind(this));
        }
      };
      Binder.prototype.onLoad = function() {
        this.auto && this.load();
      };
      Binder.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u9884\u5236\u4f53",
        tooltip: ""
      }) ], Binder.prototype, "prefab", void 0);
      __decorate([ property({
        displayName: "\u9884\u5236\u4f53\u8def\u5f84",
        tooltip: ""
      }) ], Binder.prototype, "prefabPath", void 0);
      __decorate([ property({
        type: cc.Component,
        displayName: "\u7a97\u53e3",
        tooltip: "\u7a97\u53e3\u6839\u8282\u70b9"
      }) ], Binder.prototype, "root", void 0);
      __decorate([ property({
        displayName: "\u81ea\u52a8\u52a0\u8f7d",
        tooltip: "\u81ea\u52a8\u52a0\u8f7d"
      }) ], Binder.prototype, "auto", void 0);
      __decorate([ property({
        displayName: "\u53c2\u6570",
        tooltip: "JSON/TEXT"
      }) ], Binder.prototype, "data", void 0);
      __decorate([ property({
        type: cc.Component,
        displayName: "\u6570\u636e\u6e90",
        tooltip: ""
      }) ], Binder.prototype, "dataSource", void 0);
      __decorate([ property({
        displayName: "\u81ea\u5b9a\u4e49\u540d\u79f0",
        tooltip: "JSON/TEXT"
      }) ], Binder.prototype, "customName", void 0);
      Binder = __decorate([ ccclass ], Binder);
      return Binder;
    }(cc.Component);
    exports.default = Binder;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX"
  } ],
  Clocker: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1bcd623ODxNNqIptsI4isNz", "Clocker");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DisplayMode = cc.Enum({
      NONE: 0,
      HHMMSS: 1,
      SS: 2,
      Hour: 3
    });
    var Clocker = function(_super) {
      __extends(Clocker, _super);
      function Clocker() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.content = "%s";
        _this.style = '{"hour":":","minute":":","second":""}';
        _this.displayMode = DisplayMode.HHMMSS;
        _this.weekInfos = [];
        _this._duration = 5;
        _this._elapsed = 0;
        _this._running = false;
        return _this;
      }
      Clocker.prototype.updateDrawTimer = function() {
        if (!this.text || !this.text.enabled) return;
        var info = null;
        this._duration < 0 && (this._duration = 0);
        switch (this.displayMode) {
         case DisplayMode.HHMMSS:
          var day_time = Math.floor(1e3 * this._duration);
          var time = GhysX_1.GhysX.os.time.formatTime(day_time, this.style);
          break;

         case DisplayMode.SS:
          info = this._duration;
          break;

         case DisplayMode.Hour:
          info = GhysX_1.GhysX.os.time.getHour(1e3 * this._duration);
        }
        this.text.string = "".format(this.content, info);
      };
      Clocker.prototype.onLoad = function() {
        var d = new Date(GhysX_1.GhysX.os.time.sstime());
        var localTime = d.getTime();
        var localOffset = 6e4 * d.getTimezoneOffset();
        var utc = localTime + localOffset;
        var offset = GhysX_1.GhysX.db.user.time_zone;
        var server_time = utc + 36e5 * offset;
        this._elapsed = GhysX_1.GhysX.db.user.server_date.millisecond / 1e3;
        this._duration = (server_time - GhysX_1.GhysX.db.user.server_date.millisecond) / 1e3;
        this.style && "string" == typeof this.style && (this.style = JSON.parse(this.style));
        this.text || (this.text = this.node.getComponent(cc.Label));
        if (this.text) {
          this.content || (this.content = this.text.string);
          this.style || (this.style = {
            hour: ":",
            minute: ":",
            second: ""
          });
          this.updateDrawTimer();
        }
        this._running = true;
      };
      Clocker.prototype.start = function() {};
      Clocker.prototype.update = function(dt) {
        if (!this._running) return;
        this._elapsed = this._elapsed + dt;
        if (this._elapsed >= 1) {
          this._duration = this._duration + 1;
          this.updateDrawTimer();
          this._elapsed -= 1;
        }
      };
      __decorate([ property({
        type: cc.Label,
        displayName: "\u6587\u672c\u5bf9\u8c61",
        tooltip: "\u5b9a\u65f6\u5668cc.Label\u8282\u70b9;\n\u9ed8\u8ba4\u4e3a\u5f53\u524d\u8282\u70b9\u7684 cc.Label;"
      }) ], Clocker.prototype, "text", void 0);
      __decorate([ property({
        displayName: "\u5185\u5bb9",
        tooltip: "\u5185\u5bb9:\n\u9ed8\u8ba4%s,\u5982\u6709\u5176\u4ed6\u663e\u793a\u9700\u6c42\uff0c\u6dfb\u52a0\u4ee5%s\u7684\u7ec4\u5408\u6587\u4ef6\uff1a\u4f8b\u5982\uff1a%s\u79d2\u540e"
      }) ], Clocker.prototype, "content", void 0);
      __decorate([ property({
        displayName: "\u6837\u5f0f",
        tooltip: '\u5448\u73b0\u6837\u5f0f:\n\u9ed8\u8ba4HH:MM:SS\u7684\u6837\u5f0f{"hour":":","minute":":","second":""}; \n\u5982\u9700\u8981\u914d\u7f6e\u6837\u5f0f\uff0c\u5185\u5bb9\u4e3a:{"year":"\u5e74","month":"\u6708","day":"\u5929","hour":"\u5c0f\u65f6","minute":"\u5206\u949f","second":"\u79d2",}'
      }) ], Clocker.prototype, "style", void 0);
      __decorate([ property({
        type: DisplayMode,
        displayName: "\u663e\u793a\u6a21\u5f0f",
        tooltip: "\u663e\u793a\u6a21\u5f0f:\n0.NONE:\u4e0d\u663e\u793a;\n1.HHMMSS:\u5c0f\u65f6:\u5206\u949f:\u79d2\u949f;\n1.SS:\u79d2\u949f,Hour:\u5c0f\u65f6;"
      }) ], Clocker.prototype, "displayMode", void 0);
      __decorate([ property({
        type: cc.String,
        displayName: "\u661f\u671f",
        tooltip: ""
      }) ], Clocker.prototype, "weekInfos", void 0);
      __decorate([ property({
        visible: false
      }) ], Clocker.prototype, "_duration", void 0);
      __decorate([ property({
        visible: false
      }) ], Clocker.prototype, "_elapsed", void 0);
      __decorate([ property({
        visible: false
      }) ], Clocker.prototype, "_running", void 0);
      Clocker = __decorate([ ccclass ], Clocker);
      return Clocker;
    }(cc.Component);
    exports.default = Clocker;
    cc._RF.pop();
  }, {
    "../../../GhysX": "GhysX"
  } ],
  Closer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94038UJUahF/pUGl0ojp5rX", "Closer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Closer = function(_super) {
      __extends(Closer, _super);
      function Closer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.root = null;
        _this.window_name = "";
        _this.data = "";
        _this.dataSource = null;
        _this.completedEvent = "";
        return _this;
      }
      Closer.prototype.onClick = function(event, params) {
        var component = null;
        var func = null;
        if (this.dataSource) {
          component = this.dataSource;
          func = component["check_" + this.node.name];
        }
        if (!func && this.window_name) {
          component = GhysX_1.GhysX.graphics.manager.find(this.window_name);
          component && (func = component["check_" + this.node.name]);
        }
        if (func) {
          var success = func.call(component, event, {
            target: this
          });
          if (!success) return;
        }
        this.completedEvent && GhysX_1.GhysX.handler.emit(this.completedEvent, {
          data: this.data,
          data_source: this.dataSource
        });
        this.root ? this.root.node.destroy() : this.window_name ? GhysX_1.GhysX.graphics.manager.close(this.window_name) : this.node.destroy();
      };
      Closer.prototype.onLoad = function() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Closer";
        clickEventHandler.handler = "onClick";
        clickEventHandler.customEventData = "";
        var button = this.node.getComponent(cc.Button);
        button || (button = this.node.addComponent(cc.Button));
        button.clickEvents.push(clickEventHandler);
      };
      Closer.prototype.start = function() {};
      __decorate([ property({
        type: cc.Component,
        displayName: "\u6839\u7ec4\u4ef6",
        tooltip: ""
      }) ], Closer.prototype, "root", void 0);
      __decorate([ property({
        displayName: "\u7a97\u53e3\u540d",
        tooltip: "TEXT"
      }) ], Closer.prototype, "window_name", void 0);
      __decorate([ property({
        displayName: "\u53c2\u6570",
        tooltip: "JSON/TEXT"
      }) ], Closer.prototype, "data", void 0);
      __decorate([ property({
        type: cc.Component,
        displayName: "\u6570\u636e\u6e90",
        tooltip: ""
      }) ], Closer.prototype, "dataSource", void 0);
      __decorate([ property({
        displayName: "\u7ed3\u675f\u4e8b\u4ef6",
        tooltip: "JSON/TEXT"
      }) ], Closer.prototype, "completedEvent", void 0);
      Closer = __decorate([ ccclass ], Closer);
      return Closer;
    }(cc.Component);
    exports.default = Closer;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX"
  } ],
  CollisionManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "830deyS1FNO1bmmwTEwQhdC", "CollisionManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CollisionManager = function(_super) {
      __extends(CollisionManager, _super);
      function CollisionManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.openCollisionManager = false;
        _this.openDebugDraw = false;
        return _this;
      }
      CollisionManager.prototype.onLoad = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = this.openCollisionManager;
        manager.enabledDebugDraw = this.openDebugDraw;
      };
      CollisionManager.prototype.start = function() {};
      __decorate([ property({
        tooltip: "\u78b0\u649e\u68c0\u6d4b\u5668"
      }) ], CollisionManager.prototype, "openCollisionManager", void 0);
      __decorate([ property({
        tooltip: "\u78b0\u649e\u68c0\u6d4b\u5668\u8c03\u8bd5"
      }) ], CollisionManager.prototype, "openDebugDraw", void 0);
      CollisionManager = __decorate([ ccclass ], CollisionManager);
      return CollisionManager;
    }(cc.Component);
    exports.default = CollisionManager;
    cc._RF.pop();
  }, {} ],
  CryptoJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "737e8+bH9xNIqEOW8nml+Cl", "CryptoJS");
    "use strict";
    var CryptoJS = CryptoJS || function(u, p) {
      var d = {}, l = d.lib = {}, s = function s() {}, t = l.Base = {
        extend: function extend(a) {
          s.prototype = this;
          var c = new s();
          a && c.mixIn(a);
          c.hasOwnProperty("init") || (c.init = function() {
            c.$super.init.apply(this, arguments);
          });
          c.init.prototype = c;
          c.$super = this;
          return c;
        },
        create: function create() {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function init() {},
        mixIn: function mixIn(a) {
          for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function clone() {
          return this.init.prototype.extend(this);
        }
      }, r = l.WordArray = t.extend({
        init: function init(a, c) {
          a = this.words = a || [];
          this.sigBytes = c != p ? c : 4 * a.length;
        },
        toString: function toString(a) {
          return (a || v).stringify(this);
        },
        concat: function concat(a) {
          var c = this.words, e = a.words, j = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (j % 4) for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - k % 4 * 8 & 255) << 24 - (j + k) % 4 * 8; else if (65535 < e.length) for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e);
          this.sigBytes += a;
          return this;
        },
        clamp: function clamp() {
          var a = this.words, c = this.sigBytes;
          a[c >>> 2] &= 4294967295 << 32 - c % 4 * 8;
          a.length = u.ceil(c / 4);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function random(a) {
          for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
          return new r.init(c, a);
        }
      }), w = d.enc = {}, v = w.Hex = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) {
            var k = c[j >>> 2] >>> 24 - j % 4 * 8 & 255;
            e.push((k >>> 4).toString(16));
            e.push((15 & k).toString(16));
          }
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - j % 8 * 4;
          return new r.init(e, c / 2);
        }
      }, b = w.Latin1 = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - j % 4 * 8 & 255));
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (255 & a.charCodeAt(j)) << 24 - j % 4 * 8;
          return new r.init(e, c);
        }
      }, x = w.Utf8 = {
        stringify: function stringify(a) {
          try {
            return decodeURIComponent(escape(b.stringify(a)));
          } catch (c) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function parse(a) {
          return b.parse(unescape(encodeURIComponent(a)));
        }
      }, q = l.BufferedBlockAlgorithm = t.extend({
        reset: function reset() {
          this._data = new r.init();
          this._nDataBytes = 0;
        },
        _append: function _append(a) {
          "string" == typeof a && (a = x.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function _process(a) {
          var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((0 | b) - this._minBufferSize, 0);
          a = b * k;
          j = u.min(4 * a, j);
          if (a) {
            for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
            q = e.splice(0, a);
            c.sigBytes -= j;
          }
          return new r.init(q, j);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0
      });
      l.Hasher = q.extend({
        cfg: t.extend(),
        init: function init(a) {
          this.cfg = this.cfg.extend(a);
          this.reset();
        },
        reset: function reset() {
          q.reset.call(this);
          this._doReset();
        },
        update: function update(a) {
          this._append(a);
          this._process();
          return this;
        },
        finalize: function finalize(a) {
          a && this._append(a);
          return this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function _createHelper(a) {
          return function(b, e) {
            return new a.init(e).finalize(b);
          };
        },
        _createHmacHelper: function _createHmacHelper(a) {
          return function(b, e) {
            return new n.HMAC.init(a, e).finalize(b);
          };
        }
      });
      var n = d.algo = {};
      return d;
    }(Math);
    (function() {
      var u = CryptoJS, p = u.lib.WordArray;
      u.enc.Base64 = {
        stringify: function stringify(d) {
          var l = d.words, p = d.sigBytes, t = this._map;
          d.clamp();
          d = [];
          for (var r = 0; r < p; r += 3) for (var w = (l[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | l[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, v = 0; 4 > v && r + .75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
          if (l = t.charAt(64)) for (;d.length % 4; ) d.push(l);
          return d.join("");
        },
        parse: function parse(d) {
          var l = d.length, s = this._map, t = s.charAt(64);
          t && (t = d.indexOf(t), -1 != t && (l = t));
          for (var t = [], r = 0, w = 0; w < l; w++) if (w % 4) {
            var v = s.indexOf(d.charAt(w - 1)) << w % 4 * 2, b = s.indexOf(d.charAt(w)) >>> 6 - w % 4 * 2;
            t[r >>> 2] |= (v | b) << 24 - r % 4 * 8;
            r++;
          }
          return p.create(t, r);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
    })();
    (function(u) {
      function p(b, n, a, c, e, j, k) {
        b = b + (n & a | ~n & c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function d(b, n, a, c, e, j, k) {
        b = b + (n & c | a & ~c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function l(b, n, a, c, e, j, k) {
        b = b + (n ^ a ^ c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function s(b, n, a, c, e, j, k) {
        b = b + (a ^ (n | ~c)) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
      r = r.MD5 = v.extend({
        _doReset: function _doReset() {
          this._hash = new w.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function _doProcessBlock(q, n) {
          for (var a = 0; 16 > a; a++) {
            var c = n + a, e = q[c];
            q[c] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          }
          var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]), f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f, m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m, E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]);
          a[0] = a[0] + f | 0;
          a[1] = a[1] + m | 0;
          a[2] = a[2] + g | 0;
          a[3] = a[3] + h | 0;
        },
        _doFinalize: function _doFinalize() {
          var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes;
          n[c >>> 5] |= 128 << 24 - c % 32;
          var e = u.floor(a / 4294967296);
          n[15 + (c + 64 >>> 9 << 4)] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          n[14 + (c + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
          b.sigBytes = 4 * (n.length + 1);
          this._process();
          b = this._hash;
          n = b.words;
          for (a = 0; 4 > a; a++) c = n[a], n[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
          return b;
        },
        clone: function clone() {
          var b = v.clone.call(this);
          b._hash = this._hash.clone();
          return b;
        }
      });
      t.MD5 = v._createHelper(r);
      t.HmacMD5 = v._createHmacHelper(r);
    })(Math);
    (function() {
      var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({
        cfg: d.extend({
          keySize: 4,
          hasher: p.MD5,
          iterations: 1
        }),
        init: function init(d) {
          this.cfg = this.cfg.extend(d);
        },
        compute: function compute(d, r) {
          for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q; ) {
            n && s.update(n);
            var n = s.update(d).finalize(r);
            s.reset();
            for (var a = 1; a < p; a++) n = s.finalize(n), s.reset();
            b.concat(n);
          }
          b.sigBytes = 4 * q;
          return b;
        }
      });
      u.EvpKDF = function(d, l, p) {
        return s.create(p).compute(d, l);
      };
    })();
    CryptoJS.lib.Cipher || function(u) {
      var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
        cfg: l.extend(),
        createEncryptor: function createEncryptor(e, a) {
          return this.create(this._ENC_XFORM_MODE, e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.create(this._DEC_XFORM_MODE, e, a);
        },
        init: function init(e, a, b) {
          this.cfg = this.cfg.extend(b);
          this._xformMode = e;
          this._key = a;
          this.reset();
        },
        reset: function reset() {
          t.reset.call(this);
          this._doReset();
        },
        process: function process(e) {
          this._append(e);
          return this._process();
        },
        finalize: function finalize(e) {
          e && this._append(e);
          return this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function _createHelper(e) {
          return {
            encrypt: function encrypt(b, k, d) {
              return ("string" == typeof k ? c : a).encrypt(e, b, k, d);
            },
            decrypt: function decrypt(b, k, d) {
              return ("string" == typeof k ? c : a).decrypt(e, b, k, d);
            }
          };
        }
      });
      d.StreamCipher = v.extend({
        _doFinalize: function _doFinalize() {
          return this._process(!0);
        },
        blockSize: 1
      });
      var b = p.mode = {}, x = function x(e, a, b) {
        var c = this._iv;
        c ? this._iv = u : c = this._prevBlock;
        for (var d = 0; d < b; d++) e[a + d] ^= c[d];
      }, q = (d.BlockCipherMode = l.extend({
        createEncryptor: function createEncryptor(e, a) {
          return this.Encryptor.create(e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.Decryptor.create(e, a);
        },
        init: function init(e, a) {
          this._cipher = e;
          this._iv = a;
        }
      })).extend();
      q.Encryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize;
          x.call(this, e, a, c);
          b.encryptBlock(e, a);
          this._prevBlock = e.slice(a, a + c);
        }
      });
      q.Decryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c);
          b.decryptBlock(e, a);
          x.call(this, e, a, c);
          this._prevBlock = d;
        }
      });
      b = b.CBC = q;
      q = (p.pad = {}).Pkcs7 = {
        pad: function pad(a, b) {
          for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
          c = s.create(l, c);
          a.concat(c);
        },
        unpad: function unpad(a) {
          a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2];
        }
      };
      d.BlockCipher = v.extend({
        cfg: v.cfg.extend({
          mode: b,
          padding: q
        }),
        reset: function reset() {
          v.reset.call(this);
          var a = this.cfg, b = a.iv, a = a.mode;
          if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, 
          this._minBufferSize = 1;
          this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function _doProcessBlock(a, b) {
          this._mode.processBlock(a, b);
        },
        _doFinalize: function _doFinalize() {
          var a = this.cfg.padding;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            a.pad(this._data, this.blockSize);
            var b = this._process(!0);
          } else b = this._process(!0), a.unpad(b);
          return b;
        },
        blockSize: 4
      });
      var n = d.CipherParams = l.extend({
        init: function init(a) {
          this.mixIn(a);
        },
        toString: function toString(a) {
          return (a || this.formatter).stringify(this);
        }
      }), b = (p.format = {}).OpenSSL = {
        stringify: function stringify(a) {
          var b = a.ciphertext;
          a = a.salt;
          return (a ? s.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(r);
        },
        parse: function parse(a) {
          a = r.parse(a);
          var b = a.words;
          if (1398893684 == b[0] && 1701076831 == b[1]) {
            var c = s.create(b.slice(2, 4));
            b.splice(0, 4);
            a.sigBytes -= 16;
          }
          return n.create({
            ciphertext: a,
            salt: c
          });
        }
      }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({
          format: b
        }),
        encrypt: function encrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          var l = a.createEncryptor(c, d);
          b = l.finalize(b);
          l = l.cfg;
          return n.create({
            ciphertext: b,
            key: c,
            iv: l.iv,
            algorithm: a,
            mode: l.mode,
            padding: l.padding,
            blockSize: a.blockSize,
            formatter: d.format
          });
        },
        decrypt: function decrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          b = this._parse(b, d.format);
          return a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function _parse(a, b) {
          return "string" == typeof a ? b.parse(a, this) : a;
        }
      }), p = (p.kdf = {}).OpenSSL = {
        execute: function execute(a, b, c, d) {
          d || (d = s.random(8));
          a = w.create({
            keySize: b + c
          }).compute(a, d);
          c = s.create(a.words.slice(b), 4 * c);
          a.sigBytes = 4 * b;
          return n.create({
            key: a,
            iv: c,
            salt: d
          });
        }
      }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({
          kdf: p
        }),
        encrypt: function encrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          d = l.kdf.execute(d, b.keySize, b.ivSize);
          l.iv = d.iv;
          b = a.encrypt.call(this, b, c, d.key, l);
          b.mixIn(d);
          return b;
        },
        decrypt: function decrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          c = this._parse(c, l.format);
          d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
          l.iv = d.iv;
          return a.decrypt.call(this, b, c, d.key, l);
        }
      });
    }();
    (function() {
      for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
      for (var e = 0, j = 0, c = 0; 256 > c; c++) {
        var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ 255 & k ^ 99;
        l[e] = k;
        s[k] = e;
        var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k;
        t[e] = y << 24 | y >>> 8;
        r[e] = y << 16 | y >>> 16;
        w[e] = y << 8 | y >>> 24;
        v[e] = y;
        y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
        b[k] = y << 24 | y >>> 8;
        x[k] = y << 16 | y >>> 16;
        q[k] = y << 8 | y >>> 24;
        n[k] = y;
        e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1;
      }
      var H = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], d = d.AES = p.extend({
        _doReset: function _doReset() {
          for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) if (j < d) e[j] = c[j]; else {
            var k = e[j - 1];
            j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k]) : (k = k << 8 | k >>> 24, 
            k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k], 
            k ^= H[j / d | 0] << 24);
            e[j] = e[j - d] ^ k;
          }
          c = this._invKeySchedule = [];
          for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>> 8 & 255]] ^ n[l[255 & k]];
        },
        encryptBlock: function encryptBlock(a, b) {
          this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l);
        },
        decryptBlock: function decryptBlock(a, c) {
          var d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
          this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
          d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
        },
        _doCryptBlock: function _doCryptBlock(a, b, c, d, e, j, l, f) {
          for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[255 & n] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[255 & g] ^ c[p++], t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[255 & h] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[255 & k] ^ c[p++], g = q, h = s, k = t;
          q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[255 & n]) ^ c[p++];
          s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[255 & g]) ^ c[p++];
          t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[255 & h]) ^ c[p++];
          n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[255 & k]) ^ c[p++];
          a[b] = q;
          a[b + 1] = s;
          a[b + 2] = t;
          a[b + 3] = n;
        },
        keySize: 8
      });
      u.AES = p._createHelper(d);
    })();
    CryptoJS.pad.ZeroPadding = {
      pad: function pad(a, c) {
        var b = 4 * c;
        a.clamp();
        a.sigBytes += b - (a.sigBytes % b || b);
      },
      unpad: function unpad(a) {
        for (var c = a.words, b = a.sigBytes - 1; !(c[b >>> 2] >>> 24 - b % 4 * 8 & 255); ) b--;
        a.sigBytes = b + 1;
      }
    };
    module.exports = CryptoJS;
    cc._RF.pop();
  }, {} ],
  Frame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b1adca3T+tCmL0s5R8emjhZ", "Frame");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var scene_1 = require("../common/prefab/scene/scene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Frame = function(_super) {
      __extends(Frame, _super);
      function Frame() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.scene = null;
        _this.screen = null;
        _this._start_position = null;
        return _this;
      }
      Frame.prototype.onLoad = function() {
        this.scene = this.node.getChildByName("scene").getComponent("scene");
        this.screen = this.node.getChildByName("screen").getComponent("screen");
        this.scene.node.height / this.scene.node.width > 2 && (this.screen.node.height -= 64);
        false;
        this._start_position = this.node.getPosition();
      };
      Frame.prototype.start = function() {};
      __decorate([ property({
        type: scene_1.default,
        displayName: "\u573a\u666f",
        tooltip: "\u573a\u666f\u63a7\u5236\u5c42",
        visible: false
      }) ], Frame.prototype, "scene", void 0);
      __decorate([ property({
        type: scene_1.default,
        displayName: "\u4e3b\u5c4f",
        tooltip: "\u4e3b\u5c4f\u63a7\u5236\u5c42",
        visible: false
      }) ], Frame.prototype, "screen", void 0);
      Frame = __decorate([ ccclass ], Frame);
      return Frame;
    }(cc.Component);
    exports.default = Frame;
    cc._RF.pop();
  }, {
    "../common/prefab/scene/scene": "scene"
  } ],
  GUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95c86AeL2RCMLQKZuRBmLM6", "GUI");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Frame_1 = require("./Frame");
    var Resources_1 = require("./Resources");
    var GUI;
    (function(GUI) {
      function initialize(GhysX) {
        GUI.frame = cc.find("Canvas").addComponent(Frame_1.default);
        GUI.resources = cc.find("Canvas").getComponent(Resources_1.default);
        return this;
      }
      GUI.initialize = initialize;
      function draw() {}
      GUI.draw = draw;
    })(GUI = exports.GUI || (exports.GUI = {}));
    cc._RF.pop();
  }, {
    "./Frame": "Frame",
    "./Resources": "Resources"
  } ],
  "GhysX.d.ts": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6add3Ltc6FJurYNbMvtXF8f", "GhysX.d.ts");
    cc._RF.pop();
  }, {} ],
  GhysX: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be2ad0QTqROV6lliyaRyo+W", "GhysX");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Graphics = require("./core/Graphics");
    var Shader = require("./core/Shader");
    var GUI_1 = require("./ui/GUI");
    var Unit = require("./common/utils/Unit");
    var Utils = require("./common/utils/Utils");
    var Array = require("./common/utils/Array");
    var TextToJson = require("./common/utils/TextToJson");
    var Assets_1 = require("./os/Assets");
    var Network_1 = require("./network/Network");
    var System_1 = require("./os/System");
    var Loader_1 = require("./ui/Loader");
    var DB = require("./db/db");
    var RES = require("./res/res");
    var Platform = require("../platform/Platform");
    var GhysX;
    (function(GhysX) {
      GhysX.name = "GhysX ";
      GhysX.description = "GhysX Engine.";
      GhysX.handler = cc.systemEvent;
      GhysX.gui = GUI_1.GUI;
      GhysX.graphics = Graphics;
      GhysX.shader = Shader.shader;
      GhysX.loader = new Loader_1.default();
      GhysX.modules = {
        array: Array,
        unit: Unit,
        utils: Utils,
        t2j: TextToJson
      };
      GhysX.network = Network_1.Network;
      GhysX.os = System_1.System;
      GhysX.assets = Assets_1.Assets;
      GhysX.db = DB;
      GhysX.res = RES;
      GhysX.local = null;
      GhysX.platform = Platform;
      function initialize() {
        GhysX.os.initialize(GhysX);
        GhysX.gui.initialize(GhysX);
        GhysX.graphics.initialize(GhysX);
        GhysX.assets.initialize(GhysX);
        GhysX.platform.initialize(GhysX);
      }
      GhysX.initialize = initialize;
    })(GhysX = exports.GhysX || (exports.GhysX = {}));
    cc._RF.pop();
  }, {
    "../platform/Platform": "Platform",
    "./common/utils/Array": "Array",
    "./common/utils/TextToJson": "TextToJson",
    "./common/utils/Unit": "Unit",
    "./common/utils/Utils": "Utils",
    "./core/Graphics": "Graphics",
    "./core/Shader": "Shader",
    "./db/db": "db",
    "./network/Network": "Network",
    "./os/Assets": "Assets",
    "./os/System": "System",
    "./res/res": "res",
    "./ui/GUI": "GUI",
    "./ui/Loader": "Loader"
  } ],
  Graphics: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e5d3DguuVHPqK3dC9SQ6dV", "Graphics");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ViewManager;
    (function(ViewManager) {
      ViewManager.views = [];
      ViewManager.groups = [];
      ViewManager.group_status = [];
      ViewManager.listener_events = [];
      ViewManager.loadings = [];
      function open(info) {
        delete ViewManager.loadings[info.name];
        if (1 === info.uniqueness && show(info.name)) {
          call(info, info.complete);
          return;
        }
        if (!info.parent || !info.parent.isValid) return;
        var view = cc.instantiate(info.asset);
        if (info.script) {
          var component_1 = view.getComponent(info.script);
          if (component_1 && info.invoke) {
            var callback = info.invoke;
            if ("function" == typeof callback) callback.call(component_1, info.params); else {
              var eventHandler = new cc.Component.EventHandler();
              eventHandler.target = view;
              eventHandler.component = info.script;
              eventHandler.handler = callback;
              eventHandler.emit([ info.params ]);
            }
          }
          info.node = view;
          info.target = view;
          info.component = component_1;
        }
        var component = info.component;
        if (component) {
          info.actives = [ view.active ];
          var group_1 = ViewManager.groups[info.group_name];
          if (!group_1) {
            group_1 = [];
            ViewManager.groups[info.group_name] = group_1;
            ViewManager.group_status[info.group_name] = true;
          }
          if (!ViewManager.group_status[info.group_name]) {
            view.active = false;
            info.actives.push(false);
          }
          component._start = component.start;
          component.start = function() {
            info.active = true;
            if (component._start) {
              component.start = component._start;
              component._start = null;
              component.start();
            }
            info.target.active = ViewManager.group_status[info.group_name];
            GhysX_1.GhysX.handler.emit(info.name + "_on_start", info);
            execute_event("start", info.name);
          };
          component._onEnable = component.onEnable;
          component.onEnable = function() {
            component._onEnable && component._onEnable();
            GhysX_1.GhysX.handler.emit(info.name + "_on_show", info);
            execute_event("show", info.name);
          };
          component._onDisable = component.onDisable;
          component.onDisable = function() {
            component._onDisable && component._onDisable();
            GhysX_1.GhysX.handler.emit(info.name + "_on_hide", info);
            execute_event("hide", info.name);
          };
          component._onDestroy = component.onDestroy;
          component.onDestroy = function() {
            clear(info);
            component._onDestroy && component._onDestroy();
            GhysX_1.GhysX.handler.emit(info.name + "destroy", info);
            execute_event("destroy", info.name);
          };
          view._destroy = view.destroy;
          view.destroy = function() {
            GhysX_1.GhysX.loader.parser(view);
            clear(info);
            view._destroy && view._destroy();
            return true;
          };
          ViewManager.views[info.name] = info;
          group_1[info.name] = info;
          info.order ? info.parent.addChild(view, info.order) : info.parent.addChild(view);
        }
        call(info, info.complete);
      }
      ViewManager.open = open;
      function loading(info) {
        if (ViewManager.loadings[info.name]) return;
        info.uniqueness && (ViewManager.loadings[info.name] = true);
        load(info);
      }
      ViewManager.loading = loading;
      function listener(event, name, callback, params) {
        var event_group = exports.manager.listener_events[event];
        var events = null;
        if (!event_group) {
          event_group = [];
          exports.manager.listener_events[event] = event_group;
        }
        events = event_group[name];
        if (!events) {
          events = [];
          event_group[name] = events;
        }
        events.push({
          callback: callback,
          params: params
        });
        var info = exports.manager.views[name];
        if (info && info.target && info.target.isValid) switch (event) {
         case "start":
          info.target.active && execute_event(event, name);
        }
      }
      ViewManager.listener = listener;
      function execute_event(event, name) {
        var event_group = exports.manager.listener_events[event];
        if (event_group) {
          var events = event_group[name];
          if (events) {
            for (var key in events) {
              var event_handler = events[key];
              event_handler.callback && ("function" === typeof event_handler.callback ? event_handler.callback(event_handler.params) : GhysX_1.GhysX.handler.emit(event_handler.callback, event_handler.params));
            }
            events.length = 0;
            delete event_group[name];
          }
        }
      }
      function show(name) {
        if (name) {
          var info = ViewManager.views[name];
          if (info && info.target && info.target.isValid) {
            info.actives.pop();
            var ret = true;
            info.actives.length && (ret = info.actives[info.actives.length - 1]);
            ret != info.target.active && (info.target.active = ret);
          }
          return info;
        }
        return null;
      }
      ViewManager.show = show;
      function hide(name) {
        if (name) {
          var info = ViewManager.views[name];
          if (info && info.target && info.target.isValid) {
            var ret = false;
            info.actives.push(ret);
            ret != info.target.active && (info.target.active = ret);
          }
          return info;
        }
        return null;
      }
      ViewManager.hide = hide;
      function on(name) {
        return show(name);
      }
      ViewManager.on = on;
      function off(name) {
        return hide(name);
      }
      ViewManager.off = off;
      function reset(name) {
        return show(name);
      }
      ViewManager.reset = reset;
      function group(event, group_name) {
        var group = ViewManager.groups[group_name];
        if (!group) {
          group = [];
          ViewManager.groups[group_name] = group;
          ViewManager.group_status[group_name] = true;
        }
        if (group) switch (event) {
         case "show":
          ViewManager.group_status[group_name] = true;
          for (var key in group) show(key);
          break;

         case "hide":
          ViewManager.group_status[group_name] = false;
          for (var key in group) hide(key);
          break;

         case "on":
          ViewManager.group_status[group_name] = true;
          for (var key in group) on(key);
          break;

         case "off":
          ViewManager.group_status[group_name] = false;
          for (var key in group) off(key);
          break;

         case "reset":
          ViewManager.group_status[group_name] = true;
          for (var key in group) reset(key);
          break;

         case "close":
          for (var key in group) close(key);
        }
      }
      ViewManager.group = group;
      function find(name) {
        if (name) {
          var info = ViewManager.views[name];
          if (info && info.target && info.target.isValid) return info;
        }
        return null;
      }
      ViewManager.find = find;
      function close(name) {
        if (name) {
          var info = ViewManager.views[name];
          info && info.target && info.target.isValid && info.target.destroy();
          return info;
        }
        return null;
      }
      ViewManager.close = close;
      function clear(info) {
        var name = info.name;
        if (ViewManager.views[name] === info) {
          delete ViewManager.views[name];
          var group_2 = ViewManager.groups[info.group_name];
          group_2 && delete group_2[name];
        }
      }
      ViewManager.clear = clear;
    })(ViewManager || (ViewManager = {}));
    exports.manager = ViewManager;
    var MODE;
    (function(MODE) {
      MODE[MODE["VIEW"] = 1] = "VIEW";
      MODE[MODE["SPRITE"] = 2] = "SPRITE";
      MODE[MODE["ATLAS"] = 3] = "ATLAS";
      MODE[MODE["PREFAB"] = 4] = "PREFAB";
    })(MODE = exports.MODE || (exports.MODE = {}));
    var ORDER;
    (function(ORDER) {
      ORDER[ORDER["FRAMEWORK"] = 1] = "FRAMEWORK";
      ORDER[ORDER["BACKGROUND"] = 2] = "BACKGROUND";
      ORDER[ORDER["WINDOW"] = 100] = "WINDOW";
      ORDER[ORDER["VIEW"] = 200] = "VIEW";
      ORDER[ORDER["VIEW_DIALOG"] = 300] = "VIEW_DIALOG";
      ORDER[ORDER["TASKBAR"] = 400] = "TASKBAR";
      ORDER[ORDER["DIALOG"] = 500] = "DIALOG";
      ORDER[ORDER["NOTIFICATION"] = 600] = "NOTIFICATION";
    })(ORDER = exports.ORDER || (exports.ORDER = {}));
    var GROUP_NAME;
    (function(GROUP_NAME) {
      GROUP_NAME["DEFAULT"] = "default";
      GROUP_NAME["BACKGROUND"] = "background";
      GROUP_NAME["HOME"] = "home";
      GROUP_NAME["UI"] = "ui";
      GROUP_NAME["BATTLE"] = "battle";
      GROUP_NAME["ACTIVE"] = "active";
      GROUP_NAME["NOTIFICATION"] = "notification";
    })(GROUP_NAME = exports.GROUP_NAME || (exports.GROUP_NAME = {}));
    var INFO = function() {
      function INFO() {}
      return INFO;
    }();
    exports.INFO = INFO;
    function load(info) {
      cc.log("load file path:", info.url);
      var asset = cc.loader.getRes(info.url, info.asset_type);
      if (null != asset && asset.isValid && asset instanceof info.asset_type) {
        info.asset = asset;
        complete(info);
      } else cc.loader.loadRes(info.url, info.asset_type, function(error, asset) {
        if (error) {
          info.error && info.error(info);
          cc.log(error);
          return;
        }
        info.asset = asset;
        complete(info);
      });
    }
    exports.load = load;
    function complete(info) {
      draw(info);
    }
    exports.complete = complete;
    function call(info, invoke) {
      if (invoke) try {
        "function" == typeof invoke ? invoke.call(invoke, info) : GhysX_1.GhysX.handler.emit(invoke, info);
      } catch (e) {
        cc.log("err:", e);
      }
    }
    exports.call = call;
    function view(info) {
      info.mode = MODE.VIEW;
      info.order = info.order || ORDER.VIEW;
      info.parent = info.canvas || info.parent || GhysX_1.GhysX.gui.frame.node;
      info.asset_type = cc.Prefab;
      info.name = info.name || info.script;
      info.group_name = info.group_name || "default";
      void 0 === info.uniqueness && (info.uniqueness = 1);
      info.asset ? exports.manager.open(info) : exports.manager.loading(info);
    }
    exports.view = view;
    function sprite(info) {
      info.mode = MODE.SPRITE;
      if (info.asset) {
        if (!info.target || !info.target.isValid) return;
        var sprite_1 = info.target;
        sprite_1.spriteFrame = info.asset;
        info.node = sprite_1.node;
        call(info, info.complete);
      } else load(info);
    }
    exports.sprite = sprite;
    function atlas(info) {
      info.mode = MODE.ATLAS;
      if (info.asset) {
        if (!info.target || !info.target.isValid) return;
        var sprite_2 = info.target;
        sprite_2.spriteFrame = info.asset.getSpriteFrame(info.asset_name);
        info.node = sprite_2.node;
        call(info, info.complete);
      } else load(info);
    }
    exports.atlas = atlas;
    function prefab(info) {
      info.mode = MODE.PREFAB;
      info.parent = info.canvas || info.parent;
      if (info.asset) {
        if (!info.parent || !info.parent.isValid) return;
        var node = cc.instantiate(info.asset);
        if (info.script) {
          var component = node.getComponent(info.script);
          if (component && info.invoke) {
            var callback = info.invoke;
            if ("function" == typeof callback) callback.call(component, info.params); else {
              var eventHandler = new cc.Component.EventHandler();
              eventHandler.target = node;
              eventHandler.component = info.script;
              eventHandler.handler = callback;
              eventHandler.emit([ info.params ]);
            }
          }
          info.component = component;
        }
        info.node = node;
        info.target = node;
        info.order ? info.parent.addChild(node, info.order) : info.parent.addChild(node);
        call(info, info.complete);
      } else load(info);
    }
    exports.prefab = prefab;
    function draw(info) {
      switch (info.mode) {
       case MODE.VIEW:
        view(info);
        break;

       case MODE.SPRITE:
        sprite(info);
        break;

       case MODE.ATLAS:
        atlas(info);
        break;

       case MODE.PREFAB:
        prefab(info);
      }
    }
    exports.draw = draw;
    function initialize(GhysX) {
      return this;
    }
    exports.initialize = initialize;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX"
  } ],
  Http: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4bfc01OA7tNPYZhIVjPRyw9", "Http");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  Invoker: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb71dJtAd1KIJyTLk1cTiTw", "Invoker");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Invoker = function(_super) {
      __extends(Invoker, _super);
      function Invoker() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.event = "";
        _this.args = "";
        return _this;
      }
      Invoker.prototype.onClick = function(event, params) {
        this.event && GhysX_1.GhysX.handler.emit(this.event, this.args);
      };
      Invoker.prototype.onLoad = function() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Invoker";
        clickEventHandler.handler = "onClick";
        clickEventHandler.customEventData = "";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
      };
      __decorate([ property({
        displayName: "\u4e8b\u4ef6\u540d\u79f0",
        tooltip: "\u4e8b\u4ef6\u540d\u79f0"
      }) ], Invoker.prototype, "event", void 0);
      __decorate([ property({
        displayName: "\u4e8b\u4ef6\u53c2\u6570",
        tooltip: "\u4e8b\u4ef6\u53c2\u6570"
      }) ], Invoker.prototype, "args", void 0);
      Invoker = __decorate([ ccclass ], Invoker);
      return Invoker;
    }(cc.Component);
    exports.default = Invoker;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX"
  } ],
  LabelLocalized: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73f7aK7wYJABqi8qo7QVB+b", "LabelLocalized");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Label,
      properties: {
        textKey: {
          default: "TEXT_KEY",
          multiline: true,
          tooltip: "Enter i18n key here",
          notify: function notify() {
            if (this._sgNode) {
              this._sgNode.setString(this.string);
              this._updateNodeSize();
            }
          }
        },
        string: {
          override: true,
          tooltip: "Here shows the localized string of Text Key",
          get: function get() {
            return i18n.t(this.textKey);
          },
          set: function set(value) {
            this.textKey = value;
            false;
          }
        }
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  Loader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73e8fP+TBtI8oo1fmI7ex7j", "Loader");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Loader = function(_super) {
      __extends(Loader, _super);
      function Loader() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cache = [];
        _this.assets = [];
        return _this;
      }
      Loader.prototype.load = function(url, assetType, assetName, component, componentAssetType, callback) {
        var asset = this.cache[url];
        null != asset && asset.isValid && asset instanceof assetType ? this.complete(asset, assetName, component, componentAssetType, callback) : cc.loader.loadRes(url, assetType, function(error, asset) {
          if (!error) {
            this.cache[url] = asset;
            this.complete(asset, assetName, component, componentAssetType, callback);
          }
        }.bind(this));
      };
      Loader.prototype.complete = function(asset, assetName, component, componentType, callback) {
        if (component.isValid) {
          if (asset instanceof cc.SpriteAtlas) {
            for (var key in asset["_spriteFrames"]) {
              var item = asset["_spriteFrames"][key];
              var filename = item["_textureFilename"];
              this.assets[filename] = filename;
              break;
            }
            var atlas = asset;
            if (componentType === cc.RichText) component.imageAtlas = atlas; else {
              var spriteFrame = atlas.getSpriteFrame(assetName);
              component.spriteFrame = spriteFrame;
            }
          } else if (asset instanceof sp.SkeletonData) {
            for (var key in asset["textures"]) {
              var texture = asset["textures"][key];
              this.assets[texture.url] = texture.url;
            }
            component.skeletonData = asset;
          } else if (asset instanceof cc.SpriteFrame) {
            var filename = asset["_textureFilename"];
            this.assets[filename] = filename;
            if (componentType === sp.Skeleton) {
              var skeleton = component;
              var slot = skeleton.findSlot(assetName);
              var frame = asset;
              var attachment = slot.getAttachment();
              var texture = frame.getTexture();
              texture.setPremultiplyAlpha(true);
              var tex = new sp.SkeletonTexture({
                width: texture.width,
                height: texture.height
              });
              tex.setRealTexture(texture);
              attachment.region.texture = tex;
              slot.setAttachment(attachment);
            } else component.spriteFrame = asset;
          }
          callback && callback(component, asset);
        }
      };
      Loader.prototype.parser = function(node, assets) {
        var _this = this;
        if (!node || !node.isValid) return;
        assets = assets || this.assets;
        if (node._components) {
          var sprite = node.getComponent(cc.Sprite);
          if (sprite && sprite.spriteFrame) {
            var url = sprite.spriteFrame["_textureFilename"];
            assets[url] = url;
          }
        } else cc.log("_components", node.name);
        var children = node.children;
        children ? children.forEach(function(child) {
          _this.parser(child, assets);
        }) : cc.log("children", node.name);
      };
      Loader.prototype.releases = function() {
        var assets = [];
        var groups = GhysX_1.GhysX.graphics.manager.groups;
        for (var gkey in groups) {
          var group = groups[gkey];
          for (var key in group) {
            var c = group[key];
            this.parser(c.node, assets);
          }
        }
        for (var key in this.assets) {
          var asset = assets[key];
          asset || cc.loader.release(key);
        }
      };
      Loader.prototype.start = function() {};
      Loader = __decorate([ ccclass ], Loader);
      return Loader;
    }(cc.Component);
    exports.default = Loader;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX"
  } ],
  Network: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52d53Vk17xB+5iLvWP8c6Cd", "Network");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Unit = require("./../common/utils/Unit");
    var Network;
    (function(Network) {
      Network.handler = null;
      Network.option = {};
      Network.Crypto = null;
      var Http;
      (function(Http) {
        function request(path, data, handler, errorHandler, extraUrl) {
          var xhr = cc.loader.getXMLHttpRequest();
          xhr.timeout = 5e3;
          var str = "?";
          for (var k in data) {
            "?" != str && (str += "&");
            str += k + "=" + data[k];
          }
          null == extraUrl && (extraUrl = this.url);
          var requestURL = extraUrl + path + encodeURI(str);
          xhr.open("GET", requestURL, true);
          cc.sys.isNative && xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
          xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) if (xhr.status >= 200 && xhr.status < 300) try {
              var ret = JSON.parse(xhr.responseText);
              null !== handler && handler(ret);
            } catch (e) {
              handler(null, xhr);
            } else void 0 !== errorHandler && null !== errorHandler && errorHandler(xhr);
          };
          xhr.send();
          return xhr;
        }
        Http.request = request;
      })(Http = Network.Http || (Network.Http = {}));
      var Socket;
      (function(Socket) {
        Socket.protobuf = null;
        Socket.message = null;
        Socket.sessionId = 0;
        Socket.url = "";
        Socket.defaultContext = null;
        function ctor() {
          this.dir = "";
          this.sockets = {};
          this.invokes = {};
        }
        Socket.ctor = ctor;
        function init(address) {
          this.address = address;
        }
        Socket.init = init;
        function connect(path) {
          path = path || "";
          var self = this;
          if (self.sockets[path]) return this;
          var address = this.address + path;
          var opts = {
            reconnection: false,
            "force new connection": true,
            transports: [ "websocket", "polling" ],
            heartbeat: 5e3
          };
          function analytic(message) {
            var messageType = typeof message;
            if ("object" === messageType && void 0 === message.status) {
              message = self.message.decode(new Uint8Array(message));
              try {
                message.data = JSON.parse(message.data);
              } catch (e) {}
            } else if ("string" === messageType) try {
              message = JSON.parse(message);
            } catch (e) {
              cc.log("message is string.");
            } else try {
              "string" === typeof message.data && message.data.length > 0 && "{" == message.data.charAt(0) && (message.data = JSON.parse(message.data));
            } catch (e) {}
            recv(socket, message.invoke, message);
          }
          function recv(socket, event, args) {
            if (socket) {
              var tpath = socket.path || "";
              0 < tpath.length && (tpath += "/");
              if (event) {
                var fkey = tpath + event;
                var fu = self.invokes[fkey];
                if (fu) {
                  fu(args);
                  fu.of && delete self.invokes[fkey];
                } else Network.handler.emit(event, args);
              }
              if (args && args.event) {
                var fkey = tpath + args.event;
                var fu = self.invokes[fkey];
                if (fu) {
                  fu(args);
                  fu.of && delete self.invokes[fkey];
                } else Network.handler.emit(args.event, args);
              }
            }
          }
          var socket = window["io"].connect(address, opts);
          socket.on("reconnect", function() {
            cc.log("reconnection");
            recv(socket, "reconnect");
          });
          socket.on("connect", function() {
            cc.log("connect");
            socket.connected = true;
            recv(socket, "connect");
          });
          socket.on("connect_failed", function() {
            cc.log("connect_failed");
            recv(socket, "connect_failed");
          });
          socket.on("connect_error", function() {
            cc.log("connect_error");
            recv(socket, "connect_error");
          });
          socket.on("connect_timeout", function() {
            cc.log("connect_timeout");
            recv(socket, "connect_timeout");
          });
          socket.on("error", function() {
            cc.log("error");
            recv(socket, "error");
          });
          socket.on("connection", function() {
            cc.log("connection");
            recv(socket, "connection");
          });
          socket.on("disconnect", function(data) {
            cc.log("disconnect", data);
            recv(socket, "disconnect", data);
            this.socket == socket && (this.socket = null);
            delete self.sockets[self.path];
            socket.connected = false;
          });
          socket.on("reconnect", function() {
            cc.log("reconnect");
            recv(socket, "reconnect");
          });
          socket.on("reconnect_attempt", function() {
            cc.log("reconnect_attempt");
            recv(socket, "reconnect_attempt");
          });
          socket.on("reconnecting", function() {
            cc.log("reconnecting");
            recv(socket, "reconnecting");
          });
          socket.on("reconnect_error", function() {
            cc.log("reconnect_error");
            recv(socket, "reconnect_error");
          });
          socket.on("reconnect_failed", function() {
            cc.log("reconnect_failed");
            recv(socket, "reconnect_failed");
          });
          socket.on("message", function(message) {
            analytic(message);
          });
          socket.on("broadcast", function(message) {
            analytic(message);
          });
          socket.path = path;
          self.sockets[path] = socket;
          void 0 !== self.socket && null !== self.socket || (self.socket = socket);
          return this;
        }
        Socket.connect = connect;
        function isConnected(path) {
          var socket = path ? this.sockets[path] : this.socket;
          var result = socket && socket.connected;
          return result;
        }
        Socket.isConnected = isConnected;
        function of(path) {
          this.dir = path || "";
          0 < this.dir.length && (this.dir = this.dir + "/");
          return this;
        }
        Socket.of = of;
        function on(event, fn) {
          this.invokes[this.dir + event] = fn;
          return this;
        }
        Socket.on = on;
        function once(event, fn) {
          fn.of = true;
          this.invokes[this.dir + event] = fn;
          return this;
        }
        Socket.once = once;
        function off(event) {
          delete this.invokes[this.dir + event];
          return this;
        }
        Socket.off = off;
        function use(path) {
          this.socket = this.sockets[path];
          return this;
        }
        Socket.use = use;
        function emit(event, data) {
          data.context = "json";
          this.socket && this.socket.emit(event, data);
          return this;
        }
        Socket.emit = emit;
        function send(event, data, context) {
          var socket = this.socket;
          if (socket && socket.connected) {
            data.context = context || this.defaultContext;
            void 0 === data.context && (data.context = "json");
            void 0 !== window["wx"] && (data.context = "json");
            if ("json" !== data.context) {
              data.context = "proto";
              data.data = JSON.stringify(data.data);
              var message = this.message.create(data);
              var buffer = this.message.encode(message).finish();
              data = buffer;
            }
            socket.emit(event, data);
          }
          return this;
        }
        Socket.send = send;
        function close(path) {
          var socket = path ? this.sockets[path] : this.socket;
          if (socket) {
            socket == this.socket && (this.socket = null);
            if (socket.connected) {
              socket.connected = false;
              socket.disconnect();
            }
            delete this.sockets[socket.path];
            socket = null;
          }
          return this;
        }
        Socket.close = close;
        function initNetwork(asset) {
          var self = this;
          this.url = asset.network.url;
          Http.request(asset.network.route, {
            account: asset.network.account,
            password: asset.network.password,
            env: asset.network.env
          }, function(ret) {
            cc.loader.loadRes(asset.network.proto, function(err, tex) {
              var protobuf = window["protobuf"];
              if (void 0 != protobuf) {
                var builder = protobuf.parse(tex.text);
                var Message = builder.root.lookupType(asset.network.message);
                Network.Socket.protobuf = protobuf;
                Network.Socket.message = Message;
              }
              delete asset.network;
              ret.scoket_url = "ws://qys.91xixifun.com:4100";
              loginGate(asset, ret.scoket_url);
            });
          }, function(xhr) {
            cc.log("\u7f51\u7edc\u5f02\u5e38\uff1a", xhr.status);
            setTimeout(function(params) {
              initNetwork(asset);
            }, 1500);
          }, asset.network.url);
        }
        Socket.initNetwork = initNetwork;
      })(Socket = Network.Socket || (Network.Socket = {}));
      function parseOption(url) {
        var result = {};
        var pos = url.indexOf("?");
        if (pos) {
          var params = url.slice(pos + 1).splits("&", "=");
          for (var rkey in params) {
            var param = params[rkey];
            result[param[0]] = param[1];
          }
        }
        return result;
      }
      function loginGate(asset, scoket_url) {
        var self = this;
        Network.Socket.of("/index").once("connection_success", function(message) {
          cc.log("connection_success", message);
          Network.Crypto.RSA.setPublicKey(message.data.publicKey);
          Network.Crypto.RC4.key = Unit.password(32);
          Network.Crypto.RC4.inst = Unit.rc4;
          var encryptData = Network.Crypto.RSA.encrypt(Network.Crypto.RC4.key);
          Network.Socket.send("message", {
            gate: "$",
            handler: "join",
            data: {
              msg: asset.platform.type,
              version: asset.version.version,
              resouce_version: asset.resouce_version,
              password: encryptData
            }
          }, "json");
        }).once("join_success", function(message) {
          cc.log("join_success", message);
          Network.handler.emit("open", message);
        }).once("close", function(message) {
          cc.log("close", message);
          Network.Socket.close();
        }).once("connect_error", function(message) {
          cc.log("error", message);
          Network.Socket.close("/index");
          setTimeout(function() {
            loginGate(asset, scoket_url);
          }, 3e3);
        });
        Network.Socket.init(scoket_url);
        Network.Socket.connect("/index").use("/index");
      }
      Network.loginGate = loginGate;
      function initialize(GhysX) {
        Network.handler = GhysX.handler;
        Network.Crypto = {
          RSA: new JSEncrypt(),
          RC4: {
            key: "",
            inst: null
          }
        };
        var url = window.location.href;
        parseOption(url);
        Network.Socket.ctor();
        Network.handler.on("network-handshake-request", function(asset) {
          Network.Socket.initNetwork(asset);
        });
        return this;
      }
      Network.initialize = initialize;
    })(Network = exports.Network || (exports.Network = {}));
    cc._RF.pop();
  }, {
    "./../common/utils/Unit": "Unit"
  } ],
  Number: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0a08cdfCdPHYEmCY5oQsnA", "Number");
    Number.prototype.displayBigNumber = function() {
      var num = this;
      if (num >= 1e4 && num < 1e8) {
        num = num.valueOf() / 1e4;
        return Math.round(100 * num) / 100 + "\u4e07";
      }
      if (num >= 1e8) {
        num = num.valueOf() / 1e8;
        return Math.round(100 * num) / 100 + "\u4ebf";
      }
      return "" + this;
    };
    Number.prototype.toDecimal = function(decimalPlaces, percent) {
      void 0 === decimalPlaces && (decimalPlaces = 2);
      void 0 === percent && (percent = 100);
      var f = this;
      if (isNaN(f)) return 0;
      var converter = Math.pow(10, decimalPlaces);
      f = ~~(this * converter * percent) / converter;
      return f;
    };
    cc._RF.pop();
  }, {} ],
  Opener: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5bc2byLC/NOjbMTBUixtamW", "Opener");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Graphics = require("../core/Graphics");
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OrderEnum = cc.Enum(Graphics.ORDER);
    var GroupNameEnum = cc.Enum({
      DEFAULT: 0,
      BACKGROUND: 1,
      HOME: 2,
      UI: 3,
      BATTLE: 4,
      ACTIVE: 5,
      NOTIFICATION: 6
    });
    var Opener = function(_super) {
      __extends(Opener, _super);
      function Opener() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.prefabPath = "";
        _this.window_name = "";
        _this.group_name = GroupNameEnum.DEFAULT;
        _this.root = null;
        _this.order = OrderEnum.VIEW;
        _this.data = "";
        _this.startLoad = false;
        _this.dataSource = null;
        _this.current_window_name = "";
        _this.event_param = "";
        _this.click_event = "";
        _this.completedEvent = "";
        _this.close_window_name = "";
        _this._button = null;
        return _this;
      }
      Opener.prototype.onClick = function(event, params) {
        var component = null;
        var func = null;
        if (this.dataSource) {
          component = this.dataSource;
          func = component["check_" + this.node.name];
        }
        if (!func && this.current_window_name) {
          var info = GhysX_1.GhysX.graphics.manager.find(this.current_window_name);
          info && info.component && (func = info.component["check_" + this.node.name]);
        }
        if (func) {
          var success = func.call(component, event, {
            target: this
          });
          if (!success) return;
        }
        if (this.window_name) {
          var view = GhysX_1.GhysX.graphics.manager.find(this.window_name);
          if (view) {
            view.node.active || GhysX_1.GhysX.graphics.manager.show(this.window_name);
            this.click(event, {
              view: view,
              data: null,
              data_source: this.dataSource,
              target: this
            });
            return;
          }
        }
        GhysX_1.GhysX.graphics.draw({
          url: this.prefabPath,
          mode: GhysX_1.GhysX.graphics.MODE.VIEW,
          order: this.order < 0 ? GhysX_1.GhysX.graphics.ORDER.VIEW : this.order,
          group_name: this.group_name,
          canvas: this.root ? this.root.node : null,
          script: this.window_name,
          invoke: "initOpener",
          params: {
            root: this.root,
            data: this.data,
            data_source: this.dataSource,
            opener: this
          },
          complete: function(info) {
            var args = {
              view: info,
              data: this.data,
              data_source: this.dataSource,
              target: this
            };
            var completed_event = this.completedEvent;
            completed_event && GhysX_1.GhysX.handler.emit(completed_event, event, args);
            this.click(event, args);
            this.close_window_name && GhysX_1.GhysX.graphics.manager.close(this.close_window_name);
          }.bind(this)
        });
      };
      Opener.prototype.click = function(event, args) {
        this.click_event && GhysX_1.GhysX.handler.emit(this.click_event, event, args);
        var component = null;
        var func = null;
        if (this.dataSource) {
          component = this.dataSource;
          func = component["onclick_" + this.node.name];
        }
        if (!func && this.current_window_name) {
          component = GhysX_1.GhysX.graphics.manager.find(this.current_window_name).component;
          component && (func = component["onclick_" + this.node.name]);
        }
        func && func.call(component, event, args);
      };
      Opener.prototype.onLoad = function() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "Opener";
        clickEventHandler.handler = "onClick";
        clickEventHandler.customEventData = "";
        var button = this.node.getComponent(cc.Button);
        if (button) {
          button.clickEvents.push(clickEventHandler);
          this._button = button;
        }
        this.group_name = Graphics.GROUP_NAME[GroupNameEnum[this.group_name]];
        cc.log(this.group_name);
      };
      Opener.prototype.start = function() {
        this.startLoad && this.onClick(null, null);
      };
      __decorate([ property({
        displayName: "\u9884\u5236\u8d44\u6e90\u8def\u5f84",
        tooltip: "\u9884\u5236\u8d44\u6e90\u8def\u5f84"
      }) ], Opener.prototype, "prefabPath", void 0);
      __decorate([ property({
        displayName: "\u6253\u5f00\u7684\u7a97\u53e3\u540d",
        tooltip: "\u6253\u5f00\u7684\u7a97\u53e3\u540d"
      }) ], Opener.prototype, "window_name", void 0);
      __decorate([ property({
        type: GroupNameEnum,
        displayName: "\u7a97\u53e3\u6240\u5c5e\u5206\u7ec4",
        tooltip: "\u7a97\u53e3\u6240\u5c5e\u5206\u7ec4\u540d"
      }) ], Opener.prototype, "group_name", void 0);
      __decorate([ property({
        type: cc.Component,
        displayName: "\u7ed8\u56fe\u6839\u7ec4\u4ef6",
        tooltip: "\u7ed8\u56fe\u6839\u7ec4\u4ef6"
      }) ], Opener.prototype, "root", void 0);
      __decorate([ property({
        type: OrderEnum,
        displayName: "\u7ed8\u56fe\u5c42\u7ea7",
        tooltip: "\u7ed8\u56fe\u5c42\u7ea7:\n_frameview: 0;\n_background: 100;\n_view: 200;\n_dview: 300;\n_viewdialog: 400;\n_taskbar: 500;\n_ui: 600;\n_windows: 700;\n_dialog: 800;\n_notification: 900;\n_screen: 1000;\n_system: 1100;\n_display_log: 1200;\n_border: 1300;\n"
      }) ], Opener.prototype, "order", void 0);
      __decorate([ property({
        displayName: "\u7a97\u53e3\u53c2\u6570",
        tooltip: "\u7a97\u53e3\u53c2\u6570JSON/TEXT"
      }) ], Opener.prototype, "data", void 0);
      __decorate([ property({
        displayName: "\u542f\u52a8\u52a0\u8f7d",
        tooltip: "\u662f\u5426\u5728\u754c\u9762\u542f\u52a8\u7684\u65f6\u5019\u81ea\u52a8\u52a0\u8f7d\u754c\u9762"
      }) ], Opener.prototype, "startLoad", void 0);
      __decorate([ property({
        type: cc.Component,
        displayName: "\u6570\u636e\u6e90",
        tooltip: "\u6570\u636e\u6e90"
      }) ], Opener.prototype, "dataSource", void 0);
      __decorate([ property({
        displayName: "\u5f53\u524d\u7684\u7a97\u53e3\u540d",
        tooltip: "\u5f53\u524d\u7684\u7a97\u53e3\u540d"
      }) ], Opener.prototype, "current_window_name", void 0);
      __decorate([ property({
        displayName: "\u6309\u94ae\u54cd\u5e94\u53c2\u6570",
        tooltip: "\u6309\u94ae\u54cd\u5e94\u53c2\u6570"
      }) ], Opener.prototype, "event_param", void 0);
      __decorate([ property({
        displayName: "\u6309\u94ae\u54cd\u5e94\u6d88\u606f",
        tooltip: "\u6309\u94ae\u54cd\u5e94\u6d88\u606f\uff0c\u53ef\u80fd\u5171\u7528\u4e8b\u4ef6\u7ec4\u54cd\u5e94"
      }) ], Opener.prototype, "click_event", void 0);
      __decorate([ property({
        displayName: "\u52a0\u8f7d\u7ed3\u675f\u4e8b\u4ef6",
        tooltip: "JSON/TEXT"
      }) ], Opener.prototype, "completedEvent", void 0);
      __decorate([ property({
        displayName: "\u5173\u95ed\u7a97\u53e3",
        tooltip: "\u5173\u95ed\u7a97\u53e3\u540d\u79f0"
      }) ], Opener.prototype, "close_window_name", void 0);
      Opener = __decorate([ ccclass ], Opener);
      return Opener;
    }(cc.Component);
    exports.default = Opener;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX",
    "../core/Graphics": "Graphics"
  } ],
  PhysicsManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "58c4dQbT+1NWYs2XadxJJSc", "PhysicsManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PhysicsManager = function(_super) {
      __extends(PhysicsManager, _super);
      function PhysicsManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.active = true;
        _this.aabb = false;
        _this.pair = false;
        _this.centerOfMass = false;
        _this.joint = false;
        _this.shape = false;
        _this.mouseJoint = false;
        _this.gravity = cc.v2(0, -960);
        return _this;
      }
      PhysicsManager.prototype.onLoad = function() {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled && this.active && cc.warn("The physical system is enabled\uff01");
        physicsManager.enabled = this.active;
        if (!this.active) return;
        physicsManager.gravity = this.gravity;
        var drawBits = cc.PhysicsManager.DrawBits;
        false;
        physicsManager.debugDrawFlags = 0;
      };
      PhysicsManager.prototype.start = function() {};
      PhysicsManager.prototype.onDisable = function() {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.debugDrawFlags = 0;
        physicsManager.enabled = false;
      };
      __decorate([ property({
        tooltip: "\u662f\u5426\u542f\u7528\u7269\u7406\u5f15\u64ce"
      }) ], PhysicsManager.prototype, "active", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u663e\u793a\u5305\u56f4\u76d2"
      }) ], PhysicsManager.prototype, "aabb", void 0);
      __decorate([ property({
        tooltip: ""
      }) ], PhysicsManager.prototype, "pair", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u663e\u793a\u4e2d\u5fc3\u70b9"
      }) ], PhysicsManager.prototype, "centerOfMass", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u663e\u793a\u5173\u8282\u8fde\u63a5\u7ebf"
      }) ], PhysicsManager.prototype, "joint", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u586b\u5145\u5f62\u72b6"
      }) ], PhysicsManager.prototype, "shape", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u5f00\u542f\u9f20\u6807\u5173\u8282\uff0c\u53ef\u4ee5\u62d6\u52a8\u52a8\u6001\u521a\u4f53"
      }) ], PhysicsManager.prototype, "mouseJoint", void 0);
      __decorate([ property({
        tooltip: "\u91cd\u529b"
      }) ], PhysicsManager.prototype, "gravity", void 0);
      PhysicsManager = __decorate([ ccclass ], PhysicsManager);
      return PhysicsManager;
    }(cc.Component);
    exports.default = PhysicsManager;
    cc._RF.pop();
  }, {} ],
  Platform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f60b04o7FJcq/f/DPjDQQ+", "Platform");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    exports.initialize = initialize;
    var sys = exports.sys = null;
    var info = exports.info = null;
    function auth() {}
    function initialize(GhysX) {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        exports.info = info = require("WeiXinPlatform");
        info.initWeiXinPlatform(GhysX);
      } else {
        this.sys = {
          platform: cc.sys.os,
          options: {}
        };
        GhysX.handler.on("share", function(args) {
          args.share_type = args.share_type || "share_app_message";
          "share_app_message" === args.share_type && ("string" === typeof args.complete ? GhysX.handler.emit(args.complete) : "function" === typeof args.complete && args.complete());
        });
        GhysX.handler.on("recharge", function(args) {
          var server_number = args.server_number;
          var order_number = args.order_number;
          var order_money = args.order_money;
          var goods_name = args.goods_name;
          var goods_desc = args.goods_desc;
          var callback_handler = args.callback_handler;
          var params_handler = args.params_handler;
          callback_handler && ("function" === typeof callback_handler ? callback_handler(params_handler) : GhysX.handler.emit(callback_handler, params_handler));
        });
        GhysX.handler.on("recharge_success", function(args) {
          cc.log(args);
          var params = {};
          params.handler = "recharge_success";
          cc.m.utils.merge(args.top_up_order, params);
          cc.log(params);
          GhysX.handler.emit("location-message", params);
        });
        GhysX.handler.on("create_video", function(args) {
          args.success(null, args);
        });
        GhysX.handler.on("login", function(args) {
          GhysX.handler.emit("login_complete", args);
        });
        GhysX.handler.on("authorize", function(args) {
          GhysX.handler.emit("authorize_success", args);
        });
        GhysX.handler.on("download_task", function(args) {
          args.download_progress && args.download_progress({
            progress: 100
          });
          args.download_success && args.download_success({});
          args.uncompress_success && args.uncompress_success({});
        });
        GhysX.handler.on("location-message", function(args) {
          if ("iOS" === this.sys.options.platform) window.webkit.messageHandlers.onWebViewMessage.postMessage({
            params: JSON.stringify(args)
          }); else if ("android" === this.sys.options.platform) {
            var f = function f(param) {
              var result = "";
              for (var key in param) {
                var pvalue = param[key];
                if ("function" !== typeof pvalue) if ("object" === ("undefined" === typeof pvalue ? "undefined" : _typeof(pvalue))) {
                  var ret = f(pvalue);
                  if (ret) {
                    result.length > 0 && (result += "&");
                    result += ret;
                  }
                } else {
                  result.length > 0 && (result += "&");
                  result = result + key + "=" + pvalue;
                }
              }
              return result;
            };
            var params = f(args);
            cc.log(params);
            document.location = "location-scheme://" + params;
          }
        }.bind(this));
        GhysX.handler.on("location-scheme", function(args) {
          cc.log(args);
          args && args.handler && GhysX.handler.emit(args.handler, args);
        }.bind(this));
        auth();
      }
    }
    cc._RF.pop();
  }, {
    WeiXinPlatform: "WeiXinPlatform"
  } ],
  Protocol: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dbf4Cpsv5KKICZ7uMmUIQ/", "Protocol");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  Resources: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9492agNg05H94BA6Ka+G2xU", "Resources");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Resources = function(_super) {
      __extends(Resources, _super);
      function Resources() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.view = null;
        _this.prefabs = [];
        return _this;
      }
      Resources.prototype.onLoad = function() {};
      Resources.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u573a\u666f",
        tooltip: "\u573a\u666f\u63a7\u5236\u5c42",
        visible: true
      }) ], Resources.prototype, "view", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6e38\u620f\u7ec4\u4ef6",
        tooltip: "\u6e38\u620f\u516c\u5171\u7ec4\u4ef6",
        visible: true
      }) ], Resources.prototype, "prefabs", void 0);
      Resources = __decorate([ ccclass ], Resources);
      return Resources;
    }(cc.Component);
    exports.default = Resources;
    cc._RF.pop();
  }, {} ],
  Scripter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "585761jk9ZO45+rudZ4kO8x", "Scripter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ScriptExecuteModeEnum = cc.Enum({
      DEFAULT: 0,
      ONLOAD: 1,
      START: 2,
      ONENABLE: 3,
      ONDISABLE: 4,
      ONCLICK: 5,
      ONDESTROY: 6
    });
    var Scripter = function(_super) {
      __extends(Scripter, _super);
      function Scripter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.script = "[{}]";
        _this.executeMode = ScriptExecuteModeEnum.DEFAULT;
        _this._script_infos = null;
        return _this;
      }
      Scripter.prototype.onClick = function(event, params) {
        this.execute();
      };
      Scripter.prototype.execute = function() {
        for (var _i = 0, _a = this._script_infos; _i < _a.length; _i++) {
          var script_info_1 = _a[_i];
          if (script_info_1) if (script_info_1.event) if (script_info_1.group_name) GhysX_1.GhysX.graphics.manager.group(script_info_1.event, script_info_1.group_name); else switch (script_info_1.event) {
           case "show":
            GhysX_1.GhysX.graphics.manager.show(script_info_1.args.window_name);
            break;

           case "hide":
            GhysX_1.GhysX.graphics.manager.hide(script_info_1.args.window_name);
            break;

           case "close":
            GhysX_1.GhysX.graphics.manager.close(script_info_1.args.window_name);
            break;

           case "open":
            GhysX_1.GhysX.graphics.draw(script_info_1.args);
          } else script_info_1.handler && GhysX_1.GhysX.handler.emit(script_info_1.handler, script_info_1.args);
        }
      };
      Scripter.prototype.onLoad = function() {
        try {
          this._script_infos = JSON.parse(this.script || "{}");
        } catch (error) {
          cc.log(error);
        }
        switch (this.executeMode) {
         case ScriptExecuteModeEnum.DEFAULT:
          break;

         case ScriptExecuteModeEnum.ONLOAD:
          this.execute();
          break;

         case ScriptExecuteModeEnum.START:
          break;

         case ScriptExecuteModeEnum.ONCLICK:
          var clickEventHandler = new cc.Component.EventHandler();
          clickEventHandler.target = this.node;
          clickEventHandler.component = "Scripter";
          clickEventHandler.handler = "onClick";
          clickEventHandler.customEventData = "";
          var button = this.node.getComponent(cc.Button);
          button || (button = this.node.addComponent(cc.Button));
          button.clickEvents.push(clickEventHandler);
        }
      };
      Scripter.prototype.start = function() {
        ScriptExecuteModeEnum.START == this.executeMode && this.execute();
      };
      Scripter.prototype.onEnable = function() {
        ScriptExecuteModeEnum.ONENABLE == this.executeMode && this.execute();
      };
      Scripter.prototype.onDisable = function() {
        ScriptExecuteModeEnum.ONDISABLE == this.executeMode && this.execute();
      };
      Scripter.prototype.onDestroy = function() {
        ScriptExecuteModeEnum.ONDESTROY == this.executeMode && this.execute();
      };
      __decorate([ property({
        displayName: "\u811a\u672c",
        tooltip: "\u811a\u672c\u662f\u4e00\u6bb5JSON \u6587\u672c\uff0c\u7ed3\u6784\u662f\u53c2\u6570\u4e3a\uff1a\n[{\n  group_name: group name\n  event: show/hide/close/open\n  args:{\n    window_name: string\n    params: {\n      }\n  }\n}]\n"
      }) ], Scripter.prototype, "script", void 0);
      __decorate([ property({
        type: ScriptExecuteModeEnum,
        displayName: "\u811a\u672c",
        tooltip: "\u811a\u672c\u6267\u884c\u65b9\u5f0f"
      }) ], Scripter.prototype, "executeMode", void 0);
      Scripter = __decorate([ ccclass ], Scripter);
      return Scripter;
    }(cc.Component);
    exports.default = Scripter;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX"
  } ],
  ScrollViewHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "86269lFSPRA26gQtOreMa0R", "ScrollViewHandler");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ScrollViewHandler = function(_super) {
      __extends(ScrollViewHandler, _super);
      function ScrollViewHandler() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.componet = null;
        _this.scrollView = null;
        _this.startLoad = false;
        _this.createEventName = "";
        _this.createEventParam = "";
        _this._item_infos = [];
        _this._item_cells = [];
        return _this;
      }
      ScrollViewHandler.prototype.scrollingCallback = function(scrollView, event) {
        switch (event) {
         case cc.ScrollView.EventType.SCROLL_BEGAN:
         case cc.ScrollView.EventType.SCROLLING:
         case cc.ScrollView.EventType.SCROLL_ENDED:
        }
        var view_top = -scrollView.content.y;
        var view_bottom = view_top - scrollView.node.height;
        this._item_cells.forEach(function(value, key) {
          var ty = value.node.parent.y + value.node.parent.height / 2;
          var by = value.node.parent.y - value.node.parent.height / 2;
          var active = value.node.active;
          active = view_top >= ty && ty >= view_bottom || view_top >= by && by >= view_bottom;
          active != value.node.active && (value.node.active = active);
        });
      };
      ScrollViewHandler.prototype.createCell = function(item_info) {
        var func = this.componet["createCell"];
        if (func) {
          var c = func(item_info);
          this._item_cells.push(c);
          var item = c.node;
          var view_top = -this.scrollView.content.y;
          var view_bottom = view_top - this.scrollView.node.height;
          var ty = item.parent.y + item.parent.height / 2;
          var by = item.parent.y - item.parent.height / 2;
          item.active = view_top >= ty && ty >= view_bottom || view_top >= by && by >= view_bottom;
        }
      };
      ScrollViewHandler.prototype.createItem = function() {
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(.01), cc.callFunc(function(sender) {
          if (this._item_infos.length > 0) {
            var item_info = this._item_infos[0];
            this._item_infos.splice(0, 1);
            this.createCell(item_info);
          }
          this._item_infos.length > 0 && this.createItem();
        }.bind(this))));
      };
      ScrollViewHandler.prototype.createNode = function() {
        var index = 0;
        for (var key in this._item_infos) {
          var item_info = this._item_infos[key];
          var item = new cc.Node();
          item.width = item_info.prefab.data.width;
          item.height = item_info.prefab.data.height;
          this.scrollView.content.addChild(item);
          item_info.item_index = index++;
          item_info.parent = item;
        }
      };
      ScrollViewHandler.prototype.onLoad = function() {
        this.createEventName && GhysX_1.GhysX.handler.on(this.createEventName, this.createItem, this);
      };
      ScrollViewHandler.prototype.start = function() {
        this.createNode();
        this.startLoad && this.createItem();
      };
      __decorate([ property({
        type: cc.Component,
        displayName: "\u76ee\u6807\u7ec4\u4ef6",
        tooltip: "\u76ee\u6807\u7ec4\u4ef6"
      }) ], ScrollViewHandler.prototype, "componet", void 0);
      __decorate([ property({
        type: cc.ScrollView,
        displayName: "\u6eda\u52a8\u7a97\u53e3",
        tooltip: "\u6eda\u52a8\u7a97\u53e3"
      }) ], ScrollViewHandler.prototype, "scrollView", void 0);
      __decorate([ property({
        displayName: "\u542f\u52a8\u52a0\u8f7d",
        tooltip: "\u662f\u5426\u5728\u754c\u9762\u542f\u52a8\u7684\u65f6\u5019\u81ea\u52a8\u52a0\u8f7d\u754c\u9762"
      }) ], ScrollViewHandler.prototype, "startLoad", void 0);
      __decorate([ property({
        displayName: "\u521b\u5efa\u5143\u7d20\u4e8b\u4ef6",
        tooltip: ""
      }) ], ScrollViewHandler.prototype, "createEventName", void 0);
      __decorate([ property({
        displayName: "\u521b\u5efa\u5143\u7d20\u4e8b\u4ef6\u53c2\u6570",
        tooltip: ""
      }) ], ScrollViewHandler.prototype, "createEventParam", void 0);
      __decorate([ property({
        visible: false
      }) ], ScrollViewHandler.prototype, "_item_infos", void 0);
      __decorate([ property({
        visible: false
      }) ], ScrollViewHandler.prototype, "_item_cells", void 0);
      ScrollViewHandler = __decorate([ ccclass ], ScrollViewHandler);
      return ScrollViewHandler;
    }(cc.Component);
    exports.default = ScrollViewHandler;
    cc._RF.pop();
  }, {
    "../GhysX": "GhysX"
  } ],
  Shader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89834DOs3FH6KO9buPeR8K5", "Shader");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var shader;
    (function(shader) {
      var gray;
      (function(gray_1) {
        function _sprite_gray(sprite) {
          if (sprite) {
            sprite.__default_material = sprite.getMaterial(0);
            sprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
          }
        }
        function _label_gray(label) {
          if (label) {
            if (label.font) if (label.font.__proto__ instanceof cc.BitmapFont) label.sharedMaterials[0] = cc.Material.getBuiltinMaterial("2d-gray-sprite"); else {
              label.node.__color = label.node.color;
              label.node.color = cc.color(200, 200, 200, 255);
            } else {
              label.node.__color = label.node.color;
              label.node.color = cc.color(200, 200, 200, 255);
            }
            var labelOutline = label.node.getComponent(cc.LabelOutline);
            if (labelOutline) {
              labelOutline.__color = labelOutline.color;
              labelOutline.color = cc.color(110, 110, 110, 255);
            }
          }
        }
        function _button_gray(button) {
          if (button) {
            button.__default_target = button.target;
            button.target = null;
            button.__default_enableAutoGrayEffect = button.enableAutoGrayEffect;
            button.enableAutoGrayEffect = false;
            button.__default_material = button._graySpriteMaterial;
            button._graySpriteMaterial = cc.Material.getBuiltinMaterial("2d-gray-sprite");
          }
        }
        function _sprite_ungray(sprite) {
          sprite && sprite.setMaterial(0, sprite.__default_material);
        }
        function _label_ungray(label) {
          if (label) {
            label.font && label.font.__proto__ instanceof cc.BitmapFont ? label.sharedMaterials[0] = cc.Material.getBuiltinMaterial("2d--sprite") : label.node.color = label.node.__color;
            label.node.color = label.node.__color || label.node.color;
            var labelOutline = label.node.getComponent(cc.LabelOutline);
            labelOutline && (labelOutline.color = labelOutline.__color || labelOutline.color);
          }
        }
        function _button_ungray(button) {
          if (button) {
            button.target = button.__default_target;
            button.enableAutoGrayEffect = button.__default_enableAutoGrayEffect;
            button._graySpriteMaterial = button.__default_material;
          }
        }
        function _node_gray(node) {
          _sprite_gray(node.getComponent(cc.Sprite));
          var label = node.getComponent(cc.Label);
          label && _label_gray(label);
          var button = node.getComponent(cc.Button);
          button && _button_gray(button);
        }
        function _node_ungray(node) {
          _sprite_ungray(node.getComponent(cc.Sprite));
          var label = node.getComponent(cc.Label);
          label && _label_ungray(label);
          var button = node.getComponent(cc.Button);
          button && _button_ungray(button);
        }
        function gray(node) {
          if (node.__gray) return;
          node.__gray = true;
          _node_gray(node);
          for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            gray(child);
          }
        }
        gray_1.gray = gray;
        function ungray(node) {
          if (!node.__gray) return;
          node.__gray = false;
          _node_ungray(node);
          for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            ungray(child);
          }
        }
        gray_1.ungray = ungray;
      })(gray = shader.gray || (shader.gray = {}));
    })(shader = exports.shader || (exports.shader = {}));
    cc._RF.pop();
  }, {} ],
  Socket: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f4bd11MTV1DJY+bA8SDOlKm", "Socket");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  SpriteLocalized: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8fc5eEIU7pCx5J7PwjXRaoL", "SpriteLocalized");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Sprite,
      properties: {}
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  Storage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d30ac0rlPBK950Uu4UQNkmz", "Storage");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    function read(key, defaultValue) {
      var value = cc.sys.localStorage.getItem(key);
      null !== value && void 0 !== value && "" != value || (value = defaultValue);
      return value;
    }
    exports.read = read;
    function write(key, value) {
      null !== value && void 0 !== value || (value = "");
      cc.sys.localStorage.setItem(key, value);
    }
    exports.write = write;
    cc._RF.pop();
  }, {} ],
  String: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "157bd2SaGxDgYPAPA+eoXco", "String");
    String.prototype._split = function(separate, func) {
      var arr = this.split(separate);
      if (func) for (var m in arr) arr[m] = func(arr[m]);
      return arr;
    };
    String.prototype.splits = function(separate, delimeter, func) {
      var arrs = [];
      var arr = this.split(separate);
      for (var i in arr) {
        var v = arr[i];
        arrs[i] = v._split(delimeter, func);
      }
      return arrs;
    };
    String.prototype.splitss = function(iseparate, separate, delimeter, func) {
      var arrs = [];
      var arr = this.split(iseparate);
      for (var i in arr) {
        var v = arr[i];
        arrs[i] = v.splits(separate, delimeter, func);
      }
      return arrs;
    };
    String.prototype.line_splits = function(separate, delimeter, func) {
      var arrs = [];
      var arr = this.split(separate);
      for (var i in arr) {
        var v = arr[i];
        v = v.split(delimeter);
        func && (v = func(v));
        arrs[i] = v;
      }
      return arrs;
    };
    String.prototype._concat = function(desc, separate) {
      var r = "";
      var a = false;
      for (var key in desc) {
        a ? r += separate : a = true;
        r += desc[key];
      }
      return r;
    };
    String.prototype._concats = function(desc, separate, delimeter) {
      var r = "";
      var a = false;
      for (var key in desc) {
        var t = desc[key];
        var rt = this._concat(t, delimeter);
        if (rt) {
          a ? r += separate : a = true;
          r += rt;
        }
      }
      return r;
    };
    String.prototype.format = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
      if (0 == arguments.length) return null;
      var str = this;
      var mpos = 0;
      var index = 0;
      do {
        mpos = str.indexOf("%", mpos);
        if (mpos > -1) {
          mpos += 1;
          var c = str.charAt(mpos);
          if ("s" == c) {
            str = str.replace("%s", "{" + index + "}");
            index += 1;
          } else if ("d" == c) {
            str = str.replace("%d", "{" + index + "}");
            index += 1;
          }
        }
      } while (mpos > -1);
      for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(re, arguments[i]);
      }
      return str;
    };
    String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
      return RegExp.prototype.isPrototypeOf(reallyDo) ? this.replace(reallyDo, replaceWith) : this.replace(new RegExp(reallyDo, ignoreCase ? "gi" : "g"), replaceWith);
    };
    "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(prefix) {
      return this.slice(0, prefix.length) === prefix;
    });
    "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(suffix) {
      return -1 !== this.indexOf(suffix, this.length - suffix.length);
    });
    "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
      return this.replace(/(^\s*)|(\s*$)/g, "");
    });
    String.prototype.displayBigNumber = function() {
      var str = this;
      var num = parseInt(str);
      if (num >= 1e4 && num < 1e8) {
        num = num.valueOf() / 1e4;
        return Math.round(100 * num) / 100 + "\u4e07";
      }
      if (num >= 1e8) {
        num = num.valueOf() / 1e8;
        return Math.round(100 * num) / 100 + "\u4ebf";
      }
      return str;
    };
    cc._RF.pop();
  }, {} ],
  System: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9813FXQZBNzosi+EeHD4Yy", "System");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Storage = require("./Storage");
    var Audio_1 = require("./Audio");
    var System;
    (function(System) {
      System.storage = Storage;
      System.audio = Audio_1.Audio;
      var time;
      (function(time_1) {
        time_1.local = new Date();
        function sstime() {
          var t = new Date().getTime();
          return 0;
        }
        time_1.sstime = sstime;
        function difftime(newtime, prevtime) {
          var r = 0;
          prevtime || (prevtime = sstime());
          r = newtime - prevtime;
          return r;
        }
        time_1.difftime = difftime;
        function formatTime(time, match_info) {}
        time_1.formatTime = formatTime;
        function getHour(time) {}
        time_1.getHour = getHour;
        function timeZone(time_zone) {
          var d = new Date(sstime());
          var localTime = d.getTime();
          var localOffset = 6e4 * d.getTimezoneOffset();
          var utc = localTime + localOffset;
          var offset = time_zone;
          var server_time = utc + 36e5 * offset;
          return server_time;
        }
        time_1.timeZone = timeZone;
      })(time = System.time || (System.time = {}));
      function initialize(GhysX) {
        System.audio.initialize();
      }
      System.initialize = initialize;
    })(System = exports.System || (exports.System = {}));
    cc._RF.pop();
  }, {
    "./Audio": "Audio",
    "./Storage": "Storage"
  } ],
  TextToJson: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c728dGkyxVPnZp3G/Ua39GM", "TextToJson");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function parse(lines, keyIndex) {
      void 0 === keyIndex && (keyIndex = 0);
      var result = {};
      var lineCount = lines.length;
      if (lineCount > 4) {
        var line1 = lines[0];
        var line2 = lines[1];
        var line3 = lines[2];
        var line4 = lines[3];
        if ("id" === line3[0]) {
          var count = line1.length;
          for (var index = 4; index < lineCount; index++) {
            var element = lines[index];
            var len = element.length;
            if (len == count) {
              var item = {};
              for (var pos = 0; pos < len; pos++) {
                var valueType = line2[pos];
                item[line3[pos]] = "string" === valueType ? element[pos] : "float" === valueType ? parseFloat(element[pos]) : parseInt(element[pos]);
              }
              result[element[keyIndex]] = item;
            }
          }
        } else result = lines;
      }
      return result;
    }
    exports.parse = parse;
    cc._RF.pop();
  }, {} ],
  Unit: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61522O2rlBEVYnAY8sCAT3g", "Unit");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function random(min, max) {
      if (max < min) throw new Error("min > max");
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    exports.random = random;
    function randomf(min, max) {
      if (max < min) throw new Error("min > max");
      return Math.random() * (max - min) + min;
    }
    exports.randomf = randomf;
    var ugid;
    (function(ugid) {
      function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) s[i] = hexDigits.substr(Math.floor(16 * Math.random()), 1);
        s[14] = "4";
        s[19] = hexDigits.substr(3 & s[19] | 8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
      }
      ugid.uuid = uuid;
      function uuids(len, radix) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]; else {
          var r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
          uuid[14] = "4";
          for (i = 0; i < 36; i++) if (!uuid[i]) {
            r = 0 | 16 * Math.random();
            uuid[i] = chars[19 == i ? 3 & r | 8 : r];
          }
        }
        return uuid.join("");
      }
      ugid.uuids = uuids;
      function guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          var r = 16 * Math.random() | 0, v = "x" == c ? r : 3 & r | 8;
          return v.toString(16);
        });
      }
      ugid.guid = guid;
      function guids() {
        function S4() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
      }
      ugid.guids = guids;
    })(ugid = exports.ugid || (exports.ugid = {}));
    function password(len) {
      var str = "";
      for (var i = 0; i < len; i++) {
        var c = String.fromCharCode(random(1, 127));
        str += c;
      }
      return str;
    }
    exports.password = password;
    function rc4(data, key) {
      var seq = Array(256);
      var das = Array(data.length);
      for (var i = 0; i < 256; i++) {
        seq[i] = i;
        var j = (j + seq[i] + key.charCodeAt(i % key.length)) % 256;
        var temp = seq[i];
        seq[i] = seq[j];
        seq[j] = temp;
      }
      for (var i = 0; i < data.length; i++) das[i] = data.charCodeAt(i);
      for (var x = 0; x < das.length; x++) {
        var i = (i + 1) % 256;
        var j = (j + seq[i]) % 256;
        var temp = seq[i];
        seq[i] = seq[j];
        seq[j] = temp;
        var k = (seq[i] + seq[j] % 256) % 256;
        das[x] = String.fromCharCode(das[x] ^ seq[k]);
      }
      return das.join("");
    }
    exports.rc4 = rc4;
    cc._RF.pop();
  }, {} ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36d54+QYlxMfKTtvOYuGurk", "Utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function prefix(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    }
    exports.prefix = prefix;
    function random(min, max) {
      if (max < min) throw new Error("min > max");
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    exports.random = random;
    function randomf(min, max) {
      if (max < min) throw new Error("min > max");
      return Math.random() * (max - min) + min;
    }
    exports.randomf = randomf;
    function concat(desc, separate) {
      var r = "";
      var a = false;
      for (var key in desc) {
        a ? r += separate : a = true;
        r += desc[key];
      }
      return r;
    }
    exports.concat = concat;
    function concats(desc, separate, delimeter) {
      var r = "";
      var a = false;
      for (var key in desc) {
        var t = desc[key];
        var rt = concat(t, delimeter);
        if (rt) {
          a ? r += separate : a = true;
          r += rt;
        }
      }
      return r;
    }
    exports.concats = concats;
    function Uint8ArrayToString(fileData) {
      var dataString = "";
      for (var i = 0; i < fileData.length; i++) dataString += String.fromCharCode(fileData[i]);
      return dataString;
    }
    exports.Uint8ArrayToString = Uint8ArrayToString;
    function stringToUint8Array(str) {
      var arr = [];
      for (var i = 0, j = str.length; i < j; ++i) arr.push(str.charCodeAt(i));
      var tmpUint8Array = new Uint8Array(arr);
      return tmpUint8Array;
    }
    exports.stringToUint8Array = stringToUint8Array;
    function Utf8ArrayToStr(array) {
      var out = "", i = 0, len = array.length, char1, char2, char3, char4;
      while (i < len) {
        char1 = array[i++];
        if (char1 >> 4 <= 7) out += String.fromCharCode(char1); else if (char1 >> 4 == 12 || char1 >> 4 == 13) {
          char2 = array[i++];
          out += String.fromCharCode((31 & char1) << 6 | 63 & char2);
        } else if (char1 >> 4 == 14) {
          char2 = array[i++];
          char3 = array[i++];
          char4 = (15 & char1) << 12 | (63 & char2) << 6;
          out += String.fromCharCode(char4 | (63 & char3) << 0);
        }
      }
      return out;
    }
    exports.Utf8ArrayToStr = Utf8ArrayToStr;
    cc._RF.pop();
  }, {} ],
  WXPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "245f4T/B9xApK7iuwt7RrTV", "WXPlatform");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        var self = this;
        if (void 0 != window.wx) {
          wx.showShareMenu();
          wx.onShareAppMessage(function() {
            setTimeout(1e3, function() {
              self.shareListener();
            });
            return {
              title: "\u8f6c\u53d1\u6807\u9898",
              imageUrl: "",
              query: "",
              success: function success(res) {},
              fail: function fail(res) {},
              complete: function complete(res) {}
            };
          });
          wx.onMessage(function(data) {
            cc.log(data);
            "show_rank" == data.type;
          });
          wx.updateShareMenu({
            withShareTicket: true
          });
        }
      },
      getSystemInfo: function getSystemInfo() {
        var self = this;
        void 0 != window.wx && wx.getSystemInfo({
          success: function success(res) {
            self.systemInfo = res;
            cc.log(res.model);
            cc.log(res.pixelRatio);
            cc.log(res.windowWidth);
            cc.log(res.windowHeight);
            cc.log(res.language);
            cc.log(res.version);
            cc.log(res.platform);
            cc.log(res.system);
            self.build = res;
          }
        });
      },
      updateVersion: function updateVersion() {
        var self = this;
        if (void 0 != window.wx && "function" === typeof wx.getUpdateManager) {
          var updateManager = wx.getUpdateManager();
          updateManager.onCheckForUpdate(function(res) {
            cc.log(res.hasUpdate);
          });
          updateManager.onUpdateReady(function() {
            updateManager.applyUpdate();
          });
          updateManager.onUpdateFailed(function() {});
        }
      },
      message: function message() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
        var self = this;
        if (void 0 != window.wx) {
          var data = arguments[0];
          var openDataContext = wx.getOpenDataContext();
          openDataContext.postMessage(data);
        }
      },
      storage: function storage() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
        var self = this;
        if (void 0 != window.wx) {
          var command = arguments[0];
          var type = arguments[1];
          var dataList = arguments[1];
          var callback = arguments[2];
          "set" === command ? "user" === type && wx.setUserCloudStorage({
            KVDataList: dataList,
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
          }) : "get" === command ? "user" === type && wx.getUserCloudStorage({
            keyList: dataList,
            success: function success(res) {
              var KVDataList = res;
            },
            fail: function fail(res) {},
            complete: function complete(res) {}
          }) : "remove" === command && "user" === type && wx.removeUserCloudStorage({
            keyList: dataList,
            success: function success(res) {
              var KVDataList = res;
            },
            fail: function fail(res) {},
            complete: function complete(res) {}
          });
        }
      },
      share: function share(args) {
        var self = this;
        if (void 0 != window.wx) {
          cc.log("weixin share.");
          var command = args[0];
          if ("show_menu" === command) wx.showShareMenu({
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
          }); else if ("hide_menu" === command) wx.hideShareMenu({
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
          }); else if ("share" === command) {
            var title = args[1];
            var imageUrl = args[2];
            var query = args[3];
            var invoke = args[4];
            wx.shareAppMessage({
              title: title,
              imageUrl: imageUrl,
              query: query,
              success: function success(res) {
                invoke({
                  success: true
                });
              },
              fail: function fail(res) {
                invoke({
                  success: true
                });
              },
              complete: function complete(res) {
                invoke({
                  success: true
                });
              }
            });
            self.shareListener();
          } else if ("share_canvas" === command) {
            var _title = args[1];
            var _query = args[2];
            wx.onShareAppMessage(function() {
              return {
                title: _title,
                imageUrl: canvas.toTempFilePathSync({
                  destWidth: 500,
                  destHeight: 400
                }),
                query: _query,
                success: function success(res) {},
                fail: function fail(res) {},
                complete: function complete(res) {}
              };
            });
            self.shareListener();
          }
        }
      },
      shareListener: function shareListener() {},
      circles: function circles() {
        var self = this;
        void 0 != window.wx && (self.button = wx.createGameClubButton({
          type: 1,
          text: "",
          image: "",
          style: "",
          icon: ""
        }));
      },
      social: function social() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
        var self = this;
        if (void 0 != window.wx) {
          var command = arguments[0];
          var callback = arguments[1];
          if ("friend" === command) var friends = wx.getFriendCloudStorage({
            success: function success(res) {
              var data = res.data;
              callback && callback(data);
            }
          }); else if ("group" === command) var groups = wx.getGroupCloudStorage({
            success: function success(res) {
              var data = res.data;
              callback && callback(data);
            }
          });
        }
      },
      payment: function payment() {
        var self = this;
        void 0 != window.wx && wx.requestMidasPayment({
          mode: "game",
          offerId: "",
          buyQuantity: 10,
          zoneId: 1,
          success: function success(res) {},
          fail: function fail(_ref) {
            var errMsg = _ref.errMsg, errCode = _ref.errCode;
            cc.log(errMsg, errCode);
          }
        });
      },
      login: function login() {
        cc.log("weixin login.");
        var self = this;
        void 0 != window.wx && wx.authorize({
          scope: "scope.record",
          fail: function fail(res) {
            res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1;
          },
          success: function success(res) {
            wx.login({
              fail: function fail(res) {
                GhysX.Data.platform.inlogin = false;
              },
              success: function success(res) {
                var code = res.code;
                var button = wx.createUserInfoButton({
                  type: "text",
                  text: "\u5fae\u4fe1\u767b\u5f55",
                  style: {
                    left: (self.build.windowWidth - 200) / 2,
                    top: self.build.windowHeight - 200,
                    width: 200,
                    height: 40,
                    lineHeight: 40,
                    backgroundColor: "#47c432",
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 4
                  }
                });
                button.onTap(function(res) {
                  console.log(res);
                  GhysX.Data.platform.inlogin = false;
                  var userInfo = res.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender;
                  var province = userInfo.province;
                  var city = userInfo.city;
                  var country = userInfo.country;
                  userInfo.code = code;
                  GhysX.Data.platform.userInfo = userInfo;
                  cc.loader.load({
                    url: avatarUrl,
                    type: "jpg"
                  }, function(err, texture) {
                    err || (GhysX.Data.platform.userInfo.texture = texture);
                  });
                  GhysX.Network.of("/index").once("user", function(message) {
                    cc.log("weixin account:", message);
                    if (0 == message.status) {
                      GhysX.Data.platform.userInfo.account = message.data.platform.account;
                      GhysX.Handler.emit("login_account_success", message);
                    }
                  });
                  GhysX.Network.send("message", {
                    gate: "login",
                    handler: "user",
                    invoke: "user",
                    data: {
                      system_info: self.systemInfo,
                      platform: {
                        res: res,
                        userInfo: userInfo,
                        name: "weixin",
                        code: code
                      }
                    }
                  }, "proto");
                  button.destroy();
                });
              }
            });
          }
        });
      },
      logout: function logout() {
        cc.log("weixin logout.");
      }
    });
    cc._RF.pop();
  }, {} ],
  WeiXinPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d44ftPXUBMB7PfojN923h4", "WeiXinPlatform");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function __initWeiXinPlatform(GhysX) {
      var utils = require("Utils");
      wx.setKeepScreenOn({
        keepScreenOn: true
      });
      var getSystemInfoSync = wx.getSystemInfoSync();
      GhysX.platform.sys = getSystemInfoSync;
      GhysX.platform.info.code = cc.sys.localStorage.getItem("account_code");
      var updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        console.log(res.hasUpdate);
      });
      updateManager.onUpdateReady(function() {
        wx.showModal({
          title: "\u66f4\u65b0\u63d0\u793a",
          content: "\u65b0\u7248\u672c\u5df2\u7ecf\u51c6\u5907\u597d\uff0c\u662f\u5426\u91cd\u542f\u5e94\u7528\uff1f",
          success: function success(res) {
            res.confirm && updateManager.applyUpdate();
          }
        });
      });
      updateManager.onUpdateFailed(function() {
        wx.showModal({
          title: "\u66f4\u65b0\u63d0\u793a",
          content: "\u7248\u672c\u66f4\u65b0\u5931\u8d25\uff0c\u91cd\u65b0\u66f4\u65b0\u7248\u672c\u3002",
          success: function success(res) {
            res.confirm && updateManager.applyUpdate();
          }
        });
      });
      require("./ald/ald-game.js").initialize();
      GhysX.handler.on("get_launch_options", function name(args) {
        var res = wx.getLaunchOptionsSync();
        cc.log("get Launch option", res);
        cc.log("game callback:", args);
        "string" === typeof args.complete ? GhysX.handler.emit(args.complete, res) : "function" === typeof args.complete && args.complete(res);
        cc.log("==> wx.getLaunchOptionsSync return ", JSON.stringify(res));
        1104 === res.scene && GhysX.handler.emit("favo_game");
        GhysX.handler.emit("send_event", {
          key: "\u542f\u52a8\u53c2\u6570",
          value: res
        });
        res.query.AdsPos && wx.sendEvent("\u5206\u4eab", {
          launchImageUrl: res.query.AdsPos
        });
        console.log("get_launch_options:", args);
      });
      GhysX.handler.on("guest_login", function(args) {
        var openid = null;
        try {
          var value = wx.getStorageSync("openid");
          value && (openid = value);
        } catch (e) {}
        if (!openid) {
          openid = utils.guid();
          try {
            wx.setStorageSync("openid", openid);
          } catch (e) {}
        }
        args.info.user_info = {
          openid: openid
        };
        GhysX.Data.user_info = args.info.user_info;
        args.info.code = GhysX.Data.user_info.openid;
        GhysX.handler.emit("auth_success", args);
      });
      GhysX.handler.on("authorize", function(args) {
        wx.getSetting({
          success: function success(res) {
            if (res.authSetting["scope.userInfo"]) GhysX.handler.emit("weixin_login", args); else {
              var openid = null;
              try {
                var value = wx.getStorageSync("openid");
                value && (openid = value);
              } catch (e) {}
              if (openid) GhysX.handler.emit("guest_login", args); else {
                var getSystemInfoSync = wx.getSystemInfoSync();
                var button = wx.createUserInfoButton({
                  type: "image",
                  image: "https://kgdhs-static.boomegg.cn/merge_kings/assets/resources/images/ui/button/start_button.png?v=" + utils.random(1, 1e6),
                  style: {
                    left: (getSystemInfoSync.windowWidth - 200) / 2,
                    top: getSystemInfoSync.windowHeight - 150,
                    width: 200,
                    height: 64,
                    lineHeight: 40,
                    backgroundColor: "#ff0000",
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 4
                  }
                });
                button.show();
                button.onTap(function(res) {
                  button.destroy();
                  if (res.userInfo) {
                    args.info.user_info = res.userInfo;
                    GhysX.handler.emit("weixin_login", args);
                  } else GhysX.handler.emit("guest_login", args);
                });
              }
            }
          },
          fail: function fail(res) {}
        });
      });
      GhysX.handler.on("login", function(args) {
        GhysX.handler.emit("weixin_login", args);
      });
      GhysX.handler.on("weixin_login", function(args) {
        wx.login({
          success: function success(res) {
            if (res.code) GhysX.Net.Http.post(GhysX.Net.Protocol.pack("", "WeiXinPlatformService####get_open_id", "wxb3ee21c1b9c8423a", "c21be9024da409f0ffb442028716953f", res.code), function(response) {
              cc.log(response);
              args.info.code = GhysX.Data.user_info.openid;
              GhysX.handler.emit("auth_success", args);
            }); else {
              console.log("\u767b\u5f55\u5931\u8d25\uff01" + res.errMsg);
              GhysX.handler.emit("login_complete", args);
            }
          }
        });
      });
      GhysX.handler.on("weixin_get_user_info", function(args) {
        wx.getUserInfo({
          success: function success(res) {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            var avatarUrl = userInfo.avatarUrl;
            var gender = userInfo.gender;
            var province = userInfo.province;
            var city = userInfo.city;
            var country = userInfo.country;
            args.info.user_info = res.userInfo;
            GhysX.handler.emit("weixin_login", args);
          }
        });
      });
      GhysX.handler.on("clean_all_assets", function name(args) {
        wxDownloader.cleanAllAssets();
      });
      GhysX.handler.on("clean_assets", function name(args) {
        var fileManager = wx.getFileSystemManager();
        fileManager.readdir({
          dirPath: wxDownloader.cacheDir,
          success: function success(res) {
            var cachedFiles = wxDownloader.getCachedFileList();
            var length = res.files.length;
            length > 1e3 && res.files.forEach(function(val, key) {
              if ((val.endsWith(".png") || val.endsWith(".jpg")) && randomNumber(1, 100) <= 15) {
                delete cachedFiles[val];
                fileManager.unlink({
                  filePath: wxDownloader.cacheDir + "/" + val,
                  success: function success(err) {},
                  fail: function fail(err) {}
                });
              }
            });
            fileManager.writeFileSync(wxDownloader.cacheDir + "/" + wxDownloader.cachedFileName, JSON.stringify(cachedFiles), "utf8");
          }
        });
      });
      GhysX.handler.on("download_task", function(args) {
        var fileManager = wx.getFileSystemManager();
        var downloadTask = wx.downloadFile({
          url: args.url,
          success: function success(res) {
            args.download_success && args.download_success(res);
            var filePath = res.tempFilePath;
            fileManager.unzip({
              zipFilePath: filePath,
              targetPath: wx.env.USER_DATA_PATH,
              success: function success(res) {
                args.uncompress_success && args.uncompress_success(res);
                fileManager.readdir({
                  dirPath: wxDownloader.cacheDir,
                  success: function success(res) {
                    var cachedFiles = wxDownloader.getCachedFileList();
                    res.files.forEach(function(val, key) {
                      cachedFiles[val] = 1;
                    });
                    fileManager.writeFileSync(wxDownloader.cacheDir + "/" + wxDownloader.cachedFileName, JSON.stringify(cachedFiles), "utf8");
                  }
                });
              },
              fail: function fail(res) {
                console.log(res);
                args.uncompress_fail && args.uncompress_fail(res);
              }
            });
          },
          fail: function fail(res) {
            args.download_fail && args.download_fail(res);
          }
        });
        downloadTask.onProgressUpdate(function(res) {
          args.download_progress && args.download_progress(res);
        });
      });
      GhysX.handler.on("navigate", function(args) {
        console.log(args);
        GhysX.handler.emit("send_event", {
          key: "navigate",
          value: args
        });
        wx.navigateToMiniProgram({
          appId: args.appId,
          path: args.path || "pages/index/index",
          extraData: args.extraData || {},
          success: function success(res) {
            args.res = res;
            GhysX.handler.emit("navigate_success", args);
          },
          fail: function fail(res) {
            args.res = res;
            GhysX.handler.emit("navigate_fail", args);
          },
          complete: function complete(res) {
            args.res = res;
            GhysX.handler.emit("navigate_complete", args);
          }
        });
      });
      GhysX.handler.on("weixin_game_quanzi", function(args) {
        var openId = args.openid || _ED.user_info.openid;
        wx.navigateToMiniProgram({
          appId: "wx4233cc143076bfdc",
          path: "pages/index/index",
          extraData: {
            openid: openId,
            appid: "wx9d20175891e5518c",
            Ads: "sdk",
            AdsPos: "community",
            to: "circle"
          },
          success: function success(res) {}
        });
      });
      GhysX.handler.on("share", function(args) {
        args.share_type = args.share_type || "share_app_message";
        if ("share_app_message" === args.share_type) {
          if (1 === GhysX.assets.data.config.review_status && !args.show_off && !args.invite) {
            "string" === typeof args.complete ? GhysX.handler.emit(args.complete) : "function" === typeof args.complete && args.complete();
            return;
          }
          var sendData = null;
          if ("object" === _typeof(args.query)) {
            sendData = "";
            for (var key in args.query) {
              var value = args.query[key];
              sendData.length > 0 && (sendData += "&");
              sendData = sendData + key + "=" + value;
            }
          }
          var share_info = GhysX.assets.data.share.reward[GhysX.modules.unit.random(0, GhysX.assets.data.share.reward.length - 1)];
          console.log(share_info);
          wx.aldShareAppMessage({
            title: args.title,
            imageUrl: share_info.imageUrl,
            imageUrlId: share_info.imageUrlId,
            query: sendData || "def=-1",
            success: function success(res) {
              cc.log("===> weixin share success: ", res);
            },
            fail: function fail(res) {
              cc.log("===> weixin share fail: ", res);
            },
            complete: function complete(res) {
              cc.log("===> weixin share complete: ", res);
            }
          });
          GhysX.handler.emit("send_event", {
            key: "\u5206\u4eab",
            value: {
              title: args.title,
              imageUrl: share_info.imageUrl,
              imageUrlId: share_info.imageUrlId,
              query: sendData || "def=-1"
            }
          });
          GhysX.handler.once("share_back", function(res) {
            GhysX.handler.off("share_back");
            var share_status = 1;
            (wx.__pause_interval_time <= 3e3 || 70 < utils.random(1, 100)) && (share_status = -1);
            if (-1 == share_status) {
              GhysX.handler.emit("send_event", {
                key: "\u5206\u4eab\u5931\u8d25",
                value: {
                  count: 1
                }
              });
              "string" === typeof args.fail ? GhysX.handler.emit(args.fail, res) : "function" === typeof args.fail ? args.fail(res) : GhysX.handler.emit("show_message", "share_lose");
            } else {
              GhysX.handler.emit("send_event", {
                key: "\u5206\u4eab\u6210\u529f",
                value: {
                  count: 1
                }
              });
              "string" === typeof args.complete ? GhysX.handler.emit(args.complete, {
                res: res,
                status: share_status
              }) : "function" === typeof args.complete && args.complete({
                res: res,
                status: share_status
              });
            }
            wx.getShareInfo({
              shareTicket: "",
              timeout: 15e3,
              success: function success(res) {
                cc.log("get share info [success]:", res);
              },
              fail: function fail(res) {
                cc.log("get share info [fail]:", res);
              },
              complete: function complete(res) {
                cc.log("get share info [complete]:", res);
              }
            });
          });
        }
      });
      GhysX.handler.on("create_banner", function(args) {
        var adUnitId = args.adUnitId;
        if (!adUnitId) return;
        wx.__bannerAds || (wx.__bannerAds = {});
        var bannerAdInfo = wx.__bannerAds[adUnitId];
        if (!bannerAdInfo) {
          bannerAdInfo = {
            show: true,
            bannerAd: null
          };
          wx.__bannerAds[adUnitId] = bannerAdInfo;
        }
        if (bannerAdInfo.bannerAd) {
          bannerAdInfo.bannerAd.destroy();
          bannerAdInfo.bannerAd = null;
        }
        var systemInfoSync = wx.getSystemInfoSync();
        var pixelRatio = systemInfoSync.pixelRatio;
        var screenWidth = systemInfoSync.screenWidth;
        var screenHeight = systemInfoSync.screenHeight;
        var modeWidth = 50;
        var modeHeight = 0;
        pixelRatio >= 3 && (modeHeight = 13);
        var bannerAd = wx.createBannerAd({
          adUnitId: adUnitId,
          adIntervals: 30,
          style: {
            left: 0,
            top: 0,
            width: 300
          },
          success: function success(res) {
            console.log("bannerAd: success", res);
          },
          fail: function fail(res) {
            console.log("bannerAd: fail", res);
          },
          complete: function complete(res) {
            console.log("bannerAd: complete", res);
          }
        });
        wx.__bannerAds[adUnitId].bannerAd = bannerAd;
        bannerAd.onResize(function(width, height) {
          bannerAd.style.left = (systemInfoSync.windowWidth - bannerAd.style.realWidth) / 2;
          bannerAd.style.top = modeHeight > 0 ? systemInfoSync.windowHeight - bannerAd.style.realHeight - modeHeight : systemInfoSync.windowHeight - bannerAd.style.realHeight;
        });
        bannerAd.onError(function(res) {
          console.log("bannerAd: onError", res);
          try {
            bannerAd && bannerAd.destroy();
          } catch (error) {
            console.log(error);
          }
          wx.__bannerAds[bannerAd.adUnitId].bannerAd = null;
          res || (res = {});
          GhysX.handler.emit("send_event", {
            key: "\u521b\u5efaBanner\u5931\u8d25",
            value: {
              adUnitId: adUnitId,
              errCode: res.errCode || "-1",
              errMsg: res.errMsg || "\u672a\u77e5"
            }
          });
        });
        bannerAd.onLoad(function(res) {
          bannerAdInfo.show && bannerAd.show();
          console.log("bannerAd: onLoad", res, bannerAd, systemInfoSync);
          bannerAd.style.left = (systemInfoSync.windowWidth - bannerAd.style.realWidth) / 2;
          bannerAd.style.top = modeHeight > 0 ? systemInfoSync.windowHeight - bannerAd.style.realHeight - modeHeight : systemInfoSync.windowHeight - bannerAd.style.realHeight;
          GhysX.handler.emit("send_event", {
            key: "\u521b\u5efaBanner\u6210\u529f",
            value: {
              adUnitId: adUnitId
            }
          });
        });
        GhysX.handler.emit("send_event", {
          key: "\u521b\u5efaBanner",
          value: {
            adUnitId: adUnitId
          }
        });
      });
      GhysX.handler.on("show_banner", function(args) {
        try {
          var adUnitId = args.adUnitId;
          if (!adUnitId) return;
          wx.__bannerAds || (wx.__bannerAds = {});
          var bannerAdInfo = wx.__bannerAds[adUnitId];
          if (!bannerAdInfo) {
            bannerAdInfo = {
              show: true,
              bannerAd: null
            };
            wx.__bannerAds[adUnitId] = bannerAdInfo;
          }
          bannerAdInfo.show = true;
          !bannerAdInfo.bannerAd || args.forced ? GhysX.handler.emit("create_banner", args) : bannerAdInfo.bannerAd.show();
        } catch (error) {
          console.log(error);
        }
      });
      GhysX.handler.on("hide_banner", function(args) {
        var adUnitId = 0;
        args && (adUnitId = args.adUnitId);
        if (!adUnitId) {
          for (var key in wx.__bannerAds) GhysX.handler.emit("hide_banner", {
            adUnitId: key
          });
          return;
        }
        wx.__bannerAds || (wx.__bannerAds = {});
        var bannerAdInfo = wx.__bannerAds[adUnitId];
        if (!bannerAdInfo) {
          bannerAdInfo = {
            show: false,
            bannerAd: null
          };
          wx.__bannerAds[adUnitId] = bannerAdInfo;
        }
        bannerAdInfo.show = false;
        bannerAdInfo.bannerAd && bannerAdInfo.bannerAd.hide();
      });
      GhysX.handler.on("create_video", function(args) {
        var adUnitId = args.adUnitId;
        if (!adUnitId) return;
        args.start_time = new Date().getTime();
        args.token = GhysX.platform.info.code;
        var videoAd = wx.createRewardedVideoAd({
          adUnitId: args.adUnitId
        });
        videoAd.show().catch(function(err) {
          videoAd.load().then(function() {
            return videoAd.show();
          });
        });
        videoAd.onError(function(res) {
          console.log("\u89c6\u9891\u51fa\u9519\u4e8b\u4ef6");
          GhysX.handler.emit("video_error", res);
        });
        videoAd.onClose(function(res) {
          console.log("\u89c6\u9891\u5173\u95ed\u4e8b\u4ef6");
          GhysX.handler.emit("video_over", res);
        });
        GhysX.handler.off("video_error");
        GhysX.handler.off("video_over");
        GhysX.handler.once("video_error", function(res) {
          args.interval_time = new Date().getTime() - args.start_time;
          res = res || {};
          res.interval_time = args.interval_time;
          res.adUnitId = args.adUnitId;
          res.token = args.token;
          console.log("\u521b\u5efa\u89c6\u9891\u51fa\u9519\uff1a", res);
          "string" === typeof args.fail ? GhysX.handler.emit(args.fail, res) : "function" === typeof args.fail ? args.fail(res) : GhysX.handler.emit("show_message", "create_video_lose");
          GhysX.handler.emit("send_event", {
            key: "\u521b\u5efa\u89c6\u9891\u5931\u8d25",
            value: res
          });
        });
        GhysX.handler.once("video_over", function(res) {
          args.interval_time = new Date().getTime() - args.start_time;
          res = res || {};
          res.interval_time = args.interval_time;
          res.adUnitId = args.adUnitId;
          res.token = args.token;
          if (res && res.isEnded || void 0 === res) {
            console.log("\u6b63\u5e38\u64ad\u653e\u7ed3\u675f\uff0c\u53ef\u4ee5\u4e0b\u53d1\u6e38\u620f\u5956\u52b1");
            "string" === typeof args.success ? GhysX.handler.emit(args.success, res) : "function" === typeof args.success && args.success(res);
            args.interval_time = new Date().getTime() - args.start_time;
            GhysX.handler.emit("send_event", {
              key: "\u89c6\u9891\u64ad\u653e\u5b8c\u6bd5",
              value: res
            });
          } else {
            console.log("\u64ad\u653e\u4e2d\u9014\u9000\u51fa\uff0c\u4e0d\u4e0b\u53d1\u6e38\u620f\u5956\u52b1");
            "string" === typeof args.cancel ? GhysX.handler.emit(args.cancel, res) : "function" === typeof args.cancel ? args.cancel(res) : GhysX.handler.emit("show_message", "play_video_cancel");
            GhysX.handler.emit("send_event", {
              key: "\u89c6\u9891\u64ad\u653e\u4e2d\u9014\u9000\u51fa",
              value: res
            });
          }
        });
        GhysX.handler.emit("send_event", {
          key: "\u521b\u5efa\u89c6\u9891",
          value: {
            adUnitId: adUnitId
          }
        });
      });
      GhysX.handler.on("create_interstitial_ad", function(args) {
        var interstitialAd = null;
        if (wx.createInterstitialAd) {
          interstitialAd = wx.createInterstitialAd({
            adUnitId: args.adUnitId
          });
          interstitialAd.onError(function(res) {
            console.log("gridAd: onError", res);
            GhysX.handler.emit("send_event", {
              key: "\u521b\u5efa\u63d2\u5c4f\u5e7f\u544a\u5931\u8d25",
              value: {
                adUnitId: args.adUnitId
              }
            });
          });
        }
        if (interstitialAd) {
          interstitialAd.show().catch(function(err) {
            console.error(err);
          });
          wx.__interstitialAd = interstitialAd;
          GhysX.handler.emit("send_event", {
            key: "\u521b\u5efa\u63d2\u5c4f\u5e7f\u544a",
            value: {
              adUnitId: args.adUnitId
            }
          });
        }
      });
      GhysX.handler.on("create_grid_ad", function(args) {
        var systemInfoSync = wx.getSystemInfoSync();
        var pixelRatio = systemInfoSync.pixelRatio;
        var screenWidth = systemInfoSync.screenWidth;
        var screenHeight = systemInfoSync.screenHeight;
        var modeWidth = 50;
        var modeHeight = 0;
        if (screenWidth >= 411) {
          modeWidth = 40;
          modeHeight = 130;
        } else if (screenWidth >= 375) {
          if (screenHeight >= 812) {
            modeWidth = 0;
            modeHeight = 144;
          } else if (screenHeight >= 667) {
            modeWidth = 40;
            modeHeight = 116;
          }
        } else if (screenWidth >= 360) {
          modeWidth = 35;
          modeHeight = 113;
        } else if (screenWidth <= 320) {
          modeWidth = 40;
          modeHeight = 100;
        }
        var _left = screenWidth / 1;
        var _top = 0;
        pixelRatio > 2 && (_top = 56);
        var gridAd = wx.createGridAd({
          adUnitId: args.adUnitId,
          adTheme: "white",
          gridCount: 5,
          style: {
            left: _left,
            top: _top,
            width: screenWidth,
            opacity: .8
          }
        });
        gridAd.onError(function(res) {
          console.log("gridAd: onError", res);
          GhysX.handler.emit("send_event", {
            key: "\u521b\u5efa\u683c\u5b50\u5e7f\u544a\u5931\u8d25",
            value: {
              adUnitId: args.adUnitId
            }
          });
        });
        gridAd.show();
        wx.__gridAd = gridAd;
        GhysX.handler.emit("send_event", {
          key: "\u521b\u5efa\u683c\u5b50\u5e7f\u544a",
          value: {
            adUnitId: args.adUnitId
          }
        });
      });
      GhysX.handler.on("hide_grid_ad", function(args) {
        wx.__gridAd && wx.__gridAd.hide();
      });
      GhysX.handler.on("set_user_cloud_storage", function(args) {
        wx.setUserCloudStorage({
          KVDataList: args.kvdata,
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
      GhysX.handler.on("get_user_cloud_storage", function(args) {
        wx.setUserCloudStorage({
          KVDataList: args.kvlist,
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
      GhysX.handler.on("get_friend_cloud_storage", function(args) {
        wx.getFriendCloudStorage({
          KVDataList: args.kvlist,
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
      GhysX.handler.on("get_friend_cloud_storage", function(args) {
        wx.getFriendCloudStorage({
          KVDataList: args.kvlist,
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
      GhysX.handler.on("get_group_cloud_storage", function(args) {
        wx.getGroupCloudStorage({
          shareTicket: args.shareTicket,
          KVDataList: args.kvlist,
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
      GhysX.handler.on("post_message", function(args) {
        OpenDataContext.postMessage(args.message);
      });
      GhysX.handler.on("exit", function(args) {
        wx.exitMiniProgram({
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
      GhysX.handler.on("gc", function(args) {
        wx.triggerGC();
      });
      wx.onHide(function(res) {
        wx.__pause_begin_time = new Date().getTime();
        cc.director.pause();
      });
      wx.onShow(function(res) {
        wx.__pause_interval_time = new Date().getTime() - wx.__pause_begin_time;
        GhysX.handler.emit("share_back", res);
        GhysX.handler.emit("resume_game", res);
        console.log("===============>\u4e3b\u52a8\u62c9\u8d77\u6e38\u620f\u6e32\u67d3\uff01");
        console.log(res);
        cc.director.resume();
        GhysX.handler.emit("reconnection");
      });
      wx.onError(function(res) {
        console.log("\u6355\u83b7\u5168\u5c40\u9519\u8bef\u4fe1\u606f", res);
        if (res && "string" === typeof res && res.indexOf("writeFileSync") > -1) {
          console.log("\u91ca\u653e\u7f13\u5b58\u6587\u4ef6");
          GhysX.handler.emit("clean_assets");
        }
      });
      console._error = console.error;
      console.error = function(params) {
        if (params && "string" === typeof params && params.indexOf("writeFileSync") > -1) {
          console.log("\u91ca\u653e\u7f13\u5b58\u6587\u4ef6");
          GhysX.handler.emit("clean_assets");
        }
        console._error(params);
      };
      wx.showShareMenu({
        withShareTicket: true
      });
      wx.aldOnShareAppMessage(function(res) {
        var share_info = GhysX.assets.data.share.default[GhysX.modules.unit.random(0, GhysX.assets.data.share.default.length - 1)];
        var args = {
          title: share_info.title,
          imageUrl: share_info.imageUrl,
          imageUrlId: share_info.imageUrlId,
          query: "default=1"
        };
        GhysX.handler.emit("send_event", {
          key: "\u5206\u4eab",
          value: args
        });
        return args;
      });
      GhysX.handler.on("send_event", function(args) {
        try {
          cc.log(args);
          wx.aldSendEvent(args.key, args.value);
        } catch (error) {
          cc.log(error);
        }
      });
      GhysX.handler.on("send_uniqueness_event", function(args) {
        try {
          var uniqueness_event = cc.sys.localStorage.getItem(args.key);
          if (!uniqueness_event) {
            cc.sys.localStorage.setItem(args.key, "1");
            wx.aldSendEvent(args.key, args.value);
          }
        } catch (error) {
          cc.log(error);
        }
      });
      GhysX.handler.emit("send_event", {
        key: "\u542f\u52a8\u6e38\u620f",
        value: {
          platform: "wxgame",
          time: new Date().getTime()
        }
      });
      wx.__show = false;
      setTimeout(function() {
        GhysX.handler.emit("create_banner", {});
      }, 3e4);
      GhysX.handler.on("wx_pay", function(args) {
        if (!args || !args.app_id || !args.packageS) {
          console.error("\u53d1\u8d77\u5fae\u4fe1\u652f\u4ed8\u7f3a\u5c11\u5fc5\u8981\u7684\u53c2\u6570");
          return;
        }
        var app_id = void 0;
        var timeStamp = void 0;
        var nonecStr = void 0;
        var packageS = void 0;
        var signType = void 0;
        var paySign = void 0;
        if (args.server) {
          app_id = args.app_id;
          timeStamp = args.timeStamp;
          nonecStr = args.nonecStr;
          packageS = args.packageS;
          signType = args.signType;
          paySign = args.paySign;
        } else {
          app_id = String(args.app_id);
          timeStamp = String(Math.floor(new Date().getTime() / 1e3));
          nonecStr = randomNonceStr();
          packageS = String(args.packageS);
          signType = "MD5";
          paySign = CryptoJS.MD5("app_id=" + app_id + "&nonecStr=" + nonecStr + "&package=" + packages + "&signType=" + signType + "&timeStamp=" + timeStamp).toString().toUpperCase();
        }
        wx.requestPayment({
          timeStamp: timeStamp,
          nonecStr: nonecStr,
          package: packageS,
          signType: signType,
          paySign: paySign,
          success: function success() {},
          fail: function fail(error) {
            console.error("==============>\u8c03\u7528\u5fae\u4fe1\u652f\u4ed8\u63a5\u53e3\u5931\u8d25\uff1a\r\n", error, "\r\n==============>");
          },
          complete: function complete() {}
        });
      });
      GhysX.handler.on("wx_mi_pay", function(args) {
        wx.requestMidasPayment({
          mode: "game",
          env: cc.m.res.config.wx_mi_pay_env,
          offerId: "1450019246",
          currencyType: "CNY",
          platform: "android",
          buyQuantity: 10 * Number(args.rmb_number),
          zoneId: "1",
          success: function success(res) {
            if ("undefined" === typeof args.consumType || "chongzhi" === args.consumType) {
              var responseGetServerListCallback = function responseGetServerListCallback(res) {
                console.log("======>\u540e\u53f0\u6536\u5230\u524d\u7aef\u4ed8\u6b3e\u6210\u529f\u901a\u77e5");
              };
              protocol_command.vali_top_up_order_number.param_list = args.user_id + "\r\n" + args.recharge_id + "\r\n" + args.platform_id + "\r\n" + args.pay_id;
              NetworkManager.register(protocol_command.vali_top_up_order_number.code, null, null, null, instance, responseGetServerListCallback, false, null);
            }
          },
          fail: function fail(error) {
            console.error("==============>\u8c03\u7528\u5fae\u4fe1\u7c73\u5927\u5e08\u865a\u62df\u652f\u4ed8\u63a5\u53e3\u5931\u8d25\uff1a\r\n", error, "\r\n==============>");
          },
          complete: function complete() {}
        });
      });
      GhysX.handler.on("weixin_official_balance_look_up", function(args) {
        var order_number = args.order_number;
        var order_event = args.order_event || "";
        cc.m.net.http.post(cc.m.net.protocol._pack("vali_top_up_order_number", cc.m.db.user_info.role_id, order_number, "wxmidas", "android", "1450020360", GhysX.platform.info.code, order_event), function() {
          0 === cc.m.db.wx_pay_state && GhysX.handler.emit("weixin_official_recharge", args);
        }, function() {});
      });
      GhysX.handler.on("weixin_official_recharge", function(args) {
        var server_number = args.server_number;
        var order_money = args.order_money;
        wx.requestMidasPayment({
          mode: "game",
          env: cc.m.res.config.wx_mi_pay_env,
          offerId: "1450020360",
          currencyType: "CNY",
          platform: "android",
          buyQuantity: 100 * Number(order_money),
          zoneId: "1",
          success: function success(res) {
            GhysX.handler.emit("weixin_official_balance_look_up", args);
          },
          fail: function fail(error) {
            console.error("==============>\u8c03\u7528\u5fae\u4fe1\u7c73\u5927\u5e08\u865a\u62df\u652f\u4ed8\u63a5\u53e3\u5931\u8d25\uff1a\r\n", error, "\r\n==============>");
          },
          complete: function complete() {}
        });
      });
      GhysX.handler.on("recharge", function(args) {
        if ("android" === getSystemInfoSync.platform && cc.m.res.config.android_official_recharge) {
          GhysX.handler.emit("weixin_official_balance_look_up", args);
          return;
        }
        args.order_money = 100 * args.order_money;
        var fileSystemManager = wx.getFileSystemManager();
        fileSystemManager.readFile({
          filePath: "app-config.json",
          encoding: "utf-8",
          success: function success(fileData) {
            var data = JSON.parse(fileData.data);
            var appIdList = "";
            for (var key in data.navigateToMiniProgramAppIdList) {
              appIdList.length > 0 && (appIdList += ",");
              appIdList += data.navigateToMiniProgramAppIdList[key];
            }
            var param_list = "game_appid=wxappid&game_openid=" + GhysX.platform.info.code + "&limit=" + cc.m.db.user_info.t9 + "&h5limit=" + cc.m.db.user_info.t9 + "&appidList=" + appIdList;
            console.log(param_list);
            cc.m.net.http.request("https://mprogram.boomegg.cn/wxpay/paycheck", param_list, "application/x-www-form-urlencoded", "POST", null, null, function(res) {
              res = JSON.parse(res);
              console.log(res);
              if (0 == res.ret) {
                var param_list1 = "game_appid=wxappid&game_openid=" + GhysX.platform.info.code + "&price=" + args.order_money + "&limit=" + cc.m.db.user_info.t9 + "&h5limit=" + cc.m.db.user_info.t9 + "&appidList=" + appIdList;
                console.log(param_list1);
                cc.m.net.http.request("https://mprogram.boomegg.cn/wxpay/paymethod", param_list1, "application/x-www-form-urlencoded", "POST", null, null, function(res) {
                  res = JSON.parse(res);
                  console.log(res);
                  0 == res.ret && (1 == res.data.pay_method ? GhysX.handler.emit("weixin_recharge", args) : 2 == res.data.pay_method && GhysX.handler.emit("weixin_customer", args));
                }, function(res) {
                  cc.log(res);
                }, null);
              } else GhysX.handler.emit("home_button_recharge_tip");
            }, function(res) {
              cc.log(res);
            }, null);
          },
          complete: function complete(compRes) {}
        });
      });
      GhysX.handler.on("init_recharge", function(args) {
        var fileSystemManager = wx.getFileSystemManager();
        fileSystemManager.readFile({
          filePath: "app-config.json",
          encoding: "utf-8",
          success: function success(fileData) {
            var data = JSON.parse(fileData.data);
            var appIdList = "";
            for (var key in data.navigateToMiniProgramAppIdList) {
              appIdList.length > 0 && (appIdList += ",");
              appIdList += data.navigateToMiniProgramAppIdList[key];
            }
            var param_list = "game_appid=wxappid&game_openid=" + GhysX.platform.info.code + "&limit=" + cc.m.db.user_info.t9 + "&h5limit=" + cc.m.db.user_info.t9 + "&appidList=" + appIdList;
            console.log(param_list);
            cc.m.net.http.request("https://mprogram.boomegg.cn/wxpay/paycheck", param_list, "application/x-www-form-urlencoded", "POST", null, null, function(res) {
              res = JSON.parse(res);
              console.log(res);
              0 == res.ret ? cc.m.db.cache.open_recharge = true : cc.m.db.cache.open_recharge = false;
              console.log(cc.m.db.cache.open_recharge);
              GhysX.handler.emit("start_game");
            }, function(res) {
              cc.m.db.cache.open_recharge = false;
              GhysX.handler.emit("start_game");
            }, null);
          },
          complete: function complete(compRes) {}
        });
      });
      GhysX.handler.on("weixin_recharge", function(args) {
        var server_number = args.server_number;
        var order_number = args.order_number;
        var order_money = args.order_money;
        var goods_name = args.goods_name;
        var goods_desc = args.goods_desc;
        var order_event = args.order_event || "";
        wx.navigateToMiniProgram({
          appId: "wx4b6881e66a11e691",
          path: "pages/index/index",
          extraData: {
            appid: "wxappid",
            openid: GhysX.platform.info.code,
            orderid: order_number,
            amount: order_money,
            params: server_number + "_" + order_number + "|" + order_event,
            orderTitle: "" + goods_name,
            orderDesc: "" + goods_desc
          }
        });
      });
      GhysX.handler.on("refresh_open_recharge", function(args) {
        var fileSystemManager = wx.getFileSystemManager();
        fileSystemManager.readFile({
          filePath: "app-config.json",
          encoding: "utf-8",
          success: function success(fileData) {
            var data = JSON.parse(fileData.data);
            var appIdList = "";
            for (var key in data.navigateToMiniProgramAppIdList) {
              appIdList.length > 0 && (appIdList += ",");
              appIdList += data.navigateToMiniProgramAppIdList[key];
            }
            var param_list = "game_appid=wxappid&game_openid=" + GhysX.platform.info.code + "&limit=" + cc.m.db.user_info.t9 + "&h5limit=" + cc.m.db.user_info.t9 + "&appidList=" + appIdList;
            console.log(param_list);
            cc.m.net.http.request("https://mprogram.boomegg.cn/wxpay/paycheck", param_list, "application/x-www-form-urlencoded", "POST", null, null, function(res) {
              res = JSON.parse(res);
              console.log(res);
              if (0 == res.ret) {
                cc.m.db.cache.open_recharge = true;
                GhysX.handler.emit("listener_activity_add_event");
                GhysX.handler.emit("home_player_info_update_draw_player_info_t9");
              } else cc.m.db.cache.open_recharge = false;
              console.log(cc.m.db.cache.open_recharge);
            }, function(res) {
              cc.m.db.cache.open_recharge = false;
            }, null);
          },
          complete: function complete(compRes) {}
        });
      });
      GhysX.handler.on("weixin_customer", function(args) {
        var server_number = args.server_number;
        var order_number = args.order_number;
        var order_mould_id = args.order_mould_id;
        var order_money = args.order_money;
        var goods_name = args.goods_name;
        var goods_desc = args.goods_desc;
        var order_event = args.order_event || "";
        wx.openCustomerServiceConversation({
          sessionFrom: server_number + "_" + goods_name + "_" + goods_desc + "_" + order_mould_id + "_" + order_money + "|" + order_event,
          showMessageCard: true,
          sendMessageTitle: "\u5145\u503c",
          sendMessagePath: "/pages/index/index",
          sendMessageImg: "http://ad-static.boomegg.cn/doc/csmsg.png",
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
      GhysX.handler.on("customer", function(args) {
        wx.openCustomerServiceConversation({
          sessionFrom: "",
          showMessageCard: false,
          sendMessageTitle: "",
          sendMessagePath: "",
          sendMessageImg: "",
          success: function success(res) {},
          fail: function fail(res) {},
          complete: function complete(res) {}
        });
      });
    }
    module.exports = {
      initWeiXinPlatform: __initWeiXinPlatform
    };
    cc._RF.pop();
  }, {
    "./ald/ald-game.js": "ald-game",
    Utils: "Utils"
  } ],
  about_dialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d535cGe3u5Mb7Pwe5mqsS6R", "about_dialog");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var about_dialog = function(_super) {
      __extends(about_dialog, _super);
      function about_dialog() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      about_dialog.prototype.start = function() {};
      about_dialog = __decorate([ ccclass ], about_dialog);
      return about_dialog;
    }(cc.Component);
    exports.default = about_dialog;
    cc._RF.pop();
  }, {} ],
  "ald-game-conf": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "896bfmB19dIqaUNVMDR7yOn", "ald-game-conf");
    "use strict";
    exports.app_key = "152e47e2e86cc5d23aa086dce1beb581";
    exports.getLocation = false;
    exports.useOpen = false;
    exports.openKey = "";
    cc._RF.pop();
  }, {} ],
  "ald-game": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0442nmjOxKdouaBpJ1gOW6", "ald-game");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var __initialize = function __initialize() {
      !function() {
        function e() {
          this.request = [], this.push = function(e) {
            this.request.length >= 18 ? (this.request.shift(), this.request.push(e)) : this.request.push(e);
          }, this.concat = function() {
            this.request.map(function(e) {
              wx.Queue.push(e);
            }), this.request = [];
          };
        }
        function t() {
          var e = "";
          try {
            e = wx.getStorageSync("aldstat_op");
          } catch (t) {
            e = wx.getStorageSync("aldstat_op");
          }
          if ("" === e) {
            if ("" === y) return "";
            try {
              b = e = wx.getStorageSync(y), e && wx.setStorageSync("aldstat_op", e);
            } catch (t) {
              b = e = wx.getStorageSync(y), e && wx.setStorageSync("aldstat_op", e);
            }
          }
          return e;
        }
        function n() {
          function e(e) {
            return !/^\d+(.\d+)*$/.test(e.stageId) || e.stageId.length > 32 || isNaN(Number(e.stageId)) ? (console.warn("\u5173\u5361stageId\u5fc5\u987b\u7b26\u5408\u4f20\u53c2\u89c4\u5219,\u8bf7\u53c2\u8003\u6587\u6863\u3002"), 
            !1) : !("string" !== u(e.stageName) || e.stageName.length > 32) || (console.warn("\u5173\u5361\u540d\u79f0\u4e3a\u5fc5\u4f20\u5b57\u6bb5,\u4e14\u957f\u5ea6\u5c0f\u4e8e32\u4e2a\u5b57\u7b26,\u8bf7\u53c2\u8003\u6587\u6863"), 
            !1);
          }
          var t = "", n = "", r = 0;
          this.onStart = function(a) {
            if (e(a)) {
              var s = {};
              r = Date.now(), s.sid = a.stageId, s.snm = a.stageName, ("string" === u(a.userId) && a.userId) < 32 ? s.uid = a.userId : s.uid = "", 
              s.state = "start", n = d(), t = s, this.request();
            }
          }, this.onRunning = function(n) {
            if (e(n)) {
              var r = {
                params: {}
              };
              if (("string" === u(n.userId) && n.userId) < 32 ? r.uid = n.userId : r.uid = "", 
              "string" !== u(n.event) && -1 === Q.join(",").indexOf(n.event + ",")) return void console.warn("\u5173\u5361running\u72b6\u6001\u4e2d\u4ec5\u652f\u6301" + Q.join(",") + "\u4e8b\u4ef6\u7c7b\u578b\uff0c\u4e14\u4e3a\u5fc5\u4f20\u5b57\u6bb5\uff0c\u8be6\u60c5\u8bf7\u53c2\u8003\u6587\u6863\u3002");
              if (r.event = n.event, "object" !== u(n.params)) return void console.warn("\u5173\u5361running\u72b6\u6001\u4e2dparams\u4e3a\u5fc5\u4f20\u5b57\u6bb5\uff0c\u4e14\u8be5\u5b57\u6bb5\u9700\u4e3aObject\u7c7b\u578b\uff0c\u8be6\u60c5\u8bf7\u53c2\u8003\u6587\u6863\u3002");
              if ("string" !== u(n.params.itemName) || n.params.itemName.length > 32) return void console.warn("\u9053\u5177/\u5546\u54c1\u540d\u79f0\u4e3a\u5fc5\u4f20\u5b57\u6bb5\uff0c\u4e14\u957f\u5ea6\u5c0f\u4e8e32\u4e2a\u5b57\u7b26\uff0c\u8be6\u60c5\u8bf7\u53c2\u8003\u6587\u6863");
              r.params.itnm = n.params.itemName, "string" === u(n.params.itemId) && n.params.itemId.length < 32 && (r.params.itid = n.params.itemId), 
              "number" === u(n.params.itemCount) && toString(n.params.itemCount).length < 32 ? r.params.itco = n.params.itemCount : r.params.itco = 1, 
              -1 !== n.event.indexOf("pay") && ("number" === u(n.params.itemMoney) && toString(n.params.itemMoney).length < 32 ? r.params.money = n.params.itemMoney : r.params.money = 0), 
              "string" === u(n.params.desc) && n.params.desc.length < 64 && (r.params.desc = n.params.desc), 
              r.state = "running", r.sid = n.stageId, r.snm = n.stageName, t = r, this.request();
            }
          }, this.onEnd = function(n) {
            if (e(n)) {
              var a = {};
              if (a.state = "end", ("string" === u(n.userId) && n.userId) < 32 ? a.uid = n.userId : a.uid = "", 
              !u(n.event) && -1 !== F.join(",").indexOf(n.event + ",")) return void F.join(",");
              a.sid = n.stageId, a.snm = n.stageName, a.event = n.event, a.sdr = 0 !== r ? Date.now() - r : "", 
              a.params = {}, "object" === u(n.params) && "string" === u(n.params.desc) && n.params.desc.length < 64 && (a.params.desc = n.params.desc), 
              t = a, this.request();
            }
          }, this.request = function() {
            var e = g(I);
            t.ss = n, e.ct = t, f(e, "screen");
          };
        }
        function r() {
          function e(e) {
            return !/^\d+(.\d+)*$/.test(e.levelId) || e.levelId.length > 32 || isNaN(Number(e.levelId)) ? (console.warn("levelId\u5fc5\u987b\u7b26\u5408\u4f20\u53c2\u89c4\u5219,\u8bf7\u53c2\u8003\u6587\u6863\u3002"), 
            !1) : !("string" !== u(e.levelName) || e.levelName.length > 32) || (console.warn("levelName\u4e3a\u5fc5\u4f20\u5b57\u6bb5,\u4e14\u957f\u5ea6\u5c0f\u4e8e32\u4e2a\u5b57\u7b26,\u8bf7\u53c2\u8003\u6587\u6863"), 
            !1);
          }
          var t = "", n = "", r = 0;
          this.onInitLevel = function(r) {
            if (e(r)) {
              var a = {};
              "" == H ? (n = d(), wx.setStorageSync("ald_level_session", n)) : n = H, a.lid = r.levelId, 
              a.lnm = r.levelName, ("string" === u(r.userId) && r.userId) < 32 ? a.uid = r.userId : a.uid = "", 
              a.un = r.userName, a.state = "init", t = a, this.request();
            }
          }, this.onSetLevel = function(a) {
            if (e(a)) {
              var s = {};
              n = d(), wx.setStorageSync("ald_level_session", n), s.lid = a.levelId, s.lnm = a.levelName, 
              ("string" === u(a.userId) && a.userId) < 32 ? s.uid = a.userId : s.uid = "", s.un = a.userName, 
              s.state = "set", s.tmr = 0 !== U ? Date.now() - U : "", r = Date.now(), wx.setStorageSync("ald_level_time", r), 
              t = s, this.request();
            }
          }, this.onPaySuccess = function(n) {
            if (e(n)) {
              var r = {
                params: {}
              };
              if ("object" !== u(n.params)) return void console.warn("\u5173\u5361paySuccess\u72b6\u6001\u4e2dparams\u4e3a\u5fc5\u4f20\u5b57\u6bb5\uff0c\u4e14\u8be5\u5b57\u6bb5\u9700\u4e3aObject\u7c7b\u578b\uff0c\u8be6\u60c5\u8bf7\u53c2\u8003\u6587\u6863\u3002");
              "number" === u(n.params.amount) && toString(n.params.amount).length < 32 ? r.params.am = n.params.amount : r.params.am = 0, 
              "string" === u(n.params.desc) && n.params.desc.length < 64 && (r.params.desc = n.params.desc), 
              r.lid = n.levelId, r.lnm = n.levelName, ("string" === u(n.userId) && n.userId) < 32 ? r.uid = n.userId : r.uid = "", 
              r.un = n.userName, r.state = "paySuccess", t = r, this.request();
            }
          }, this.onPayFail = function(n) {
            if (e(n)) {
              var r = {
                params: {}
              };
              if ("object" !== u(n.params)) return void console.warn("\u5173\u5361payFile\u72b6\u6001\u4e2dparams\u4e3a\u5fc5\u4f20\u5b57\u6bb5\uff0c\u4e14\u8be5\u5b57\u6bb5\u9700\u4e3aObject\u7c7b\u578b\uff0c\u8be6\u60c5\u8bf7\u53c2\u8003\u6587\u6863\u3002");
              "number" === u(n.params.amount) && toString(n.params.amount).length < 32 ? r.params.am = n.params.amount : r.params.am = 0, 
              "string" === u(n.params.desc) && n.params.desc.length < 64 && (r.params.desc = n.params.desc), 
              r.lid = n.levelId, r.lnm = n.levelName, ("string" === u(n.userId) && n.userId) < 32 ? r.uid = n.userId : r.uid = "", 
              r.un = n.userName, r.state = "payFail", t = r, this.request();
            }
          }, this.request = function() {
            var e = g(I);
            t.ls = n, e.ct = t, f(e, "level");
          };
        }
        function a() {
          return new Promise(function(e, t) {
            wx.getSetting({
              success: function success(t) {
                t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                  success: function success(t) {
                    C = h(t.userInfo.avatarUrl.split("/")), e(t);
                  },
                  fail: function fail() {
                    e("");
                  }
                }) : e("");
              },
              fail: function fail() {
                e("");
              }
            });
          });
        }
        function s() {
          return new Promise(function(e, t) {
            wx.getNetworkType({
              success: function success(t) {
                e(t);
              },
              fail: function fail() {
                e("");
              }
            });
          });
        }
        function i() {
          return new Promise(function(e, t) {
            "1044" == j.scene ? wx.getShareInfo({
              shareTicket: j.shareTicket,
              success: function success(t) {
                e(t);
              },
              fail: function fail() {
                e("");
              }
            }) : e("");
          });
        }
        function o() {
          return new Promise(function(e, t) {
            w.getLocation ? wx.getLocation({
              success: function success(t) {
                e(t);
              },
              fail: function fail() {
                e("");
              }
            }) : wx.getSetting({
              success: function success(t) {
                t.authSetting["scope.userLocation"] ? (wx.getLocation({
                  success: function success(t) {
                    e(t);
                  },
                  fail: function fail() {
                    e("");
                  }
                }), e("")) : e("");
              },
              fail: function fail() {
                e("");
              }
            });
          });
        }
        function u(e) {
          function t(e) {
            return Object.prototype.toString.call(e);
          }
          var n = {};
          return "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(e, t) {
            n["[object " + e + "]"] = e.toLowerCase();
          }), function() {
            return null == e ? e : "object" == ("undefined" === typeof e ? "undefined" : _typeof(e)) || "function" == typeof e ? n[t.call(e)] || "object" : "undefined" === typeof e ? "undefined" : _typeof(e);
          }();
        }
        function c(e) {
          for (var t in e) if ("object" == _typeof(e[t]) && null !== e[t]) return !0;
          return !1;
        }
        function d() {
          function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
          }
          return e() + e() + e() + e() + e() + e() + e() + e();
        }
        function l() {
          this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;
          var e = this;
          this.push = function(t) {
            this.tasks.push(new Promise(function(n, r) {
              var a = function a() {
                e.activeCount++, t().then(function(e) {
                  n(e);
                }).then(function() {
                  e.next();
                });
              };
              e.activeCount < e.concurrency ? a() : e.queue.push(a);
            }));
          }, this.all = function() {
            return Promise.all(this.tasks);
          }, this.next = function() {
            e.activeCount--, e.queue.length > 0 && e.queue.shift()();
          };
        }
        function f(e, n) {
          function r() {
            return new Promise(function(t, n) {
              wx.request({
                url: "https://" + v + ".aldwx.com/d.html",
                data: e,
                header: {
                  se: q || "",
                  op: b || "",
                  img: C || ""
                },
                method: "GET",
                fail: function fail() {
                  t("");
                },
                success: function success(e) {
                  t(200 == e.statusCode ? "" : "status error");
                }
              });
            });
          }
          w.useOpen && t(), O++, e.as = D, e.at = M, e.rq_c = O, e.ifo = _, e.ak = w.app_key, 
          e.uu = x, e.v = m, e.st = Date.now(), e.ev = n, e.te = S, e.wsr = j, "" !== p(e.ufo) && (e.ufo = e.ufo), 
          e.ec = N, w.useOpen ? "" === b ? K.push(r) : (wx.Queue.push(r), K.concat()) : wx.Queue.push(r);
        }
        function p(e) {
          if (void 0 === e || "" === e) return "";
          var t = {};
          for (var n in e) "rawData" != n && "errMsg" != n && (t[n] = e[n]);
          return t;
        }
        function g(e) {
          var t = {};
          for (var n in e) t[n] = e[n];
          return t;
        }
        function h(e) {
          for (var t = "", n = 0; n < e.length; n++) e[n].length > t.length && (t = e[n]);
          return t;
        }
        var m = "3.2.0", v = "glog", w = require("./ald-game-conf");
        "" === w.app_key && console.error("\u8bf7\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u586b\u5199\u60a8\u7684app_key"), 
        w.useOpen && console.warn("\u63d0\u793a\uff1a\u5f00\u542f\u4e86useOpen\u914d\u7f6e\u540e\uff0c\u5982\u679c\u4e0d\u4e0a\u4f20\u7528\u6237opendId\u5219\u4e0d\u4f1a\u4e0a\u62a5\u6570\u636e\u3002"), 
        w.app_key = w.app_key.replace(/\s/g, "");
        var y = w.openKey, S = "wg";
        !function() {
          wx.request({
            url: "https://" + v + ".aldwx.com/config/app.json",
            method: "GET",
            success: function success(e) {
              200 === e.statusCode && (e.data.version > m && console.warn("\u60a8\u7684SDK\u4e0d\u662f\u6700\u65b0\u7248\u672c\uff0c\u8bf7\u5c3d\u5feb\u5347\u7ea7\uff01"), 
              e.data.warn && console.warn(e.data.warn), e.data.error && console.error(e.data.error));
            }
          });
        }();
        var _ = "", x = function() {
          var e = "";
          try {
            e = wx.getStorageSync("aldstat_uuid"), wx.setStorageSync("ald_ifo", !0);
          } catch (t) {
            e = "uuid_getstoragesync";
          }
          if (e) _ = !1; else {
            e = d(), _ = !0;
            try {
              wx.setStorageSync("aldstat_uuid", e);
            } catch (e) {
              wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");
            }
          }
          return e;
        }(), I = {}, q = "", b = t(), N = 0, O = "", j = wx.getLaunchOptionsSync(), k = Date.now(), M = "" + Date.now() + Math.floor(1e7 * Math.random()), D = "" + Date.now() + Math.floor(1e7 * Math.random()), L = 0, P = "", C = "", E = !0, A = !1, T = [ "aldSendEvent", "aldOnShareAppMessage", "aldShareAppMessage", "aldSendSession", "aldSendOpenid", "aldLevelEvent" ], Q = [ "payStart", "paySuccess", "payFail", "die", "revive", "tools", "award" ], F = [ "complete", "fail" ], U = wx.getStorageSync("ald_level_time") || 0, H = wx.getStorageSync("ald_level_session") || "";
        void 0 === wx.Queue && (wx.Queue = new l(), wx.Queue.all());
        var K = new e();
        (function() {
          return Promise.all([ a(), s(), o() ]);
        })().then(function(e) {
          "" !== e[2] ? (I.lat = e[2].latitude || "", I.lng = e[2].longitude || "", I.spd = e[2].speed || "") : (I.lat = "", 
          I.lng = "", I.spd = ""), "" !== e[1] ? I.nt = e[1].networkType || "" : I.nt = "";
          var t = g(I);
          "" !== e[0] && (t.ufo = e[0], P = e[0]), f(t, "init");
        }), wx.onShow(function(e) {
          if (j = e, L = Date.now(), !E && !A) {
            M = "" + Date.now() + Math.floor(1e7 * Math.random()), _ = !1;
            try {
              wx.setStorageSync("ald_ifo", !1);
            } catch (e) {}
          }
          E = !1, A = !1;
          var t = g(I), n = g(I);
          t.sm = L - k, e.query.ald_share_src && e.shareTicket && "1044" === e.scene ? (n.tp = "ald_share_click", 
          i().then(function(e) {
            n.ct = e, f(n, "event");
          })) : e.query.ald_share_src && (n.tp = "ald_share_click", n.ct = "1", f(n, "event")), 
          f(t, "show");
        }), wx.onHide(function() {
          wx.setStorageSync("ald_level_session", "");
          var e = g(I);
          e.dr = Date.now() - L, "" === P ? wx.getSetting({
            success: function success(t) {
              t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                success: function success(t) {
                  e.ufo = t, P = t, C = h(t.userInfo.avatarUrl.split("/")), f(e, "hide");
                }
              }) : f(e, "hide");
            }
          }) : f(e, "hide");
        }), wx.onError(function(e) {
          var t = g(I);
          t.tp = "ald_error_message", t.ct = e, N++, f(t, "event");
        });
        var R = {
          aldSendEvent: function aldSendEvent(e, t) {
            var n = g(I);
            if ("" !== e && "string" == typeof e && e.length <= 255) if (n.tp = e, "string" == typeof t && t.length <= 255) n.ct = String(t), 
            f(n, "event"); else if ("object" == ("undefined" === typeof t ? "undefined" : _typeof(t))) {
              if (JSON.stringify(t).length >= 255) return void console.error("\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u53c2\u6570\u4e0d\u80fd\u8d85\u8fc7255\u4e2a\u5b57\u7b26");
              if (c(t)) return void console.error("\u4e8b\u4ef6\u53c2\u6570\uff0c\u53c2\u6570\u5185\u90e8\u53ea\u652f\u6301Number,String\u7b49\u7c7b\u578b\uff0c\u8bf7\u53c2\u8003\u63a5\u5165\u6587\u6863");
              for (var r in t) "number" == typeof t[r] && (t[r] = t[r] + "s##");
              n.ct = JSON.stringify(t), f(n, "event");
            } else void 0 === t || "" === t ? f(n, "event") : console.error("\u4e8b\u4ef6\u53c2\u6570\u5fc5\u987b\u4e3aString,Object\u7c7b\u578b,\u4e14\u53c2\u6570\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7255\u4e2a\u5b57\u7b26"); else console.error("\u4e8b\u4ef6\u540d\u79f0\u5fc5\u987b\u4e3aString\u7c7b\u578b\u4e14\u4e0d\u80fd\u8d85\u8fc7255\u4e2a\u5b57\u7b26");
          },
          aldOnShareAppMessage: function aldOnShareAppMessage(e) {
            wx.onShareAppMessage(function() {
              A = !0;
              var t = e(), n = "";
              n = void 0 !== j.query.ald_share_src ? void 0 !== t.query ? (j.query.ald_share_src.indexOf(x), 
              t.query + "&ald_share_src=" + j.query.ald_share_src + "," + x) : (j.query.ald_share_src.indexOf(x), 
              "ald_share_src=" + j.query.ald_share_src + "," + x) : void 0 !== t.query ? t.query + "&ald_share_src=" + x : "ald_share_src=" + x, 
              "undefined" != u(t.ald_desc) && (n += "&ald_desc=" + t.ald_desc), t.query = n;
              var r = g(I);
              return r.ct = t, r.ct.sho = 1, r.tp = "ald_share_chain", f(r, "event"), t;
            });
          },
          aldShareAppMessage: function aldShareAppMessage(e) {
            A = !0;
            var t = e, n = "";
            n = void 0 !== j.query.ald_share_src ? void 0 !== t.query ? (j.query.ald_share_src.indexOf(x), 
            t.query + "&ald_share_src=" + j.query.ald_share_src + "," + x) : (j.query.ald_share_src.indexOf(x), 
            "ald_share_src=" + j.query.ald_share_src + "," + x) : void 0 !== t.query ? t.query + "&ald_share_src=" + x : "ald_share_src=" + x;
            var r = g(I);
            "undefined" != u(t.ald_desc) && (n += "&ald_desc=" + t.ald_desc), t.query = n, r.ct = t, 
            r.tp = "ald_share_chain", f(r, "event"), wx.shareAppMessage(t);
          },
          aldSendSession: function aldSendSession(e) {
            if ("" === e || !e) return void console.error("\u8bf7\u4f20\u5165\u4ece\u540e\u53f0\u83b7\u53d6\u7684session_key");
            var t = g(I);
            t.tp = "session", t.ct = "session", q = e, "" === P ? wx.getSetting({
              success: function success(e) {
                e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                  success: function success(e) {
                    t.ufo = e, f(t, "event");
                  }
                }) : f(t, "event");
              }
            }) : (t.ufo = P, "" !== P && (t.gid = ""), f(t, "event"));
          },
          aldSendOpenid: function aldSendOpenid(e) {
            if ("" === e || !e) return void console.error("openID\u4e0d\u80fd\u4e3a\u7a7a");
            b = e, wx.setStorageSync("aldstat_op", "openid");
            var t = g(I);
            t.tp = "openid", t.ct = "openid", f(t, "event");
          }
        };
        wx.aldStage = new n(), wx.aldLevel = new r();
        for (var G = 0; G < T.length; G++) !function(e, t) {
          Object.defineProperty(wx, e, {
            value: t,
            writable: !1,
            enumerable: !0,
            configurable: !0
          });
        }(T[G], R[T[G]]);
        try {
          var J = wx.getSystemInfoSync();
          I.br = J.brand || "", I.md = J.model, I.pr = J.pixelRatio, I.sw = J.screenWidth, 
          I.sh = J.screenHeight, I.ww = J.windowWidth, I.wh = J.windowHeight, I.lang = J.language, 
          I.wv = J.version, I.sv = J.system, I.wvv = J.platform, I.fs = J.fontSizeSetting, 
          I.wsdk = J.SDKVersion, I.bh = J.benchmarkLevel || "", I.bt = J.battery || "", I.wf = J.wifiSignal || "", 
          I.lng = "", I.lat = "", I.nt = "", I.spd = "", I.ufo = "";
        } catch (e) {}
      }();
    };
    module.exports = {
      initialize: __initialize
    };
    cc._RF.pop();
  }, {
    "./ald-game-conf": "ald-game-conf"
  } ],
  background: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38bf7HayjNEArpbGA2uzxT8", "background");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var background = function(_super) {
      __extends(background, _super);
      function background() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.backgroundAnimation = null;
        return _this;
      }
      background.prototype.init = function() {};
      background.prototype.start = function() {};
      __decorate([ property({
        type: cc.Node,
        displayName: "\u80cc\u666f",
        tooltip: "\u80cc\u666f"
      }) ], background.prototype, "backgroundAnimation", void 0);
      background = __decorate([ ccclass ], background);
      return background;
    }(cc.Component);
    exports.default = background;
    cc._RF.pop();
  }, {} ],
  battle_pause: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "671374D4nZDzY8L2NlHIol2", "battle_pause");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var battle_pause = function(_super) {
      __extends(battle_pause, _super);
      function battle_pause() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      battle_pause.prototype.onClickShareButton = function(event, params) {
        GhysX_1.GhysX.handler.emit("share", {});
      };
      battle_pause.prototype.onClickExitButton = function(event, params) {};
      battle_pause.prototype.init = function() {};
      battle_pause.prototype.onLoad = function() {
        GhysX_1.GhysX.handler.emit("show_banner", {
          name: "\u6218\u6597\u6682\u505c\u754c\u9762 Banner",
          forced: true,
          adUnitId: "adunit-296dc29e08573227"
        });
        GhysX_1.GhysX.handler.emit("create_interstitial_ad", {
          name: "\u6218\u6597\u6682\u505c\u754c\u9762-\u63d2\u5c4f",
          adUnitId: "adunit-11916d5ff8fb319b"
        });
      };
      battle_pause.prototype.start = function() {};
      battle_pause = __decorate([ ccclass ], battle_pause);
      return battle_pause;
    }(cc.Component);
    exports.default = battle_pause;
    cc._RF.pop();
  }, {
    "../../libs/ghysx/GhysX": "GhysX"
  } ],
  battle_result: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65d1aIUu6BI8pXvVIag4B5i", "battle_result");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var battle_result = function(_super) {
      __extends(battle_result, _super);
      function battle_result() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.time = null;
        _this.score = null;
        _this.highest_score = null;
        return _this;
      }
      battle_result.prototype.onClickStartButton = function(event, params) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) if (GhysX_1.GhysX.local.stage_info.id <= GhysX_1.GhysX.db.cache.battle_info.id) if (GhysX_1.GhysX.db.cache.battle_info.id % 9 == 0) GhysX_1.GhysX.handler.emit("create_video", {
          adUnitId: "adunit-32a72c3327fadca2",
          success: function(res) {
            this.unlockNextStage();
            GhysX_1.GhysX.graphics.manager.close("battle_result");
            GhysX_1.GhysX.handler.emit("next_battle");
          }.bind(this),
          cancel: function(res) {}.bind(this),
          fail: function(res) {
            if (res && 1005 == res.errCode) {
              this.unlockNextStage();
              GhysX_1.GhysX.graphics.manager.close("battle_result");
              GhysX_1.GhysX.handler.emit("next_battle");
              GhysX_1.GhysX.graphics.draw({
                url: "prefabs/common/tip_message",
                mode: GhysX_1.GhysX.graphics.MODE.VIEW,
                order: GhysX_1.GhysX.graphics.ORDER.DIALOG,
                group_name: "active",
                script: "tip_message",
                invoke: "init",
                params: {
                  message: "\u5f53\u524d\u65e0\u89c6\u9891\u5e7f\u544a\uff01"
                },
                complete: function(params) {}
              });
            }
          }.bind(this)
        }); else if (GhysX_1.GhysX.local.stage_info.id % 3 == 0) GhysX_1.GhysX.handler.emit("create_video", {
          adUnitId: "adunit-70cc817cb8ec3c36",
          success: function(res) {
            this.unlockNextStage();
            GhysX_1.GhysX.graphics.manager.close("battle_result");
            GhysX_1.GhysX.handler.emit("next_battle");
          }.bind(this),
          cancel: function(res) {}.bind(this),
          fail: function(res) {
            if (res && 1005 == res.errCode) {
              this.unlockNextStage();
              GhysX_1.GhysX.graphics.manager.close("battle_result");
              GhysX_1.GhysX.handler.emit("next_battle");
              GhysX_1.GhysX.graphics.draw({
                url: "prefabs/common/tip_message",
                mode: GhysX_1.GhysX.graphics.MODE.VIEW,
                order: GhysX_1.GhysX.graphics.ORDER.DIALOG,
                group_name: "active",
                script: "tip_message",
                invoke: "init",
                params: {
                  message: "\u5f53\u524d\u65e0\u89c6\u9891\u5e7f\u544a\uff01"
                },
                complete: function(params) {}
              });
            }
          }.bind(this)
        }); else {
          this.unlockNextStage();
          GhysX_1.GhysX.graphics.manager.close("battle_result");
          GhysX_1.GhysX.handler.emit("next_battle");
        } else {
          this.unlockNextStage();
          GhysX_1.GhysX.graphics.manager.close("battle_result");
          GhysX_1.GhysX.handler.emit("next_battle");
        } else {
          this.unlockNextStage();
          GhysX_1.GhysX.graphics.manager.close("battle_result");
          GhysX_1.GhysX.handler.emit("next_battle");
        }
      };
      battle_result.prototype.onClickBackButton = function(event, params) {
        cc.sys.platform === cc.sys.WECHAT_GAME && GhysX_1.GhysX.local.stage_info.id <= GhysX_1.GhysX.db.cache.battle_info.id && (GhysX_1.GhysX.db.cache.battle_info.id % 9 == 0 || GhysX_1.GhysX.local.stage_info.id % 3 == 0) || this.unlockNextStage();
        GhysX_1.GhysX.handler.emit("exit_battle");
      };
      battle_result.prototype.onClickShareButton = function(event, params) {
        GhysX_1.GhysX.handler.emit("share", {});
      };
      battle_result.prototype.unlockNextStage = function() {
        cc.sys.localStorage.setItem("local", JSON.stringify(GhysX_1.GhysX.local));
      };
      battle_result.prototype.init = function() {};
      battle_result.prototype.onUpdateDraw = function() {
        GhysX_1.GhysX.db.cache.battle_info.end_time = new Date().getTime();
        var interval = GhysX_1.GhysX.db.cache.battle_info.end_time - GhysX_1.GhysX.db.cache.battle_info.start_time;
        GhysX_1.GhysX.db.cache.battle_info.interval = interval;
        GhysX_1.GhysX.local.stage_info.highest_score = Math.max(GhysX_1.GhysX.local.stage_info.highest_score, GhysX_1.GhysX.db.cache.battle_info.score);
        this.time.string = interval / 1e3 + "\u79d2";
        this.score.string = GhysX_1.GhysX.db.cache.battle_info.score;
        this.highest_score.string = GhysX_1.GhysX.local.stage_info.highest_score;
      };
      battle_result.prototype.onLoad = function() {
        cc.log("total-score: ", GhysX_1.GhysX.db.cache.battle_info.score);
        this.onUpdateDraw();
        GhysX_1.GhysX.handler.emit("show_banner", {
          name: "\u6218\u6597\u7ed3\u675f\u754c\u9762-Bannder",
          forced: true,
          adUnitId: "adunit-75758fcb425cfc0b"
        });
        GhysX_1.GhysX.handler.emit("send_event", {
          key: "battle",
          value: GhysX_1.GhysX.db.cache.battle_info
        });
      };
      battle_result.prototype.start = function() {};
      battle_result.prototype.onDestroy = function() {
        GhysX_1.GhysX.handler.emit("hide_banner", {
          name: "\u6218\u6597\u7ed3\u675f\u754c\u9762-Bannder",
          forced: true,
          adUnitId: "adunit-75758fcb425cfc0b"
        });
      };
      __decorate([ property({
        type: cc.Label,
        displayName: "\u98de\u884c\u65f6\u95f4",
        tooltip: "\u98de\u884c\u65f6\u95f4"
      }) ], battle_result.prototype, "time", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u79ef\u5206",
        tooltip: "\u79ef\u5206"
      }) ], battle_result.prototype, "score", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u6700\u9ad8\u79ef\u5206",
        tooltip: "\u6700\u9ad8\u79ef\u5206"
      }) ], battle_result.prototype, "highest_score", void 0);
      battle_result = __decorate([ ccclass ], battle_result);
      return battle_result;
    }(cc.Component);
    exports.default = battle_result;
    cc._RF.pop();
  }, {
    "../../libs/ghysx/GhysX": "GhysX"
  } ],
  battle_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18492ezZTNFO5lHJ0PaStxC", "battle_ui");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../libs/ghysx/GhysX");
    var skill_view_1 = require("./components/skill_view");
    var skill_btn_1 = require("../../resources/prefabs/battle/components/skill_btn");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var battle_ui = function(_super) {
      __extends(battle_ui, _super);
      function battle_ui() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.skillViewPrefab = null;
        _this.player_1 = null;
        _this.player_2 = null;
        _this.player_1_sprite = null;
        _this.player_2_sprite = null;
        _this.player_1_skills = null;
        _this.player_2_skills = null;
        _this.skillBtns1 = [];
        _this.skillBtns2 = [];
        _this.score = null;
        _this.score2 = null;
        _this.lift = null;
        _this.lift2 = null;
        _this.liftProgress = null;
        _this.liftProgress2 = null;
        _this.mileage = null;
        _this.skills = null;
        _this.pauseBtn = null;
        _this._chapter_mould = null;
        return _this;
      }
      battle_ui.prototype.init = function() {
        this._chapter_mould = GhysX_1.GhysX.res.chapter_moulds[GhysX_1.GhysX.local.stage_info.id];
      };
      battle_ui.prototype.createSkillView = function(player_id) {
        var node = cc.instantiate(this.skillViewPrefab);
        var c = node.getComponent(skill_view_1.default);
        c.init(player_id);
        this.skills.node.addChild(node);
      };
      battle_ui.prototype.createSkillViews = function() {
        this.player_1_skills.active = true;
        switch (GhysX_1.GhysX.local.stage_info.type) {
         case 1:
          this.createSkillView(1);
          GhysX_1.GhysX.platform.sys.pixelRatio >= 3 && (this.player_1_skills.x += 100);
          break;

         default:
          this.player_2.active = true;
          this.player_2_skills.active = true;
          this.createSkillView(1);
          this.createSkillView(2);
        }
      };
      battle_ui.prototype.updateDraw = function() {
        this.score.string = "" + GhysX_1.GhysX.db.cache.battle_info.score1;
        this.score2.string = "" + GhysX_1.GhysX.db.cache.battle_info.score2;
        var need_buy = false;
        if (GhysX_1.GhysX.db.cache.battle_info.score1 >= 150 && !GhysX_1.GhysX.db.cache.battle_info.score1_buy1) {
          GhysX_1.GhysX.db.cache.battle_info.score1_buy1 = true;
          need_buy = true;
        }
        if (GhysX_1.GhysX.db.cache.battle_info.score1 >= 300 && !GhysX_1.GhysX.db.cache.battle_info.score1_buy2) {
          GhysX_1.GhysX.db.cache.battle_info.score1_buy2 = true;
          need_buy = true;
        }
        if (GhysX_1.GhysX.db.cache.battle_info.score1 >= 500 && !GhysX_1.GhysX.db.cache.battle_info.score1_buy3) {
          GhysX_1.GhysX.db.cache.battle_info.score1_buy3 = true;
          need_buy = true;
        }
        if (need_buy) {
          GhysX_1.GhysX.handler.emit("pause");
          GhysX_1.GhysX.graphics.manager.listener("start", "battle_waiting", function() {
            GhysX_1.GhysX.graphics.draw({
              url: "prefabs/battle/view/give_skill",
              mode: GhysX_1.GhysX.graphics.MODE.VIEW,
              order: GhysX_1.GhysX.graphics.ORDER.VIEW_DIALOG,
              group_name: "battle",
              script: "give_skill",
              invoke: "init",
              params: {
                buy_type: GhysX_1.GhysX.modules.unit.random(3, 4)
              },
              complete: function(params) {}.bind(this)
            });
          }.bind(this), null);
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/battle/battle_waiting",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            order: GhysX_1.GhysX.graphics.ORDER.BACKGROUND,
            group_name: GhysX_1.GhysX.graphics.GROUP_NAME.BATTLE,
            script: "battle_waiting",
            invoke: "init",
            params: {
              open_mode: 1
            },
            complete: function(params) {}.bind(this)
          });
        }
      };
      battle_ui.prototype.updateDrawHp1 = function() {
        this.lift.string = "" + GhysX_1.GhysX.db.cache.battle_info.lift1;
      };
      battle_ui.prototype.updateDrawHp2 = function() {
        this.lift2.string = "" + GhysX_1.GhysX.db.cache.battle_info.lift2;
      };
      battle_ui.prototype.updateDrawHpProgress1 = function() {
        this.liftProgress.progress = GhysX_1.GhysX.db.cache.battle_info.lift1_progress;
        if (this.liftProgress.progress >= 1 && GhysX_1.GhysX.db.cache.battle_info.lift1 < 3) {
          GhysX_1.GhysX.db.cache.battle_info.lift1++;
          this.liftProgress.progress = 0;
          GhysX_1.GhysX.db.cache.battle_info.lift1_progress = 0;
          this.updateDrawHp1();
        }
      };
      battle_ui.prototype.updateDrawHpProgress2 = function() {
        this.liftProgress2.progress = GhysX_1.GhysX.db.cache.battle_info.lift2_progress;
        if (this.liftProgress2.progress >= 1 && GhysX_1.GhysX.db.cache.battle_info.lift2 < 3) {
          GhysX_1.GhysX.db.cache.battle_info.lift2++;
          this.liftProgress2.progress = 0;
          GhysX_1.GhysX.db.cache.battle_info.lift2_progress = 0;
          this.updateDrawHp2();
        }
      };
      battle_ui.prototype.eatingFruit = function(bird, fruits) {
        fruits.node.stopAllActions();
        var liftProgress = null;
        switch (bird._player_id) {
         case 1:
          liftProgress = this.liftProgress;
          break;

         case 2:
          liftProgress = this.liftProgress2;
        }
        var mpos = fruits.node.parent.convertToNodeSpaceAR(liftProgress.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
        var seq = cc.sequence(cc.bezierTo(1, [ cc.v2(0, 0), cc.v2(mpos.x / 2, mpos.y / 2), mpos ]), cc.callFunc(function(sender) {
          var add_progress = GhysX_1.GhysX.modules.unit.random(1, 5) / 50;
          switch (bird._player_id) {
           case 1:
            GhysX_1.GhysX.db.cache.battle_info.lift1_progress += add_progress;
            this.updateDrawHpProgress1();
            break;

           case 2:
            GhysX_1.GhysX.db.cache.battle_info.lift2_progress += add_progress;
            this.updateDrawHpProgress2();
          }
          sender.destroy();
        }.bind(this)));
        fruits.node.runAction(seq);
      };
      battle_ui.prototype.addSkill = function(skills, player_id, revive) {
        for (var key in skills) {
          var skill_btn_2 = skills[key];
          if (skill_btn_2) {
            if (skill_btn_2.skill_type == GhysX_1.GhysX.db.cache.give_skill_type) {
              skill_btn_2.count.string = "" + GhysX_1.GhysX.db.cache.give_skill_count;
              skill_btn_2.node.active = true;
            }
            skill_btn_2._player_id = player_id;
          }
        }
      };
      battle_ui.prototype.showSkills = function(revive) {
        switch (GhysX_1.GhysX.local.stage_info.type) {
         case 1:
          this.player_1_skills.active = true;
          this.addSkill(this.skillBtns1, 1, revive);
          GhysX_1.GhysX.db.cache.battle_info.lift1 += GhysX_1.GhysX.db.cache.heartbeat;
          this.updateDrawHp1();
          break;

         default:
          this.player_1_skills.active = true;
          this.player_2_skills.active = true;
          GhysX_1.GhysX.db.cache.battle_info.lift1 += GhysX_1.GhysX.db.cache.heartbeat;
          GhysX_1.GhysX.db.cache.battle_info.lift2 += GhysX_1.GhysX.db.cache.heartbeat;
          this.updateDrawHp1();
          this.updateDrawHp2();
          this.addSkill(this.skillBtns1, 1, revive);
          this.addSkill(this.skillBtns2, 2, revive);
        }
        GhysX_1.GhysX.platform.sys.pixelRatio >= 3 && (this.player_1_skills.x = 50);
      };
      battle_ui.prototype.onUpdateDraw = function() {
        this.score.string = "" + GhysX_1.GhysX.local.stage_info.highest_score;
        this.mileage.string = "" + GhysX_1.GhysX.db.cache.battle_info.mileage;
        this.lift.string = "" + GhysX_1.GhysX.db.cache.battle_info.lift1;
        this.lift2.string = "" + GhysX_1.GhysX.db.cache.battle_info.lift2;
        this.liftProgress.progress = GhysX_1.GhysX.db.cache.battle_info.lift1_progress;
        this.liftProgress2.progress = GhysX_1.GhysX.db.cache.battle_info.lift2_progress;
        GhysX_1.GhysX.graphics.draw({
          url: "sprites/%s/%s".format(1e3 + GhysX_1.GhysX.local.stage_info.bird1, 1e3 + GhysX_1.GhysX.local.stage_info.bird1),
          mode: GhysX_1.GhysX.graphics.MODE.ATLAS,
          asset_type: cc.SpriteAtlas,
          asset_name: "1",
          target: this.player_1_sprite,
          complete: function(info) {}.bind(this)
        });
        2 == GhysX_1.GhysX.local.stage_info.type && GhysX_1.GhysX.graphics.draw({
          url: "sprites/%s/%s".format(1e3 + GhysX_1.GhysX.local.stage_info.bird2, 1e3 + GhysX_1.GhysX.local.stage_info.bird2),
          mode: GhysX_1.GhysX.graphics.MODE.ATLAS,
          asset_type: cc.SpriteAtlas,
          asset_name: "1",
          target: this.player_2_sprite,
          complete: function(info) {}.bind(this)
        });
      };
      battle_ui.prototype.onPause = function() {
        this.pauseBtn.node.active = true;
      };
      battle_ui.prototype.offPause = function() {
        this.pauseBtn.node.active = false;
      };
      battle_ui.prototype.go = function() {
        this.onUpdateDraw();
      };
      battle_ui.prototype.pause = function() {};
      battle_ui.prototype.resume = function() {};
      battle_ui.prototype.onLoad = function() {
        this.createSkillViews();
        this.onUpdateDraw();
        GhysX_1.GhysX.handler.on("go", this.go, this);
        GhysX_1.GhysX.handler.on("battle_ui_update_draw", this.updateDraw, this);
        GhysX_1.GhysX.handler.on("battle_ui_update_draw_hp1", this.updateDrawHp1, this);
        GhysX_1.GhysX.handler.on("battle_ui_update_draw_hp2", this.updateDrawHp2, this);
        GhysX_1.GhysX.handler.on("battle_ui_update_draw_hp_progress1", this.updateDrawHpProgress1, this);
        GhysX_1.GhysX.handler.on("battle_ui_update_draw_hp_progress2", this.updateDrawHpProgress2, this);
        GhysX_1.GhysX.handler.on("battle_ui_eating_fruit", this.eatingFruit, this);
        GhysX_1.GhysX.handler.on("battle_ui_show_skills", this.showSkills, this);
        GhysX_1.GhysX.handler.on("battle_ui_on_pause", this.onPause, this);
        GhysX_1.GhysX.handler.on("battle_ui_off_pause", this.offPause, this);
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      battle_ui.prototype.start = function() {
        GhysX_1.GhysX.graphics.manager.group("hide", GhysX_1.GhysX.graphics.GROUP_NAME.HOME);
        GhysX_1.GhysX.graphics.manager.show("main_menu");
      };
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6280\u80fd\u7ec4\u4ef6",
        tooltip: ""
      }) ], battle_ui.prototype, "skillViewPrefab", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u73a9\u5bb61",
        tooltip: ""
      }) ], battle_ui.prototype, "player_1", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u73a9\u5bb62",
        tooltip: ""
      }) ], battle_ui.prototype, "player_2", void 0);
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u73a9\u5bb61\u56fe\u6807",
        tooltip: ""
      }) ], battle_ui.prototype, "player_1_sprite", void 0);
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u73a9\u5bb62\u56fe\u6807",
        tooltip: ""
      }) ], battle_ui.prototype, "player_2_sprite", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u73a9\u5bb61\u6280\u80fd",
        tooltip: ""
      }) ], battle_ui.prototype, "player_1_skills", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u73a9\u5bb62\u73a9\u5bb6",
        tooltip: ""
      }) ], battle_ui.prototype, "player_2_skills", void 0);
      __decorate([ property({
        type: skill_btn_1.default,
        displayName: "\u73a9\u5bb61\u6280\u80fd\u5b9e\u4f8b",
        tooltip: ""
      }) ], battle_ui.prototype, "skillBtns1", void 0);
      __decorate([ property({
        type: skill_btn_1.default,
        displayName: "\u73a9\u5bb62\u73a9\u5bb6\u5b9e\u4f8b",
        tooltip: ""
      }) ], battle_ui.prototype, "skillBtns2", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u79ef\u5206",
        tooltip: ""
      }) ], battle_ui.prototype, "score", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u79ef\u52062",
        tooltip: ""
      }) ], battle_ui.prototype, "score2", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u751f\u547d",
        tooltip: ""
      }) ], battle_ui.prototype, "lift", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u751f\u547d2",
        tooltip: ""
      }) ], battle_ui.prototype, "lift2", void 0);
      __decorate([ property({
        type: cc.ProgressBar,
        displayName: "\u751f\u547d\u8fdb\u5ea6",
        tooltip: ""
      }) ], battle_ui.prototype, "liftProgress", void 0);
      __decorate([ property({
        type: cc.ProgressBar,
        displayName: "\u751f\u547d\u8fdb\u5ea6",
        tooltip: ""
      }) ], battle_ui.prototype, "liftProgress2", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: " \u91cc\u7a0b",
        tooltip: ""
      }) ], battle_ui.prototype, "mileage", void 0);
      __decorate([ property({
        type: cc.Layout,
        displayName: "\u6280\u80fd\u5217\u8868",
        tooltip: ""
      }) ], battle_ui.prototype, "skills", void 0);
      __decorate([ property({
        type: cc.Button,
        displayName: "\u6682\u505c\u6309\u94ae",
        tooltip: ""
      }) ], battle_ui.prototype, "pauseBtn", void 0);
      battle_ui = __decorate([ ccclass ], battle_ui);
      return battle_ui;
    }(cc.Component);
    exports.default = battle_ui;
    cc._RF.pop();
  }, {
    "../../libs/ghysx/GhysX": "GhysX",
    "../../resources/prefabs/battle/components/skill_btn": "skill_btn",
    "./components/skill_view": "skill_view"
  } ],
  battle_waiting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a79ceUWfuFHsJxylsh37eK+", "battle_waiting");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../libs/ghysx/GhysX");
    var guide_1 = require("../../resources/prefabs/tutorial/guide");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var battle_waiting = function(_super) {
      __extends(battle_waiting, _super);
      function battle_waiting() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.guidePrefab = null;
        _this.player = null;
        _this.friends = null;
        _this._open_mode = 0;
        return _this;
      }
      battle_waiting.prototype.onClick = function(event, params) {
        switch (this._open_mode) {
         case 0:
          GhysX_1.GhysX.handler.emit("go");
          GhysX_1.GhysX.handler.emit("jump", null);
          break;

         case 1:
          GhysX_1.GhysX.handler.emit("jump", null);
        }
        GhysX_1.GhysX.graphics.manager.close("battle_waiting");
      };
      battle_waiting.prototype.initOpener = function(params) {
        this._open_mode = ~~params.data;
      };
      battle_waiting.prototype.init = function(params) {
        this._open_mode = params.open_mode;
      };
      battle_waiting.prototype.createGuide = function(parent, position) {
        var node = cc.instantiate(this.guidePrefab);
        var c = node.getComponent(guide_1.default);
        c.init();
        parent.addChild(node);
        node.setPosition(position || cc.Vec2.ZERO);
      };
      battle_waiting.prototype.onLoad = function() {
        switch (GhysX_1.GhysX.local.stage_info.type) {
         case 2:
          this.createGuide(this.friends, cc.v2(-1 * GhysX_1.GhysX.gui.frame.node.width / 4, 0));
          this.createGuide(this.friends, cc.v2(GhysX_1.GhysX.gui.frame.node.width / 4, 0));
          break;

         default:
          this.createGuide(this.player, cc.v2(0, 0));
        }
        GhysX_1.GhysX.handler.emit("battle_ui_off_pause");
        GhysX_1.GhysX.handler.emit("show_banner", {
          name: "\u6218\u6597\u7b49\u5f85\u754c\u9762 Banner",
          forced: true,
          adUnitId: "adunit-bea341f00ce5a4ba"
        });
      };
      battle_waiting.prototype.start = function() {};
      battle_waiting.prototype.onDestroy = function() {
        GhysX_1.GhysX.handler.emit("resume");
        GhysX_1.GhysX.handler.emit("hide_banner", {});
        GhysX_1.GhysX.handler.emit("battle_ui_on_pause");
      };
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u624b\u6307",
        tooltip: ""
      }) ], battle_waiting.prototype, "guidePrefab", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u4e2a\u4eba\u6218",
        tooltip: ""
      }) ], battle_waiting.prototype, "player", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u597d\u53cb\u6218",
        tooltip: ""
      }) ], battle_waiting.prototype, "friends", void 0);
      battle_waiting = __decorate([ ccclass ], battle_waiting);
      return battle_waiting;
    }(cc.Component);
    exports.default = battle_waiting;
    cc._RF.pop();
  }, {
    "../../libs/ghysx/GhysX": "GhysX",
    "../../resources/prefabs/tutorial/guide": "guide"
  } ],
  battle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84e4656zoVDDJEWSiYSSsdM", "battle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var battle = function(_super) {
      __extends(battle, _super);
      function battle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.guide = null;
        _this.giveSkill = null;
        _this._chapter_mould = null;
        return _this;
      }
      battle.prototype.init = function(params) {
        this._chapter_mould = params.chapter_mould;
      };
      battle.prototype.enterMap = function() {
        GhysX_1.GhysX.db.cache.battle_info = {
          id: this._chapter_mould.id,
          type: this._chapter_mould.group,
          mileage: 0,
          score: 0,
          score1: 0,
          score2: 0,
          start_time: 0,
          end_time: 0,
          interval: 0,
          role_count: this._chapter_mould.group,
          lift1: 2,
          lift2: 2,
          lift1_progress: 0,
          lift2_progress: 0,
          kill_boss_count: 0,
          tree_count: 0,
          bird1: null,
          bird2: null,
          revive: true
        };
        var tree_mould = GhysX_1.GhysX.res.tree_moulds[1];
        GhysX_1.GhysX.db.cache.tree_info = tree_mould;
        GhysX_1.GhysX.db.cache.tree_info.section_infos = tree_mould.section_info.splitss("!", "|", ",", parseInt);
        GhysX_1.GhysX.db.cache.tree_info.section_infos[0][2] = GhysX_1.GhysX.modules.array.serialize(GhysX_1.GhysX.db.cache.tree_info.section_infos[0][1]);
        GhysX_1.GhysX.db.cache.tree_info.section_infos[1][2] = GhysX_1.GhysX.modules.array.serialize(GhysX_1.GhysX.db.cache.tree_info.section_infos[1][1]);
        GhysX_1.GhysX.graphics.manager.close("stage");
        GhysX_1.GhysX.handler.emit("battle_ui_remove_all_skill_1");
        GhysX_1.GhysX.handler.emit("battle_ui_remove_all_skill_2");
        GhysX_1.GhysX.graphics.draw({
          url: "prefabs/map/stages/stage",
          mode: GhysX_1.GhysX.graphics.MODE.VIEW,
          order: GhysX_1.GhysX.graphics.ORDER.BACKGROUND,
          group_name: "battle",
          script: "stage",
          invoke: "init",
          params: {},
          complete: function(params) {
            this.node.active = true;
          }.bind(this)
        });
        GhysX_1.GhysX.handler.emit("send_event", {
          key: "battle",
          value: {
            type: this._chapter_mould.group
          }
        });
      };
      battle.prototype.nextBattle = function() {
        var chapter_mould = GhysX_1.GhysX.res.chapter_moulds[this._chapter_mould.id];
        if (chapter_mould) {
          this._chapter_mould = chapter_mould;
          this.enterMap();
        } else {
          GhysX_1.GhysX.graphics.manager.group("close", "battle");
          GhysX_1.GhysX.graphics.manager.group("show", GhysX_1.GhysX.graphics.GROUP_NAME.HOME);
        }
      };
      battle.prototype.exitBattle = function() {
        GhysX_1.GhysX.graphics.manager.listener("show", "main_menu", function() {
          GhysX_1.GhysX.graphics.manager.group("close", "battle");
          GhysX_1.GhysX.handler.emit(1 == GhysX_1.GhysX.local.stage_info.type ? "open_player_select" : "open_friends_select");
        }, null);
        GhysX_1.GhysX.graphics.manager.listener("show", "main_menu", function() {
          GhysX_1.GhysX.gui.frame.node.runAction(cc.callFunc(function() {
            GhysX_1.GhysX.graphics.manager.hide("main_menu");
          }.bind(this)));
        }, null);
        GhysX_1.GhysX.graphics.manager.find("home") ? GhysX_1.GhysX.graphics.manager.group("show", GhysX_1.GhysX.graphics.GROUP_NAME.HOME) : GhysX_1.GhysX.graphics.draw({
          url: "prefabs/home/home",
          mode: GhysX_1.GhysX.graphics.MODE.VIEW,
          group_name: GhysX_1.GhysX.graphics.GROUP_NAME.HOME,
          script: "home",
          invoke: "init",
          params: {},
          complete: function(params) {
            GhysX_1.GhysX.graphics.manager.group("show", GhysX_1.GhysX.graphics.GROUP_NAME.HOME);
          }
        });
      };
      battle.prototype.pause = function() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getPhysicsManager().enabled = false;
      };
      battle.prototype.resume = function() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
      };
      battle.prototype.onLoad = function() {
        this.enterMap();
        GhysX_1.GhysX.handler.on("next_battle", this.nextBattle, this);
        GhysX_1.GhysX.handler.on("exit_battle", this.exitBattle, this);
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      battle.prototype.start = function() {};
      battle.prototype.onDestroy = function() {
        cc.log("battle");
      };
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6559\u5b66\u7ec4\u4ef6",
        tooltip: ""
      }) ], battle.prototype, "guide", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u5956\u52b1\u7ec4\u4ef6",
        tooltip: ""
      }) ], battle.prototype, "giveSkill", void 0);
      battle = __decorate([ ccclass ], battle);
      return battle;
    }(cc.Component);
    exports.default = battle;
    cc._RF.pop();
  }, {
    "../../libs/ghysx/GhysX": "GhysX"
  } ],
  bird_element: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8c60LW8XVCJYlF9QKbE//E", "bird_element");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bird_element = function(_super) {
      __extends(bird_element, _super);
      function bird_element() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.boxs = [];
        _this.icon = null;
        _this.btn = null;
        _this.unlock = null;
        _this._type = 0;
        _this._index = 0;
        _this._select = false;
        return _this;
      }
      bird_element.prototype.onClickButton = function(event, params) {
        GhysX_1.GhysX.handler.emit("select_bird_element", this);
        GhysX_1.GhysX.os.audio.playEffect("music/effect/select", false);
      };
      bird_element.prototype.init = function(_type, index) {
        this._type = _type;
        this._index = index;
      };
      bird_element.prototype.select = function() {
        this.boxs[0].active = false;
        this.boxs[1].active = true;
        this._select = true;
      };
      bird_element.prototype.unselect = function() {
        this.boxs[0].active = true;
        this.boxs[1].active = false;
        this._select = false;
      };
      bird_element.prototype.onLoad = function() {
        GhysX_1.GhysX.graphics.draw({
          url: "sprites/%s/%s".format(1e3 + this._index, 1e3 + this._index),
          mode: GhysX_1.GhysX.graphics.MODE.ATLAS,
          asset_type: cc.SpriteAtlas,
          asset_name: "1",
          target: this.icon
        });
        this.btn._onTouchBegan = this.btn.__onTouchBegan;
      };
      bird_element.prototype.start = function() {};
      __decorate([ property({
        type: cc.Node,
        displayName: "\u56fe\u6807\u80cc\u666f\u6846\u7ec4\u4ef6",
        tooltip: ""
      }) ], bird_element.prototype, "boxs", void 0);
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u56fe\u6807\u7ec4\u4ef6",
        tooltip: ""
      }) ], bird_element.prototype, "icon", void 0);
      __decorate([ property({
        type: cc.Button,
        displayName: "\u9009\u62e9\u6309\u94ae",
        tooltip: ""
      }) ], bird_element.prototype, "btn", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u89e3\u9501\u63d0\u793a\u6587\u5b57",
        tooltip: ""
      }) ], bird_element.prototype, "unlock", void 0);
      bird_element = __decorate([ ccclass ], bird_element);
      return bird_element;
    }(cc.Component);
    exports.default = bird_element;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX"
  } ],
  bird_selecter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0b7bhmgs9LI4CqHLMnq6SM", "bird_selecter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bird_element_1 = require("../components/bird_element");
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bird_selecter = function(_super) {
      __extends(bird_selecter, _super);
      function bird_selecter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.birdPrefab = null;
        _this.layout = null;
        _this.startbtn = null;
        _this._select_type = 0;
        _this._select_index = 0;
        _this._select_target = null;
        _this._bird_elements = [];
        return _this;
      }
      bird_selecter.prototype.onClickStart = function(event, params) {
        this.startbtn.interactable = false;
        for (var _i = 0, _a = this._bird_elements; _i < _a.length; _i++) {
          var c = _a[_i];
          c.btn.interactable = false;
          c._select || GhysX_1.GhysX.shader.gray.gray(c.node);
        }
        GhysX_1.GhysX.handler.emit("start_battle");
      };
      bird_selecter.prototype.initBinder = function(params) {
        this._select_type = ~~params.data || this._select_type;
      };
      bird_selecter.prototype.onLoad = function() {
        GhysX_1.GhysX.handler.on("select_bird_element", function(bird_element) {
          if (this._select_type == bird_element._type) {
            this._select_target && this._select_target.unselect();
            this._select_index = bird_element._index;
            this._select_target = bird_element;
            this._select_target.select();
            switch (bird_element._type) {
             case 1:
              break;

             case 2:
              GhysX_1.GhysX.local.stage_info.bird2 = bird_element._index;
              break;

             default:
              GhysX_1.GhysX.local.stage_info.bird1 = bird_element._index;
            }
          }
        }, this);
        for (var i = 1; i <= 10; i++) {
          var node = cc.instantiate(this.birdPrefab);
          var c = node.getComponent(bird_element_1.default);
          c.init(this._select_type, i);
          this.layout.node.addChild(node);
          switch (this._select_type) {
           case 2:
            GhysX_1.GhysX.local.stage_info.bird2 == i && GhysX_1.GhysX.handler.emit("select_bird_element", c);
            break;

           default:
            GhysX_1.GhysX.local.stage_info.bird1 == i && GhysX_1.GhysX.handler.emit("select_bird_element", c);
          }
          this._bird_elements.push(c);
        }
      };
      bird_selecter.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u5c0f\u9e1f\u9009\u9879\u7ec4\u4ef6",
        tooltip: ""
      }) ], bird_selecter.prototype, "birdPrefab", void 0);
      __decorate([ property({
        type: cc.Layout,
        displayName: "\u5c0f\u9e1f\u5217\u8868",
        tooltip: ""
      }) ], bird_selecter.prototype, "layout", void 0);
      __decorate([ property({
        type: cc.Button,
        displayName: "\u5f00\u59cb\u6309\u94ae",
        tooltip: ""
      }) ], bird_selecter.prototype, "startbtn", void 0);
      bird_selecter = __decorate([ ccclass ], bird_selecter);
      return bird_selecter;
    }(cc.Component);
    exports.default = bird_selecter;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX",
    "../components/bird_element": "bird_element"
  } ],
  bird: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c4dcJpwJtNhKP2Tnofoirv", "bird");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var bullet_1 = require("./bullet");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bird = function(_super) {
      __extends(bird, _super);
      function bird() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.body = null;
        _this.shield = null;
        _this._player_id = 0;
        _this._sprite = null;
        _this._stage = null;
        _this._bird_id = 0;
        _this._jump_y = 0;
        _this._bullet_type = 1;
        _this._shield = false;
        _this._death = false;
        _this._reviving = false;
        return _this;
      }
      bird_1 = bird;
      bird.prototype.onCollisionEnter = function(other, self) {
        var world = self.world;
        var aabb = world.aabb;
        var preAabb = world.preAabb;
        var t = world.transform;
        var r = world.radius;
        var p = world.position;
        var ps = world.points;
        switch (other.tag) {
         case 8:
          var _bird = self.node.getComponent(bird_1);
          if (!_bird._death) {
            _bird.death();
            var x_1 = _bird.node.x;
            var y_1 = _bird.node.y;
            GhysX_1.GhysX.graphics.draw({
              url: "effects/hit/hit",
              mode: GhysX_1.GhysX.graphics.MODE.PREFAB,
              asset_type: cc.Prefab,
              parent: this.node.parent,
              complete: function(info) {
                info.node.setPosition(cc.v2(x_1, y_1));
              }.bind(this)
            });
            GhysX_1.GhysX.os.audio.playEffect("music/effect/hit", false);
          }
        }
      };
      bird.prototype.onCollisionStay = function(other, self) {};
      bird.prototype.onCollisionExit = function(other, self) {};
      bird.prototype.init = function(stage, bird_id, player_id) {
        this._stage = stage;
        this._bird_id = bird_id;
        this._player_id = player_id;
      };
      bird.prototype.initSprite = function(info) {
        this._sprite = info;
        var spritePolygonCollider = info.node.getComponent(cc.PolygonCollider);
        spritePolygonCollider.enabled = false;
      };
      bird.prototype.addShield = function() {
        this._shield = true;
        this.shield.active = true;
      };
      bird.prototype.removeShield = function() {
        this._shield = false;
        this.shield.active = this._reviving;
      };
      bird.prototype.go = function() {
        this.shoot();
      };
      bird.prototype.revive = function() {
        this._death = false;
        this._reviving = true;
        this.node.active = true;
        this.node.rotation = 0;
        this.body.awake = false;
        this._shield = false;
        this.shield.active = true;
        this.node.y = 0;
        this._bullet_type = 1;
        this.shoot();
        var seq = cc.sequence(cc.delayTime(3), cc.callFunc(function(sender) {
          this._reviving = false;
          this.shield.active = this._shield;
          this.body.awake = true;
        }.bind(this)));
        this.node.runAction(seq);
        this.node.opacity = 0;
        this.node.runAction(cc.repeat(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.1), cc.fadeIn(.1)), 3));
        this.node.runAction(cc.sequence(cc.delayTime(2.1), cc.repeat(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.1), cc.fadeIn(.1)), 3)));
      };
      bird.prototype.death = function() {
        if (this._death) return;
        if (this._shield) return;
        if (this._reviving) return;
        this._death = true;
        this.node.rotation = 90;
        var animation = this._sprite.node.getComponent(cc.Animation);
        animation.stop(animation.defaultClip.name);
        this.node.stopAllActions();
        switch (this._player_id) {
         case 1:
          GhysX_1.GhysX.db.cache.battle_info.lift1--;
          break;

         case 2:
          GhysX_1.GhysX.db.cache.battle_info.lift2--;
        }
        GhysX_1.GhysX.handler.emit("battle_ui_update_draw_hp" + this._player_id);
        GhysX_1.GhysX.handler.emit("battle_ui_update_draw_hp_progress" + this._player_id);
      };
      bird.prototype.kill = function() {
        if (this._death) return;
        this._reviving = false;
        this.death();
        GhysX_1.GhysX.os.audio.playEffect("music/effect/fall", false);
      };
      bird.prototype.jump = function(event) {
        if (this._death) return;
        switch (GhysX_1.GhysX.local.stage_info.type) {
         case 1:
          break;

         default:
          if (event) if (event.getLocationX() >= GhysX_1.GhysX.gui.frame.node.width / 2) {
            if (1 == this._player_id) return;
          } else if (2 == this._player_id) return;
        }
        this.body.linearVelocity = cc.v2(0, 380);
      };
      bird.prototype.outside = function() {
        var lift = 0;
        switch (this._player_id) {
         case 1:
          lift = GhysX_1.GhysX.db.cache.battle_info.lift1;
          break;

         case 2:
          lift = GhysX_1.GhysX.db.cache.battle_info.lift2;
        }
        GhysX_1.GhysX.handler.emit("battle_ui_remove_all_skill_" + this._player_id);
        if (lift <= 0) {
          this.node.active = false;
          GhysX_1.GhysX.handler.emit("battle_over");
        } else this.revive();
      };
      bird.prototype.createBullet = function(start_x, start_y, move_x, move_y) {
        void 0 === move_x && (move_x = 900);
        void 0 === move_y && (move_y = 0);
        var node = cc.instantiate(this.bulletPrefab);
        var c = node.getComponent(bullet_1.default);
        c.init(this, move_x, move_y);
        node.setPosition(cc.v2(start_x, start_y));
        this._stage.node.addChild(node);
        return c;
      };
      bird.prototype.shoot = function() {
        if (this._death) return;
        var interval = .17;
        var start_pos = this.node.parent.getPosition().add(this.node.getPosition());
        var ms = 900;
        switch (this._bullet_type) {
         case 1:
          var bullet_2 = this.createBullet(start_pos.x, start_pos.y, ms, 0);
          GhysX_1.GhysX.os.audio.playEffect("music/effect/gun", false);
          break;

         case 2:
          interval = .09;
          var bullet_3 = this.createBullet(start_pos.x, start_pos.y, ms, 0);
          GhysX_1.GhysX.os.audio.playEffect("music/effect/uzi", false);
          break;

         case 3:
          interval = .09;
          var bullet1 = this.createBullet(start_pos.x, start_pos.y, ms, 0);
          var bullet2 = this.createBullet(start_pos.x, start_pos.y, ms, 200);
          var bullet3 = this.createBullet(start_pos.x, start_pos.y, ms, -200);
          GhysX_1.GhysX.os.audio.playEffect("music/effect/uzi", false);
          break;

         case 4:
          interval = .8;
          var bullet1 = this.createBullet(start_pos.x + 30 * Math.random(), start_pos.y - 5 + 10 * Math.random() + 65, ms, 0);
          var bullet2 = this.createBullet(start_pos.x + 30 * Math.random(), start_pos.y - 5 + 10 * Math.random() + 10, ms, 0);
          var bullet3 = this.createBullet(start_pos.x + 30 * Math.random(), start_pos.y - 5 + 10 * Math.random() - 35, ms, 0);
          var bullet4 = this.createBullet(start_pos.x + 30 * Math.random(), start_pos.y - 5 + 10 * Math.random() - 80, ms, 0);
          GhysX_1.GhysX.os.audio.playEffect("music/effect/shoot", false);
        }
        var seq = cc.sequence(cc.delayTime(interval), cc.callFunc(function(sender) {
          this.shoot();
        }.bind(this)));
        this.node.runAction(seq);
      };
      bird.prototype.pause = function() {
        this.node.pauseAllActions();
      };
      bird.prototype.resume = function() {
        this.node.resumeAllActions();
      };
      bird.prototype.onLoad = function() {
        GhysX_1.GhysX.graphics.draw({
          url: "sprites/%s/%s".format(1e3 + this._bird_id, 1e3 + this._bird_id),
          mode: GhysX_1.GhysX.graphics.MODE.PREFAB,
          asset_type: cc.Prefab,
          parent: this.node,
          order: -1,
          complete: function(info) {
            this.initSprite(info);
          }.bind(this)
        });
        GhysX_1.GhysX.handler.on("go", this.go, this);
        GhysX_1.GhysX.handler.on("jump", this.jump, this);
        GhysX_1.GhysX.handler.on("revive", this.revive, this);
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      bird.prototype.start = function() {};
      var bird_1;
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u5b50\u5f39\u7ec4\u4ef6",
        tooltip: ""
      }) ], bird.prototype, "bulletPrefab", void 0);
      __decorate([ property({
        type: cc.RigidBody,
        displayName: "\u5c0f\u9e1f\u94a2\u4f53",
        tooltip: ""
      }) ], bird.prototype, "body", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u62a4\u76fe",
        tooltip: ""
      }) ], bird.prototype, "shield", void 0);
      bird = bird_1 = __decorate([ ccclass ], bird);
      return bird;
    }(cc.Component);
    exports.default = bird;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./bullet": "bullet"
  } ],
  black_frame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ead078E225M97TEIEcZASKh", "black_frame");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var black_frame = function(_super) {
      __extends(black_frame, _super);
      function black_frame() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      black_frame.prototype.start = function() {};
      black_frame = __decorate([ ccclass ], black_frame);
      return black_frame;
    }(cc.Component);
    exports.default = black_frame;
    cc._RF.pop();
  }, {} ],
  boss: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f61dcrjVjJMQYt0u4NNfCLm", "boss");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var fire_1 = require("./fire");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var boss = function(_super) {
      __extends(boss, _super);
      function boss() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.jumpLoop = null;
        _this.hp = null;
        _this._sprite = null;
        _this._stage = null;
        _this._boss_id = 0;
        _this._jump_y = 0;
        _this._skill_type = 1;
        _this._start = false;
        _this._death = false;
        _this._fire_index = 0;
        _this._shoot_count = 0;
        _this._score = 30;
        return _this;
      }
      boss.prototype.init = function(stage, boss_id) {
        this._stage = stage;
        this._boss_id = boss_id;
        this._fire_index = GhysX_1.GhysX.modules.unit.random(0, 3);
      };
      boss.prototype.play = function() {
        this.jumpLoop.play(this.jumpLoop.defaultClip.name);
        var seq = cc.sequence(cc.moveBy(.3, cc.v2(-40, 0)), cc.moveBy(.3, cc.v2(0, 0)), cc.moveBy(.3, cc.v2(40, 0)), cc.moveBy(.3, cc.v2(0, 0)));
        this.node.runAction(cc.repeatForever(seq));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.6), cc.callFunc(function() {
          GhysX_1.GhysX.os.audio.playEffect("music/effect/fly", false);
        }))));
        this._start = true;
        this.shoot();
      };
      boss.prototype.createBullet = function() {
        var node = cc.instantiate(this.bulletPrefab);
        var c = node.getComponent(fire_1.default);
        c.init(this._fire_index);
        node.setPosition(this.node.getPosition());
        this.node.parent.addChild(node);
      };
      boss.prototype.shoot = function() {
        this._shoot_count++;
        var interval = .5;
        if (2 == this._shoot_count) {
          this._shoot_count = 0;
          interval += 2 * Math.random();
        }
        interval = Math.max(interval, Math.max(.5, interval - interval * (GhysX_1.GhysX.db.cache.battle_info.kill_boss_count - 1) / 10));
        this.createBullet();
        var seq = cc.sequence(cc.delayTime(interval), cc.callFunc(function() {
          this.shoot();
        }.bind(this)));
        this.node.runAction(seq);
        GhysX_1.GhysX.os.audio.playEffect("music/effect/bossfire", false);
      };
      boss.prototype.initSprite = function(info) {
        this._sprite = info;
        var spritePolygonCollider = info.node.getComponent(cc.PolygonCollider);
        spritePolygonCollider.enabled = false;
        var polygonCollider = this.node.addComponent(cc.PolygonCollider);
        polygonCollider.points = spritePolygonCollider.points;
        polygonCollider.tag = 4;
      };
      boss.prototype.hit = function(bullet) {
        if (this._start) {
          0 == GhysX_1.GhysX.db.cache.battle_info.kill_boss_count ? this.hp.progress -= .3 : this.hp.progress -= Math.max(.1 - (GhysX_1.GhysX.db.cache.battle_info.kill_boss_count - 1) / 100, .03);
          4 == bullet._bullet_type && (this.hp.progress = 0);
          if (this.hp.progress <= 0) {
            GhysX_1.GhysX.db.cache.battle_info.score += this._score;
            GhysX_1.GhysX.db.cache.battle_info.kill_boss_count++;
            switch (bullet._bird._player_id) {
             case 1:
              GhysX_1.GhysX.db.cache.battle_info.score1 += this._score;
              break;

             case 2:
              GhysX_1.GhysX.db.cache.battle_info.score2 += this._score;
            }
            GhysX_1.GhysX.handler.emit("battle_ui_update_draw");
            var stage_1 = this._stage;
            stage_1.node.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function() {
              stage_1.createTree();
            })));
            var x_1 = this.node.x;
            var y_1 = this.node.y;
            var parent = this.node.parent;
            GhysX_1.GhysX.graphics.draw({
              url: "effects/boss_death/boss_death",
              mode: GhysX_1.GhysX.graphics.MODE.PREFAB,
              asset_type: cc.Prefab,
              parent: parent,
              complete: function(info) {
                info.node.x = x_1;
                info.node.y = y_1;
              }.bind(this)
            });
            this.node.destroy();
            GhysX_1.GhysX.os.audio.playEffect("music/effect/bossdie", false);
          }
        }
      };
      boss.prototype.pause = function() {
        this.node.pauseAllActions();
      };
      boss.prototype.resume = function() {
        this.node.resumeAllActions();
      };
      boss.prototype.onLoad = function() {
        GhysX_1.GhysX.graphics.draw({
          url: "sprites/%s/%s".format(2e3 + this._boss_id, 2e3 + this._boss_id),
          mode: GhysX_1.GhysX.graphics.MODE.PREFAB,
          asset_type: cc.Prefab,
          parent: this.node,
          complete: function(info) {
            this.initSprite(info);
          }.bind(this)
        });
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      boss.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u5b50\u5f39\u7ec4\u4ef6",
        tooltip: ""
      }) ], boss.prototype, "bulletPrefab", void 0);
      __decorate([ property({
        type: cc.Animation,
        displayName: "\u5faa\u73af\u8df3\u52a8",
        tooltip: ""
      }) ], boss.prototype, "jumpLoop", void 0);
      __decorate([ property({
        type: cc.ProgressBar,
        displayName: "\u5faa\u73af\u8df3\u52a8",
        tooltip: ""
      }) ], boss.prototype, "hp", void 0);
      boss = __decorate([ ccclass ], boss);
      return boss;
    }(cc.Component);
    exports.default = boss;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./fire": "fire"
  } ],
  bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "585e85Xbu5C1pXM4x0Xvh7b", "bullet");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tree_section_1 = require("./tree_section");
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var boss_1 = require("./boss");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bullet = function(_super) {
      __extends(bullet, _super);
      function bullet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.collider = null;
        _this._bullet_type = 1;
        _this._bullet_dir = 1;
        _this._bird = null;
        _this._move_x = 900;
        _this._move_y = 0;
        return _this;
      }
      bullet.prototype.onCollisionEnter = function(other, self) {
        var world = self.world;
        var aabb = world.aabb;
        var preAabb = world.preAabb;
        var t = world.transform;
        var r = world.radius;
        var p = world.position;
        var ps = world.points;
        switch (other.tag) {
         case 4:
          var _boss = other.node.getComponent(boss_1.default);
          _boss.hit(this);
          self.node.destroy();
          break;

         case 8:
          var _tree_section = other.node.getComponent(tree_section_1.default);
          GhysX_1.GhysX.handler.emit("hit", this, _tree_section);
          self.node.destroy();
        }
        if (4 == this._bullet_type) {
          var x_1 = self.node.x;
          var y_1 = self.node.y;
          GhysX_1.GhysX.graphics.draw({
            url: "effects/bomb/bomb",
            mode: GhysX_1.GhysX.graphics.MODE.PREFAB,
            asset_type: cc.Prefab,
            parent: this.node.parent,
            complete: function(info) {
              info.node.setPosition(cc.v2(x_1, y_1));
            }.bind(this)
          });
        }
      };
      bullet.prototype.onCollisionStay = function(other, self) {};
      bullet.prototype.onCollisionExit = function(other, self) {};
      bullet.prototype.init = function(bird, move_x, move_y) {
        void 0 === move_x && (move_x = 900);
        void 0 === move_y && (move_y = 0);
        this._bird = bird;
        this._move_x = move_x;
        this._move_y = move_y;
        this._bullet_type = bird._bullet_type;
      };
      bullet.prototype.pause = function() {
        this.node.pauseAllActions();
      };
      bullet.prototype.resume = function() {
        this.node.resumeAllActions();
      };
      bullet.prototype.onLoad = function() {
        var t = .9;
        var dt = .7;
        switch (this._bird._bullet_type) {
         case 1:
          t = 1.5;
          dt = 1.3;
          break;

         case 2:
         case 3:
          t = .9;
          break;

         case 4:
          t = 1.8;
          dt = 1.6;
          this.icon.spriteFrame = null;
          this.collider.radius = 20;
          GhysX_1.GhysX.graphics.draw({
            url: "images/map/elements/bomb",
            mode: GhysX_1.GhysX.graphics.MODE.SPRITE,
            asset_type: cc.SpriteFrame,
            target: this.icon
          });
          this.node.scale = .7;
          this.node.runAction(cc.repeatForever(cc.rotateBy(1, 360)));
        }
        var seq = cc.sequence(cc.spawn(cc.moveBy(t, cc.v2(this._move_x, this._move_y)), cc.sequence(cc.fadeIn(.1), cc.delayTime(dt), cc.fadeOut(.1))), cc.callFunc(function(sender) {
          sender.destroy();
        }));
        this.node.runAction(seq);
        this.node.opacity = 0;
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      bullet.prototype.start = function() {};
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u56fe\u6807",
        tooltip: ""
      }) ], bullet.prototype, "icon", void 0);
      __decorate([ property({
        type: cc.CircleCollider,
        displayName: "\u78b0\u649e",
        tooltip: ""
      }) ], bullet.prototype, "collider", void 0);
      bullet = __decorate([ ccclass ], bullet);
      return bullet;
    }(cc.Component);
    exports.default = bullet;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./boss": "boss",
    "./tree_section": "tree_section"
  } ],
  chapter_element: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a1b4aiBT1D8Lcz1ib77I/l", "chapter_element");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var chapter_element = function(_super) {
      __extends(chapter_element, _super);
      function chapter_element() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.unlock = null;
        _this._chapter_mould = null;
        return _this;
      }
      chapter_element.prototype.onClickStartButton = function(event, params) {
        if (this.unlock.node.active) {
          GhysX_1.GhysX.handler.emit("create_video", {
            adUnitId: "adunit-c3fdf0afb3e8124e",
            success: function(res) {
              GhysX_1.GhysX.local.stage_info.id = this._chapter_mould.id;
              cc.sys.localStorage.setItem("local", JSON.stringify(GhysX_1.GhysX.local));
              this.unlock.node.active = false;
              GhysX_1.GhysX.handler.emit("chapter_element_update_draw");
            }.bind(this),
            cancel: function(res) {}.bind(this),
            fail: function(res) {
              res && 1005 == res.errCode && GhysX_1.GhysX.graphics.draw({
                url: "prefabs/common/tip_message",
                mode: GhysX_1.GhysX.graphics.MODE.VIEW,
                order: GhysX_1.GhysX.graphics.ORDER.DIALOG,
                group_name: "active",
                script: "tip_message",
                invoke: "init",
                params: {
                  message: "\u5f53\u524d\u65e0\u89c6\u9891\u5e7f\u544a\uff01"
                },
                complete: function(params) {}
              });
            }.bind(this)
          });
          return;
        }
        if (GhysX_1.GhysX.local.stage_info.id < this._chapter_mould.id) {
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/common/tip_message",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            order: GhysX_1.GhysX.graphics.ORDER.DIALOG,
            group_name: "active",
            script: "tip_message",
            invoke: "init",
            params: {
              message: "\u8bf7\u901a\u5173\u4e0a\u4e00\u5173\u5361"
            },
            complete: function(params) {}
          });
          return;
        }
        this.startBattle();
      };
      chapter_element.prototype.startBattle = function() {
        GhysX_1.GhysX.graphics.draw({
          url: "prefabs/battle/battle",
          mode: GhysX_1.GhysX.graphics.MODE.VIEW,
          order: GhysX_1.GhysX.graphics.ORDER.BACKGROUND,
          group_name: "battle",
          script: "battle",
          invoke: "init",
          params: {
            chapter_mould: this._chapter_mould
          },
          complete: function(params) {}
        });
      };
      chapter_element.prototype.init = function(chapter_mould) {
        this._chapter_mould = chapter_mould;
      };
      chapter_element.prototype.updateDraw = function() {
        this.unlock.node.active = false;
        GhysX_1.GhysX.local.stage_info.id < this._chapter_mould.id ? GhysX_1.GhysX.local.stage_info.id + 1 == this._chapter_mould.id ? this.unlock.node.active = true : GhysX_1.GhysX.shader.gray.gray(this.node) : GhysX_1.GhysX.shader.gray.ungray(this.node);
      };
      chapter_element.prototype.onLoad = function() {
        GhysX_1.GhysX.loader.load("images/icons/stage/" + this._chapter_mould.icon, cc.SpriteFrame, this._chapter_mould.icon.toString(), this.icon);
        GhysX_1.GhysX.handler.on("chapter_element_update_draw", this.updateDraw, this);
      };
      chapter_element.prototype.start = function() {};
      chapter_element.prototype.onEnable = function() {
        this.updateDraw();
      };
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u7ae0\u8282\u7ec4\u7ec4\u4ef6",
        tooltip: ""
      }) ], chapter_element.prototype, "icon", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u89e3\u9501\u63d0\u793a\u6587\u5b57",
        tooltip: ""
      }) ], chapter_element.prototype, "unlock", void 0);
      chapter_element = __decorate([ ccclass ], chapter_element);
      return chapter_element;
    }(cc.Component);
    exports.default = chapter_element;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX"
  } ],
  chapter_mould: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d182fLXILVGU7MFts00CMIl", "chapter_mould");
    cc._RF.pop();
  }, {} ],
  chapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dce92MijfRMfZWYjLxIFrrk", "chapter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var chapter_element_1 = require("./chapter_element");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var chapter = function(_super) {
      __extends(chapter, _super);
      function chapter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chapter_element_prefab = null;
        _this.title = null;
        _this.title_string = "";
        _this.layout = null;
        _this._chapter_moulds = null;
        return _this;
      }
      chapter.prototype.init = function(chapter_moulds) {
        this._chapter_moulds = chapter_moulds;
      };
      chapter.prototype.createElement = function(chapter_mould) {
        var node = cc.instantiate(this.chapter_element_prefab);
        var c = node.getComponent(chapter_element_1.default);
        c.init(chapter_mould);
        this.layout.node.addChild(node);
      };
      chapter.prototype.onLoad = function() {
        this.title.string = this.title_string.format(this._chapter_moulds[0].group);
        for (var key in this._chapter_moulds) {
          var chapter_mould = this._chapter_moulds[key];
          this.createElement(chapter_mould);
        }
      };
      chapter.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u7ae0\u8282\u7ec4\u4ef6",
        tooltip: ""
      }) ], chapter.prototype, "chapter_element_prefab", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u7ae0\u8282\u7ea7\u540d\u79f0",
        tooltip: ""
      }) ], chapter.prototype, "title", void 0);
      __decorate([ property({
        displayName: "\u7ae0\u8282\u540d\u79f0\u6587\u672c",
        tooltip: ""
      }) ], chapter.prototype, "title_string", void 0);
      __decorate([ property({
        type: cc.Layout,
        displayName: "\u5217\u8868\u5bb9\u5668",
        tooltip: ""
      }) ], chapter.prototype, "layout", void 0);
      chapter = __decorate([ ccclass ], chapter);
      return chapter;
    }(cc.Component);
    exports.default = chapter;
    cc._RF.pop();
  }, {
    "./chapter_element": "chapter_element"
  } ],
  db: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ad64XDp2dHuLHIPDFheX2X", "db");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cache = {};
    cc._RF.pop();
  }, {} ],
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc792iPIY1C7ph8F7JNWQTC", "en");
    "use strict";
    var _module$exports;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    module.exports = (_module$exports = {
      loading: "loading...",
      update_load_data_tip: "\u6b63\u5728\u8fdb\u5165\u9ad8\u6e05\u4e09\u56fd\u4e16\u754c",
      update_load_sprite_tip: "\u52a0\u8f7d\u89d2\u8272\u7eb9\u7406\u8d44\u6e90",
      update_load_effect_tip: "\u52a0\u8f7d\u7279\u6548\u8d44\u6e90",
      function_is_not_implemented_yet_tip: "\u529f\u80fd\u6682\u672a\u5b9e\u73b0",
      unacquired_hero_tip: "\u5c1a\u672a\u83b7\u5f97\u8be5\u82f1\u96c4",
      formation_add_ship_erro_tip: "\u4e3b\u89d2\u7b49\u7ea7\u6216VIP\u7b49\u7ea7\u4e0d\u8db3",
      offline_reward_close_tip: "\u6ca1\u6709\u9886\u53d6\u6302\u673a\u5956\u52b1",
      shop_buy_success: "\u8d2d\u4e70\u6210\u529f",
      year: "\u5e74",
      month: "\u6708",
      date: "\u5929",
      day: "\u5929",
      current_day: "\u65e5",
      hour: "\u65f6",
      minute: "\u5206",
      second: "\u79d2",
      class: "\u7ea7",
      mhour: "\u5c0f\u65f6",
      mminute: "\u5206\u949f",
      strength_master_notopen: "\u672a\u5f00\u542f",
      ship_lieutenant_not: "\u5f53\u524d\u6ca1\u6709\u6b66\u5c06\u4e0a\u9635",
      break_class: "\u7a81\u7834\u7b49\u7ea7",
      forging_master_words: "\u6b66\u5c06\u5168\u90e8\u88c5\u5907",
      forging_achieve_words: "\u8fbe\u5230",
      forging_achieve_open: "\u5f00\u542f",
      forging_undeveloped: "\u656c\u8bf7\u671f\u5f85",
      lv_rank_full: "\u5df2\u6ee1\u7ea7",
      lv_rank: "\u5347\u7ea7",
      all_break: "\u5168\u519b",
      not_on_the_list: "\u672a\u4e0a\u699c",
      boss_fight_count_is_limit: "\u6b21\u6570\u5df2\u6ee1\uff0c\u4e0d\u9700\u8981\u8d2d\u4e70",
      boss_rank_not_on_the_list: "\u672a\u6709\u6392\u540d",
      system_name: "\u7cfb\u7edf",
      join_fight_team: "\u8fdb\u5165\u961f\u4f0d",
      war_pet_info: "\u6218\u5ba0\u4fe1\u606f",
      war_pet_upgrade: "\u6218\u5ba0\u5347\u7ea7",
      war_pet_star: "\u6218\u5ba0\u5347\u661f",
      war_pet_book: "\u6218\u5ba0\u56fe\u9274",
      war_pet_isupgrade: "\u5347\u7ea7\u56fe\u9274",
      war_pet_isopen: "\u6fc0\u6d3b\u56fe\u9274",
      war_pet_starfull: "\u661f\u7ea7\u5df2\u6ee1,\u65e0\u6cd5\u5347\u7ea7",
      mount_info: "\u5750\u9a91\u4fe1\u606f",
      mount_upgrade: "\u5750\u9a91\u5347\u7ea7",
      mount_star: "\u5750\u9a91\u5347\u661f",
      mount_stone: "\u788e\u7247",
      other_address_login: "\u5e10\u53f7\u5728\u5176\u4ed6\u5730\u65b9\u767b\u9646",
      resume_network: "\u7f51\u7edc\u65ad\u5f00\uff0c\u5df2\u7ecf\u5e2e\u60a8\u6062\u590d\u8fde\u63a5\u3002",
      prop_no_enough: "\u5347\u7ea7\u9053\u5177\u4e0d\u8db3",
      mov_pet_info: "\u62db\u5f0f\u4fe1\u606f",
      mov_pet_upgrade: "\u62db\u5f0f\u5347\u7ea7",
      mov_pet_star: "\u62db\u5f0f\u5347\u661f",
      mov_pet_book: "\u62db\u5f0f\u56fe\u9274",
      buy_count_reach_the_upper_limit: "\u6570\u91cf\u8fbe\u5230\u4e0a\u9650\uff0c\u6682\u4e0d\u9700\u8981\u8d2d\u4e70\uff01",
      mov_open: "\u8bf7\u5148\u6fc0\u6d3b\u62db\u5f0f",
      expedition_tip_one: "\u8be5\u5173\u5361\u5df2\u7ecf\u901a\u5173\uff0c\u6e05\u524d\u5f80\u4e0b\u4e00\u5173",
      expedition_tip_two: "\u8bf7\u5148\u901a\u8fc7\u4e0a\u4e00\u5173",
      upgrade_lv_mov: "\u62db\u5f0f\u7b49\u7ea7",
      upgrade_lv_pet: "\u6218\u5ba0\u7b49\u7ea7",
      upgrade_lv_mount: "\u5750\u9a91\u7b49\u7ea7",
      did_not_play: "\u672a\u4e0a\u9635",
      friend: "\u597d\u53cb",
      friend_gift_get: "\u793c\u7269\u9886\u53d6",
      frieng_send: "\u597d\u53cb\u7533\u8bf7",
      friend_nobody: "\u65e0",
      friend_get: "\u5df2\u7533\u8bf7",
      friend_self: "\u60a8\u81ea\u5df1",
      ten_thousand: "\u4e07",
      a_hundred_million: "\u4ebf",
      please_activate_previous_star_of_life: "\u8bf7\u5148\u6fc0\u6d3b\u4e0a\u4e00\u4e2a\u547d\u661f\u54e6",
      lv_break: "\u7a81\u7834",
      add_friend_apl: "\u7533\u8bf7\u4fe1\u606f\u5df2\u53d1\u51fa",
      not_have: "\u65e0",
      star_lv_mov: "\u62db\u5f0f\u661f\u7ea7",
      star_lv_pet: "\u6218\u5ba0\u661f\u7ea7",
      have_ship: "\u62e5\u6709:",
      no_activity: "\u6d3b\u52a8\u672a\u5f00\u542f",
      send_message_interval_time: "\u9700\u8981\u95f4\u96945\u79d2\u624d\u80fd\u53d1\u8a00",
      rank_list_lv: "lv:",
      rank_list_guanqia: "\u5173\u5361\u6570:",
      rank_list_power: "\u6218\u6597\u529b:",
      shop_cell: "\u6676\u77f3\u4e0d\u8db3",
      no_ship: "\u672a\u6fc0\u6d3b\u6b66\u5c06",
      shop_cell_rank: "\u7ade\u6280\u70b9\u4e0d\u8db3",
      pet_skill: "\u5ba0\u7269\u6280\u80fd",
      ship_skill: "\u6b66\u5c06\u6280\u80fd",
      repeat_send_message_interval_time: "\u91cd\u590d\u5185\u5bb9\u53d1\u9001\u65f6\u95f4\u96941\u5206\u949f",
      please_choose_prop: "\u8bf7\u5148\u9009\u62e9\u7269\u54c1",
      equipment_backpack_is_full: "\u88c5\u5907\u80cc\u5305\u5df2\u6ee1\uff0c\u8bf7\u524d\u5f80\u56de\u6536",
      full_star: "\u5df2\u6ee1\u661f",
      rise_star: "\u5347\u661f",
      master: "\u5168\u8eab",
      person_legion_point: "\u4e2a\u4eba\u8d21\u732e\u70b9\u4e0d\u8db3",
      friend_find: "\u641c\u7d22\u597d\u53cb"
    }, _defineProperty(_module$exports, "friend_get", "\u63a8\u8350\u597d\u53cb"), _defineProperty(_module$exports, "friend_ship_point", "\u53cb\u60c5\u70b9\u4e0d\u8db3"), 
    _defineProperty(_module$exports, "activity_end", "\u6d3b\u52a8\u5df2\u7ed3\u675f"), 
    _module$exports);
    cc._RF.pop();
  }, {} ],
  fire: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "67c13DIURlOWr4qUNAMU9nF", "fire");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bird_1 = require("./bird");
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var fire = function(_super) {
      __extends(fire, _super);
      function fire() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fires = [];
        _this._fire_index = 0;
        return _this;
      }
      fire.prototype.onCollisionEnter = function(other, self) {
        var world = self.world;
        var aabb = world.aabb;
        var preAabb = world.preAabb;
        var t = world.transform;
        var r = world.radius;
        var p = world.position;
        var ps = world.points;
        switch (other.tag) {
         case 1:
          var _bird = other.node.getComponent(bird_1.default);
          _bird.death();
          self.node.destroy();
        }
      };
      fire.prototype.onCollisionStay = function(other, self) {};
      fire.prototype.onCollisionExit = function(other, self) {};
      fire.prototype.init = function(fire_index) {
        this._fire_index = fire_index;
      };
      fire.prototype.pause = function() {
        this.node.pauseAllActions();
      };
      fire.prototype.resume = function() {
        this.node.resumeAllActions();
      };
      fire.prototype.onLoad = function() {
        var node = cc.instantiate(this.fires[this._fire_index]);
        this.node.addChild(node);
        var seq = cc.sequence(cc.spawn(cc.moveBy(.9, cc.v2(-900, 0)), cc.sequence(cc.fadeIn(.1), cc.delayTime(.7), cc.fadeOut(.1))), cc.callFunc(function(sender) {
          sender.destroy();
        }));
        this.node.runAction(seq);
        this.node.opacity = 0;
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      fire.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u706b\u7ec4\u4ef6",
        tooltip: ""
      }) ], fire.prototype, "fires", void 0);
      fire = __decorate([ ccclass ], fire);
      return fire;
    }(cc.Component);
    exports.default = fire;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./bird": "bird"
  } ],
  flotage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "694a6chL2ZNkp69TkjArZv3", "flotage");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bird_1 = require("./bird");
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var flotage = function(_super) {
      __extends(flotage, _super);
      function flotage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.skillPrefab = null;
        _this._skill_type = 1;
        _this._stage = null;
        return _this;
      }
      flotage.prototype.onCollisionEnter = function(other, self) {
        var world = self.world;
        var aabb = world.aabb;
        var preAabb = world.preAabb;
        var t = world.transform;
        var r = world.radius;
        var p = world.position;
        var ps = world.points;
        switch (other.tag) {
         case 1:
          var _bird = other.node.getComponent(bird_1.default);
          if (_bird && !_bird._death) {
            GhysX_1.GhysX.handler.emit("battle_ui_add_skill_" + _bird._player_id, _bird, this._skill_type);
            1 == this._skill_type ? GhysX_1.GhysX.os.audio.playEffect("music/effect/shield", false) : GhysX_1.GhysX.os.audio.playEffect("music/effect/powers", false);
            self.node.destroy();
          }
        }
      };
      flotage.prototype.onCollisionStay = function(other, self) {};
      flotage.prototype.onCollisionExit = function(other, self) {};
      flotage.prototype.init = function(stage, skill_type) {
        this._stage = stage;
        this._skill_type = skill_type;
      };
      flotage.prototype.createSkill = function() {
        var node = cc.instantiate(this.skillPrefab);
        this.node.addChild(node);
        GhysX_1.GhysX.graphics.draw({
          url: "effects/skill/skill",
          mode: GhysX_1.GhysX.graphics.MODE.ATLAS,
          asset_type: cc.SpriteAtlas,
          asset_name: "" + this._skill_type,
          target: node.getComponent(cc.Sprite)
        });
      };
      flotage.prototype.pause = function() {
        this.node.pauseAllActions();
      };
      flotage.prototype.resume = function() {
        this.node.resumeAllActions();
      };
      flotage.prototype.onLoad = function() {
        this.createSkill();
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      flotage.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6280\u80fd\u7ec4\u4ef6",
        tooltip: ""
      }) ], flotage.prototype, "skillPrefab", void 0);
      flotage = __decorate([ ccclass ], flotage);
      return flotage;
    }(cc.Component);
    exports.default = flotage;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./bird": "bird"
  } ],
  friends_select: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a121bG2SJxMH53dUOQlm0iT", "friends_select");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var friends_select = function(_super) {
      __extends(friends_select, _super);
      function friends_select() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._status = 0;
        return _this;
      }
      friends_select.prototype.init = function() {};
      friends_select.prototype.onLoad = function() {
        GhysX_1.GhysX.local.stage_info.type = 2;
        GhysX_1.GhysX.local.stage_info.id = 2;
        GhysX_1.GhysX.handler.on("start_battle", function() {
          this._status++;
          2 == this._status && GhysX_1.GhysX.graphics.draw({
            url: "prefabs/battle/battle",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            order: GhysX_1.GhysX.graphics.ORDER.BACKGROUND,
            group_name: "battle",
            script: "battle",
            invoke: "init",
            params: {
              chapter_mould: GhysX_1.GhysX.res.chapter_moulds[GhysX_1.GhysX.local.stage_info.id]
            },
            complete: function(params) {
              GhysX_1.GhysX.graphics.manager.close("friends_select");
            }
          });
        }, this);
      };
      friends_select.prototype.start = function() {
        GhysX_1.GhysX.handler.emit("hide_banner", {});
      };
      friends_select = __decorate([ ccclass ], friends_select);
      return friends_select;
    }(cc.Component);
    exports.default = friends_select;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX"
  } ],
  fruits: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8992fxGbKZEDaZFaZIIvvT1", "fruits");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bird_1 = require("./bird");
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var fruits = function(_super) {
      __extends(fruits, _super);
      function fruits() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fruitPrefab = null;
        _this.polygonCollider = null;
        _this._fruit_type = 1;
        _this._stage = null;
        return _this;
      }
      fruits.prototype.onCollisionEnter = function(other, self) {
        var world = self.world;
        var aabb = world.aabb;
        var preAabb = world.preAabb;
        var t = world.transform;
        var r = world.radius;
        var p = world.position;
        var ps = world.points;
        switch (other.tag) {
         case 1:
          var _bird = other.node.getComponent(bird_1.default);
          if (_bird && !_bird._death) {
            GhysX_1.GhysX.handler.emit("battle_ui_eating_fruit", _bird, this);
            self.enabled = false;
          }
        }
      };
      fruits.prototype.onCollisionStay = function(other, self) {};
      fruits.prototype.onCollisionExit = function(other, self) {};
      fruits.prototype.init = function(stage, fruit_type) {
        this._stage = stage;
        this._fruit_type = fruit_type;
      };
      fruits.prototype.createFruit = function() {
        var node = cc.instantiate(this.fruitPrefab);
        this.node.addChild(node);
        node.scale = .3;
        GhysX_1.GhysX.graphics.draw({
          url: "effects/fruit/fruit",
          mode: GhysX_1.GhysX.graphics.MODE.ATLAS,
          asset_type: cc.SpriteAtlas,
          asset_name: "" + this._fruit_type,
          target: node.getComponent(cc.Sprite),
          complete: function(info) {
            this.polygonCollider.points[0].x = -1 * info.node.width / 2 * .3;
            this.polygonCollider.points[0].y = -1 * info.node.height / 2 * .3;
            this.polygonCollider.points[1].x = info.node.width / 2 * .3;
            this.polygonCollider.points[1].y = -1 * info.node.height / 2 * .3;
            this.polygonCollider.points[2].x = info.node.width / 2 * .3;
            this.polygonCollider.points[2].y = info.node.height / 2 * .3;
            this.polygonCollider.points[3].x = -1 * info.node.width / 2 * .3;
            this.polygonCollider.points[3].y = info.node.height / 2 * .3;
          }.bind(this)
        });
        this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(.3, cc.v2(0, 10)), cc.rotateBy(.3, 10), cc.rotateBy(.3, -20), cc.rotateBy(.3, 10))));
      };
      fruits.prototype.pause = function() {
        this.node.pauseAllActions();
      };
      fruits.prototype.resume = function() {
        this.node.resumeAllActions();
      };
      fruits.prototype.onLoad = function() {
        this.createFruit();
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      fruits.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6c34\u679c\u7ec4\u4ef6",
        tooltip: ""
      }) ], fruits.prototype, "fruitPrefab", void 0);
      __decorate([ property({
        type: cc.PolygonCollider,
        displayName: "\u6c34\u679c\u591a\u8fb9\u5f62\u78b0\u649e",
        tooltip: ""
      }) ], fruits.prototype, "polygonCollider", void 0);
      fruits = __decorate([ ccclass ], fruits);
      return fruits;
    }(cc.Component);
    exports.default = fruits;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./bird": "bird"
  } ],
  give_skill: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "791a6mkDahGL44pPKWagbOf", "give_skill");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var __skill_infos = [ {
      skill_id: 0,
      video_type: 2
    }, {
      skill_id: 1,
      video_type: 0
    }, {
      skill_id: 2,
      video_type: 0
    }, {
      skill_id: 3,
      video_type: 0
    }, {
      skill_id: 4,
      video_type: 0
    } ];
    var __video_ad_unit_ids = [ "adunit-7c5b4d7a6d008419", "adunit-dd2da86122f534b1", "adunit-6a6c772a200d08a9" ];
    var __revive_video_ad_unit_ids = [ "adunit-7ee2fae807f036dc", "adunit-6931189f8a4171df", "adunit-129372d49bee9656" ];
    var give_skill = function(_super) {
      __extends(give_skill, _super);
      function give_skill() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.skill = null;
        _this.count = null;
        _this.reviveTip = null;
        _this._skill_id = 0;
        _this._revive = false;
        _this._buy_type = -1;
        return _this;
      }
      give_skill.prototype.onClickGiveSkillButton = function(event, params) {
        var __skill_info = __skill_infos[this._skill_id];
        var unitId = __video_ad_unit_ids[__skill_info.video_type];
        this._revive && (unitId = __revive_video_ad_unit_ids[__revive_video_ad_unit_ids.length - 1]);
        GhysX_1.GhysX.handler.emit("create_video", {
          adUnitId: unitId,
          success: function(res) {
            this.give();
          }.bind(this),
          cancel: function(res) {
            this.close();
          }.bind(this),
          fail: function(res) {
            res && 1005 == res.errCode && this.close();
            GhysX_1.GhysX.graphics.draw({
              url: "prefabs/common/tip_message",
              mode: GhysX_1.GhysX.graphics.MODE.VIEW,
              order: GhysX_1.GhysX.graphics.ORDER.DIALOG,
              group_name: "active",
              script: "tip_message",
              invoke: "init",
              params: {
                message: "\u65e0\u89c6\u9891\u5e7f\u544a\uff01"
              },
              complete: function(params) {}
            });
          }.bind(this)
        });
      };
      give_skill.prototype.onClickCloseButton = function(event, params) {
        this.close();
      };
      give_skill.prototype.give = function() {
        var count = ~~this.count.string;
        GhysX_1.GhysX.db.cache.give_skill_type = this._skill_id;
        switch (this._skill_id) {
         case 0:
          GhysX_1.GhysX.db.cache.heartbeat = count;
          GhysX_1.GhysX.local.user_info.heartbeat += count;
          break;

         case 1:
          GhysX_1.GhysX.db.cache.shield = count;
          break;

         case 2:
          GhysX_1.GhysX.db.cache.bullet = count;
          break;

         case 3:
          GhysX_1.GhysX.db.cache.multiple_bullet = count;
          break;

         case 4:
          GhysX_1.GhysX.db.cache.bomb = count;
        }
        GhysX_1.GhysX.db.cache.give_skill_count = count;
        GhysX_1.GhysX.handler.emit("battle_ui_show_skills", this._revive);
        if (this._revive) {
          switch (GhysX_1.GhysX.db.cache.battle_info.type) {
           case 1:
            GhysX_1.GhysX.db.cache.battle_info.role_count = 1;
            break;

           default:
            GhysX_1.GhysX.db.cache.battle_info.role_count = 2;
          }
          GhysX_1.GhysX.handler.emit("revive");
          this._revive = false;
        }
        if (this._buy_type > 0) {
          GhysX_1.GhysX.handler.emit("battle_ui_add_skill_1", GhysX_1.GhysX.db.cache.battle_info.bird1, 1);
          GhysX_1.GhysX.handler.emit("battle_ui_add_skill_2", GhysX_1.GhysX.db.cache.battle_info.bird2, 2);
        }
        this.close();
      };
      give_skill.prototype.close = function() {
        if (this._revive) {
          GhysX_1.GhysX.db.cache.battle_info.revive = false;
          GhysX_1.GhysX.handler.emit("battle_over");
        }
        this.node.destroy();
      };
      give_skill.prototype.init = function(params) {
        this._revive = params.revive;
        void 0 !== params.buy_type && null !== params.buy_type && (this._buy_type = params.buy_type);
      };
      give_skill.prototype.onLoad = function() {
        GhysX_1.GhysX.db.cache.heartbeat = 0;
        if (this._revive) {
          this._skill_id = 0;
          this.reviveTip.active = true;
        } else this._buy_type > 0 ? this._skill_id = this._buy_type : this._skill_id = GhysX_1.GhysX.modules.unit.random(0, 4);
        var count = GhysX_1.GhysX.modules.unit.random(1, 3);
        var __skill_info = __skill_infos[this._skill_id];
        __skill_info.video_type = count - 1;
        if (0 == this._skill_id) {
          __skill_info.video_type = 2;
          count = 1;
        }
        this.count.string = "" + count;
        GhysX_1.GhysX.graphics.draw({
          url: "images/battle/give-skills/extras%s".format(this._skill_id),
          mode: GhysX_1.GhysX.graphics.MODE.SPRITE,
          asset_type: cc.SpriteFrame,
          target: this.skill,
          complete: function(info) {}.bind(this)
        });
      };
      give_skill.prototype.start = function() {};
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u6280\u80fd\u56fe\u6807",
        tooltip: ""
      }) ], give_skill.prototype, "skill", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: "\u6280\u80fd\u6570\u91cf",
        tooltip: ""
      }) ], give_skill.prototype, "count", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u590d\u6d3b\u63d0\u793a",
        tooltip: ""
      }) ], give_skill.prototype, "reviveTip", void 0);
      give_skill = __decorate([ ccclass ], give_skill);
      return give_skill;
    }(cc.Component);
    exports.default = give_skill;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX"
  } ],
  grass: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c0f0efzLGNGZ4VzoFxTOrF1", "grass");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var bird_1 = require("./bird");
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var grass = function(_super) {
      __extends(grass, _super);
      function grass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      grass.prototype.onCollisionEnter = function(other, self) {
        console.log("on collision enter snow");
        var world = self.world;
        var aabb = world.aabb;
        var preAabb = world.preAabb;
        var t = world.transform;
        var r = world.radius;
        var p = world.position;
        var ps = world.points;
      };
      grass.prototype.onCollisionStay = function(other, self) {
        var _bird = other.node.getComponent(bird_1.default);
        _bird.kill();
      };
      grass.prototype.onCollisionExit = function(other, self) {
        console.log("on collision exit snow");
        var _bird = other.node.getComponent(bird_1.default);
        _bird.outside();
      };
      grass.prototype.go = function() {
        var animation = this.node.getComponent(cc.Animation);
        animation.play(animation.defaultClip.name);
      };
      grass.prototype.pause = function() {
        var animation = this.node.getComponent(cc.Animation);
        animation.pause(animation.defaultClip.name);
      };
      grass.prototype.resume = function() {
        var animation = this.node.getComponent(cc.Animation);
        animation.resume(animation.defaultClip.name);
      };
      grass.prototype.onLoad = function() {
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      grass.prototype.start = function() {};
      grass = __decorate([ ccclass ], grass);
      return grass;
    }(cc.Component);
    exports.default = grass;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./bird": "bird"
  } ],
  guide: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "28ded9PuzVCzrUd9fw1XvT0", "guide");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var guide = function(_super) {
      __extends(guide, _super);
      function guide() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      guide.prototype.init = function() {};
      guide.prototype.onLoad = function() {};
      guide.prototype.start = function() {};
      guide = __decorate([ ccclass ], guide);
      return guide;
    }(cc.Component);
    exports.default = guide;
    cc._RF.pop();
  }, {} ],
  help_dialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2eaf07GxHZPEI2Yu6sfHk0n", "help_dialog");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var help_dialog = function(_super) {
      __extends(help_dialog, _super);
      function help_dialog() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      help_dialog.prototype.start = function() {};
      help_dialog = __decorate([ ccclass ], help_dialog);
      return help_dialog;
    }(cc.Component);
    exports.default = help_dialog;
    cc._RF.pop();
  }, {} ],
  hit_section: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4c96AvyepHNKMJ8nFg/dre", "hit_section");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var hit_section = function(_super) {
      __extends(hit_section, _super);
      function hit_section() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rigidBody = null;
        return _this;
      }
      hit_section.prototype.onLoad = function() {
        this.rigidBody.linearVelocity = cc.v2(300, 0);
        var seq = cc.sequence(cc.rotateBy(.8, 80), cc.delayTime(2), cc.callFunc(function(sender) {
          sender.destroy();
        }.bind(this)));
        this.node.runAction(seq.easing(cc.easeSineOut()));
      };
      hit_section.prototype.start = function() {};
      __decorate([ property({
        type: cc.RigidBody,
        displayName: "\u5207\u7247\u94a2\u4f53",
        tooltip: ""
      }) ], hit_section.prototype, "rigidBody", void 0);
      hit_section = __decorate([ ccclass ], hit_section);
      return hit_section;
    }(cc.Component);
    exports.default = hit_section;
    cc._RF.pop();
  }, {} ],
  home: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01c12nlvptJLobCReNSMwS/", "home");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var home = function(_super) {
      __extends(home, _super);
      function home() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      home.prototype.init = function() {
        GhysX_1.GhysX.handler.on("open_main_menu", function() {
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/home/view/main_menu",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            group_name: GhysX_1.GhysX.graphics.GROUP_NAME.HOME,
            script: "main_menu",
            invoke: "init",
            params: {},
            complete: function(params) {}
          });
        });
        GhysX_1.GhysX.handler.on("open_player_select", function() {
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/home/view/player_select",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            group_name: GhysX_1.GhysX.graphics.GROUP_NAME.HOME,
            script: "player_select",
            invoke: "init",
            params: {},
            complete: function(params) {}
          });
        });
        GhysX_1.GhysX.handler.on("open_friends_select", function() {
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/home/view/friends_select",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            group_name: GhysX_1.GhysX.graphics.GROUP_NAME.HOME,
            script: "friends_select",
            invoke: "init",
            params: {},
            complete: function(params) {}
          });
        });
      };
      home.prototype.onLoad = function() {};
      home.prototype.start = function() {};
      home.prototype.onEnable = function() {
        GhysX_1.GhysX.handler.emit("hide_banner", {});
      };
      home.prototype.onDisable = function() {
        GhysX_1.GhysX.handler.emit("hide_banner", {
          name: "\u9996\u9875\u5e95\u90e8 Banner",
          forced: false,
          adUnitId: "adunit-781e54f03a457bb3"
        });
      };
      home = __decorate([ ccclass ], home);
      return home;
    }(cc.Component);
    exports.default = home;
    cc._RF.pop();
  }, {
    "../../libs/ghysx/GhysX": "GhysX"
  } ],
  i18n: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab743DMdBxIeL8wWBL4P16F", "i18n");
    "use strict";
    var Polyglot = require("polyglot");
    var lang = cc.sys.language;
    "zh" !== lang && (lang = "en");
    var data = require(lang);
    var polyglot = new Polyglot({
      phrases: data,
      allowMissing: true
    });
    module.exports = {
      init: function init(language) {
        lang = language;
        data = require(lang);
        polyglot.replace(data);
      },
      t: function t(key, opt) {
        return polyglot.t(key, opt);
      }
    };
    cc._RF.pop();
  }, {
    polyglot: "polyglot"
  } ],
  launch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d187A9st9KL5WylmkXekHc", "launch");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var launch = function(_super) {
      __extends(launch, _super);
      function launch() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      launch.prototype._progressDatasCallback = function(completedCount, totalCount, item) {
        var asset = item.content;
        var name = asset.name;
        var resKey = name + "s";
        var keyIndex = 0;
        var json = GhysX_1.GhysX.modules.t2j.parse(asset.text.splits("\r\n", "\t"), keyIndex);
        GhysX_1.GhysX.res[resKey] = json;
        GhysX_1.GhysX.res.caches[resKey] = {};
      };
      launch.prototype.downloadDatas = function() {
        cc.loader.loadResDir("data/mould", cc.TextAsset, this._progressDatasCallback.bind(this), function(err, assets) {
          if (err) {
            this.downloadDatas();
            cc.error(err);
            return;
          }
          this.initGame();
        }.bind(this));
      };
      launch.prototype.initGame = function() {
        cc.Button.prototype.__onTouchBegan = cc.Button.prototype._onTouchBegan;
        cc.Button.prototype._onTouchBegan = function(event, params) {
          this.__onTouchBegan(event, params);
          GhysX_1.GhysX.os.audio.playEffect("music/button/touch", false);
        };
        GhysX_1.GhysX.db.cache.heartbeat = 0;
        var self = this;
        var local = cc.sys.localStorage.getItem("local");
        if (local) {
          GhysX_1.GhysX.local = JSON.parse(local);
          GhysX_1.GhysX.local.user_info || (GhysX_1.GhysX.local.user_info = {
            heartbeat: 0,
            shield: 0,
            bullet: 0,
            multiple_bullet: 0,
            bomb: 0
          });
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/home/home",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            group_name: GhysX_1.GhysX.graphics.GROUP_NAME.HOME,
            script: "home",
            invoke: "init",
            params: {},
            complete: function(params) {
              self.node.destroy();
            }
          });
        } else {
          GhysX_1.GhysX.local = {
            user_info: {
              heartbeat: 0,
              shield: 0,
              bullet: 0,
              multiple_bullet: 0,
              bomb: 0
            },
            stage_info: {
              type: 1,
              id: 1,
              bird1: 9,
              bird2: 9,
              highest_score: 0
            }
          };
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/battle/battle",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            order: GhysX_1.GhysX.graphics.ORDER.BACKGROUND,
            group_name: "battle",
            script: "battle",
            invoke: "init",
            params: {
              chapter_mould: GhysX_1.GhysX.res.chapter_moulds[GhysX_1.GhysX.local.stage_info.id]
            },
            complete: function(params) {
              self.node.destroy();
            }
          });
        }
        GhysX_1.GhysX.graphics.draw({
          url: "prefabs/navigate/navigate",
          mode: GhysX_1.GhysX.graphics.MODE.VIEW,
          order: GhysX_1.GhysX.graphics.ORDER.TASKBAR,
          group_name: GhysX_1.GhysX.graphics.GROUP_NAME.HOME,
          script: "navigate",
          invoke: "init",
          params: {},
          complete: function(params) {}
        });
      };
      launch.prototype.onLoad = function() {
        GhysX_1.GhysX.handler.on("launch_success", function(params) {
          this.downloadDatas();
        }.bind(this));
      };
      launch.prototype.start = function() {
        GhysX_1.GhysX.os.audio.playMusic("sound/bg", true);
      };
      launch = __decorate([ ccclass ], launch);
      return launch;
    }(cc.Component);
    exports.default = launch;
    cc._RF.pop();
  }, {
    "../libs/ghysx/GhysX": "GhysX"
  } ],
  "local.d.ts": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9be22nUw8JBb7+Hwq74IP0o", "local.d.ts");
    cc._RF.pop();
  }, {} ],
  main_menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e203UsxPxPdaViGW9ylIiZ", "main_menu");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var main_menu = function(_super) {
      __extends(main_menu, _super);
      function main_menu() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      main_menu.prototype.onClickMusicButton = function(event, params) {
        var isOpen = GhysX_1.GhysX.os.audio.isOpen();
        if (isOpen) {
          GhysX_1.GhysX.os.audio.musicOff();
          GhysX_1.GhysX.os.audio.effectOff();
        } else {
          GhysX_1.GhysX.os.audio.musicOn();
          GhysX_1.GhysX.os.audio.effectOn();
        }
      };
      main_menu.prototype.onClickStartButton = function(event, params) {};
      main_menu.prototype.onClickShareButton = function(event, params) {
        GhysX_1.GhysX.handler.emit("share", {});
      };
      main_menu.prototype.onclick_start = function() {
        cc.log("onclick_");
      };
      main_menu.prototype.init = function() {};
      main_menu.prototype.start = function() {};
      main_menu = __decorate([ ccclass ], main_menu);
      return main_menu;
    }(cc.Component);
    exports.default = main_menu;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX"
  } ],
  navigate_element: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f5f64edX1xDuoz1MmqhPS3T", "navigate_element");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var navigate_element = function(_super) {
      __extends(navigate_element, _super);
      function navigate_element() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.asset = null;
        _this.icon = null;
        return _this;
      }
      navigate_element.prototype.onLoad = function() {};
      navigate_element.prototype.start = function() {};
      __decorate([ property({
        type: cc.Asset,
        displayName: "\u56fe\u6807\u8d44\u6e90",
        tooltip: ""
      }) ], navigate_element.prototype, "asset", void 0);
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u56fe\u6807",
        tooltip: ""
      }) ], navigate_element.prototype, "icon", void 0);
      navigate_element = __decorate([ ccclass ], navigate_element);
      return navigate_element;
    }(cc.Component);
    exports.default = navigate_element;
    cc._RF.pop();
  }, {} ],
  navigate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2e09j9FllAMLFYln1212Gh", "navigate");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var navigate = function(_super) {
      __extends(navigate, _super);
      function navigate() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      navigate.prototype.onLoad = function() {};
      navigate.prototype.start = function() {};
      navigate = __decorate([ ccclass ], navigate);
      return navigate;
    }(cc.Component);
    exports.default = navigate;
    cc._RF.pop();
  }, {} ],
  options_dialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96c84nlWKhCo6H0RQR3s49P", "options_dialog");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var options_dialog = function(_super) {
      __extends(options_dialog, _super);
      function options_dialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.musicOpen = null;
        _this.musicClose = null;
        _this.effectOpen = null;
        _this.effectClose = null;
        return _this;
      }
      options_dialog.prototype.onClickMusicOpenButton = function(event, params) {
        GhysX_1.GhysX.os.audio.musicOff();
        this.musicOpen.node.active = GhysX_1.GhysX.os.audio.musicIsOpen();
        this.musicClose.node.active = !GhysX_1.GhysX.os.audio.musicIsOpen();
      };
      options_dialog.prototype.onClickMusicCloseButton = function(event, params) {
        GhysX_1.GhysX.os.audio.musicOn();
        this.musicOpen.node.active = GhysX_1.GhysX.os.audio.musicIsOpen();
        this.musicClose.node.active = !GhysX_1.GhysX.os.audio.musicIsOpen();
        GhysX_1.GhysX.os.audio.playMusic("sound/bg", true);
      };
      options_dialog.prototype.onClickEffectOpenButton = function(event, params) {
        GhysX_1.GhysX.os.audio.effectOff();
        this.effectOpen.node.active = GhysX_1.GhysX.os.audio.effectIsOpen();
        this.effectClose.node.active = !GhysX_1.GhysX.os.audio.effectIsOpen();
      };
      options_dialog.prototype.onClickEffectCloseButton = function(event, params) {
        GhysX_1.GhysX.os.audio.effectOn();
        this.effectOpen.node.active = GhysX_1.GhysX.os.audio.effectIsOpen();
        this.effectClose.node.active = !GhysX_1.GhysX.os.audio.effectIsOpen();
      };
      options_dialog.prototype.onLoad = function() {
        this.musicOpen.node.active = GhysX_1.GhysX.os.audio.musicIsOpen();
        this.musicClose.node.active = !GhysX_1.GhysX.os.audio.musicIsOpen();
        this.effectOpen.node.active = GhysX_1.GhysX.os.audio.effectIsOpen();
        this.effectClose.node.active = !GhysX_1.GhysX.os.audio.effectIsOpen();
      };
      options_dialog.prototype.start = function() {};
      __decorate([ property({
        type: cc.Button,
        displayName: "\u97f3\u6548\u5f00",
        tooltip: ""
      }) ], options_dialog.prototype, "musicOpen", void 0);
      __decorate([ property({
        type: cc.Button,
        displayName: "\u97f3\u6548\u5173",
        tooltip: ""
      }) ], options_dialog.prototype, "musicClose", void 0);
      __decorate([ property({
        type: cc.Button,
        displayName: "\u7279\u6548\u97f3\u5f00",
        tooltip: ""
      }) ], options_dialog.prototype, "effectOpen", void 0);
      __decorate([ property({
        type: cc.Button,
        displayName: "\u7279\u6548\u97f3\u5173",
        tooltip: ""
      }) ], options_dialog.prototype, "effectClose", void 0);
      options_dialog = __decorate([ ccclass ], options_dialog);
      return options_dialog;
    }(cc.Component);
    exports.default = options_dialog;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX"
  } ],
  player_select: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "030599PFRdLVKHv9OEJ+RYF", "player_select");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var player_select = function(_super) {
      __extends(player_select, _super);
      function player_select() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      player_select.prototype.init = function() {};
      player_select.prototype.onLoad = function() {
        GhysX_1.GhysX.local.stage_info.type = 1;
        GhysX_1.GhysX.local.stage_info.id = 1;
        GhysX_1.GhysX.handler.on("start_battle", function() {
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/battle/battle",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            order: GhysX_1.GhysX.graphics.ORDER.BACKGROUND,
            group_name: "battle",
            script: "battle",
            invoke: "init",
            params: {
              chapter_mould: GhysX_1.GhysX.res.chapter_moulds[GhysX_1.GhysX.local.stage_info.id]
            },
            complete: function(params) {
              GhysX_1.GhysX.graphics.manager.close("player_select");
            }
          });
        }, this);
      };
      player_select.prototype.start = function() {
        GhysX_1.GhysX.handler.emit("hide_banner", {});
      };
      player_select = __decorate([ ccclass ], player_select);
      return player_select;
    }(cc.Component);
    exports.default = player_select;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX"
  } ],
  polyglot: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      cc._RF.push(module, "9f842/XNfRPDYpObuyYBWFB", "polyglot");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(root, factory) {
        "function" === typeof define && define.amd ? define([], function() {
          return factory(root);
        }) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = factory(root) : root.Polyglot = factory(root);
      })("undefined" !== typeof global ? global : void 0, function(root) {
        var replace = String.prototype.replace;
        function Polyglot(options) {
          options = options || {};
          this.phrases = {};
          this.extend(options.phrases || {});
          this.currentLocale = options.locale || "en";
          this.allowMissing = !!options.allowMissing;
          this.warn = options.warn || warn;
        }
        Polyglot.VERSION = "1.0.0";
        Polyglot.prototype.locale = function(newLocale) {
          newLocale && (this.currentLocale = newLocale);
          return this.currentLocale;
        };
        Polyglot.prototype.extend = function(morePhrases, prefix) {
          var phrase;
          for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.extend(phrase, key) : this.phrases[key] = phrase;
          }
        };
        Polyglot.prototype.unset = function(morePhrases, prefix) {
          var phrase;
          if ("string" === typeof morePhrases) delete this.phrases[morePhrases]; else for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.unset(phrase, key) : delete this.phrases[key];
          }
        };
        Polyglot.prototype.clear = function() {
          this.phrases = {};
        };
        Polyglot.prototype.replace = function(newPhrases) {
          this.clear();
          this.extend(newPhrases);
        };
        Polyglot.prototype.t = function(key, options) {
          var phrase, result;
          options = null == options ? {} : options;
          "number" === typeof options && (options = {
            smart_count: options
          });
          if ("string" === typeof this.phrases[key]) phrase = this.phrases[key]; else if ("string" === typeof options._) phrase = options._; else if (this.allowMissing) phrase = key; else {
            this.warn('Missing translation for key: "' + key + '"');
            result = key;
          }
          if ("string" === typeof phrase) {
            options = clone(options);
            result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
            result = interpolate(result, options);
          }
          return result;
        };
        Polyglot.prototype.has = function(key) {
          return key in this.phrases;
        };
        var delimeter = "||||";
        var pluralTypes = {
          chinese: function chinese(n) {
            return 0;
          },
          german: function german(n) {
            return 1 !== n ? 1 : 0;
          },
          french: function french(n) {
            return n > 1 ? 1 : 0;
          },
          russian: function russian(n) {
            return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          czech: function czech(n) {
            return 1 === n ? 0 : n >= 2 && n <= 4 ? 1 : 2;
          },
          polish: function polish(n) {
            return 1 === n ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          icelandic: function icelandic(n) {
            return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
          }
        };
        var pluralTypeToLanguages = {
          chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
          german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
          french: [ "fr", "tl", "pt-br" ],
          russian: [ "hr", "ru" ],
          czech: [ "cs", "sk" ],
          polish: [ "pl" ],
          icelandic: [ "is" ]
        };
        function langToTypeMap(mapping) {
          var type, langs, l, ret = {};
          for (type in mapping) if (mapping.hasOwnProperty(type)) {
            langs = mapping[type];
            for (l in langs) ret[langs[l]] = type;
          }
          return ret;
        }
        var trimRe = /^\s+|\s+$/g;
        function trim(str) {
          return replace.call(str, trimRe, "");
        }
        function choosePluralForm(text, locale, count) {
          var ret, texts, chosenText;
          if (null != count && text) {
            texts = text.split(delimeter);
            chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
            ret = trim(chosenText);
          } else ret = text;
          return ret;
        }
        function pluralTypeName(locale) {
          var langToPluralType = langToTypeMap(pluralTypeToLanguages);
          return langToPluralType[locale] || langToPluralType.en;
        }
        function pluralTypeIndex(locale, count) {
          return pluralTypes[pluralTypeName(locale)](count);
        }
        var dollarRegex = /\$/g;
        var dollarBillsYall = "$$$$";
        function interpolate(phrase, options) {
          for (var arg in options) if ("_" !== arg && options.hasOwnProperty(arg)) {
            var replacement = options[arg];
            "string" === typeof replacement && (replacement = replace.call(options[arg], dollarRegex, dollarBillsYall));
            phrase = replace.call(phrase, new RegExp("%\\{" + arg + "\\}", "g"), replacement);
          }
          return phrase;
        }
        function warn(message) {
          root.console && root.console.warn && root.console.warn("WARNING: " + message);
        }
        function clone(source) {
          var ret = {};
          for (var prop in source) ret[prop] = source[prop];
          return ret;
        }
        return Polyglot;
      });
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {} ],
  res: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bebc40M7r1B1ZjsIbBQwmpx", "res");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.caches = {};
    exports.assets = {};
    cc._RF.pop();
  }, {} ],
  scene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a5c6kp7ztBer2n+UMkAilU", "scene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Scene = function(_super) {
      __extends(Scene, _super);
      function Scene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Scene.prototype.onLoad = function() {};
      Scene.prototype.start = function() {};
      Scene = __decorate([ ccclass ], Scene);
      return Scene;
    }(cc.Component);
    exports.default = Scene;
    cc._RF.pop();
  }, {} ],
  screen: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55651gvoIZLopXXyT7RkgtQ", "screen");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Screen = function(_super) {
      __extends(Screen, _super);
      function Screen() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Screen.prototype.onLoad = function() {
        false;
        GhysX_1.GhysX.initialize();
      };
      Screen.prototype.start = function() {
        GhysX_1.GhysX.handler.emit("launch_success", GhysX_1.GhysX);
      };
      Screen = __decorate([ ccclass ], Screen);
      return Screen;
    }(cc.Component);
    exports.default = Screen;
    cc._RF.pop();
  }, {
    "../../../GhysX": "GhysX"
  } ],
  skill_btn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3dd45hx1ldHPa+2vBrDYRnw", "skill_btn");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var skill_btn = function(_super) {
      __extends(skill_btn, _super);
      function skill_btn() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.count = null;
        _this.skill_type = -1;
        _this._bird = null;
        _this._player_id = 0;
        return _this;
      }
      skill_btn.prototype.onClickButton = function(event, params) {
        var count = ~~this.count.string;
        if (count > 0) {
          count--;
          this.count.string = "" + count;
          GhysX_1.GhysX.handler.emit("battle_ui_add_skill_" + this._player_id, 1 == this._player_id ? GhysX_1.GhysX.db.cache.battle_info.bird1 : GhysX_1.GhysX.db.cache.battle_info.bird2, ~~this.skill_type);
          count <= 0;
        } else {
          GhysX_1.GhysX.handler.emit("pause");
          GhysX_1.GhysX.graphics.manager.listener("start", "battle_waiting", function() {
            GhysX_1.GhysX.graphics.draw({
              url: "prefabs/battle/view/give_skill",
              mode: GhysX_1.GhysX.graphics.MODE.VIEW,
              order: GhysX_1.GhysX.graphics.ORDER.VIEW_DIALOG,
              group_name: "battle",
              script: "give_skill",
              invoke: "init",
              params: {
                buy_type: this.skill_type
              },
              complete: function(params) {}.bind(this)
            });
          }.bind(this), null);
          GhysX_1.GhysX.graphics.draw({
            url: "prefabs/battle/battle_waiting",
            mode: GhysX_1.GhysX.graphics.MODE.VIEW,
            order: GhysX_1.GhysX.graphics.ORDER.BACKGROUND,
            group_name: GhysX_1.GhysX.graphics.GROUP_NAME.BATTLE,
            script: "battle_waiting",
            invoke: "init",
            params: {
              open_mode: 1
            },
            complete: function(params) {}.bind(this)
          });
        }
      };
      skill_btn.prototype.onLoad = function() {};
      skill_btn.prototype.start = function() {};
      __decorate([ property({
        type: cc.Label,
        displayName: "\u6280\u80fd\u6570\u91cf",
        tooltip: ""
      }) ], skill_btn.prototype, "count", void 0);
      __decorate([ property({
        displayName: "\u6280\u80fd\u7c7b\u578b",
        tooltip: ""
      }) ], skill_btn.prototype, "skill_type", void 0);
      skill_btn = __decorate([ ccclass ], skill_btn);
      return skill_btn;
    }(cc.Component);
    exports.default = skill_btn;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX"
  } ],
  skill_element: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae0fbboqqtDUZONsH2gePDk", "skill_element");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var skill_element = function(_super) {
      __extends(skill_element, _super);
      function skill_element() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.progress = null;
        _this._duration = 4;
        _this._elapsed = 0;
        _this._running = false;
        _this._bird = null;
        _this._skill_type = 0;
        _this._is_pause = false;
        return _this;
      }
      skill_element.prototype.init = function(bird, skill_type) {
        this._bird = bird;
        this._skill_type = skill_type;
      };
      skill_element.prototype.isDone = function() {
        this._running = false;
        this.clean();
        this.node.destroy();
      };
      skill_element.prototype.clean = function() {
        GhysX_1.GhysX.handler.emit("battle_ui_remove_skill_" + this._bird._player_id, this);
        switch (this._skill_type) {
         case 1:
          this._bird && this._bird.isValid && this._bird.removeShield();
          break;

         default:
          this._bird && this._bird.isValid && (this._bird._bullet_type = 1);
        }
      };
      skill_element.prototype.pause = function() {
        this._is_pause = true;
      };
      skill_element.prototype.resume = function() {
        this._is_pause = false;
      };
      skill_element.prototype.onLoad = function() {
        GhysX_1.GhysX.graphics.draw({
          url: "effects/skill/skill",
          mode: GhysX_1.GhysX.graphics.MODE.ATLAS,
          asset_type: cc.SpriteAtlas,
          asset_name: "" + this._skill_type,
          target: this.icon
        });
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      skill_element.prototype.start = function() {
        this._running = true;
      };
      skill_element.prototype.update = function(dt) {
        if (this._running && !this._is_pause) {
          this._elapsed += dt;
          if (this._elapsed > this._duration) {
            this.progress.progress = 0;
            this.isDone();
          } else this.progress.progress = 1 - this._elapsed / this._duration;
        }
      };
      skill_element.prototype.onDestroy = function() {
        this._running && this.clean();
      };
      __decorate([ property({
        type: cc.Sprite,
        displayName: "\u56fe\u6807\u7ec4\u4ef6",
        tooltip: ""
      }) ], skill_element.prototype, "icon", void 0);
      __decorate([ property({
        type: cc.ProgressBar,
        displayName: "\u6280\u80fd\u8fdb\u5ea6",
        tooltip: ""
      }) ], skill_element.prototype, "progress", void 0);
      __decorate([ property({
        visible: false
      }) ], skill_element.prototype, "_duration", void 0);
      __decorate([ property({
        visible: false
      }) ], skill_element.prototype, "_elapsed", void 0);
      __decorate([ property({
        visible: false
      }) ], skill_element.prototype, "_running", void 0);
      skill_element = __decorate([ ccclass ], skill_element);
      return skill_element;
    }(cc.Component);
    exports.default = skill_element;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX"
  } ],
  skill_view: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9945pndiBP240zmoIBm9fU", "skill_view");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../libs/ghysx/GhysX");
    var skill_element_1 = require("./skill_element");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var skill_view = function(_super) {
      __extends(skill_view, _super);
      function skill_view() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.skillElementPrefab = null;
        _this.skills = null;
        _this._skill_elements = [];
        _this._player_id = 0;
        return _this;
      }
      skill_view.prototype.init = function(player_id) {
        this._player_id = player_id;
      };
      skill_view.prototype.addSkill = function(bird, skill_type) {
        if (this._skill_elements[skill_type]) {
          this._skill_elements[skill_type]._elapsed = 0;
          return;
        }
        switch (skill_type) {
         case 1:
          bird.addShield();
          break;

         default:
          for (var key in this._skill_elements) {
            var skill_element_2 = this._skill_elements[key];
            skill_element_2 && 1 != skill_element_2._skill_type && skill_element_2.isDone();
          }
          bird._bullet_type = skill_type;
        }
        var node = cc.instantiate(this.skillElementPrefab);
        var c = node.getComponent(skill_element_1.default);
        c.init(bird, skill_type);
        this.skills.node.addChild(node);
        this._skill_elements[skill_type] = c;
      };
      skill_view.prototype.removeSkill = function(skill_element) {
        this._skill_elements[skill_element._skill_type] = null;
      };
      skill_view.prototype.removeAllSkill = function(bird) {
        for (var key in this._skill_elements) {
          var skill_element_3 = this._skill_elements[key];
          skill_element_3 && skill_element_3.node.destroy();
        }
      };
      skill_view.prototype.onLoad = function() {
        GhysX_1.GhysX.handler.on("battle_ui_add_skill_" + this._player_id, this.addSkill, this);
        GhysX_1.GhysX.handler.on("battle_ui_remove_skill_" + this._player_id, this.removeSkill, this);
        GhysX_1.GhysX.handler.on("battle_ui_remove_all_skill_" + this._player_id, this.removeAllSkill, this);
      };
      skill_view.prototype.start = function() {};
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6280\u80fd\u7ec4\u4ef6",
        tooltip: ""
      }) ], skill_view.prototype, "skillElementPrefab", void 0);
      __decorate([ property({
        type: cc.Layout,
        displayName: "\u6280\u80fd\u5217\u8868",
        tooltip: ""
      }) ], skill_view.prototype, "skills", void 0);
      skill_view = __decorate([ ccclass ], skill_view);
      return skill_view;
    }(cc.Component);
    exports.default = skill_view;
    cc._RF.pop();
  }, {
    "../../../libs/ghysx/GhysX": "GhysX",
    "./skill_element": "skill_element"
  } ],
  spikes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0bc3dCR+zBE/YEFSYOsiFmL", "spikes");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var bird_1 = require("./bird");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var spikes = function(_super) {
      __extends(spikes, _super);
      function spikes() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      spikes.prototype.onCollisionEnter = function(other, self) {
        console.log("on collision enter snow");
        var world = self.world;
        var aabb = world.aabb;
        var preAabb = world.preAabb;
        var t = world.transform;
        var r = world.radius;
        var p = world.position;
        var ps = world.points;
      };
      spikes.prototype.onCollisionStay = function(other, self) {
        var _bird = other.node.getComponent(bird_1.default);
        _bird.body.linearVelocity = cc.v2(0, -100);
        _bird.death();
      };
      spikes.prototype.onCollisionExit = function(other, self) {
        console.log("on collision exit snow");
        var _bird = other.node.getComponent(bird_1.default);
      };
      spikes.prototype.go = function() {
        var animation = this.node.getComponent(cc.Animation);
        animation.play(animation.defaultClip.name);
      };
      spikes.prototype.pause = function() {
        var animation = this.node.getComponent(cc.Animation);
        animation.pause(animation.defaultClip.name);
      };
      spikes.prototype.resume = function() {
        var animation = this.node.getComponent(cc.Animation);
        animation.resume(animation.defaultClip.name);
      };
      spikes.prototype.onLoad = function() {
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      spikes.prototype.start = function() {};
      spikes = __decorate([ ccclass ], spikes);
      return spikes;
    }(cc.Component);
    exports.default = spikes;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./bird": "bird"
  } ],
  stage_manager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2fe0ZiXs9NbYo13oPbsKAF", "stage_manager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("./../../../libs/ghysx/GhysX");
    var chapter_1 = require("./../components/chapter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var stage_manager = function(_super) {
      __extends(stage_manager, _super);
      function stage_manager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.chapter_title_prefab = null;
        _this.scroll_view = null;
        return _this;
      }
      stage_manager.prototype.onClickBackButton = function(event, params) {};
      stage_manager.prototype.init = function() {};
      stage_manager.prototype.createTitle = function(chapter_moulds) {
        var node = cc.instantiate(this.chapter_title_prefab);
        var c = node.getComponent(chapter_1.default);
        c.init(chapter_moulds);
        this.scroll_view.content.addChild(node);
      };
      stage_manager.prototype.onLoad = function() {
        var chapter_mouldss = GhysX_1.GhysX.modules.array.group(GhysX_1.GhysX.res.chapter_moulds, [ {
          gkey: "group",
          ekey: "stage"
        } ]);
        for (var key in chapter_mouldss) {
          var chapter_moulds = chapter_mouldss[key];
          this.createTitle(chapter_moulds);
        }
      };
      stage_manager.prototype.start = function() {};
      stage_manager.prototype.onEnable = function() {
        GhysX_1.GhysX.handler.emit("hide_banner");
      };
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u7ae0\u8282\u7ec4\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage_manager.prototype, "chapter_title_prefab", void 0);
      __decorate([ property({
        type: cc.ScrollView,
        displayName: "\u5217\u8868\u5bb9\u5668",
        tooltip: ""
      }) ], stage_manager.prototype, "scroll_view", void 0);
      stage_manager = __decorate([ ccclass ], stage_manager);
      return stage_manager;
    }(cc.Component);
    exports.default = stage_manager;
    cc._RF.pop();
  }, {
    "./../../../libs/ghysx/GhysX": "GhysX",
    "./../components/chapter": "chapter"
  } ],
  stage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ecb1b9htNRMh7588eyC359/", "stage");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var bird_1 = require("../elements/bird");
    var tree_1 = require("../elements/tree");
    var boss_1 = require("../elements/boss");
    var spikes_1 = require("../elements/spikes");
    var grass_1 = require("../elements/grass");
    var flotage_1 = require("../elements/flotage");
    var fruits_1 = require("../elements/fruits");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var stage = function(_super) {
      __extends(stage, _super);
      function stage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.spikesPrefab = null;
        _this.grassPrefab = null;
        _this.birdPrefab = null;
        _this.treePrefab = null;
        _this.bossPrefab = null;
        _this.flotagePrefab = null;
        _this.fruitsPrefab = null;
        _this.map = null;
        _this.mapAnimation = null;
        _this.top = null;
        _this.bird = null;
        _this.birds = [];
        _this.targets = null;
        _this.bottom = null;
        _this._over = false;
        _this._tree_count = 0;
        _this._boss_rate = 0;
        return _this;
      }
      stage.prototype.onTouchStart = function(event, params) {
        if (this._over) return;
        GhysX_1.GhysX.handler.emit("jump", event);
      };
      stage.prototype.onTouchMove = function(event, params) {};
      stage.prototype.onTouchEnd = function(event, params) {};
      stage.prototype.onTouchCancel = function(event, params) {};
      stage.prototype.init = function() {};
      stage.prototype.createSpikes = function() {
        var node = cc.instantiate(this.spikesPrefab);
        var c = node.getComponent(spikes_1.default);
        this.map.addChild(node);
        node.setPosition(cc.v2(node.x, GhysX_1.GhysX.gui.frame.node.height / 2));
      };
      stage.prototype.createGrass = function() {
        var node = cc.instantiate(this.grassPrefab);
        var c = node.getComponent(grass_1.default);
        this.map.addChild(node);
        node.setPosition(cc.v2(node.x, -1 * GhysX_1.GhysX.gui.frame.node.height / 2));
      };
      stage.prototype.createBird = function(parent, bird_id, player_id) {
        var node = cc.instantiate(this.birdPrefab);
        var c = node.getComponent(bird_1.default);
        c.init(this, bird_id, player_id);
        parent.addChild(node);
        switch (player_id) {
         case 1:
          GhysX_1.GhysX.db.cache.battle_info.bird1 = c;
          break;

         default:
          GhysX_1.GhysX.db.cache.battle_info.bird2 = c;
        }
      };
      stage.prototype.createTree = function() {
        if (this._over) return;
        var limit_count = 3;
        GhysX_1.GhysX.db.cache.battle_info.tree_count && (limit_count = 6);
        if (this._tree_count > limit_count) {
          this._boss_rate += 10;
          if (this._boss_rate >= GhysX_1.GhysX.modules.unit.random(1, 100)) {
            this._tree_count = 0;
            this._boss_rate = 0;
            this.createBoss();
            return;
          }
        }
        var node = cc.instantiate(this.treePrefab);
        var c = node.getComponent(tree_1.default);
        c.init();
        this.top.addChild(node);
        var y = -1 * GhysX_1.GhysX.gui.frame.node.height / 2 - Math.random() * (1330 - GhysX_1.GhysX.gui.frame.node.height);
        var ay = Math.abs(y) - GhysX_1.GhysX.gui.frame.node.height / 2;
        node.setPosition(cc.v2(800, y));
        var rnodes = [];
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
          var child = _a[_i];
          if (ay > child.y + child.height || ay + GhysX_1.GhysX.gui.frame.node.height < child.y - child.height) {
            child.active = false;
            rnodes.push(child);
          }
        }
        for (var _b = 0, rnodes_1 = rnodes; _b < rnodes_1.length; _b++) {
          var child = rnodes_1[_b];
          child.removeFromParent(true);
        }
        rnodes = null;
        var t = 4;
        var pos = cc.v2(-800, y);
        var seq = cc.sequence(cc.spawn(cc.moveTo(t, pos), cc.sequence(cc.delayTime(2), cc.callFunc(function() {
          this.createTree();
        }.bind(this)))), cc.callFunc(function(sender) {
          sender.destroy();
        }.bind(this)));
        node.runAction(seq);
        this._tree_count++;
        GhysX_1.GhysX.db.cache.battle_info.tree_count++;
      };
      stage.prototype.createBoss = function() {
        var node = cc.instantiate(this.bossPrefab);
        var c = node.getComponent(boss_1.default);
        c.init(this, GhysX_1.GhysX.modules.unit.random(1, 5));
        this.node.addChild(node);
        var y = 0;
        node.setPosition(cc.v2(1e3, y));
        var t = 1.5;
        var pos = cc.v2(400, y);
        var seq = cc.sequence(cc.moveTo(t, pos), cc.callFunc(function(sender) {
          c.play();
        }.bind(this)));
        node.runAction(seq);
      };
      stage.prototype.createFlotage = function() {
        if (30 >= GhysX_1.GhysX.modules.unit.random(1, 100)) {
          var node = cc.instantiate(this.flotagePrefab);
          var c = node.getComponent(flotage_1.default);
          c.init(this, GhysX_1.GhysX.modules.unit.random(1, 4));
          this.targets.addChild(node);
          var h = 4 * GhysX_1.GhysX.gui.frame.node.height / 5;
          var half_h = h / 2;
          var start_y = -1 * half_h;
          var y = start_y + Math.random() * h;
          node.setPosition(cc.v2(800, y));
          var t = 4 + GhysX_1.GhysX.modules.unit.random(-100, 100) / 100 * 1;
          var pos = cc.v2(-800, y);
          var seq = cc.sequence(cc.moveTo(t, pos), cc.callFunc(function(sender) {
            sender.destroy();
          }.bind(this)));
          node.runAction(seq);
        }
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
          this.createFlotage();
        }.bind(this))));
      };
      stage.prototype.createFruits = function() {
        if (80 >= GhysX_1.GhysX.modules.unit.random(1, 100)) {
          var node = cc.instantiate(this.fruitsPrefab);
          var c = node.getComponent(fruits_1.default);
          c.init(this, GhysX_1.GhysX.modules.unit.random(1, 17));
          this.targets.addChild(node);
          var h = 4 * GhysX_1.GhysX.gui.frame.node.height / 5;
          var half_h = h / 2;
          var start_y = -1 * half_h;
          var y = start_y + Math.random() * h;
          node.setPosition(cc.v2(800, y));
          var t = 4 + GhysX_1.GhysX.modules.unit.random(-100, 100) / 100 * 1;
          var pos = cc.v2(-800, y);
          var seq = cc.sequence(cc.moveTo(t, pos), cc.callFunc(function(sender) {
            sender.destroy();
          }.bind(this)));
          node.runAction(seq);
        }
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
          this.createFruits();
        }.bind(this))));
      };
      stage.prototype.go = function() {
        GhysX_1.GhysX.db.cache.battle_info.start_time = new Date().getTime();
        this.createTree();
        this.createFlotage();
        this.createFruits();
        GhysX_1.GhysX.handler.emit("battle_ui_update_draw");
      };
      stage.prototype.pause = function() {
        this.node.pauseAllActions();
        this.top.pauseAllActions();
        this.bottom.pauseAllActions();
        this.targets.pauseAllActions();
        this.mapAnimation.pause(this.mapAnimation.defaultClip.name);
      };
      stage.prototype.resume = function() {
        this.node.resumeAllActions();
        this.top.resumeAllActions();
        this.bottom.resumeAllActions();
        this.targets.resumeAllActions();
        this.mapAnimation.resume(this.mapAnimation.defaultClip.name);
      };
      stage.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel.bind(this), this);
        this.createSpikes();
        this.createGrass();
        GhysX_1.GhysX.handler.on("go", this.go, this);
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
        GhysX_1.GhysX.handler.on("boss-death-over", function(listener, evnet_name, args) {
          listener.node.destroy();
        }.bind(this));
        GhysX_1.GhysX.handler.on("battle_over", function(params) {
          if (this._over) return;
          if (1 == GhysX_1.GhysX.db.cache.battle_info.role_count && GhysX_1.GhysX.db.cache.battle_info.revive) {
            GhysX_1.GhysX.db.cache.battle_info.revive = GhysX_1.GhysX.modules.unit.random(1, 100) <= 50;
            GhysX_1.GhysX.graphics.draw({
              url: "prefabs/battle/view/give_skill",
              mode: GhysX_1.GhysX.graphics.MODE.VIEW,
              order: GhysX_1.GhysX.graphics.ORDER.VIEW_DIALOG,
              group_name: "battle",
              script: "give_skill",
              invoke: "init",
              params: {
                revive: true
              },
              complete: function(params) {}.bind(this)
            });
            return;
          }
          GhysX_1.GhysX.db.cache.battle_info.role_count--;
          if (0 == GhysX_1.GhysX.db.cache.battle_info.role_count) {
            this._over = true;
            GhysX_1.GhysX.graphics.draw({
              url: "prefabs/battle/battle_result",
              mode: GhysX_1.GhysX.graphics.MODE.VIEW,
              order: GhysX_1.GhysX.graphics.ORDER.VIEW,
              group_name: "battle",
              script: "battle_result",
              invoke: "init",
              params: {},
              complete: function(params) {}
            });
          }
        }, this);
        switch (GhysX_1.GhysX.local.stage_info.type) {
         case 1:
          this.createBird(this.bird, GhysX_1.GhysX.local.stage_info.bird1, 1);
          break;

         default:
          this.createBird(this.birds[0], GhysX_1.GhysX.local.stage_info.bird1, 1);
          this.createBird(this.birds[1], GhysX_1.GhysX.local.stage_info.bird2, 2);
        }
      };
      stage.prototype.start = function() {};
      stage.prototype.onDestroy = function() {
        GhysX_1.GhysX.handler.off("beyond-pool");
        GhysX_1.GhysX.handler.off("score-effect-play-over");
      };
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u94a2\u9489\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage.prototype, "spikesPrefab", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u4e0b\u65b9\u9752\u8349\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage.prototype, "grassPrefab", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u5c0f\u9e1f\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage.prototype, "birdPrefab", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6811\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage.prototype, "treePrefab", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "boss\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage.prototype, "bossPrefab", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6f02\u6d6e\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage.prototype, "flotagePrefab", void 0);
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u6c34\u679c\u6f02\u6d6e\u7ec4\u4ef6",
        tooltip: ""
      }) ], stage.prototype, "fruitsPrefab", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u5730\u56fe\u5c42",
        tooltip: ""
      }) ], stage.prototype, "map", void 0);
      __decorate([ property({
        type: cc.Animation,
        displayName: "\u5730\u56fe\u5c42\u52a8\u753b",
        tooltip: ""
      }) ], stage.prototype, "mapAnimation", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u9876\u5c42",
        tooltip: ""
      }) ], stage.prototype, "top", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u5c0f\u9e1f-\u4e2a\u4eba\u6218",
        tooltip: ""
      }) ], stage.prototype, "bird", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u5c0f\u9e1f-\u597d\u53cb\u6218",
        tooltip: ""
      }) ], stage.prototype, "birds", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u5bf9\u8c61\u5c42",
        tooltip: ""
      }) ], stage.prototype, "targets", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "\u5e95\u5c42",
        tooltip: ""
      }) ], stage.prototype, "bottom", void 0);
      stage = __decorate([ ccclass ], stage);
      return stage;
    }(cc.Component);
    exports.default = stage;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "../elements/bird": "bird",
    "../elements/boss": "boss",
    "../elements/flotage": "flotage",
    "../elements/fruits": "fruits",
    "../elements/grass": "grass",
    "../elements/spikes": "spikes",
    "../elements/tree": "tree"
  } ],
  stomp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa969vYzABI5K/IZRi9tmVO", "stomp");
    "use strict";
    (function() {
      var Byte, Client, Frame, Stomp, __hasProp = {}.hasOwnProperty, __slice = [].slice;
      Byte = {
        LF: "\n",
        NULL: "\0"
      };
      Frame = function() {
        var unmarshallSingle;
        function Frame(command, headers, body) {
          this.command = command;
          this.headers = null != headers ? headers : {};
          this.body = null != body ? body : "";
        }
        Frame.prototype.toString = function() {
          var lines, name, skipContentLength, value, _ref;
          lines = [ this.command ];
          skipContentLength = false === this.headers["content-length"];
          skipContentLength && delete this.headers["content-length"];
          _ref = this.headers;
          for (name in _ref) {
            if (!__hasProp.call(_ref, name)) continue;
            value = _ref[name];
            lines.push(name + ":" + value);
          }
          this.body && !skipContentLength && lines.push("content-length:" + Frame.sizeOfUTF8(this.body));
          lines.push(Byte.LF + this.body);
          return lines.join(Byte.LF);
        };
        Frame.sizeOfUTF8 = function(s) {
          return s ? encodeURI(s).match(/%..|./g).length : 0;
        };
        unmarshallSingle = function unmarshallSingle(data) {
          var body, chr, command, divider, headerLines, headers, i, idx, len, line, start, trim, _i, _j, _len, _ref, _ref1;
          divider = data.search(RegExp("" + Byte.LF + Byte.LF));
          headerLines = data.substring(0, divider).split(Byte.LF);
          command = headerLines.shift();
          headers = {};
          trim = function trim(str) {
            return str.replace(/^\s+|\s+$/g, "");
          };
          _ref = headerLines.reverse();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            line = _ref[_i];
            idx = line.indexOf(":");
            headers[trim(line.substring(0, idx))] = trim(line.substring(idx + 1));
          }
          body = "";
          start = divider + 2;
          if (headers["content-length"]) {
            len = parseInt(headers["content-length"]);
            body = ("" + data).substring(start, start + len);
          } else {
            chr = null;
            for (i = _j = start, _ref1 = data.length; start <= _ref1 ? _j < _ref1 : _j > _ref1; i = start <= _ref1 ? ++_j : --_j) {
              chr = data.charAt(i);
              if (chr === Byte.NULL) break;
              body += chr;
            }
          }
          return new Frame(command, headers, body);
        };
        Frame.unmarshall = function(datas) {
          var frame, frames, last_frame, r;
          frames = datas.split(RegExp("" + Byte.NULL + Byte.LF + "*"));
          r = {
            frames: [],
            partial: ""
          };
          r.frames = function() {
            var _i, _len, _ref, _results;
            _ref = frames.slice(0, -1);
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              frame = _ref[_i];
              _results.push(unmarshallSingle(frame));
            }
            return _results;
          }();
          last_frame = frames.slice(-1)[0];
          last_frame === Byte.LF || -1 !== last_frame.search(RegExp("" + Byte.NULL + Byte.LF + "*$")) ? r.frames.push(unmarshallSingle(last_frame)) : r.partial = last_frame;
          return r;
        };
        Frame.marshall = function(command, headers, body) {
          var frame;
          frame = new Frame(command, headers, body);
          return frame.toString() + Byte.NULL;
        };
        return Frame;
      }();
      Client = function() {
        var now;
        function Client(ws) {
          this.ws = ws;
          this.ws.binaryType = "arraybuffer";
          this.counter = 0;
          this.connected = false;
          this.heartbeat = {
            outgoing: 1e4,
            incoming: 1e4
          };
          this.maxWebSocketFrameSize = 16384;
          this.subscriptions = {};
          this.partialData = "";
        }
        Client.prototype.debug = function(message) {
          var _ref;
          return "undefined" !== typeof window && null !== window && null != (_ref = window.console) ? _ref.log(message) : void 0;
        };
        now = function now() {
          return Date.now ? Date.now() : new Date().valueOf;
        };
        Client.prototype._transmit = function(command, headers, body) {
          var out;
          out = Frame.marshall(command, headers, body);
          "function" === typeof this.debug && this.debug(">>> " + out);
          while (true) {
            if (!(out.length > this.maxWebSocketFrameSize)) return this.ws.send(out);
            this.ws.send(out.substring(0, this.maxWebSocketFrameSize));
            out = out.substring(this.maxWebSocketFrameSize);
            "function" === typeof this.debug && this.debug("remaining = " + out.length);
          }
        };
        Client.prototype._setupHeartbeat = function(headers) {
          var serverIncoming, serverOutgoing, ttl, v, _ref, _ref1;
          if ((_ref = headers.version) !== Stomp.VERSIONS.V1_1 && _ref !== Stomp.VERSIONS.V1_2) return;
          _ref1 = function() {
            var _i, _len, _ref1, _results;
            _ref1 = headers["heart-beat"].split(",");
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              v = _ref1[_i];
              _results.push(parseInt(v));
            }
            return _results;
          }(), serverOutgoing = _ref1[0], serverIncoming = _ref1[1];
          if (!(0 === this.heartbeat.outgoing || 0 === serverIncoming)) {
            ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
            "function" === typeof this.debug && this.debug("send PING every " + ttl + "ms");
            this.pinger = Stomp.setInterval(ttl, function(_this) {
              return function() {
                _this.ws.send(Byte.LF);
                return "function" === typeof _this.debug ? _this.debug(">>> PING") : void 0;
              };
            }(this));
          }
          if (!(0 === this.heartbeat.incoming || 0 === serverOutgoing)) {
            ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
            "function" === typeof this.debug && this.debug("check PONG every " + ttl + "ms");
            return this.ponger = Stomp.setInterval(ttl, function(_this) {
              return function() {
                var delta;
                delta = now() - _this.serverActivity;
                if (delta > 2 * ttl) {
                  "function" === typeof _this.debug && _this.debug("did not receive server activity for the last " + delta + "ms");
                  return _this.ws.close();
                }
              };
            }(this));
          }
        };
        Client.prototype._parseConnect = function() {
          var args, connectCallback, errorCallback, headers;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          headers = {};
          switch (args.length) {
           case 2:
            headers = args[0], connectCallback = args[1];
            break;

           case 3:
            args[1] instanceof Function ? (headers = args[0], connectCallback = args[1], errorCallback = args[2]) : (headers.login = args[0], 
            headers.passcode = args[1], connectCallback = args[2]);
            break;

           case 4:
            headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], 
            errorCallback = args[3];
            break;

           default:
            headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], 
            errorCallback = args[3], headers.host = args[4];
          }
          return [ headers, connectCallback, errorCallback ];
        };
        Client.prototype.connect = function() {
          var args, errorCallback, headers, out;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          out = this._parseConnect.apply(this, args);
          headers = out[0], this.connectCallback = out[1], errorCallback = out[2];
          "function" === typeof this.debug && this.debug("Opening Web Socket...");
          this.ws.onmessage = function(_this) {
            return function(evt) {
              var arr, c, client, data, frame, messageID, onreceive, subscription, unmarshalledData, _i, _len, _ref, _results;
              data = "undefined" !== typeof ArrayBuffer && evt.data instanceof ArrayBuffer ? (arr = new Uint8Array(evt.data), 
              "function" === typeof _this.debug ? _this.debug("--- got data length: " + arr.length) : void 0, 
              function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = arr.length; _i < _len; _i++) {
                  c = arr[_i];
                  _results.push(String.fromCharCode(c));
                }
                return _results;
              }().join("")) : evt.data;
              _this.serverActivity = now();
              if (data === Byte.LF) {
                "function" === typeof _this.debug && _this.debug("<<< PONG");
                return;
              }
              "function" === typeof _this.debug && _this.debug("<<< " + data);
              unmarshalledData = Frame.unmarshall(_this.partialData + data);
              _this.partialData = unmarshalledData.partial;
              _ref = unmarshalledData.frames;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                frame = _ref[_i];
                switch (frame.command) {
                 case "CONNECTED":
                  "function" === typeof _this.debug && _this.debug("connected to server " + frame.headers.server);
                  _this.connected = true;
                  _this._setupHeartbeat(frame.headers);
                  _results.push("function" === typeof _this.connectCallback ? _this.connectCallback(frame) : void 0);
                  break;

                 case "MESSAGE":
                  subscription = frame.headers.subscription;
                  onreceive = _this.subscriptions[subscription] || _this.onreceive;
                  if (onreceive) {
                    client = _this;
                    messageID = frame.headers["message-id"];
                    frame.ack = function(headers) {
                      null == headers && (headers = {});
                      return client.ack(messageID, subscription, headers);
                    };
                    frame.nack = function(headers) {
                      null == headers && (headers = {});
                      return client.nack(messageID, subscription, headers);
                    };
                    _results.push(onreceive(frame));
                  } else _results.push("function" === typeof _this.debug ? _this.debug("Unhandled received MESSAGE: " + frame) : void 0);
                  break;

                 case "RECEIPT":
                  _results.push("function" === typeof _this.onreceipt ? _this.onreceipt(frame) : void 0);
                  break;

                 case "ERROR":
                  _results.push("function" === typeof errorCallback ? errorCallback(frame) : void 0);
                  break;

                 default:
                  _results.push("function" === typeof _this.debug ? _this.debug("Unhandled frame: " + frame) : void 0);
                }
              }
              return _results;
            };
          }(this);
          this.ws.onclose = function(_this) {
            return function() {
              var msg;
              msg = "Whoops! Lost connection to " + _this.ws.url;
              "function" === typeof _this.debug && _this.debug(msg);
              _this._cleanUp();
              return "function" === typeof errorCallback ? errorCallback(msg) : void 0;
            };
          }(this);
          return this.ws.onopen = function(_this) {
            return function() {
              "function" === typeof _this.debug && _this.debug("Web Socket Opened...");
              headers["accept-version"] = Stomp.VERSIONS.supportedVersions();
              headers["heart-beat"] = [ _this.heartbeat.outgoing, _this.heartbeat.incoming ].join(",");
              return _this._transmit("CONNECT", headers);
            };
          }(this);
        };
        Client.prototype.disconnect = function(disconnectCallback, headers) {
          null == headers && (headers = {});
          this._transmit("DISCONNECT", headers);
          this.ws.onclose = null;
          this.ws.close();
          this._cleanUp();
          return "function" === typeof disconnectCallback ? disconnectCallback() : void 0;
        };
        Client.prototype._cleanUp = function() {
          this.connected = false;
          this.pinger && Stomp.clearInterval(this.pinger);
          if (this.ponger) return Stomp.clearInterval(this.ponger);
        };
        Client.prototype.send = function(destination, headers, body) {
          null == headers && (headers = {});
          null == body && (body = "");
          headers.destination = destination;
          return this._transmit("SEND", headers, body);
        };
        Client.prototype.subscribe = function(destination, callback, headers) {
          var client;
          null == headers && (headers = {});
          headers.id || (headers.id = "sub-" + this.counter++);
          headers.destination = destination;
          this.subscriptions[headers.id] = callback;
          this._transmit("SUBSCRIBE", headers);
          client = this;
          return {
            id: headers.id,
            unsubscribe: function unsubscribe() {
              return client.unsubscribe(headers.id);
            }
          };
        };
        Client.prototype.unsubscribe = function(id) {
          delete this.subscriptions[id];
          return this._transmit("UNSUBSCRIBE", {
            id: id
          });
        };
        Client.prototype.begin = function(transaction) {
          var client, txid;
          txid = transaction || "tx-" + this.counter++;
          this._transmit("BEGIN", {
            transaction: txid
          });
          client = this;
          return {
            id: txid,
            commit: function commit() {
              return client.commit(txid);
            },
            abort: function abort() {
              return client.abort(txid);
            }
          };
        };
        Client.prototype.commit = function(transaction) {
          return this._transmit("COMMIT", {
            transaction: transaction
          });
        };
        Client.prototype.abort = function(transaction) {
          return this._transmit("ABORT", {
            transaction: transaction
          });
        };
        Client.prototype.ack = function(messageID, subscription, headers) {
          null == headers && (headers = {});
          headers["message-id"] = messageID;
          headers.subscription = subscription;
          return this._transmit("ACK", headers);
        };
        Client.prototype.nack = function(messageID, subscription, headers) {
          null == headers && (headers = {});
          headers["message-id"] = messageID;
          headers.subscription = subscription;
          return this._transmit("NACK", headers);
        };
        return Client;
      }();
      Stomp = {
        VERSIONS: {
          V1_0: "1.0",
          V1_1: "1.1",
          V1_2: "1.2",
          supportedVersions: function supportedVersions() {
            return "1.1,1.0";
          }
        },
        client: function client(url, protocols) {
          var klass, ws;
          null == protocols && (protocols = [ "v10.stomp", "v11.stomp" ]);
          klass = Stomp.WebSocketClass || WebSocket;
          ws = new klass(url, protocols);
          return new Client(ws);
        },
        over: function over(ws) {
          return new Client(ws);
        },
        Frame: Frame
      };
      "undefined" !== typeof exports && null !== exports && (exports.Stomp = Stomp);
      if ("undefined" !== typeof window && null !== window) {
        Stomp.setInterval = function(interval, f) {
          return window.setInterval(f, interval);
        };
        Stomp.clearInterval = function(id) {
          return window.clearInterval(id);
        };
        window.Stomp = Stomp;
      } else exports || (self.Stomp = Stomp);
    }).call(void 0);
    cc._RF.pop();
  }, {} ],
  "third-party": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0caacACaDFEuZljKkQge/hf", "third-party");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      init: function init(thirdpartyName) {
        if ("aladin" === thirdpartyName) {
          var aladin = require("aladin");
          aladin.initAladin();
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    aladin: void 0
  } ],
  timer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "949b0hKq9lH/JgV4mapDb/r", "timer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Timer = function(_super) {
      __extends(Timer, _super);
      function Timer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "00:00:00";
        return _this;
      }
      Timer.prototype.init = function() {};
      Timer.prototype.onLoad = function() {};
      Timer.prototype.start = function() {};
      Timer.prototype.update = function(dt) {};
      __decorate([ property(cc.Label) ], Timer.prototype, "label", void 0);
      __decorate([ property ], Timer.prototype, "text", void 0);
      Timer = __decorate([ ccclass ], Timer);
      return Timer;
    }(cc.Component);
    exports.default = Timer;
    cc._RF.pop();
  }, {} ],
  tip_message: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "825c1m1HHxM3bB5aQ/lRrhT", "tip_message");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tip_message = function(_super) {
      __extends(tip_message, _super);
      function tip_message() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.message = null;
        return _this;
      }
      tip_message.prototype.init = function(params) {
        this._message_string = params.message;
      };
      tip_message.prototype.playOver = function() {
        this.node.destroy();
      };
      tip_message.prototype.onLoad = function() {
        this.message.string = this._message_string;
      };
      tip_message.prototype.start = function() {};
      __decorate([ property({
        type: cc.Label,
        displayName: "\u63d0\u793a\u4fe1\u606f",
        tooltip: "\u63d0\u793a\u4fe1\u606f"
      }) ], tip_message.prototype, "message", void 0);
      tip_message = __decorate([ ccclass ], tip_message);
      return tip_message;
    }(cc.Component);
    exports.default = tip_message;
    cc._RF.pop();
  }, {} ],
  tree_mould: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7842a9VD15I9q8v+Du4IJaK", "tree_mould");
    cc._RF.pop();
  }, {} ],
  tree_section: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4925aH3fZhMY5JQcyfmBXUx", "tree_section");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tree_section = function(_super) {
      __extends(tree_section, _super);
      function tree_section() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._section_id = 0;
        _this._bullet_type = 0;
        _this._bullet_count = 1;
        _this._score = 1;
        return _this;
      }
      tree_section.prototype.onLoad = function() {
        this._section_id = ~~this.node.name;
        var section_type = -1;
        var section_infos = GhysX_1.GhysX.db.cache.tree_info.section_infos;
        section_infos[0][2][this._section_id] ? section_type = 0 : section_infos[1][2][this._section_id] && (section_type = 1);
        var rate = 50;
        rate = GhysX_1.GhysX.db.cache.battle_info.tree_count < 10 ? 10 : Math.min(100, 50 + 10 * Math.floor((GhysX_1.GhysX.db.cache.battle_info.tree_count - 10) / 10));
        if (section_type > -1 && GhysX_1.GhysX.modules.unit.random(1, 100) <= rate) {
          var pic = this.node.getComponent(cc.Sprite);
          GhysX_1.GhysX.graphics.draw({
            url: "images/map/elements/tree",
            mode: GhysX_1.GhysX.graphics.MODE.ATLAS,
            asset_type: cc.SpriteAtlas,
            asset_name: "s" + this._section_id,
            target: pic
          });
          this._bullet_type = section_infos[section_type][0][0];
          this._bullet_count = section_infos[section_type][0][1];
          this._score = section_infos[section_type][0][1];
        }
      };
      tree_section.prototype.start = function() {};
      tree_section = __decorate([ ccclass ], tree_section);
      return tree_section;
    }(cc.Component);
    exports.default = tree_section;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX"
  } ],
  tree: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c1b4o8hMNIm6sSWyX2M02I", "tree");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GhysX_1 = require("../../../../libs/ghysx/GhysX");
    var hit_section_1 = require("./hit_section");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tree = function(_super) {
      __extends(tree, _super);
      function tree() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hitSection = null;
        _this._check = true;
        return _this;
      }
      tree.prototype.init = function() {};
      tree.prototype.hit = function(bullet, tree_section) {
        if (bullet._bullet_type >= tree_section._bullet_type && tree_section.enabled && tree_section.node.active) {
          tree_section._bullet_count--;
          if (0 == tree_section._bullet_count) {
            var node = cc.instantiate(this.hitSection);
            var c = node.getComponent(hit_section_1.default);
            tree_section.node.parent.addChild(node);
            node.setPosition(cc.v2(tree_section.node.x, tree_section.node.y + tree_section.node.height / 2));
            tree_section.node.destroy();
            GhysX_1.GhysX.db.cache.battle_info.score += tree_section._score;
            switch (bullet._bird._player_id) {
             case 1:
              GhysX_1.GhysX.db.cache.battle_info.score1 += tree_section._score;
              break;

             case 2:
              GhysX_1.GhysX.db.cache.battle_info.score2 += tree_section._score;
            }
            GhysX_1.GhysX.handler.emit("battle_ui_update_draw");
            bullet._bullet_type < 4 ? GhysX_1.GhysX.os.audio.playEffect("music/effect/wood", false) : GhysX_1.GhysX.os.audio.playEffect("music/effect/bomb1", false);
          }
        }
      };
      tree.prototype.pause = function() {
        this.node.pauseAllActions();
      };
      tree.prototype.resume = function() {
        this.node.resumeAllActions();
      };
      tree.prototype.onLoad = function() {
        GhysX_1.GhysX.handler.on("hit", this.hit, this);
        GhysX_1.GhysX.handler.on("pause", this.pause, this);
        GhysX_1.GhysX.handler.on("resume", this.resume, this);
      };
      tree.prototype.start = function() {};
      tree.prototype.update = function(dt) {
        if (this._check && this.node.x < -300) {
          this._check = false;
          for (var _i = 0, _a = this.node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.isValid && child.removeComponent(cc.PolygonCollider);
          }
        }
      };
      __decorate([ property({
        type: cc.Prefab,
        displayName: "\u5207\u7247\u7ec4\u4ef6",
        tooltip: ""
      }) ], tree.prototype, "hitSection", void 0);
      tree = __decorate([ ccclass ], tree);
      return tree;
    }(cc.Component);
    exports.default = tree;
    cc._RF.pop();
  }, {
    "../../../../libs/ghysx/GhysX": "GhysX",
    "./hit_section": "hit_section"
  } ],
  user: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68f11U3A1RLjZzEt69TaSXo", "user");
    cc._RF.pop();
  }, {} ],
  view: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a2cfa/pWalC7pM68oQ1BPZx", "view");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var View = function(_super) {
      __extends(View, _super);
      function View() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      View.prototype.start = function() {};
      View = __decorate([ ccclass ], View);
      return View;
    }(cc.Component);
    exports.default = View;
    cc._RF.pop();
  }, {} ],
  "wx.d.ts": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d0978iH4lJpqqZSMCqXWvp", "wx.d.ts");
    cc._RF.pop();
  }, {} ],
  wxlogin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e70c8UeWrNB4bbRhUGX0zyL", "wxlogin");
    "use strict";
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
        }
      },
      init: function init(home) {
        var self = this;
        this.home = home;
        cc.ql.net.of("/index").on("login_success", function(message) {
          cc.log("login:", message);
          0 == message.status && (self.playerScore.string = message.data.user.gems);
        });
        cc.state_machine.add({
          _name: "login_guest_success",
          _init: function _init(terminal) {},
          _inited: false,
          _instance: this,
          _state: 0,
          _invoke: function _invoke(terminal, instance, params) {
            cc.sys.localStorage.setItem("guest_account", params.data.guest.account);
            cc.ql.net.send("message", {
              gate: "login",
              handler: "login",
              invoke: "login_success",
              data: {
                account: params.data.guest.account
              }
            }, "proto");
            return true;
          },
          _terminal: null,
          _terminals: null
        });
        cc.state_machine.add({
          _name: "login_account_success",
          _init: function _init(terminal) {},
          _inited: false,
          _instance: this,
          _state: 0,
          _invoke: function _invoke(terminal, instance, params) {
            return true;
          },
          _terminal: null,
          _terminals: null
        });
        cc.state_machine.init();
      },
      onLoad: function onLoad() {
        var self = this;
        if (void 0 != window.wx) wx.authorize({
          scope: "scope.record",
          fail: function fail(res) {
            res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1;
          },
          success: function success(res) {
            wx.login({
              success: function success() {
                wx.getUserInfo({
                  success: function success(res) {
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    var gender = userInfo.gender;
                    var province = userInfo.province;
                    var city = userInfo.city;
                    var country = userInfo.country;
                    self.playerName.string = nickName;
                    cc.loader.load({
                      url: avatarUrl,
                      type: "jpg"
                    }, function(err, texture) {
                      self.playerHead.spriteFrame = new cc.SpriteFrame(texture);
                    });
                    cc.ql.net.of("/index").once("user", function(message) {
                      cc.log("guest:", message);
                      0 == message.status && cc.state_machine.execute("login_account_success", 0, message);
                    });
                    cc.ql.net.send("message", {
                      gate: "login",
                      handler: "user",
                      invoke: "user",
                      data: {
                        weixin: res,
                        platform: {
                          account: userInfo.account
                        }
                      }
                    }, "proto");
                  }
                });
              }
            });
          }
        }); else {
          cc.ql.net.of("/index").once("guest", function(message) {
            cc.log("guest:", message);
            if (0 == message.status) {
              self.playerName.string = "guest";
              cc.state_machine.execute("login_guest_success", 0, message);
            }
          });
          var guest_account = cc.sys.localStorage.getItem("guest_account") || "";
          cc.ql.net.send("message", {
            gate: "login",
            handler: "guest",
            invoke: "guest",
            data: {
              guest: {
                account: guest_account
              }
            }
          }, "proto");
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  zh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8371F2b0xMK4F+LmHnZecB", "zh");
    "use strict";
    var _module$exports;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    module.exports = (_module$exports = {
      loading: "\u52a0\u8f7d\u4e2d...",
      update_load_data_tip: "\u6b63\u5728\u8fdb\u5165\u9ad8\u6e05\u4e09\u56fd\u4e16\u754c",
      update_load_sprite_tip: "\u52a0\u8f7d\u89d2\u8272\u7eb9\u7406\u8d44\u6e90",
      update_load_effect_tip: "\u52a0\u8f7d\u7279\u6548\u8d44\u6e90",
      function_is_not_implemented_yet_tip: "\u529f\u80fd\u6682\u672a\u5b9e\u73b0",
      unacquired_hero_tip: "\u5c1a\u672a\u83b7\u5f97\u8be5\u82f1\u96c4",
      formation_add_ship_erro_tip: "\u4e3b\u89d2\u7b49\u7ea7\u6216VIP\u7b49\u7ea7\u4e0d\u8db3",
      offline_reward_close_tip: "\u6ca1\u6709\u9886\u53d6\u6302\u673a\u5956\u52b1",
      shop_buy_success: "\u8d2d\u4e70\u6210\u529f",
      year: "\u5e74",
      month: "\u6708",
      date: "\u5929",
      day: "\u5929",
      current_day: "\u65e5",
      hour: "\u65f6",
      minute: "\u5206",
      second: "\u79d2",
      class: "\u7ea7",
      mhour: "\u5c0f\u65f6",
      mminute: "\u5206\u949f",
      strength_master_notopen: "\u672a\u5f00\u542f",
      ship_lieutenant_not: "\u5f53\u524d\u6ca1\u6709\u6b66\u5c06\u4e0a\u9635",
      break_class: "\u7a81\u7834\u7b49\u7ea7",
      forging_master_words: "\u6b66\u5c06\u5168\u90e8\u88c5\u5907",
      forging_achieve_words: "\u8fbe\u5230",
      forging_achieve_open: "\u5f00\u542f",
      forging_undeveloped: "\u656c\u8bf7\u671f\u5f85",
      lv_rank_full: "\u5df2\u6ee1\u7ea7",
      lv_rank: "\u5347\u7ea7",
      all_break: "\u5168\u519b",
      not_on_the_list: "\u672a\u4e0a\u699c",
      boss_fight_count_is_limit: "\u6b21\u6570\u5df2\u6ee1\uff0c\u4e0d\u9700\u8981\u8d2d\u4e70",
      boss_rank_not_on_the_list: "\u672a\u6709\u6392\u540d",
      system_name: "\u7cfb\u7edf",
      join_fight_team: "\u8fdb\u5165\u961f\u4f0d",
      war_pet_info: "\u6218\u5ba0\u4fe1\u606f",
      war_pet_upgrade: "\u6218\u5ba0\u5347\u7ea7",
      war_pet_star: "\u6218\u5ba0\u5347\u661f",
      war_pet_book: "\u6218\u5ba0\u56fe\u9274",
      war_pet_isupgrade: "\u5347\u7ea7\u56fe\u9274",
      war_pet_isopen: "\u6fc0\u6d3b\u56fe\u9274",
      war_pet_starfull: "\u661f\u7ea7\u5df2\u6ee1,\u65e0\u6cd5\u5347\u7ea7",
      mount_info: "\u5750\u9a91\u4fe1\u606f",
      mount_upgrade: "\u5750\u9a91\u5347\u7ea7",
      mount_star: "\u5750\u9a91\u5347\u661f",
      mount_stone: "\u788e\u7247",
      other_address_login: "\u5e10\u53f7\u5728\u5176\u4ed6\u5730\u65b9\u767b\u9646",
      resume_network: "\u7f51\u7edc\u65ad\u5f00\uff0c\u5df2\u7ecf\u5e2e\u60a8\u6062\u590d\u8fde\u63a5\u3002",
      prop_no_enough: "\u5347\u7ea7\u9053\u5177\u4e0d\u8db3",
      mov_pet_info: "\u62db\u5f0f\u4fe1\u606f",
      mov_pet_upgrade: "\u62db\u5f0f\u5347\u7ea7",
      mov_pet_star: "\u62db\u5f0f\u5347\u661f",
      mov_pet_book: "\u62db\u5f0f\u56fe\u9274",
      buy_count_reach_the_upper_limit: "\u6570\u91cf\u8fbe\u5230\u4e0a\u9650\uff0c\u6682\u4e0d\u9700\u8981\u8d2d\u4e70\uff01",
      mov_open: "\u8bf7\u5148\u6fc0\u6d3b\u62db\u5f0f",
      expedition_tip_one: "\u8be5\u5173\u5361\u5df2\u7ecf\u901a\u5173\uff0c\u6e05\u524d\u5f80\u4e0b\u4e00\u5173",
      expedition_tip_two: "\u8bf7\u5148\u901a\u8fc7\u4e0a\u4e00\u5173",
      upgrade_lv_mov: "\u62db\u5f0f\u7b49\u7ea7",
      upgrade_lv_pet: "\u6218\u5ba0\u7b49\u7ea7",
      upgrade_lv_mount: "\u5750\u9a91\u7b49\u7ea7",
      did_not_play: "\u672a\u4e0a\u9635",
      friend: "\u597d\u53cb",
      friend_gift_get: "\u793c\u7269\u9886\u53d6",
      frieng_send: "\u597d\u53cb\u7533\u8bf7",
      friend_nobody: "\u65e0",
      friend_get: "\u5df2\u7533\u8bf7",
      friend_self: "\u60a8\u81ea\u5df1",
      ten_thousand: "\u4e07",
      a_hundred_million: "\u4ebf",
      please_activate_previous_star_of_life: "\u8bf7\u5148\u6fc0\u6d3b\u4e0a\u4e00\u4e2a\u547d\u661f\u54e6",
      lv_break: "\u7a81\u7834",
      add_friend_apl: "\u7533\u8bf7\u4fe1\u606f\u5df2\u53d1\u51fa",
      not_have: "\u65e0",
      star_lv_mov: "\u62db\u5f0f\u661f\u7ea7",
      star_lv_pet: "\u6218\u5ba0\u661f\u7ea7",
      have_ship: "\u62e5\u6709:",
      no_activity: "\u6d3b\u52a8\u672a\u5f00\u542f",
      send_message_interval_time: "\u9700\u8981\u95f4\u96945\u79d2\u624d\u80fd\u53d1\u8a00",
      rank_list_lv: "lv:",
      rank_list_guanqia: "\u5173\u5361\u6570:",
      rank_list_power: "\u6218\u6597\u529b:",
      shop_cell: "\u6676\u77f3\u4e0d\u8db3",
      no_ship: "\u672a\u6fc0\u6d3b\u6b66\u5c06",
      shop_cell_rank: "\u7ade\u6280\u70b9\u4e0d\u8db3",
      pet_skill: "\u5ba0\u7269\u6280\u80fd",
      ship_skill: "\u6b66\u5c06\u6280\u80fd",
      repeat_send_message_interval_time: "\u91cd\u590d\u5185\u5bb9\u53d1\u9001\u65f6\u95f4\u96941\u5206\u949f",
      please_choose_prop: "\u8bf7\u5148\u9009\u62e9\u7269\u54c1",
      equipment_backpack_is_full: "\u88c5\u5907\u80cc\u5305\u5df2\u6ee1\uff0c\u8bf7\u524d\u5f80\u56de\u6536",
      full_star: "\u5df2\u6ee1\u661f",
      rise_star: "\u5347\u661f",
      master: "\u5168\u8eab",
      person_legion_point: "\u4e2a\u4eba\u8d21\u732e\u70b9\u4e0d\u8db3",
      friend_find: "\u641c\u7d22\u597d\u53cb"
    }, _defineProperty(_module$exports, "friend_get", "\u63a8\u8350\u597d\u53cb"), _defineProperty(_module$exports, "friend_ship_point", "\u53cb\u60c5\u70b9\u4e0d\u8db3"), 
    _defineProperty(_module$exports, "activity_end", "\u6d3b\u52a8\u5df2\u7ed3\u675f"), 
    _module$exports);
    cc._RF.pop();
  }, {} ]
}, {}, [ "LabelLocalized", "SpriteLocalized", "en", "zh", "i18n", "polyglot", "GhysX.d.ts", "GhysX", "Clocker", "scene", "screen", "timer", "AnimationEventListener", "view", "Array", "Base64", "CryptoJS", "Number", "String", "TextToJson", "Unit", "Utils", "Graphics", "Shader", "db", "user", "stomp", "Http", "Network", "Protocol", "Socket", "Assets", "Audio", "Storage", "System", "chapter_mould", "tree_mould", "res", "Binder", "Closer", "Frame", "GUI", "Invoker", "Loader", "Opener", "Resources", "Scripter", "ScrollViewHandler", "Platform", "WXPlatform", "WeiXinPlatform", "ald-game-conf", "ald-game", "wxlogin", "third-party", "skill_btn", "give_skill", "bird", "boss", "bullet", "fire", "flotage", "fruits", "grass", "hit_section", "spikes", "tree", "tree_section", "stage", "navigate_element", "navigate", "guide", "local.d.ts", "wx.d.ts", "battle", "battle_pause", "battle_result", "battle_ui", "battle_waiting", "skill_element", "skill_view", "CollisionManager", "PhysicsManager", "background", "black_frame", "tip_message", "bird_element", "bird_selecter", "chapter", "chapter_element", "about_dialog", "help_dialog", "options_dialog", "home", "friends_select", "main_menu", "player_select", "stage_manager", "launch" ]);