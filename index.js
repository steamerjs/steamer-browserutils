'use strict';

exports.__esModule = true;
exports._stringify = _stringify;
exports._parse = _parse;
exports.extend = extend;
exports.setCookie = setCookie;
exports.delCookie = delCookie;
exports.getCookie = getCookie;
exports.setItem = setItem;
exports.getItem = getItem;
exports.delItem = delItem;
exports.callApi = callApi;
exports.encodeHTML = encodeHTML;
exports.decodeHTML = decodeHTML;
exports.isType = isType;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isRegExp = isRegExp;
exports.isObject = isObject;
exports.isError = isError;
exports.getHash = getHash;
exports.getQuery = getQuery;
exports.getUrlParam = getUrlParam;
/**
 * steamer-browserutils
 * github: https://github.com/SteamerTeam/steamer-browserutils
 * npm: https://www.npmjs.com/package/steamer-browserutils
 * version: 0.5.0
 * date: 2016.07.30
 */

/**
 * @common functions
 * @author heyli
 * @date 2016.07.30
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
 * @param  {String} val [vlaue]
 * @return {String}     [object value]
 */
function _parse(val) {
  var returnVal = JSON.parse(val);
  returnVal = isObject(returnVal) ? returnVal : val;
  return returnVal;
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
 * @param  {Integer} d   [depth]
 */
function extend(src, des, d) {
  var depth = d ? d : 0;
  for (var key in src) {
    var isObject = isObject(src[key]);
    var isArray = isArray(src[key]);
    if (isObject || isArray) {
      if (depth) {
        if (isObject) {
          des[key] = {};
          extend(src[key], des[key], depth - 1);
        } else if (isArray) {
          des[key] = [];
          extend(src[key], des[key], depth - 1);
        }
      }
    } else {
      des[key] = src[key];
    }
  }
}
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
  document.cookie = key + '=' + encodeURIComponent(_stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? 'domain=' + domain + ';' : '');
}

/**
 * del cookie
 * @param  {String} key    [key]
 * @param  {String} path   [path]
 * @param  {String} domain [domain]
 */
function delCookie(key, path, domain) {
  var expires = new Date(0);
  document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ? 'domain=' + domain + ';' : '');
}

/**
 * get cookie
 * @param  {[type]} key [key]
 * @return {String}     [cookie value]
 */
function getCookie(key) {
  var r = new RegExp("(?:^|;+|\\s+)" + key + "=([^;]*)");
  var m = window.document.cookie.match(r);
  return !m ? "" : m[1];
}
/**
 * @date functions
 * @author heyli
 * @date 2016.07.30
 */

/**
 * 获取日期展示
 * @param  {Number} timestamp 日期时间戳
 * @param  {Number} strType 日期显示格式类型，1:[4月21号 星期一 8:00], 2:[2015-7-12 星期一], 3:[07-10 07:30]，所有非当前年份日期显示年份
 * @param  {Number} serverTime 服务器时间
 * @param  {Boolean} noFixTimezone 是否不需要时区校正
 * @return {String}   格式化日期
 */
