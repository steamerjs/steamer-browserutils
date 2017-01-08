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
export function _stringify(val) {
	var returnVal = isObject(val) ? JSON.stringify(val) : val;
	return returnVal;
}

/**
 * parse string
 * @param  {String} val [value]
 * @return {String}     [object value]
 */
export function _parse(val) {
	var returnVal = isObject(val) ? val : JSON.parse(val);
	return returnVal;
}