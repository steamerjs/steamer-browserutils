/**
 * @description JS Type Checking
 * @author heyli
 * @date 2016.07.30
 */

export function isType(type, obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}

export function isBoolean(obj) {
    return isType('Boolean', obj);
}

export function isNumber(obj) {
    return isType('Number', obj);
}

export function isString(obj) {
    return isType('String', obj);
}

export function isFunction(obj) {
    return isType('Function', obj);
}

export function isArray(obj) {
    return isType('Array', obj);
}

export function isDate(obj) {
    return isType('Date', obj);
}

export function isRegExp(obj) {
    return isType('RegExp', obj);
}

export function isObject(obj) {
    return isType('Object', obj);
}

export function isError(obj) {
    return isType('Error', obj);
}
