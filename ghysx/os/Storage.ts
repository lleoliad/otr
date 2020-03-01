const { ccclass, property } = cc._decorator;

export function read(key, defaultValue) {
    let value = cc.sys.localStorage.getItem(key);
    if (null === value || value === undefined || value == '') {
        value = defaultValue;
    }
    return value;
}

export function write(key, value) {
    if (null === value || value === undefined) {
        value = '';
    }
    cc.sys.localStorage.setItem(key, value);
}
