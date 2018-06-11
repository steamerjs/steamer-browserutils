/**
 * @description JS url processing
 * @author heyli
 * @date 2016.07.30
 */
import global from './gb';

let util = {
    _getHash: () => global.location.hash,
    _getSearch: () => global.location.search
};
export default util;

/**
 * get hash param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getHash(key) {
    let m = '';
    let location = global.location;
    if (location) {
        m = util._getHash().match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
    }
    return !m ? '' : decodeURIComponent(m[2]);
}

/**
 * get query param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getQuery(key) {
    let m = '';
    let location = global.location;
    if (location) {
        m = util._getSearch().match(new RegExp('(\\?|&)' + key + '=([^&]*)(#|&|$)'));
    }
    return !m ? '' : decodeURIComponent(m[2]);
}

/**
 * get query or hash param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getUrlParam(key) {
    let m = '';
    let location = global.location;

    if (location) {
        m = util._getSearch().match(new RegExp('(\\?|#|&)' + key + '=([^&]*)(#|&|$)'));
    }

    if (!m && location) {
        m = util._getHash().match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
    }

    return !m ? '' : decodeURIComponent(m[2]);
}
