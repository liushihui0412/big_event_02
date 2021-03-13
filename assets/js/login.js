$(function() {

    // 点击 去注册 按钮，切换到注册页面
    $('#link_reg').click(function() {
        $('.loginBox').hide();
        $('.regBox').show();
    });

    // 点击 去登录 按钮，切换到登录页面
    $('#link_login').click(function() {
        $('.loginBox').show();
        $('.regBox').hide();
    });


    // 表单密码框和再次输入密码框的验证

    // console.log(form); //因为layui里面的form不能直接调用，所以这里会报错
    console.log(layui.form); //form在layui里面，所以可以通过点语法把form拿出来
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            console.log(value); //value为再次输入密码框的值
            // 校验密码框的值也再次输入框的值是否一致，先获取密码框的值
            let pass = $('.regBox input[name=password').val();
            if (value != pass) {
                return '两次密码不一致，请重新输入';
            }
        }
    });

    let layer = layui.layer;
    // 登录页面：提交信息到服务器
    $('#login_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $('#login_form').serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }

                location.href = '/index.html';
                localStorage.setItem('token2', res.token)
            }
        });
    });

    // 注册页面：提交信息到服务器
    $('#reg_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.regBox input[name=username]').val(),
                password: $('.regBox input[name=password]').val()
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                $('#link_login').click();

                // 清空注册页面
                $('#reg_form')[0].reset();
            }
        });
    })



});