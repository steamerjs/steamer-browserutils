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
export function getHash(key) {
    var m = "",
    	location = global.location;
    if (location) {
    	m = location.hash.match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
    }
    return !m ? "" : decodeURIComponent(m[2]);
}

/**
 * get query param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getQuery(key) {
    var m = "",
    	location = global.location;
    if (location) {
    	m = location.search.match(new RegExp('(\\?|&)'+ key + '=([^&]*)(#|&|$)'));
    }
    return !m ? "":decodeURIComponent(m[2]);
}

/**
 * get query or hash param
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getUrlParam(key) {
	var m = "",
		location = global.location;

	if (location) {
		m = location.search.match(new RegExp('(\\?|#|&)'+ key + '=([^&]*)(#|&|$)'));
	}
    
    if (!m && location) {
    	m = location.hash.match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
    }

    return !m ? "":decodeURIComponent(m[2]);
}