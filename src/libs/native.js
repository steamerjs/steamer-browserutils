/**
 * @call native api
 * @author heyli
 * @date 2016.07.30
 */

export function callApi(url) {

    if (!global.document) {
        return;
    }

    let iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style.cssText = 'display: none';

    document.body.appendChild(iframe);

    setTimeout(function() {
        document.body.removeChild(iframe);
        iframe = null;
    }, 2000);
}

