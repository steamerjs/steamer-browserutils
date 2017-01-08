'use strict';

var utils = exports;

// console.log(utils);

describe("class", function() {

	it("extend, depth=0", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

      	var des = {};

      	utils.extend(src, des);

  		expect(JSON.stringify(des)).toBe(JSON.stringify({a: 1}));
    	
  	});

  	it("extend, depth=1", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

      	var des = {};

      	utils.extend(src, des, 1);

  		expect(JSON.stringify(des)).toBe(JSON.stringify({a: 1, b: { c: 2}}));
    	
  	});

});

describe("common", function() {

	it("_stringify, object", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

  		expect(utils._stringify(src)).toBe(JSON.stringify(src));
    	
  	});

  	it("_stringify, string", function() {

		var src = JSON.stringify({
      		a: 1,
      		b: {
      			c: 2
      		}	
      	});

  		expect(utils._stringify(src)).toBe(src);
    	
  	});

  	it("_parse, object", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

  		expect(JSON.stringify(utils._parse(src))).toBe(JSON.stringify(src));
    	
  	});

  	it("_parse, string", function() {

		var src = JSON.stringify({
      		a: 1,
      		b: {
      			c: 2
      		}	
      	});

  		expect(JSON.stringify(utils._parse(src))).toBe(src);
    	
  	});

});

describe("cookie", function() {

	it("setCookie & getCookie", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

      	utils.setCookie("key", src);

  		expect(utils.getCookie("key")).toBe(encodeURIComponent(utils._stringify(src)));
    	
  	});

  	it("delCookie", function() {

      	utils.delCookie("key");

  		expect(utils.getCookie("key")).toBe(null);
    	
  	});

  	it("setCookie in other path & getCookie", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

      	utils.setCookie("key1", src, null, "/path", "localhost");

  		expect(utils.getCookie("key1")).toBe(encodeURIComponent(utils._stringify(src)));
    	
  	});

});

describe("date", function() {

	it("format: yyyy-MM-dd", function() {

		var currentTime = 1483871611237;

  		expect(utils.formatDate(currentTime, 'yyyy-MM-dd')).toBe("2017-01-08");
    	
  	});

  	it("format: yyyy-MM-dd hh:mm", function() {

		var currentTime = 1483871694534;

		// console.log(currentTime, utils.formatDate(currentTime, 'yyyy-MM-dd hh:mm'));

  		expect(utils.formatDate(currentTime, 'yyyy-MM-dd hh:mm')).toBe("2017-01-08 06:34");
    	
  	});

  	it("format: yyyy-MM-dd hh:mm:ss.S", function() {

		var currentTime = 1483871694534;

		// console.log(currentTime, utils.formatDate(currentTime, 'yyyy-MM-dd hh:mm:ss.S'));

  		expect(utils.formatDate(currentTime, 'yyyy-MM-dd hh:mm:ss.S')).toBe("2017-01-08 06:34:54.534");
    	
  	});

  	it("format: yyyy-MM-dd E HH:mm:ss", function() {

		var currentTime = 1483871694534;

		// console.log(currentTime, utils.formatDate(currentTime, 'yyyy-MM-dd E HH:mm:ss'));

  		expect(utils.formatDate(currentTime, 'yyyy-MM-dd E HH:mm:ss')).toBe("2017-01-08 日 18:34:54");
    	
  	});

  	it("format: yyyy-MM-dd EE hh:mm:ss", function() {

		var currentTime = 1483871694534;

		// console.log(currentTime, utils.formatDate(currentTime, 'yyyy-MM-dd EE hh:mm:ss'));

  		expect(utils.formatDate(currentTime, 'yyyy-MM-dd EE hh:mm:ss')).toBe("2017-01-08 周日 06:34:54");
    	
  	});

  	it("format: yyyy-MM-dd EEE hh:mm:ss", function() {

		var currentTime = 1483871694534;

		// console.log(currentTime, utils.formatDate(currentTime, 'yyyy-MM-dd EEE hh:mm:ss'));

  		expect(utils.formatDate(currentTime, 'yyyy-MM-dd EEE hh:mm:ss')).toBe("2017-01-08 星期日 06:34:54");
    	
  	});

  	it("format: yyyy-M-d h:m:s.S", function() {

		var currentTime = 1483871694534;

		// console.log(currentTime, utils.formatDate(currentTime, 'yyyy-M-d h:m:s.S'));

  		expect(utils.formatDate(currentTime, 'yyyy-M-d h:m:s.S')).toBe("2017-1-8 6:34:54.534");
    	
  	});

});

describe("localstorage", function() {

	it("setItem & getItem", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

      	utils.setItem("key", src);

  		expect(utils.getItem("key")).toBe(utils._stringify(src));
    	
  	});

  	it("delItem", function() {

		var src = {
      		a: 1,
      		b: {
      			c: 2
      		}	
      	};

      	utils.delItem("key");

  		expect(utils.getItem("key")).toBe(null);
    	
  	});

});

describe("native", function() {

	it("callApi", function() {

		let url = "jsbridge://qq/setTitle";

		utils.callApi(url);

		var iframe = document.querySelector('iframe');

  		expect(iframe.src).toBe(url);
    	
  	});

});

describe("safe", function() {

	it("ecode html", function() {

		let str = "abc&efg\n<a>\"yes\", 'man'</a>";

		// console.log(utils.encodeHTML(str));

  		expect(utils.encodeHTML(str)).toBe("abc&#38;efg<br>&lt;a&gt;&quot;yes&quot;,&nbsp;&#39;man&#39;&lt;/a&gt;");
    	
  	});

  	it("decode html", function() {

		let str = "abc&#38;efg<br>&lt;a&gt;&quot;yes&quot;,&nbsp;&#39;man&#39;&lt;/a&gt;";

		// console.log(utils.decodeHTML(str));

  		expect(utils.decodeHTML(str)).toBe("abc&efg\n<a>\"yes\", 'man'</a>");
    	
  	});

});

