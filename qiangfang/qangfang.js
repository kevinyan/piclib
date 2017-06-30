// ！！！！！需要提前修改配置！！！！！
var Token = '9876';
var ChooseRoomId = '1108';




// loadScript

(function(win, doc, undef) {
    'use script';

    var
        loadScript,
        funcName = 'loadScript',
        VERSION = '0.1.5',
        had = Object.prototype.hasOwnProperty.call(win, funcName),
        previous = win[funcName],
        loading = {},
        loaded = {};

    function log(msg) {
        if (typeof console !== 'undefined' && console && console.log) {
            console.log(msg);
        }
    }

    function rewrite(origURL) {
        var substitutions = [],
            key = loadScript.key;
        if (key) {
            try {
                substitutions = JSON.parse(localStorage.getItem(key)) || [];
            } catch (ex) {}
        }
        var i = -1,
            len = substitutions.length,
            rule, url = origURL;
        while (++i < len) {
            rule = substitutions[i];
            url = url.replace(rule[0], rule[1]);
        }
        if (url !== origURL) {
            log(funcName + ': rewrite("' + origURL + '")');
            log(' => "' + url + '"');
        }
        return url;
    }

    // Here is the loadScript() function itself.
    loadScript = win[funcName] = function(requestURL, callback) {
        var
            el,
            url = rewrite(requestURL),
            needToLoad = !loading[url],
            q = loading[url] = loading[url] || [];

        function doCallback() {
            if (callback) {
                callback();
            }
        }
        if (loaded[url]) {
            doCallback();
            return;
        }
        q.push(doCallback);

        function onLoad() {
            loaded[url] = 1;
            while (q.length) {
                q.shift()();
            }
        }
        if (needToLoad) {
            el = doc.createElement('script');
            el.type = 'text/javascript';
            el.charset = 'utf-8';
            if (el.addEventListener) {
                el.addEventListener('load', onLoad, false);
            } else { // IE
                el.attachEvent('onreadystatechange', onLoad);
            }
            if (url !== requestURL) {
                el.setAttribute('data-requested', requestURL);
            }
            el.src = url;
            doc.getElementsByTagName('head')[0].appendChild(el);
        }
    };

    loadScript.VERSION = VERSION;

    loadScript.noConflict = function() {
        if (win[funcName] === loadScript) {
            win[funcName] = had ? previous : undef;
            if (!had) {
                try {
                    delete win[funcName];
                } catch (ex) {}
            }
        }
        return loadScript;
    };
}(this, document));




// 加载zepto

var jqURL = '//cdn.bootcss.com/zepto/1.0rc1/zepto.min.js';
loadScript(jqURL, function() {

    var RandomCode = '';




    // 获取随机数  
    // https://ztcwx.myscrm.cn/index.php?r=choose-room/get-random-code&token=zmdbqp1498214292&chooseRoomId=81101
    function getRandomCode() {
        $.ajax({
            type: 'GET',
            url: '/index.php?r=choose-room/get-random-code',
            // 需要获取token , chooseRoomId
            data: {
                token: Token,
                chooseRoomId: ChooseRoomId,
            },
            dataType: 'json',
            timeout: 500,
            success: function(e) {
                RandomCode = e.data;

                //调用提交订单
                submitOrder();
            },
            error: function(xhr, type) {
                alert('Ajax error!');
            }
        })
    }



    // 提交订单
    // https://ztcwx.myscrm.cn/index.php?r=choose-room/submit-order&token=zmdbqp1498214292&chooseRoomId=81101&randomCode=
    function submitOrder() {
        $.ajax({
            type: 'GET',
            url: '/index.php?r=choose-room/submit-order',
            data: {
                token: Token,
                chooseRoomId: ChooseRoomId,
                randomCode: RandomCode
            },
            dataType: 'json',
            timeout: 500,
            success: function(e) {
                // var errorCode = e.data.status.toString();
            },
            error: function(xhr, type) {
                alert('Ajax error!');
            }
        })
    }



    // !!!!!!!启动函数!!!!!
    setInterval(function() {
        getRandomCode();
    }, 500)


});
