import { GhysX } from "../GhysX";

const { ccclass, property } = cc._decorator;

namespace ViewManager {
    export let views: INFO[] = [];
    export let groups: INFO[] = [];
    export let group_status: boolean[] = [];
    export let listener_events: cc.Object[] = [];
    export let loadings: string[] = [];

    export function open(info: INFO) {
        delete loadings[info.name];

        if (info.uniqueness === 1) {
            if (show(info.name)) {
                call(info, info.complete);
                return;
            }
        }

        if (!info.parent || !info.parent.isValid) {
            return;
        }

        let view = cc.instantiate(info.asset as cc.Prefab);
        if (info.script) {
            let component = view.getComponent(info.script);
            if (component) {
                if (info.invoke) {
                    let callback = info.invoke;
                    if ('function' == typeof callback) {
                        callback.call(component, info.params);
                    } else {
                        let eventHandler = new cc.Component.EventHandler();
                        eventHandler.target = view;
                        eventHandler.component = info.script;
                        eventHandler.handler = callback;
                        eventHandler.emit([info.params]);
                        // console.log(eventHandler);
                    }
                }
            }
            info.node = view;
            info.target = view;
            info.component = component;
        }

        let component = info.component as any;
        if (component) {
            info.actives = [view.active];

            let group = groups[info.group_name];
            if (!group) {
                group = [];
                groups[info.group_name] = group;
                group_status[info.group_name] = true;
            }

            if (!group_status[info.group_name]) {
                view.active = false;
                info.actives.push(false);
            }

            component._start = component.start;
            component.start = function () {
                info.active = true;
                // views[info.name] = info;
                // group[info.name] = info;

                if (component._start) {
                    component.start = component._start;
                    component._start = null;
                    component.start();
                }

                (info.target as cc.Node).active = group_status[info.group_name];

                // call(info, info.complete);

                GhysX.handler.emit('' + info.name + '_on_start', info);

                execute_event('start', info.name);
            }

            component._onEnable = component.onEnable;
            component.onEnable = function () {
                if (component._onEnable) {
                    component._onEnable();
                }

                GhysX.handler.emit('' + info.name + '_on_show', info);
                execute_event('show', info.name);
            };

            component._onDisable = component.onDisable;
            component.onDisable = function () {
                if (component._onDisable) {
                    component._onDisable();
                }

                GhysX.handler.emit('' + info.name + '_on_hide', info);

                execute_event('hide', info.name);
            };

            component._onDestroy = component.onDestroy;
            component.onDestroy = function () {
                clear(info);

                if (component._onDestroy) {
                    component._onDestroy();
                }

                GhysX.handler.emit('' + info.name + 'destroy', info);

                execute_event('destroy', info.name);
            };

            (view as any)._destroy = view.destroy;
            view.destroy = function () {
                GhysX.loader.parser(view);
                clear(info);
                if ((view as any)._destroy) {
                    (view as any)._destroy();
                }
                return true;
            };

            views[info.name] = info;
            group[info.name] = info;

            if (info.order) {
                info.parent.addChild(view, info.order);
            } else {
                info.parent.addChild(view);
            }
        }

        call(info, info.complete);
    }

    export function loading(info: INFO) {
        if (loadings[info.name]) {
            return;
        }

        if (info.uniqueness) {
            loadings[info.name] = true;
        }

        load(info);
    }

