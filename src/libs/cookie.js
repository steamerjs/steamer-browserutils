/**
 * @description Browser cookie processing
 * @author heyli
 * @date 2016.07.30
 * 正则表达式网站  http://www.regexr.com/
 */
import {
    _stringify
} from './common';

/**
 * set cookie
 * @param {String} key    [key]
 * @param {String} val    [value]
 * @param {String} days   [days]
 * @param {String} path   [path]
 * @param {String} domain [domain]
 */
export function setCookie(key, val, days, path, domain) {
    let expire = new Date();
    expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 30 * 24 * 60 * 60 * 1000)); // 默认1个月
    if (global.document) {
        document.cookie = key + '=' + encodeURIComponent(_stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
    }
}

/**
 * del cookie
 * @param  {String} key    [key]
 * @param  {String} path   [path]
 * @param  {String} domain [domain]
 */
export function delCookie(key, path, domain) {
    let expires = new Date(0);
    if (global.document) {
        document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
    }
}

/**
 * get cookie
 * @param  {[type]} key [key]
 * @return {String}     [cookie value]
 */
export function getCookie(key) {
    let r = new RegExp('(?:^|;+|\\s+)' + key + '=([^;]*)');
    let m = '';
    if (global.document) {
        m = global.document.cookie.match(r);
    }
    return (!m ? '' : m[1]) || null;
}
