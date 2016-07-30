/**
 * @date functions
 * @author heyli
 * @date 2016.07.30
 */

/**
 * 获取日期展示
 * @param  {Number} timestamp 日期时间戳
 * @param  {Number} strType 日期显示格式类型，1:[4月21号 星期一 8:00], 2:[2015-7-12 星期一], 3:[07-10 07:30]，所有非当前年份日期显示年份
 * @param  {Number} serverTime 服务器时间
 * @param  {Boolean} noFixTimezone 是否不需要时区校正
 * @return {String}   格式化日期
 */
var formatDate = (function() {
    // 修正为北京时间
    // 8 * 60 GMT+0800 单位为分
    var timezoneOffsetGMT8 = 8 * 60;
    // 系统时区 分 (包含夏令时)
    var timezoneOffset = (new Date()).getTimezoneOffset();
    // 转换成秒
    var timezoneDiff = (timezoneOffsetGMT8 + timezoneOffset) * 60;

    function fixTimezone(timestamp, isFormatToDate){
        // 单位为秒
        // 北京时间直接返回
        if (timezoneDiff === 0) return parseInt(timestamp);
        return parseInt(parseInt(timestamp) + timezoneDiff * (isFormatToDate ? 1 : -1));
    }

    function fillZero(number){
        return ("0"+number).slice(-2,3);
    }

    function isYesterday(now, obj) {
        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return obj.toDateString() === yesterdayString;
    }

    // 1：默认显示日期+时间
    // 2: 显示日期
    // 3: 显示时间
    return (function format(timestamp, strType = 1, serverTime = 0, noFixTimezone = false) {
        if (!timestamp) {
            return '';
        }

        var weekdaymap = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

        var now = serverTime ?
            (new Date(noFixTimezone ? serverTime :
                fixTimezone(serverTime, true) * 1000)) :
            (new Date()),
            time = new Date(noFixTimezone ? timestamp :
            fixTimezone(timestamp, true) * 1000);

        var formatTime = fillZero(time.getHours()) + ":" + fillZero(time.getMinutes()),
            formatDate = "",
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            date = time.getDate();

        var isCurYear = true;

        strType = strType || 1;

        //判断是否今天
        if (now.getFullYear() === year &&
            now.getMonth() === time.getMonth() &&
            now.getDate() === date) {
            formatDate = "今天";
        } else if (isYesterday(now, time)) {
            formatDate = "昨天";
        } else {
            // 不是当前年份，都要带上年份显示
            if (now.getFullYear() !== year) {
                formatDate = year;
                isCurYear = false;
            }

            switch (strType) {
                case 1:
                    formatDate = (isCurYear ? formatDate : formatDate + '年') + month + '月' + date + '号';
                    break;
                case 2:
                    formatDate = year + '-' + month + '-' + date;
                    break;
                case 3:
                    formatDate = (isCurYear ? formatDate : formatDate + '-') + fillZero(month) + '-' + fillZero(date);
                    break;
            }
        }

        switch (strType) {
            // 4月21号 星期一 08:00
            case 1:
                return formatDate + ' ' + weekdaymap[time.getDay()] + ' ' + formatTime;
            // 2015-7-12 星期一
            case 2:
                return formatDate + ' ' + weekdaymap[time.getDay()];
            // 07-10 07:30
            case 3:
                return formatDate + ' ' + formatTime;
        }
    });
})();
export {formatDate};