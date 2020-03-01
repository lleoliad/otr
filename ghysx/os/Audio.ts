const { ccclass, property } = cc._decorator;

import * as Storage from "./Storage";

export namespace Audio {
    let state = 1;
    let effect = 1;
    let music = 1;
    let current = null;
    let assets = {};

    export function setState(state) {
        if (state instanceof Number) {
            state = state;
        }
    }

    export function getState () {
        return state;
    }

    export function isOpen () {
        return state === 1;
    }

    export function effectIsOpen () {
        return effect === 1;
    }

    export function musicIsOpen () {
        return music === 1;
    }

    export function stop () {
        stopEffect();
        stopMusic();
        state = -1;
        Storage.write('audio_state', state);
    }

    export function open () {
        state = 1;
        Storage.write('audio_state', state);
    }

    export function effectOn () {
        effect = 1;
        Storage.write('effect_state', effect);
    }

    export function effectOff () {
        effect = -1;
        Storage.write('effect_state', effect);
    }

    export function musicOn () {
        // cc.audioEngine.resumeMusic();
        music = 1;
        if (current) {
            playMusic(current.url, current.loop);
        }
        Storage.write('music_state', music);
    }

    export function musicOff () {
        // cc.audioEngine.pauseMusic();
        stopMusic();
        music = -1;
        Storage.write('music_state', music);
    }

    export function playMusic (url, loop) {
        current = { url: url, loop: loop };
        if (state != 1 || music != 1) {
            return;
        }

        // stopMusic();

        let asset = {
            url: url, //cc.url.raw(url),
            audioId: -1,
            type: 'music'
        };
        assets[url] = asset;
        let clip = cc.loader.getRes(asset.url);
        if (clip) {
            asset.audioId = cc.audioEngine.playMusic(clip, loop);
        } else {
            cc.loader.loadRes(asset.url, cc.AudioClip, function (err, clip) {
                if (!err) {
                    if (music == 1) {
                        asset.audioId = cc.audioEngine.playMusic(clip, loop);
                    }
                }
            });
        }
    }

    export function stopMusic(url?: string) {
        if (!url) {
            for (let key in assets) {
                let asset = assets[key];
                if (asset.type === 'music') {
                    url = asset.url;
                }
            }
        }

        cc.audioEngine.stopMusic();
        uncache(url)
    }

    export function playEffect(url: string, loop: boolean) {
        if (state != 1 || effect != 1) {
            return;
        }

        let asset = {
            url: url, //cc.url.raw(url),
            audioId: -1,
            type: 'effect'
        };
        assets[url] = asset;
        let clip = cc.loader.getRes(asset.url);
        if (clip) {
            asset.audioId = cc.audioEngine.playEffect(clip, loop);
        } else {
            cc.loader.loadRes(asset.url, cc.AudioClip, function (err, clip) {
                if (!err) {
                    asset.audioId = cc.audioEngine.playEffect(clip, loop);
                }
            });
        }
    }

    export function stopEffect(url?: string) {
        let asset = assets[url];
        if (asset) {
            cc.audioEngine.stopEffect(asset.audioId);
            asset.audioId = -1;
        }
        uncache(url)
    }

    export function uncache(url: string) {
        if (!url) {
            return
        }

        let asset = assets[url];
        if (asset) {
            cc.audioEngine.uncache(asset.url);
            delete assets[url];
        }
    }
    
    export function initialize() {
        state = parseInt(Storage.read('audio_state', '1'));
        effect = parseInt(Storage.read('effect_state', '1'));
        music = parseInt(Storage.read('music_state', '1'));
    }
}