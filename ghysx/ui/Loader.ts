import { GhysX } from "../GhysX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loader extends cc.Component {

    cache: cc.Asset[] = [];

    assets: cc.RawAsset[] = [];

    // LIFE-CYCLE CALLBACKS:
    load(url: string, assetType: typeof cc.Asset, assetName: string, component: cc.Component | cc.SpriteAtlas | cc.Node, componentAssetType?: typeof cc.Component | cc.Asset | sp.SkeletonData | any, callback?: Function): void {
        let asset = this.cache[url];
        if (asset == null || !asset.isValid || !(asset instanceof assetType)) {
            cc.loader.loadRes(url, assetType, function (error, asset) {
                if (!error) {
                    // cc.log(asset);
                    this.cache[url] = asset;
                    this.complete(asset, assetName, component, componentAssetType, callback);
                }
            }.bind(this));
        } else {
            this.complete(asset, assetName, component, componentAssetType, callback);
        }
    }

    private complete(asset: cc.Asset, assetName: string, component: cc.Component | cc.SpriteAtlas | cc.Node, componentType?: typeof cc.Component | cc.Asset | sp.SkeletonData | any, callback?: Function): void {
        if (component.isValid) {
            if (asset instanceof cc.SpriteAtlas) {
                for (let key in asset['_spriteFrames']) {
                    let item = asset['_spriteFrames'][key];
                    let filename = item['_textureFilename'];
                    this.assets[filename] = filename;
                    break;
                }
                let atlas: cc.SpriteAtlas = asset;
                if (componentType === cc.RichText) {
                    (component as cc.RichText).imageAtlas = atlas;
                } else {
                    let spriteFrame = atlas.getSpriteFrame(assetName);
                    (component as cc.Sprite).spriteFrame = spriteFrame;
                }
            } else if (asset instanceof sp.SkeletonData) {
                for (let key in asset['textures']) {
                    let texture: cc.Texture2D = asset['textures'][key] as cc.Texture2D;
                    this.assets[texture.url] = texture.url;
                }
                (component as sp.Skeleton).skeletonData = asset;
            } else if (asset instanceof cc.SpriteFrame) {
                let filename = asset['_textureFilename'];
                this.assets[filename] = filename;
                if (componentType === sp.Skeleton) {
                    let skeleton: sp.Skeleton = component as sp.Skeleton;
                    let slot = skeleton.findSlot(assetName)
                    let frame = (asset as cc.SpriteFrame);

                    let attachment = slot.getAttachment()
                    let texture = frame.getTexture()
                    texture.setPremultiplyAlpha(true);

                    let tex = new (sp as any).SkeletonTexture({ width: texture.width, height: texture.height })
                    tex.setRealTexture(texture)
                    attachment.region.texture = tex

                    slot.setAttachment(attachment)
                } else {
                    (component as cc.Sprite).spriteFrame = (asset as cc.SpriteFrame);
                }
            }

            if (callback) {
                callback(component, asset);
            }
        }
    }

    parser(node: cc.Node, assets?: cc.RawAsset[]) {
        if (!node || !node.isValid) {
            return;
        }
        // cc.log('begin', node.name);
        assets = assets || this.assets;
        if ((node as any)._components) {
            let sprite = node.getComponent(cc.Sprite);
            if (sprite && sprite.spriteFrame) {
                let url = sprite.spriteFrame['_textureFilename'];
                assets[url] = url;
                // cc.log(node.name, url);
            }
        } else {
            cc.log('_components', node.name);
        }

        let children = node.children;
        if (children) {
            children.forEach((child) => {
                this.parser(child, assets);
            });
        } else {
            cc.log('children', node.name);
        }
        // cc.log('end', node.name);
    }

    releases() {
        // // cc.log('释放前:', (<any>cc).m.utils.count((cc.loader as any)._cache));
        // // cc.loader.releaseResDir('effect');
        // // cc.loader.releaseResDir('sprite');
        // let cache = (cc.loader as any)._cache;
        // for (let key in cache) {
        //     let asset: cc.Asset = cache[key];
        //     // cc.log(asset);
        //     let deps = cc.loader.getDependsRecursively((<any>asset)._owner);
        //     if (!deps || deps.length == 0) {
        //         cc.log(asset.url);
        //         cc.loader.release(asset);
        //     }
        // }
        // // cc.log('释放后:', (<any>cc).m.utils.count((cc.loader as any)._cache));


        let assets: cc.RawAsset[] = [];
        let groups = GhysX.graphics.manager.groups;
        for (let gkey in groups) {
            let group = groups[gkey];
            for (let key in group) {
                let c = group[key];
                // cc.log(c.__cclass_name);
                this.parser(c.node, assets);
            }
        }

        for (let key in this.assets) {
            let asset = assets[key];
            if (!asset) {
                // cc.loader.release(asset);
                cc.loader.release(key);
                // cc.log('release', key);
            }
        }
    }

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
