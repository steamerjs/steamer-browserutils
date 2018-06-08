/**
 * @browser safe functions
 * @author heyli
 * @date 2016.07.30
 */

/**
 * html实体编码
 * @param  {String} str html文本
 * @return {String}     经html实体编码后的html文本
 */
export function encodeHTML(str) {
    // &gt; 实体标签
    // &#34; Unicode 编码（可以用charCodeAt方法查看某字符对应的unicode编码）
    let s = '';
    if (!str || str.length == 0) return '';
    s = str.replace(/&/g, '&#38;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/\'/g, '&#39;');
    s = s.replace(/\"/g, '&quot;');
    // 空格和换行其实可以不转
    s = s.replace(/ /g, '&nbsp;');
    s = s.replace(/\n/g, '<br>');
    return s;
}

/**
 * html实体编码转义
 * @param  {String} str html文本
 * @return {String}     经html实体编码转义后的html文本
 */
export function decodeHTML(str) {
    let s = '';
    if (str.length == 0) return '';
    s = str.replace(/&#38;/g, '&');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/<br>/g, '\n');
    return s;
}
