/**
 * @description JS Type Checking
 * @author heyli
 * @date 2016.07.30
 */

function isType(type, obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}

function isBoolean(obj) {
    return isType('Boolean', obj);
}

function isNumber(obj) {
    return isType('Number', obj);
}

function isString(obj) {
    return isType('String', obj);
}

function isFunction(obj) {
    return isType('Function', obj);
}

function isArray(obj) {
    return isType('Array', obj);
}

function isDate(obj) {
    return isType('Date', obj);
}

function isRegExp(obj) {
    return isType('RegExp', obj);
}

function isObject(obj) {
    return isType('Object', obj);
}

function isError(obj) {
    return isType('Error', obj);
}

/**
 * @class features
 * @author heyli
 * @date 2016.07.30
 */

/**
 * [extend object]
 * @param  {Object} src [src object]
 * @param  {Object} des [extended object]
 * @param  {Integer} dep   [depth]
 */
function extend(src, des) {
    var dep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            var isObjectVal = isObject(src[key]);
            var isArrayVal = isArray(src[key]);
            if (isObjectVal || isArrayVal) {
                if (dep) {
                    if (isObjectVal) {
                        des[key] = {};
                        extend(src[key], des[key], dep - 1);
                    } else if (isArrayVal) {
                        des[key] = [];
                        extend(src[key], des[key], dep - 1);
                    }
                }
            } else {
                des[key] = src[key];
            }
        }
    }
}

/**
 * steamer-browserutils
 * github: https://github.com/SteamerTeam/steamer-browserutils
 * npm: https://www.npmjs.com/package/steamer-browserutils
 * version: 1.0.0
 * date: 2017.01.10
 */

/**
 * stringify value
 * @param  {String} val [value]
 * @return {String}     [stringified value]
 */
function _stringify(val) {
  var returnVal = isObject(val) ? JSON.stringify(val) : val;
  return returnVal;
}

/**
 * parse string
 * @param  {String} val [value]
 * @return {String}     [object value]
 */
function _parse(val) {
  var returnVal = isObject(val) ? val : JSON.parse(val);
  return returnVal;
}

// compatible with global
var global = typeof global !== 'undefined' ? global : {};

if (typeof window !== 'undefined') {
    global = window;
} else if (typeof self !== 'undefined') {
    global = self;
}

var global$1 = global;

/**
 * @description Browser cookie processing
 * @author heyli
 * @date 2016.07.30
 * 正则表达式网站  http://www.regexr.com/
 */

/**
 * set cookie
 * @param {String} key    [key]
 * @param {String} val    [value]
 * @param {String} days   [days]
 * @param {String} path   [path]
 * @param {String} domain [domain]
 */
function setCookie(key, val, days, path, domain) {
    var expire = new Date();
    expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 30 * 24 * 60 * 60 * 1000)); // 默认1个月
    if (global$1.document) {
        document.cookie = key + '=' + encodeURIComponent(_stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? 'domain=' + domain + ';' : '');
    }
}

/**
 * del cookie
 * @param  {String} key    [key]
 * @param  {String} path   [path]
 * @param  {String} domain [domain]
 */
function delCookie(key, path, domain) {
    var expires = new Date(0);
    if (global$1.document) {
        document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ? 'domain=' + domain + ';' : '');
    }
}

/**
 * get cookie
 * @param  {[type]} key [key]
 * @return {String}     [cookie value]
 */
function getCookie(key) {
    var r = new RegExp('(?:^|;+|\\s+)' + key + '=([^;]*)');
    var m = '';
    if (global$1.document) {
        m = global$1.document.cookie.match(r);
    }
    return (!m ? '' : m[1]) || null;
}

/**
 * @date functions
 * @author heyli
 * @date 2016.07.30
 */

function formatDate(dt, format) {

    if (!dt) {
        return;
    }

    var fmt = format;
    var date = isDate(dt) ? dt : new Date(dt);

    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };

    var week = {
        '0': '\u65E5',
        '1': '\u4E00',
        '2': '\u4E8C',
        '3': '\u4E09',
        '4': '\u56DB',
        '5': '\u4E94',
        '6': '\u516D'
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
    }

    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '\u661F\u671F' : '\u5468' : '') + week[String(date.getDay())]);
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
        }
    }

    return fmt;
}

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
function setItem(key, v) {
    var val = _stringify(v);
    if (typeof global$1.Storage !== 'undefined') {
        localStorage.setItem(key, val);
    } else {
        setCookie(key, val);
    }
}

/**
 * get localstorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
function getItem(key) {
    if (typeof global$1.Storage !== 'undefined') {
        return localStorage.getItem(key);
    } else {
        return getCookie(key);
    }
}

/**
 * delete localstorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
function delItem(key) {
    if (typeof global$1.Storage !== 'undefined') {
        delete localStorage[key];
    } else {
        delCookie(key);
    }
}

/**
 * @call native api
 * @author heyli
 * @date 2016.07.30
 */

function callApi(url) {

    if (!global$1.document) {
        return;
    }

    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style.cssText = 'display: none';

    document.body.appendChild(iframe);

    setTimeout(function () {
        document.body.removeChild(iframe);
        iframe = null;
    }, 2000);
}

/**
 * @browser safe functions
 * @author heyli
 * @date 2016.07.30
 */

/**
 * html实体编码
 * @param  {String} str html文本
 * @return {String}     经html实体编码后的html文本
 */
function encodeHTML(str) {
  // &gt; 实体标签
  // &#34; Unicode 编码（可以用charCodeAt方法查看某字符对应的unicode编码）
  var s = '';
  if (!str || str.length === 0) return '';
  s = str.replace(/&/g, '&#38;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  s = s.replace(/\'/g, '&#39;');
  s = s.replace(/\"/g, '&quot;');
  // 空格和换行其实可以不转
  s = s.replace(/ /g, '&nbsp;');
  s = s.replace(/\n/g, '<br>');
  return s;
}

/**
 * html实体编码转义
 * @param  {String} str html文本
 * @return {String}     经html实体编码转义后的html文本
 */
function decodeHTML(str) {
  var s = '';
  if (str.length === 0) return '';
  s = str.replace(/&#38;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/&nbsp;/g, ' ');
  s = s.replace(/<br>/g, '\n');
  return s;
}

/**
 * @description JS url processing
 * @author heyli
 * @date 2016.07.30
 */

var util = {
    _getHash: function _getHash() {
        return global$1.location.hash;
    },
    _getSearch: function _getSearch() {
        return global$1.location.search;
    }
};

/**
 * get hash param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
function getHash(key) {
    var m = '';
    var location = global$1.location;
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
function getQuery(key) {
    var m = '';
    var location = global$1.location;
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
function getUrlParam(key) {
    var m = '';
    var location = global$1.location;

    if (location) {
        m = util._getSearch().match(new RegExp('(\\?|#|&)' + key + '=([^&]*)(#|&|$)'));
    }

    if (!m && location) {
        m = util._getHash().match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
    }

    return !m ? '' : decodeURIComponent(m[2]);
}

export { extend, setCookie, delCookie, getCookie, formatDate, setItem, getItem, delItem, callApi, encodeHTML, decodeHTML, isType, isBoolean, isNumber, isString, isFunction, isArray, isDate, isRegExp, isObject, isError, getHash, getUrlParam, getQuery, _stringify, _parse };
