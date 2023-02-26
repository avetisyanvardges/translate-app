import {isEmpty} from "lodash";

export const revertToYupMessageFormat = (string = '') => {
    if (isEmpty(string)) return;

    const result = string.split('_').join(' ');
    return `${result[0].toUpperCase()}${result.slice(1)}`
}