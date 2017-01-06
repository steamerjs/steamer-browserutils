/**
 * @browser localstorage processing
 * @author heyli
 * @date 2016.07.30
 */

/**
 * set localstorage
 * @param {String} key [key]
 * @param {String} val [value]
 */
export function setItem(key, val){
    val = _stringify(val);
    if (typeof(window.Storage) !== 'undefined') {
        localStorage.setItem(key,val);
    } 
    else {
        setCookie(key,val);
    }
}

/**
 * get localstorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getItem(key){
    if (typeof(window.Storage) !== 'undefined') {
        return localStorage.getItem(key) && localStorage.getItem(key);
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
    if (typeof(window.Storage) !== 'undefined') {
        delete localStorage[key];
    } 
    else {
        delCookie(key);
    }
}