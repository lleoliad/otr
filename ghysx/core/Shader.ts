const {ccclass, property} = cc._decorator;

export namespace shader {
    export namespace gray {
        function _sprite_gray(sprite) {
            if (sprite) {
                sprite.__default_material = (<any>sprite).getMaterial(0);
                (<any>sprite).setMaterial(0, (<any>cc).Material.getBuiltinMaterial('2d-gray-sprite'));
            }
        }

        function _label_gray(label) {
            if (label) {
                // (<any>label).setMaterial(0, (<any>cc).Material.getBuiltinMaterial('gray-sprite'));

                // label.sharedMaterials[0] = (<any>cc).Material.getBuiltinMaterial('gray-sprite');

                if (label.font) {
                    if (label.font.__proto__ instanceof cc.BitmapFont) {
                        label.sharedMaterials[0] = (<any>cc).Material.getBuiltinMaterial('2d-gray-sprite');
                    } else {
                        label.node.__color = label.node.color;
                        label.node.color = cc.color(200, 200, 200, 255);
                    }
                } else {
                    label.node.__color = label.node.color;
                    label.node.color = cc.color(200, 200, 200, 255);
                }

                let labelOutline = label.node.getComponent(cc.LabelOutline);
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
                button.__default_enableAutoGrayEffect = (<any>button).enableAutoGrayEffect;
                (<any>button).enableAutoGrayEffect = false;
                button.__default_material = (<any>button)._graySpriteMaterial;
                (<any>button)._graySpriteMaterial = (<any>cc).Material.getBuiltinMaterial('2d-gray-sprite');
            }
        }

        function _sprite_ungray(sprite) {
            if (sprite) {
                // (<any>sprite).setMaterial(0, (<any>cc).Material.getBuiltinMaterial('normal-sprite'));
                (<any>sprite).setMaterial(0, (<any>sprite).__default_material);
            }
        }

        function _label_ungray(label) {
            if (label) {
                // (<any>label).setMaterial(0, (<any>cc).Material.getBuiltinMaterial('normal-sprite'));

                // // label.sharedMaterials[0] = (<any>cc).Material.getBuiltinMaterial('normal-sprite');

                if (label.font) {
                    if (label.font.__proto__ instanceof cc.BitmapFont) {
                        label.sharedMaterials[0] = (<any>cc).Material.getBuiltinMaterial('2d--sprite');
                    } else {
                        // label.node.__color = label.node.color;
                        // label.node.color = cc.color(200, 200, 200, 255);
                        label.node.color = label.node.__color
                    }
                } else {
                    label.node.color = label.node.__color
                }

                label.node.color = label.node.__color || label.node.color;
                let labelOutline = label.node.getComponent(cc.LabelOutline);
                if (labelOutline) {
                    labelOutline.color = labelOutline.__color || labelOutline.color;
                }
            }
        }

        function _button_ungray(button) {
            if (button) {
                // (<any>button)._graySpriteMaterial = (<any>cc).Material.getBuiltinMaterial('2d-sprite');
                // (<any>button).enableAutoGrayEffect = true;

                button.target = button.__default_target;
                (<any>button).enableAutoGrayEffect = button.__default_enableAutoGrayEffect;
                (<any>button)._graySpriteMaterial = (<any>button).__default_material;
            }
        }

        function _node_gray(node) {
            _sprite_gray(node.getComponent(cc.Sprite));

            let label: cc.Label = node.getComponent(cc.Label);
            if (label) {
                _label_gray(label);
            }

            let button: cc.Button = node.getComponent(cc.Button);
            if (button) {
                _button_gray(button);
            }
        }

        function _node_ungray(node) {
            _sprite_ungray(node.getComponent(cc.Sprite));

            let label: cc.Label = node.getComponent(cc.Label);
            if (label) {
                _label_ungray(label);
            }

            let button: cc.Button = node.getComponent(cc.Button);
            if (button) {
                _button_ungray(button);
            }
        }

        export function gray(node: cc.Node) {
            if ((node as any).__gray) {
                return;
            }
            (node as any).__gray = true;
            _node_gray(node);
            for (let child of node.children) {
                gray(child);
            }
        }

        export function ungray(node: cc.Node) {
            if (!(node as any).__gray) {
                return;
            }
            (node as any).__gray = false;
            _node_ungray(node);
            for (let child of node.children) {
                ungray(child);
            }
        }
    }
}