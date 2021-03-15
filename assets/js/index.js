$(function() {

    getUser();

    let layer = layui.layer;
    $('#btnLogout').click(function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token2');
            location.href = '/login.html';
            layer.close(index);
        });
    });
});

function getUser() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        data: {},
        success: (res) => {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 改变用户信息
            renderAvatar(res.data);
        }
    });
}

function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;&nbsp;' + name);

    // 改变头像
    if (user.user_pic != null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text_avartar').hide();
    } else {
        $('.layui-nav-img').hide();
        let text = name[0].toUpperCase();
        $('.text_avartar').show().html(text);
    }
}