/**
 * @browser localstorage processing
 * @author heyli
 * @date 2016.07.30
 */
import {
    getCookie,
    delCookie,
    setCookie
} from './cookie';
import {
    _stringify
} from './common';

/**
 * set localstorage
 * @param {String} key [key]
 * @param {String} val [value]
 */
export function setItem(key, v) {
    let val = _stringify(v);
    if (typeof (global.Storage) !== 'undefined') {
        localStorage.setItem(key, val);
    }
    else {
        setCookie(key, val);
    }
}

/**
 * get localstorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getItem(key) {
    if (typeof global.Storage !== 'undefined') {
        return localStorage.getItem(key);
    }
    else {
        return getCookie(key);
    }
}

/**
 * delete localstorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function delItem(key) {
    if (typeof global.Storage !== 'undefined') {
        delete localStorage[key];
    }
    else {
        delCookie(key);
    }
}
