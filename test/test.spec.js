import {
    extend,
    _stringify,
    _parse,
    setCookie,
    getCookie,
    delCookie,
    formatDate,
    setItem,
    getItem,
    delItem,
    callApi,
    encodeHTML,
    decodeHTML,
    isBoolean,
    isArray,
    isDate,
    isError,
    isFunction,
    isNumber,
    isObject,
    isRegExp,
    isString,
    // isType,
    getHash,
    getQuery,
    getUrlParam
} from '../src/main';
import urlLib from '../src/libs/url';

describe('class', function() {

    it('extend, depth=0', function() {

        let src = {
            a: 1,
            b: {
                c: 2
            }
        };

        let des = {};

        extend(src, des);

        expect(JSON.stringify(des)).to.eql(JSON.stringify({ a: 1 }));

    });

    it('extend, depth=1', function() {

        let src = {
            a: 1,
            b: {
                c: 2
            }
        };

        let des = {};

        extend(src, des, 1);

        expect(JSON.stringify(des)).to.eql(JSON.stringify({ a: 1, b: { c: 2 }}));

    });

});

describe('common', function() {

    it('_stringify, object', function() {

        let src = {
            a: 1,
            b: {
                c: 2
            }
        };

        expect(_stringify(src)).to.eql(JSON.stringify(src));

    });

    it('_stringify, string', function() {

        let src = JSON.stringify({
            a: 1,
            b: {
                c: 2
            }
        });

        expect(_stringify(src)).to.eql(src);

    });

    it('_parse, object', function() {

        let src = {
            a: 1,
            b: {
                c: 2
            }
        };

        expect(JSON.stringify(_parse(src))).to.eql(JSON.stringify(src));

    });

    it('_parse, string', function() {

        let src = JSON.stringify({
            a: 1,
            b: {
                c: 2
            }
        });

        expect(JSON.stringify(_parse(src))).to.eql(src);

    });

});

describe('cookie', function() {

    it('setCookie & getCookie', function() {

        let src = {
            a: 1,
            b: {
                c: 2
            }
        };

        setCookie('key', src);

        expect(getCookie('key')).to.eql(encodeURIComponent(_stringify(src)));

    });

    it('delCookie', function() {

        delCookie('key');

        expect(getCookie('key')).to.eql(null);

    });

    it('setCookie in other path & getCookie', function() {

        let src = {
            a: 1,
            b: {
                c: 2
            }
        };

        setCookie('key1', src, 1, '/path/', 'localhost');

        expect(getCookie('key1')).to.eql(encodeURIComponent(_stringify(src)));

    });

});

describe('date', function() {
    let timeOffset = 0;
    let diff = 0;
    let currentTime = 1483871611237;

    before(() => {
        let date1 = new Date(currentTime);
        timeOffset = date1.getTimezoneOffset();
        diff = timeOffset * 60 * 1000;
        currentTime += diff;
    });


    it('format: yyyy-MM-dd', function() {

        expect(formatDate(currentTime, 'yyyy-MM-dd')).to.eql('2017-01-08');

    });

    it('format: yyyy-MM-dd hh:mm', function() {

        expect(formatDate(currentTime, 'yyyy-MM-dd hh:mm')).to.eql('2017-01-08 10:33');

    });

    it('format: yyyy-MM-dd hh:mm:ss.S', function() {

        expect(formatDate(currentTime, 'yyyy-MM-dd hh:mm:ss.S')).to.eql('2017-01-08 10:33:31.237');

    });

    it('format: yyyy-MM-dd E HH:mm:ss', function() {

        expect(formatDate(currentTime, 'yyyy-MM-dd E HH:mm:ss')).to.eql('2017-01-08 日 10:33:31');

    });

    it('format: yyyy-MM-dd EE hh:mm:ss', function() {

        expect(formatDate(currentTime, 'yyyy-MM-dd EE hh:mm:ss')).to.eql('2017-01-08 周日 10:33:31');

    });

    it('format: yyyy-MM-dd EEE hh:mm:ss', function() {

        expect(formatDate(currentTime, 'yyyy-MM-dd EEE hh:mm:ss')).to.eql('2017-01-08 星期日 10:33:31');

    });

    it('format: yyyy-M-d h:m:s.S', function() {

        // expect(formatDate(currentTime, 'yyyy-M-d h:m:s.S')).to.eql('2017-1-8 6:34:54.534');
        expect(formatDate(currentTime, 'yyyy-M-d h:m:s.S')).to.eql('2017-1-8 10:33:31.237');

    });

});

describe('localstorage', function() {

    it('setItem & getItem', function() {

        let src = {
            a: 1,
            b: {
                c: 2
            }
        };

        setItem('key', src);

        expect(getItem('key')).to.eql(_stringify(src));

    });

    it('delItem', function() {

        delItem('key');

        expect(getItem('key')).to.eql(null);

    });

});

describe('native', function() {

    it('callApi', function() {

        let url = 'jsbridge://qq/setTitle';

        callApi(url);

        let iframe = document.querySelector('iframe');

        expect(iframe.src).to.eql(url);

    });

});

describe('safe', function() {

    it('ecode html', function() {

        let str = "abc&efg\n<a>\"yes\", 'man'</a>";

        // console.log(encodeHTML(str));

        expect(encodeHTML(str)).to.eql('abc&#38;efg<br>&lt;a&gt;&quot;yes&quot;,&nbsp;&#39;man&#39;&lt;/a&gt;');

    });

    it('decode html', function() {

        let str = 'abc&#38;efg<br>&lt;a&gt;&quot;yes&quot;,&nbsp;&#39;man&#39;&lt;/a&gt;';

        // console.log(decodeHTML(str));

        expect(decodeHTML(str)).to.eql("abc&efg\n<a>\"yes\", 'man'</a>");

    });

});

