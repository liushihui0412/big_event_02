let baseURL = 'http://ajax.frontend.itheima.net';

$.ajaxPrefilter(function(options) {
    options.url = baseURL + options.url;
    if (options.url.indexOf('/my/') > -1) {
        options.headers = {
            Authorization: localStorage.getItem('token2') || ''
        }

        options.complete = function(res) {
            console.log(res);
            console.log(res.responseJSON);
            // complete状态后会有responseJSON这个属性，存放身份验证信息
            // 如果status转态不为0 和 message显示 身份认证失败！ 则证明身份验证失败，直接跳转到登录页面

            // 用变量存放res.responseJSON
            let param = res.responseJSON;
            if (param.status == 1 && param.message == '身份认证失败！') {

                // 删除token
                localStorage.removeItem('token2');
                // 跳转到登录页面
                location.href = '/login.html';
            }
        }
    }


});