$(function(){
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname:function(value) {
            if (value.length > 6){
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
              if(res.status !== 0){
                  return layer.msg('获取用户信息失败!')
              }
            //   快速赋值
            form.val('formUserInfo',res.data);
            console.log(res.nickname);
            }
        })
    }

    $('#btnReset').on('click', function(e){
     e.preventDefault();
     initUserInfo();
    })

    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败!');
                }
                window.parent.getUserInfo();
                return layer.msg('更新用户信息成功!');
                
            }
        })
    })
})