var formatDate = function () {
  // 修正为北京时间
  // 8 * 60 GMT+0800 单位为分
  var timezoneOffsetGMT8 = 8 * 60;
  // 系统时区 分 (包含夏令时)
  var timezoneOffset = new Date().getTimezoneOffset();
  // 转换成秒
  var timezoneDiff = (timezoneOffsetGMT8 + timezoneOffset) * 60;

  function fixTimezone(timestamp, isFormatToDate) {
    // 单位为秒
    // 北京时间直接返回
    if (timezoneDiff === 0) return parseInt(timestamp);
    return parseInt(parseInt(timestamp) + timezoneDiff * (isFormatToDate ? 1 : -1));
  }

  function fillZero(number) {
    return ("0" + number).slice(-2, 3);
  }

  function isYesterday(now, obj) {
    var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
    return obj.toDateString() === yesterdayString;
  }

  // 1：默认显示日期+时间
  // 2: 显示日期
  // 3: 显示时间
  return function format(timestamp) {
    var strType = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    var serverTime = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var noFixTimezone = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    if (!timestamp) {
      return '';
    }

    var weekdaymap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    var now = serverTime ? new Date(noFixTimezone ? serverTime : fixTimezone(serverTime, true) * 1000) : new Date(),
        time = new Date(noFixTimezone ? timestamp : fixTimezone(timestamp, true) * 1000);

    var formatTime = fillZero(time.getHours()) + ":" + fillZero(time.getMinutes()),
        formatDate = "",
        year = time.getFullYear(),
        month = time.getMonth() + 1,
        date = time.getDate();

    var isCurYear = true;

    strType = strType || 1;

    //判断是否今天
    if (now.getFullYear() === year && now.getMonth() === time.getMonth() && now.getDate() === date) {
      formatDate = "今天";
    } else if (isYesterday(now, time)) {
      formatDate = "昨天";
    } else {
      // 不是当前年份，都要带上年份显示
      if (now.getFullYear() !== year) {
        formatDate = year;
        isCurYear = false;
      }

      switch (strType) {
        case 1:
          formatDate = (isCurYear ? formatDate : formatDate + '年') + month + '月' + date + '号';
          break;
        case 2:
          formatDate = year + '-' + month + '-' + date;
          break;
        case 3:
          formatDate = (isCurYear ? formatDate : formatDate + '-') + fillZero(month) + '-' + fillZero(date);
          break;
      }
    }

    switch (strType) {
      // 4月21号 星期一 08:00
      case 1:
        return formatDate + ' ' + weekdaymap[time.getDay()] + ' ' + formatTime;
      // 2015-7-12 星期一
      case 2:
        return formatDate + ' ' + weekdaymap[time.getDay()];
      // 07-10 07:30
      case 3:
        return formatDate + ' ' + formatTime;
    }
  };
}();
exports.formatDate = formatDate;
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

function setItem(key, val) {
  val = _stringify(val);
  if (typeof window.Storage !== 'undefined') {
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
  if (typeof window.Storage !== 'undefined') {
    return localStorage.getItem(key) && localStorage.getItem(key);
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
  if (typeof window.Storage !== 'undefined') {
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
  var domain = arguments.length <= 1 || arguments[1] === undefined ? "jsbridge://" : arguments[1];

  var iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.height = 0;
  iframe.width = 0;
  iframe.style.cssText = "display: none";

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
  //&gt; 实体标签
  //&#34; Unicode 编码（可以用charCodeAt方法查看某字符对应的unicode编码）
  var s = "";
  if (!str || str.length == 0) return "";
  s = str.replace(/&/g, "&#38;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&quot;");
  //空格和换行其实可以不转
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\n/g, "<br>");
  return s;
}

/**
 * html实体编码转义
 * @param  {String} str html文本
 * @return {String}     经html实体编码转义后的html文本
 */
function decodeHTML(str) {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&#38;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/<br>/g, "\n");
  return s;
}
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
 * @description JS url processing
 * @author heyli
 * @date 2016.07.30
 */

/**
 * get hash param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
function getHash(key) {
  var m = window.location.hash.match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
  return !m ? "" : decodeURIComponent(m[2]);
}

/**
 * get query param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
function getQuery(key) {
  var m = window.location.search.match(new RegExp('(\\?|&)' + key + '=([^&]*)(#|&|$)'));
  return !m ? "" : decodeURIComponent(m[2]);
}

/**
 * get query or hash param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
function getUrlParam(key) {
  var m = window.location.search.match(new RegExp('(\\?|#|&)' + key + '=([^&]*)(#|&|$)'));

  if (!m) {
    m = window.location.hash.match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
  }

  return !m ? "" : decodeURIComponent(m[2]);
}