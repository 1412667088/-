$(function () {
    // 点击"去注册账号"的连接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击"去登录"的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象
    let form = layui.form;
    let layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val();
            console.log(pwd);
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 发起ajax的post请求
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
            function (res) {
                if(res.status == 1){
                    console.log(res);
                    return layer.msg('用户名已被占用');
                }
            if(res.status !== 0){
                console.log(res);
                return layer.msg('注册失败');
            }
             layer.msg('注册成功,请登录');
            $('#link_login').click();
            })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success : function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败');
                    
                }
                localStorage.setItem('token',res.token);
                layer.msg('登录成功');
                console.log(res.token);
                location.href='/index.html';
            }
        })
    })
})

