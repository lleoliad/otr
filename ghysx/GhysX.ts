const { ccclass, property } = cc._decorator;

import * as Graphics from "./core/Graphics";
import * as Shader from "./core/Shader";
import { GUI } from "./ui/GUI";
import * as Unit from "./common/utils/Unit";
import * as Utils from "./common/utils/Utils";
import * as Array from "./common/utils/Array";
import * as TextToJson from "./common/utils/TextToJson";
import { Assets } from "./os/Assets";
import { Network } from "./network/Network";
import { System } from "./os/System";
import Loader from "./ui/Loader";
import * as DB from "./db/db";
import * as RES from "./res/res";

import * as Platform from "../platform/Platform";

export namespace GhysX {
    export let name: string = 'GhysX ';
    export let description: string = 'GhysX Engine.';
    export let handler = cc.systemEvent;
    export let gui = GUI;
    export let graphics = Graphics;
    export let shader = Shader.shader;
    export let loader: Loader = new Loader();
    export let modules = {
        array: Array,
        unit: Unit,
        utils: Utils,
        t2j: TextToJson,
    };
    export let network = Network;
    export let os = System;
    export let assets = Assets;
    export let db = DB;
    export let res = RES;
    export let local = false ? _local : null;

    export let platform = Platform;

    export function initialize() {
        os.initialize(GhysX);
        gui.initialize(GhysX);
        graphics.initialize(GhysX);
        // network.initialize(GhysX);
        assets.initialize(GhysX);
        
        platform.initialize(GhysX);
    }
}