describe('type', function() {

    let isBooleanVal1 = true;
    let isBooleanVal2 = false;
    let isNumberVal1 = 1;
    let isNumberVal2 = 1000;
    let isNumberVal3 = 10.2;
    // let isNumberVal4 = 10e2;
    let isStringVal1 = '123';
    let isStringVal2 = 'abcd';
    let isStringVal3 = '[1, 2]';
    let isStringVal4 = '{"a": 1}';
    let isFunctionVal1 = function() {};
    let isFunctionVal2 = function() {
        let a = 2;
        console.log(a);
    };
    let isArrayVal1 = [null, 1];
    let isArrayVal2 = [];
    let isDateVal1 = new Date();
    let isDateVal2 = new Date(2015, 0, 1);
    let isDateVal3 = Date.now();
    let isRegExpVal1 = /[abc]/i;
    let isRegExpVal2 = new RegExp('[abc]/i');
    let isObjectVal1 = {};
    // let isObjectVal2 = JSON.parse('{"a":1}');
    let isErrorVal1 = new Error(1);
    let isErrorVal2 = Error(2);

    it('isBoolean1 ' + isBooleanVal1, function() {
        expect(isBoolean(isBooleanVal1)).to.eql(true);
    });

    it('isBoolean2 ' + isBooleanVal2, function() {
        expect(isBoolean(isBooleanVal2)).to.eql(true);
    });

    it('isBoolean3 ' + isFunctionVal2, function() {
        expect(isBoolean(isFunctionVal2)).to.eql(false);
    });

    it('isNumber1 ' + isNumberVal1, function() {
        expect(isNumber(isNumberVal1)).to.eql(true);
    });

    it('isNumber2 ' + isNumberVal2, function() {
        expect(isNumber(isNumberVal2)).to.eql(true);
    });

    it('isNumber3 ' + isNumberVal3, function() {
        expect(isNumber(isNumberVal3)).to.eql(true);
    });

    it('isNumber4 ' + isStringVal1, function() {
        expect(isNumber(isStringVal1)).to.eql(false);
    });

    it('isString1 ' + isStringVal1, function() {
        expect(isString(isStringVal1)).to.eql(true);
    });

    it('isString2 ' + isStringVal2, function() {
        expect(isString(isStringVal2)).to.eql(true);
    });

    it('isString3 ' + isRegExpVal2, function() {
        expect(isString(isRegExpVal2)).to.eql(false);
    });

    it('isFunction1 ' + isFunctionVal1, function() {
        expect(isFunction(isFunctionVal1)).to.eql(true);
    });

    it('isFunction2 ' + isFunctionVal2, function() {
        expect(isFunction(isFunctionVal2)).to.eql(true);
    });

    it('isFunction3 ' + isRegExpVal2, function() {
        expect(isFunction(isRegExpVal2)).to.eql(false);
    });

    it('isArray1 ' + isArrayVal1, function() {
        expect(isArray(isArrayVal1)).to.eql(true);
    });

    it('isArray2 ' + isArrayVal2, function() {
        expect(isArray(isArrayVal2)).to.eql(true);
    });

    it('isArray2 ' + isArrayVal2, function() {
        expect(isArray(isArrayVal2)).to.eql(true);
    });

    it('isArray3 ' + isStringVal3, function() {
        expect(isArray(isStringVal3)).to.eql(false);
    });

    it('isDate1 ' + isDateVal1, function() {
        expect(isDate(isDateVal1)).to.eql(true);
    });

    it('isDate2 ' + isDateVal2, function() {
        expect(isDate(isDateVal2)).to.eql(true);
    });

    it('isDate3 ' + isDateVal3, function() {
        expect(isDate(isDateVal3)).to.eql(false);
    });

    it('isRegExp1 ' + isRegExpVal1, function() {
        expect(isRegExp(isRegExpVal1)).to.eql(true);
    });

    it('isRegExp2 ' + isRegExpVal2, function() {
        expect(isRegExp(isRegExpVal2)).to.eql(true);
    });

    it('isRegExp3 ' + isStringVal1, function() {
        expect(isRegExp(isStringVal1)).to.eql(false);
    });

    it('isObject1 ' + isObjectVal1, function() {
        expect(isObject(isObjectVal1)).to.eql(true);
    });

    it('isObject2 ' + isObjectVal1, function() {
        expect(isObject(isObjectVal1)).to.eql(true);
    });

    it('isObject3 ' + isStringVal4, function() {
        expect(isObject(isStringVal4)).to.eql(false);
    });

    it('isError1 ' + isErrorVal1, function() {
        expect(isError(isErrorVal1)).to.eql(true);
    });

    it('isError2 ' + isErrorVal2, function() {
        expect(isError(isErrorVal2)).to.eql(true);
    });

});

describe('url', function() {

    let urlSearchStub = null;
    let urlHashStub = null;

    before(() => {
        urlSearchStub = sinon.stub(urlLib, '_getSearch').callsFake(() => {
            return '?key1=a&key2=b';
        });
        urlHashStub = sinon.stub(urlLib, '_getHash').callsFake(() => {
            return '#key3=c&key4=d';
        });
    });

    after(() => {
        urlSearchStub.restore();
        urlHashStub.restore();
    });

    it('getHash', function() {

        let param = getHash('key3');

        expect(param).to.eql('c');

    });

    it('getQuery', function() {

        let param = getQuery('key1');

        expect(param).to.eql('a');

    });

    it('getUrlParam for query', function() {

        let param = getUrlParam('key2');

        expect(param).to.eql('b');

    });

    it('getUrlParam for hash', function() {

        let param = getUrlParam('key4');

        expect(param).to.eql('d');

    });

});