    export function listener(event: string, name: string, callback: string | Function, params?: any) {
        let event_group = manager.listener_events[event];
        let events = null;
        if (!event_group) {
            event_group = [] as any;
            manager.listener_events[event] = event_group;
        }
        events = event_group[name];
        if (!events) {
            events = [];
            event_group[name] = events;
        }
        events.push({
            callback: callback,
            params: params,
        });

        let info = manager.views[name];
        if (info && info.target && info.target.isValid) {
            switch (event) {
                case 'start':
                    {
                        if (info.target.active) {
                            execute_event(event, name);
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    }

    function execute_event(event: string, name: string) {
        let event_group = manager.listener_events[event];
        if (event_group) {
            let events = event_group[name];
            if (events) {
                for (let key in events) {
                    let event_handler = events[key];
                    if (event_handler.callback) {
                        if (typeof (event_handler.callback) === 'function') {
                            event_handler.callback(event_handler.params);
                        } else {
                            GhysX.handler.emit(event_handler.callback, event_handler.params);
                        }
                    }
                }
                events.length = 0;
                delete event_group[name];
            }
        }
    }

    export function show(name: string) {
        if (name) {
            let info = views[name];
            if (info && info.target && info.target.isValid) {
                // info.active = true;

                // if (!group_status[info.group_name]) {
                //     return info;
                // }

                // info.target.active = true;

                info.actives.pop();

                let ret = true;
                if(info.actives.length) {
                    ret = info.actives[info.actives.length - 1];
                }

                if (ret != info.target.active) {
                    info.target.active = ret;
                }

                // GhysX.handler.emit('' + name + '_show', info);

                // execute_event('show', name);
            }
            return info;
        }
        return null;
    }

    export function hide(name: string) {
        if (name) {
            let info = views[name];
            if (info && info.target && info.target.isValid) {
                // info.active = false;

                // info.target.active = false;

                let ret = false;

                info.actives.push(ret);

                if (ret != info.target.active) {
                    info.target.active = ret;
                }
                
                // GhysX.handler.emit('' + name + '_hide', info);

                // execute_event('hide', name);
            }
            return info;
        }
        return null;
    }

    export function on(name: string) {
        // if (name) {
        //     let info = views[name];
        //     if (info && info.target && info.target.isValid) {
        //         info.target.active = info.active;
        //         GhysX.handler.emit('' + name + '_show', info);

        //         execute_event('show', name);
        //     }
        //     return info;
        // }
        return show(name);
    }

    export function off(name: string) {
        // if (name) {
        //     let info = views[name];
        //     if (info && info.target && info.target.isValid) {
        //         info.active = info.target.active;
        //         info.target.active = false;
        //         GhysX.handler.emit('' + name + '_hide', info);

        //         execute_event('hide', name);
        //     }
        //     return info;
        // }
        return hide(name);
    }

    export function reset(name: string) {
        // if (name) {
        //     let info = views[name];
        //     if (info && info.target && info.target.isValid) {
        //         info.active = true;
        //         info.target.active = true;
        //         GhysX.handler.emit('' + name + '_show', info);

        //         execute_event('show', name);
        //     }
        //     return info;
        // }
        return show(name);
    }

    export function group(event: string, group_name: string) {
        let group = groups[group_name];
        if (!group) {
            group = [];
            groups[group_name] = group;
            group_status[group_name] = true;
        }

        if (group) {
            switch (event) {
                case 'show':
                    {
                        group_status[group_name] = true;
                        for (let key in group) {
                            show(key);
                        }
                    }
                    break;

                case 'hide':
                    {
                        group_status[group_name] = false;
                        for (let key in group) {
                            hide(key);
                        }
                    }
                    break;

                case 'on':
                    {
                        group_status[group_name] = true;
                        for (let key in group) {
                            on(key);
                        }
                    }
                    break;

                case 'off':
                    {
                        group_status[group_name] = false;
                        for (let key in group) {
                            off(key);
                        }
                    }
                    break;

                case 'reset':
                    {
                        group_status[group_name] = true;
                        for (let key in group) {
                            reset(key);
                        }
                    }
                    break;

                case 'close':
                    {
                        for (let key in group) {
                            close(key);
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    }

    export function find(name: string): INFO {
        if (name) {
            let info = views[name];
            if (info && info.target && info.target.isValid) {
                return info;
            }
        }
        return null;
    }

    export function close(name: string) {
        if (name) {
            let info = views[name];
            if (info && info.target && info.target.isValid) {
                // clear(info);
                info.target.destroy();
            }
            return info;
        }
        return null;
    }

    export function clear(info: INFO) {
        let name = info.name;
        if (views[name] === info) {
            delete views[name];
            let group = groups[info.group_name];
            if (group) {
                delete group[name];
            }
        }
    }
}

export let manager = ViewManager;

export enum MODE {
    /**
     * 窗口
     */
    VIEW = 1,

    /**
     * 精灵
     */
    SPRITE,

    /**
     * 图集
     */
    ATLAS,

    /**
     * 组件
     */
    PREFAB,
}

export enum ORDER {

    /**
     * 框架
     */
    FRAMEWORK = 1,

    /**
     * 背景
     */
    BACKGROUND = 2,

    /**
     * 窗口
     */
    WINDOW = 100,

    /**
     * 视窗
     */
    VIEW = 200,

    /**
     * 视窗对话框
     */
    VIEW_DIALOG = 300,

    /**
     * 任务栏
     */
    TASKBAR = 400,

    /**
     * 对话框
     */
    DIALOG = 500,

    /**
     * 推送
     */
    NOTIFICATION = 600,
}

export enum GROUP_NAME {
    DEFAULT = 'default',
    BACKGROUND = 'background',
    WORLD = 'world',
    HOME = 'home',
    UI = 'ui',
    BATTLE = 'battle',
    ACTIVE = 'active',
    NOTIFICATION = 'notification',
}

export class INFO {
    mode?: MODE;
    order?: ORDER;
    canvas: cc.Node;
    parent?: cc.Node;
    node?: cc.Node;
    target?: cc.Component | cc.Sprite | cc.Node;
    script?: string;
    url?: string;
    name?: string;
    group_name?: string;
    uniqueness: number;
    active?: boolean;
    actives?: boolean[];
    asset?: cc.Prefab | cc.Asset;
    asset_type?: typeof cc.Asset;
    asset_name?: string;
    component: cc.SpriteAtlas | cc.Asset | cc.Component;
    component_asset_type?: typeof cc.Component | sp.SkeletonData | cc.Asset;
    invoke?: Function | string;
    params?: any;
    error?: Function;
    complete?: Function;
}

export function load(info: INFO) {
    cc.log('load file path:', info.url);
    let asset = cc.loader.getRes(info.url, info.asset_type);
    if (asset == null || !asset.isValid || !(asset instanceof info.asset_type)) {
        cc.loader.loadRes(info.url, info.asset_type, function (error, asset) {
            if (error) {
                if (info.error) {
                    info.error(info);
                }
                cc.log(error);
                return;
            }

            info.asset = asset;
            complete(info);
        });
    } else {
        info.asset = asset;
        complete(info);
    }
}

export function complete(info: INFO) {
    draw(info);
}

export function call(info: INFO, invoke: any) {
    if (invoke) {
        try {
            if ('function' == typeof invoke) {
                // invoke.call(invoke, c || view, data);
                // // invoke.apply(invoke, view, data);
                // // invoke(view, data);
                invoke.call(invoke, info);
            } else {
                // cc.m.handler.emit(invoke, c || view, data);
                GhysX.handler.emit(invoke, info);
            }
        } catch (e) {
            cc.log("err:", e);
        } finally {

        }
    }
}

export function view(info: INFO) {
    info.mode = MODE.VIEW;
    info.order = info.order || ORDER.VIEW;
    info.parent = info.canvas || info.parent || GhysX.gui.frame.node;
    info.asset_type = cc.Prefab;
    info.name = info.name || info.script;
    info.group_name = info.group_name || 'default';
    if (info.uniqueness === undefined) {
        info.uniqueness = 1;
    }

    if (info.asset) {
        manager.open(info);
    } else {
        manager.loading(info);
    }
}

export function sprite(info: INFO) {
    info.mode = MODE.SPRITE;
    if (info.asset) {
        if (!info.target || !info.target.isValid) {
            return;
        }

        let sprite: cc.Sprite = (info.target as cc.Sprite);
        sprite.spriteFrame = (info.asset as cc.SpriteFrame);

        info.node = sprite.node;

        call(info, info.complete);
    } else {
        load(info);
    }
}

export function atlas(info: INFO) {
    info.mode = MODE.ATLAS;
    if (info.asset) {
        if (!info.target || !info.target.isValid) {
            return;
        }

        let sprite: cc.Sprite = (info.target as cc.Sprite);
        sprite.spriteFrame = (info.asset as cc.SpriteAtlas).getSpriteFrame(info.asset_name);

        info.node = sprite.node;
        
        call(info, info.complete);
    } else {
        load(info);
    }
}

export function prefab(info: INFO) {
    info.mode = MODE.PREFAB;
    info.parent = info.canvas || info.parent;
    if (info.asset) {
        if (!info.parent || !info.parent.isValid) {
            return;
        }
        let node = cc.instantiate(info.asset as cc.Prefab);
        if (info.script) {
            let component = node.getComponent(info.script);
            if (component) {
                if (info.invoke) {
                    let callback = info.invoke;
                    if ('function' == typeof callback) {
                        callback.call(component, info.params);
                    } else {
                        let eventHandler = new cc.Component.EventHandler();
                        eventHandler.target = node;
                        eventHandler.component = info.script;
                        eventHandler.handler = callback;
                        eventHandler.emit([info.params]);
                        // console.log(eventHandler);
                    }
                }
            }
            info.component = component;
        }
        
        info.node = node;
        info.target = node;

        if (info.order) {
            info.parent.addChild(node, info.order);
        } else {
            info.parent.addChild(node);
        }

        call(info, info.complete);
    } else {
        load(info);
    }
}

export function draw(info: INFO | any) {
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
            break;

        default:
            break;
    }
}

export function initialize(GhysX) {
    // 消除圆形锯齿
    // cc.view.enableAntiAlias(true);
    return this;
}
