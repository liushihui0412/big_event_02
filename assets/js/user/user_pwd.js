// 设置表单属性
// 获取form属性
let form = layui.form;
let layer = layui.layer;
form.verify({
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samepwd: function(value) {
        // 新密码与旧密码一致，就提示
        if (value === $('[name=oldPwd]').val()) {
            return '新密码与旧密码一致';
        }
    },
    repwd: function(value) {
        if (value !== $('[name=newPwd]').val()) {
            return '新密码与确认密码不一致';
        }
    }
});

// 修改密码后提交信息
// 表单的提交事件
// 整个页面只有一个form，直接用form即可
$('form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: $('form').serialize(),
        success: (res) => {
            console.log(res);
            // 如果转态不为0，提示失败
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('恭喜你，修改成功');
            // 清空表单
            $('form')[0].reset();
        }
    });
})