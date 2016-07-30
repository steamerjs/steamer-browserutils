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
export function extend(src, des, d) {
	var depth = (d) ? d : 0;
	for (var key in src) {
		var isObject = isObject(src[key]);
		var isArray = isArray(src[key]);
		if (isObject || isArray) {
			if (depth) {
				if (isObject) {
	    			des[key] = {};
	    			extend(src[key], des[key], depth - 1);
	    		}
	    		else if (isArray) {
	    			des[key] = [];
	    			extend(src[key], des[key], depth - 1);
	    		}
    		}
		}
		else {
			des[key] = src[key];
		}
	} 
}