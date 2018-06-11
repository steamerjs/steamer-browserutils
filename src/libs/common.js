/**
 * steamer-browserutils
 * github: https://github.com/SteamerTeam/steamer-browserutils
 * npm: https://www.npmjs.com/package/steamer-browserutils
 * version: 1.0.0
 * date: 2017.01.10
 */

/**
 * @common functions
 * @author heyli
 * @date 2016.07.30
 */
import {
    isObject
} from './type';

/**
 * stringify value
 * @param  {String} val [value]
 * @return {String}     [stringified value]
 */
export function _stringify(val) {
    let returnVal = isObject(val) ? JSON.stringify(val) : val;
    return returnVal;
}

/**
 * parse string
 * @param  {String} val [value]
 * @return {String}     [object value]
 */
export function _parse(val) {
    let returnVal = isObject(val) ? val : JSON.parse(val);
    return returnVal;
}
