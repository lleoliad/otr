
interface Number {
    displayBigNumber();
    toDecimal(decimalPlaces: number, percent: number);
}

Number.prototype.displayBigNumber = function () {
    // let str = this;
    let num = this;
    if (num >= 10000 && num < 100000000) {
        num = num.valueOf() / 10000;
        // return num.toFixed(2) + '万';
        return Math.round(num * 100) / 100 + '万';
    }
    if (num >= 100000000) {
        num = num.valueOf() / 100000000;
        // return num.toFixed(2) + '亿';
        return Math.round(num * 100) / 100 + '亿';
    }
    return '' + this;
}

Number.prototype.toDecimal = function (decimalPlaces: number = 2, percent: number = 100) {
    let f = this;
    if (isNaN(f)) {
        return 0;
    }
    // f = Math.round(this * 10000) / 100;
    // f = ~~(this * 10000) / 100;

    let converter = Math.pow(10, decimalPlaces);
    f = ~~(this * converter * percent) / converter;
    return f;
}