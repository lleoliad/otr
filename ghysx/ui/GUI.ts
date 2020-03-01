import Frame from "./Frame";
import Resources from "./Resources";

export namespace GUI {
    export let frame: Frame;
    export let resources: Resources;
    export function initialize(GhysX) {
        frame = cc.find('Canvas').addComponent(Frame);
        resources = cc.find('Canvas').getComponent(Resources);
        return this;
    }

    export function draw() {
        
    }
}