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
		var isObjectVal = isObject(src[key]);
		var isArrayVal = isArray(src[key]);
		if (isObjectVal || isArrayVal) {
			if (depth) {
				if (isObjectVal) {
	    			des[key] = {};
	    			extend(src[key], des[key], depth - 1);
	    		}
	    		else if (isArrayVal) {
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