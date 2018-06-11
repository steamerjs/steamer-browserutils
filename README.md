## steamer-browserutils
Browser utils for development


### Functions
For usage details, you can checkout `./src/libs/`
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

By default, we require `steamer-browserutils/index.js` which is an `es5` version. However, sometimes you may need `es6` version for tree-shaking in `webpack` or `rollup`, then you can explicitly require `steamer-browserutils/index.esm.js`.

You also need to notice that compling tool like `webpack` may exclude `node_modules` when compling js files in order to speed up the whole compling process. If so, please remove this config or just put `./dist/index.esm.js` in your `src` folder.
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
If you hope to customized certain types of APIs. For example, if you hope to exclude `safe` and `native` APIs, you can modify `./src/mains`.js by commenting `safe` and `natve` `export`.

```
// export {
//     callApi,
// } from './libs/native';
// export {
//     encodeHTML,
//     decodeHTML
// } from './libs/safe';
```

Please be cautious if you want to exlucde `common` since other APIs use its functions.

### Test
```javascript
npm test
```


### Changelog
* v0.5.0 finish basic features and add es6 and es5 support
* v1.0.0 add test
* v1.0.1 compatible with global
* v1.0.2 use rollup to bundle
