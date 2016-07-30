## steamer-browserutils
Browser utils for development


### functions
For usage details, you can open `index.js`
####
* class
	- extend
* common
	- _stringify
	- _parse
* cookie
	- setCookie
	- delCookie
	- getCookie
* date
	- formatDate
* localstorage
	- setItem
	- delItem
	- getItem
* native
	- callApi
* safe
	- encodeHTML
	- decodeHTML
* type
	- isType
	- isBoolean
	- isNumber
	- isString
	- isFunction
	- isArray
	- isDate
	- isRegExp
	- isObject
	- isError
* url
	- getHash
 	- getQuery
 	- getUrlParam

### Usage
You can require the file like this:
```
// Node
var utils = require('steamer-browserutils');

// ES6
import { extend, isType } from 'steamer-browserutils';
```

### Customized library
If you hope to customized certain types of APIs. For example, if you hope to exclude `url` and `type` APIs, you can modify gulpfile.js like by commenting `url` and `type` keys of `mapping` object; Then run `gulp`, you will get a customized version.

```
var mapping = {
	'common': './src/libs/common.js',
	'class': './src/libs/class.js',
	'cookie': './src/libs/cookie.js',
	'date': './src/libs/date.js',
	'localstorage': './src/libs/localstorage.js',
	'native': './src/libs/native.js',
	'safe': './src/libs/safe.js',
	// 'type': './src/libs/type.js',
	// 'url': './src/libs/url.js',
};
```

Please be cautious if you want to exlucde `common` since other APIs use its functions.