describe("type", function() {

	var isBooleanVal1 = true,
		isBooleanVal2 = false,
		isNumberVal1 = 1,
		isNumberVal2 = 1000,
		isNumberVal3 = 10.2,
		isNumberVal4 = 10e2,
		isStringVal1 = "123",
		isStringVal2 = 'ab' + 'cd',
		isStringVal3 = '[1, 2]',
		isStringVal4 = '{"a": 1}',
		isFunctionVal1 = function() {},
		isFunctionVal2 = function() { var a = 2;},
		isArrayVal1 = [,1],
		isArrayVal2 = [],
		isDateVal1 = new Date(),
		isDateVal2 = new Date(2015, 0, 1),
		isDateVal3 = Date.now(),
		isRegExpVal1 = /[abc]/i,
		isRegExpVal2 = new RegExp("[abc]/i"),
		isObjectVal1 = {},
		isObjectVal2 = JSON.parse('{"a":1}'),
		isErrorVal1 = new Error(1),
		isErrorVal2 = Error(2);

	it("isBoolean1 " + isBooleanVal1, function() {
  		expect(utils.isBoolean(isBooleanVal1)).toBe(true);
  	});

  	it("isBoolean2 " + isBooleanVal2, function() {
  		expect(utils.isBoolean(isBooleanVal2)).toBe(true);
  	});

  	it("isBoolean3 " + isFunctionVal2, function() {
  		expect(utils.isBoolean(isFunctionVal2)).toBe(false);
  	});

  	it("isNumber1 " + isNumberVal1, function() {
  		expect(utils.isNumber(isNumberVal1)).toBe(true);
  	});

  	it("isNumber2 " + isNumberVal2, function() {
  		expect(utils.isNumber(isNumberVal2)).toBe(true);
  	});

  	it("isNumber3 " + isNumberVal3, function() {
  		expect(utils.isNumber(isNumberVal3)).toBe(true);
  	});

  	it("isNumber4 " + isStringVal1, function() {
  		expect(utils.isNumber(isStringVal1)).toBe(false);
  	});

  	it("isString1 " + isStringVal1, function() {
  		expect(utils.isString(isStringVal1)).toBe(true);
  	});

  	it("isString2 " + isStringVal2, function() {
  		expect(utils.isString(isStringVal2)).toBe(true);
  	});

  	it("isString3 " + isRegExpVal2, function() {
  		expect(utils.isString(isRegExpVal2)).toBe(false);
  	});

  	it("isFunction1 " + isFunctionVal1, function() {
  		expect(utils.isFunction(isFunctionVal1)).toBe(true);
  	});

  	it("isFunction2 " + isFunctionVal2, function() {
  		expect(utils.isFunction(isFunctionVal2)).toBe(true);
  	});

  	it("isFunction3 " + isRegExpVal2, function() {
  		expect(utils.isFunction(isRegExpVal2)).toBe(false);
  	});

  	it("isArray1 " + isArrayVal1, function() {
  		expect(utils.isArray(isArrayVal1)).toBe(true);
  	});

  	it("isArray2 " + isArrayVal2, function() {
  		expect(utils.isArray(isArrayVal2)).toBe(true);
  	});

  	it("isArray2 " + isArrayVal2, function() {
  		expect(utils.isArray(isArrayVal2)).toBe(true);
  	});

  	it("isArray3 " + isStringVal3, function() {
  		expect(utils.isArray(isStringVal3)).toBe(false);
  	});

  	it("isDate1 " + isDateVal1, function() {
  		expect(utils.isDate(isDateVal1)).toBe(true);
  	});

  	it("isDate2 " + isDateVal2, function() {
  		expect(utils.isDate(isDateVal2)).toBe(true);
  	});

  	it("isDate3 " + isDateVal3, function() {
  		expect(utils.isDate(isDateVal3)).toBe(false);
  	});

  	it("isRegExp1 " + isRegExpVal1, function() {
  		expect(utils.isRegExp(isRegExpVal1)).toBe(true);
  	});

  	it("isRegExp2 " + isRegExpVal2, function() {
  		expect(utils.isRegExp(isRegExpVal2)).toBe(true);
  	});

  	it("isRegExp3 " + isStringVal1, function() {
  		expect(utils.isRegExp(isStringVal1)).toBe(false);
  	});

  	it("isObject1 " + isObjectVal1, function() {
  		expect(utils.isObject(isObjectVal1)).toBe(true);
  	});

  	it("isObject2 " + isObjectVal1, function() {
  		expect(utils.isObject(isObjectVal1)).toBe(true);
  	});

  	it("isObject3 " + isStringVal4, function() {
  		expect(utils.isObject(isStringVal4)).toBe(false);
  	});

  	it("isError1 " + isErrorVal1, function() {
  		expect(utils.isError(isErrorVal1)).toBe(true);
  	});

  	it("isError2 " + isErrorVal2, function() {
  		expect(utils.isError(isErrorVal2)).toBe(true);
  	});

});

describe("url", function() {

	it("getHash", function() {

		let param = utils.getHash('key3'); 

  		expect(param).toBe("c");
    	
  	});

  	it("getQuery", function() {

		let param = utils.getQuery('key1'); 

  		expect(param).toBe("a");
    	
  	});

  	it("getUrlParam for query", function() {

		let param = utils.getUrlParam('key2'); 

  		expect(param).toBe("b");
    	
  	});

  	it("getUrlParam for hash", function() {

		let param = utils.getUrlParam('key4'); 

  		expect(param).toBe("d");
    	
  	});

});