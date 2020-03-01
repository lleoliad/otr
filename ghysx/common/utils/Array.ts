// interface Array<T> {
//     copy(obj: any);
// }

// Array.prototype.copy = function (obj) {
//     for (let key in obj) {
//         this.push(obj[key]);
//     }
// }

export function count<T>(src: Array<T> | Object): number {
    let count = 0;
    if (src) {
        if (Array.isArray(src)) {
            count = src.length;
        } else {
            let keys = Object.keys(src);
            count = keys.length;
        }
    }
    return count;
}

export function contain<T>(src: Array<T>, value: any, key?: string): boolean {
    for (let ikey in src) {
        if (!key || ikey === key) {
            let ivalue = src[ikey];
            if (ivalue === value) {
                return true;
            }
        }
    }
    return false;
}

export function remove<T>(src: Array<T>, value: any): T {
    for (let key in src) {
        let item = src[key];
        if (item === value) {
            if (Array.isArray(src) && src.length) {
                // src.splice(src.indexOf(item), 1);
                src.splice(key as any, 1);
            } else {
                delete src[key];
            }
            return item;
        }
    }
    return null;
}

export function clear<T>(src: Array<T>) {
    if (src) {
        // arr.splice(0, arr.length);
        src.length = 0;
        // arr = [];
    }
    return src;
}

export function clone<T>(src: Array<T>, dest?: any) {
    if (dest === undefined || dest === null) {
        let result = Object.prototype.toString.call(src);
        // cc.log(typeof src);
        // cc.log(src instanceof Object);
        // cc.log(src instanceof Array);
        if (result === "[object Array]") {
            dest = [];
        } else if (typeof src == 'object') {
            dest = {};
        } else {
            dest = src;
            return dest;
        }
    }
    for (let key in src) {
        let value = src[key];
        if (value) {
            if (typeof value == 'object') {
                value = clone(value as any);
            }
        }
        dest[key] = value;
    }
    return dest;
}

export function copy<T>(desc: Array<T>, src: Array<T>): Array<T> {
    src = src || new Array<T>();
    for (let key in desc) {
        let value = desc[key];
        if (value != null || value != undefined) {
            src.push(value);
        }
    }
    return src;
}

export function merge<T>(desc: Array<T>, src): Array<T> {
    src = src || [];
    for (let key in desc) {
        let value = desc[key];
        src[key] = value;
    }
    return src;
}

export function concat<T>(arr: Array<T>, separate: string): string {
    let r = '';
    let a = false;
    for (let key in arr) {
        if (a) {
            r = r + separate;
        } else {
            a = true;
        }
        r = r + arr[key];
    }
    return r;
}

export function concats<T>(arr: Array<Array<T>>, separate: string, delimeter: string): string {
    let r = '';
    let a = false;
    for (let key in arr) {
        let t = arr[key];
        let rt = concat(t, delimeter);
        if (rt) {
            if (a) {
                r = r + separate;
            } else {
                a = true;
            }
            r = r + rt;
        }
    }
    return r;
}

export function serialize<T>(desc: Array<T>, key?: string, defaultValue?: any): Array<T> {
    let r = [] as any;
    for (let k in desc) {
        let t = desc[k];
        if (t) {
            if (key) {
                let tk = t[key];
                if (tk !== undefined && tk !== null) {
                    r[tk] = t;
                }
            } else if (defaultValue !== undefined && defaultValue !== null) {
                r[t] = defaultValue;
            } else {
                r[t] = t;
            }
        }
    }
    return r;
}

export function search_value<T>(src: T[], key: string, value: any): T {
    if (src) {
        for (let obj of src) {
            let v = obj[key];
            if (v && v === value) {
                return obj;
            }
        }
    }
    return null;
}

export function search<T>(src: T[], tmatchs: Array<{ key: string, value: any }>, ...matchss): Array<T> {
    let result: Array<T> = new Array<T>();
    let datas: T[] = src;
    matchss = matchss || [];
    matchss.unshift(tmatchs);
    for (let matchs of matchss) {
        if (!datas) {
            datas = result;
            result = new Array<T>();
        }

        for (let key in datas) {
            let mould = datas[key];
            for (let mkey in matchs) {
                let match = matchs[mkey];
                if (mould[match.key] === match.value) {
                    result.push(mould);
                }
            }
        }
        datas = null;
    }
    return result;
}

export function group<T>(src: T[], matchs: Array<{ gkey: string, ekey?: string }>): Array<Array<T>> {
    let result: Array<Array<T>> = new Array<Array<T>>();
    for (let key in src) {
        let data = src[key];
        if (data) {
            for (let mkey in matchs) {
                let match = matchs[mkey];
                let gkey = data[match.gkey];
                if (gkey) {
                    let group = result[gkey];
                    if (!group) {
                        group = [];
                        result[gkey] = group;
                    }
                    let ekey = null;
                    if (match.ekey) {
                        ekey = data[match.ekey];
                    }
                    if (ekey !== undefined && ekey !== null) {
                        group[ekey] = data;
                    } else {
                        group.push(data);
                    }
                }
            }
        }
    }
    return result;
}
