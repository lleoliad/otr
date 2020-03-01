export function prefix(num: number, length: number): string {
    // return (num / Math.pow(10, length)).toFixed(length).substr(2);
    // return ("0000000000000000" + num).substr(-length);
    return (Array(length).join('0') + num).slice(-length);
}

export function random(min, max) {
    if (max < min) {
        throw new Error("min > max");
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomf(min, max) {
    if (max < min) {
        throw new Error("min > max");
    }

    return (Math.random() * (max - min) + min);
}

export function concat(desc: string[], separate: string): string {
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

export function concats(desc: string[][], separate: string, delimeter: string): string {
    let r = '';
    let a = false;
    for (let key in desc) {
        let t = desc[key];
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

export function Uint8ArrayToString(fileData) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        // dataString += String.fromCharCode(fileData[i] & 0xff);
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString
}

export function stringToUint8Array(str) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
        // arr.push(str.charCodeAt(i) & 0xff);
    }

    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
}

export function Utf8ArrayToStr(array) { // 数据流转化为字符串, 兼容汉字
    var out = "",
        i = 0,
        len = array.length,
        char1, char2, char3, char4;
    while (i < len) {
        char1 = array[i++];
        // 当单个字节时, 最大值 '01111111', 最小值 '00000000' 右移四位 07, 00
        // 当两个字节时, 最大值 '11011111', 最小值 '11000000' 右移四位 13, 12
        // 当三个字节时, 最大值 '11101111', 最小值 '11100000' 右移四位 14, 14
        if (char1 >> 4 <= 7) {
            out += String.fromCharCode(char1);
        } else if (char1 >> 4 == 12 || char1 >> 4 == 13) {
            char2 = array[i++];
            out += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F));
        } else if (char1 >> 4 == 14) {
            char2 = array[i++];
            char3 = array[i++];
            char4 = ((char1 & 0x0F) << 12) | ((char2 & 0x3F) << 6);
            out += String.fromCharCode(char4 | ((char3 & 0x3F) << 0));
        }
    }
    return out;
};