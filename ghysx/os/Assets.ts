import * as Unit from "./../common/utils/Unit";
export namespace Assets {
    export let handler = null;
    let cdnUrl = '';
    
    export let data: any = null;

    export namespace Version {
        function hotUpdate(res) {
            window['_CCSettings'] = res;
            (function (e) {
                var t = e.uuids,
                    i = e.md5AssetsMap;
                for (var s in i)
                    for (var n = i[s], r = 0; r < n.length; r += 2) "number" == typeof n[r] && (n[r] = t[n[r]])
            })(window['_CCSettings']);

            var settings = window['_CCSettings'];
            window['_CCSettings'] = undefined;

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
                        // retrieve minified raw asset
                        if (typeof type === 'number') {
                            entry[1] = assetTypes[type];
                        }
                        // retrieve uuid
                        realEntries[uuids[id] || id] = entry;
                    }
                }

                var scenes = settings.scenes;
                for (var i = 0; i < scenes.length; ++i) {
                    var scene = scenes[i];
                    if (typeof scene.uuid === 'number') {
                        scene.uuid = uuids[scene.uuid];
                    }
                }

                var packedAssets = settings.packedAssets;
                for (var packId in packedAssets) {
                    var packedIds = packedAssets[packId];
                    for (var j = 0; j < packedIds.length; ++j) {
                        if (typeof packedIds[j] === 'number') {
                            packedIds[j] = uuids[packedIds[j]];
                        }
                    }
                }
            }

            cc.loader.downloader._subpackages = settings.subpackages;
            // init assets
            cc['AssetLibrary'].init({
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: settings.rawAssets,
                packedAssets: settings.packedAssets,
                md5AssetsMap: settings.md5AssetsMap
            });
        }
    }

    function initAssets(error, asset) {
        if (!error) {
            data = asset;
            // handler.emit('network-handshake-request', asset);
        }
    }
    
    export function initialize(GhysX) {
        handler = GhysX.handler;
        let assetsUrl = null;
        if (cc.sys.platform === cc.sys.WECHAT_GAME && false) {
            assetsUrl = wxDownloader.REMOTE_SERVER_ROOT + 'data/assets.json?v=' + Unit.random(1, 1000000);
            cc.loader.load(assetsUrl, function (error, asset) {
                if (error) {
                    return;
                }

                // 资源热更
                // this.hotUpdate(res);
                initAssets(error, asset);
            }.bind(this));
        } else {
            assetsUrl = 'data/assets?v=' + Unit.random(1, 1000000);
            cc.loader.loadRes(assetsUrl, cc.JsonAsset, function (error, asset) {
                if (error) {
                    return;
                }
                
                initAssets(error, asset.json);
            }.bind(this));
        }
    }
}