## steamer-browserutils
Browser utils for development


### Functions
For usage details, you can checkout `es.js`
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

By default, we require `steamer-browserutils/index.js` which is an `es5` version. However, sometimes you may need `es6` version for tree-shaking in `webpack2.0` or `rollup`, then you can explicitly require `steamer-browserutils/es.js`.

You also need to notice that compling tool like `webpack` may exclude `node_modules` when compling js files in order to speed up the whole compling process. If so, please remove this config or just put `es6.js` in your `src` folder.
```
{ 
    test: /\.js?$/,
    loader: 'babel',
    query: {
        // cacheDirectory: './webpack_cache/',
        plugins: ['transform-decorators-legacy'],
        presets: [
            'es2015-loose', 
            'react',
        ]
    },
    exclude: /node_modules/,
},
```

### Customized library
If you hope to customized certain types of APIs. For example, if you hope to exclude `url` and `type` APIs, you can modify gulpfile.js by commenting `url` and `type` keys of `mapping` object; Then run `gulp`, you will get a customized version.

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


### Changelog
* v0.5.0 finish basic features and add es6 and es5 support
