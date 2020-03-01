
export function parse(lines: Object[], keyIndex: number = 0): Object {
    let result = {};
    let lineCount = lines.length
    if (lineCount > 4) {
        let line1: Object = lines[0];
        let line2: Object = lines[1];
        let line3: Object = lines[2];
        let line4: Object = lines[3];
        if (line3[0] === 'id') {
            let count = (line1 as any).length;
            for (let index = 4; index < lineCount; index++) {
                const element: any = lines[index];
                let len = element.length;
                if (len == count) {
                    let item = {};
                    for (let pos = 0; pos < len; pos++) {
                        let valueType = line2[pos];
                        if (valueType === 'string') {
                            item[line3[pos]] = element[pos];
                        } else if (valueType === 'float') {
                            item[line3[pos]] = parseFloat(element[pos]);
                        } else {
                            item[line3[pos]] = parseInt(element[pos]);
                        }
                    }
                    result[element[keyIndex]] = item;
                }
            }

            // lines.forEach(element => {
            //     element.forEach(element => {
            //         result
            //     });
            // });
        } else {
            result = lines;
        }
    }
    return result
}
