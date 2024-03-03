export const getAllKeys = (obj: any): string[] => {
    let keys: string[] = [];

    for (const key in obj) {

        if (obj.hasOwnProperty(key)) {
            keys.push(key);
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                keys = keys.concat(getAllKeys(obj[key]));
            }
        }
    }

    return keys;
}