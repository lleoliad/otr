interface String {
    _split(separate: string, func?: Function);
    splits(separate: string, delimeter: string, func?: Function);
    splitss(iseparate: string, separate: string, delimeter: string, func?: Function);
    line_splits(separate: string, delimeter: string, func?: Function);
    _concat(array: string[], separate: string): string;
    _concats(desc: string[][], separate: string, delimeter: string): string;
    format(...args): string;
    replaceAll(reallyDo: string, replaceWith: string, ignoreCase: string): string;
    startsWith(prefix: string): boolean;
    endsWith(suffix: string): boolean;
    displayBigNumber(): string;
}

String.prototype._split = function (separate: string, func?: Function) {
    let arr = this.split(separate);
    if (func) {
        for (let m in arr) {
            arr[m] = func(arr[m]);
        }
    }
    return arr;
}

String.prototype.splits = function (separate: string, delimeter: string, func?: Function) {
    let arrs = [];
    let arr = this.split(separate);
    for (let i in arr) {
        let v = arr[i];
        arrs[i] = v._split(delimeter, func);
    }
    return arrs;
}

String.prototype.splitss = function (iseparate: string, separate: string, delimeter: string, func?: Function) {
    let arrs = [];
    let arr = this.split(iseparate);
    for (let i in arr) {
        let v = arr[i];
        arrs[i] = v.splits(separate, delimeter, func);
    }
    return arrs;
}

String.prototype.line_splits = function (separate, delimeter, func) {
    let arrs = [];
    let arr = this.split(separate);
    for (let i in arr) {
        let v = arr[i];
        v = v.split(delimeter);
        if (func) {
            v = func(v);
        }
        arrs[i] = v;
    }
    return arrs;
}

String.prototype._concat = function (desc: string[], separate: string): string {
    let r = '';
    let a = false;
    for (let key in desc) {
        if (a) {
            r = r + separate;
        } else {
            a = true;
        }
        r = r + desc[key];
    }
    return r;
}

String.prototype._concats = function (desc: string[][], separate: string, delimeter: string): string {
    let r = '';
    let a = false;
    for (let key in desc) {
        let t = desc[key];
        let rt = this._concat(t, delimeter);
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

String.prototype.format = function (...args) {
    if (arguments.length == 0)
        return null;

    let str = this;//arguments[0];

    let mpos = 0;
    let index = 0;
    do {
        mpos = str.indexOf('%', mpos)
        if (mpos > -1) {
            mpos = mpos + 1
            let c = str.charAt(mpos);
            if ('s' == c) {
                str = str.replace('%s', '{' + index + '}')
                index = index + 1;
            } else if ('d' == c) {
                str = str.replace('%d', '{' + index + '}')
                index = index + 1;
            } else {
                // throw new Error("string format error.")
            }
        }
    } while (mpos > -1);

    for (let i = 0/*1*/; i < arguments.length; i++) {
        let re = new RegExp('\\{' + (i) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    // /\\n/g, "\n"
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix): boolean {
        return this.slice(0, prefix.length) === prefix;
    }
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (suffix): boolean {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    }
}

if (typeof String.prototype.trim != 'function') {
    String.prototype.trim = function () {
        //去除首尾空格
        return this.replace(/(^\s*)|(\s*$)/g, "");

        // //去除左边空格
        // osfipin.replace(/(^\s*)/g, "");

        // //去除右边空格
        // osfipin.replace(/(\s*$)/g, "");
    }
}

String.prototype.displayBigNumber = function (): string {
    let str = this;
    let num = parseInt(str);
    if (num >= 10000 && num < 100000000) {
        num = num.valueOf() / 10000;
        // return num.toFixed(2) + '万'
        return Math.round(num * 100) / 100 + '万';
    }
    if (num >= 100000000) {
        num = num.valueOf() / 100000000;
        // return num.toFixed(2) + '亿'
        return Math.round(num * 100) / 100 + '亿';
    }
    return str;
}
