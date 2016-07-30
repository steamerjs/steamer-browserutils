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
export function _stringify(val) {
	var returnVal = isObject(val) ? JSON.stringify(val) : val;
	return returnVal;
}

/**
 * parse string
 * @param  {String} val [vlaue]
 * @return {String}     [object value]
 */
export function _parse(val) {
	var returnVal = JSON.parse(val);
	returnVal = isObject(returnVal) ? returnVal : val;
	return returnVal;
}