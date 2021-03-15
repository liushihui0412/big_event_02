// 表单验证
let form = layui.form;
form.verify({
    nickname: function(value) {
        if (value.length > 6) {
            return '昵称长度在1-6之间';
        }
    }
});


// 更新用户信息
let layer = layui.layer;

// 渲染信息
initUserInfo();

// 渲染用户信息函数
function initUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        data: {},
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            form.val('formUserInfo', res.data);
        }

    });
}

//重置
$('#btnReset').on('click', function(e) {
    // 阻止默认跳转
    e.preventDefault();
    // 重新渲染用户信息
    initUserInfo();
})

// 表单提交信息
$('.layui-form').on('submit', function(e) {
    // 阻止表单默认跳转
    e.preventDefault();
    // 发送ajax请求 
    $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            // 发送信息后，需要更新用户的一些信息，要实现局部更新，要调用index这个页面的获取用户信息的getUser()方法
            // 但因为user_info页面的爸爸是iframe标签，iframe标签可以调用getUser这个方法，所以getUser这个方法是属于爸爸级别的方法，这个方法是挂载window上的，所以通过window.parent来调用这个方法
            window.parent.getUser();
        }
    });
})