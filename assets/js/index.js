$(function() {
//    调用getuserinfo 获取用户基本信息
getUserInfo();

let layer = layui.layer;
$('#btnlogout').on('click',function(){
    layer.confirm('是否退出?', {icon: 3, title:'提示'}, 
    function(index){
        // 1.情况本地储存token
        localStorage.removeItem('token');
        // 2.重新跳转到登录页面
        location.href = '/login.html';
        // 关闭询问框
        layer.close(index);
      });
})
})


 // 获取用户信息
 function getUserInfo() {
     $.ajax({
         method : 'GET',
         url: '/my/userinfo',
        //  请求头配置对象
        //  headers : {
        //     Authorization: localStorage.getItem('token') ||''
        //  },
         success: function(res) {
             console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data);
            
         }
     }) 
 }
// 渲染用户的头像
 function renderAvatar(user){
let name = user.nickname || user.username;
$('#welcome').html('欢迎&nbsp;&nbsp;' + name);
if(user.user_pic !== null){
$('.layui-nav-img').attr('src',user.user_pic).show();
$('.text-avatat').hide();
}
else{
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase();
    $('.text-avatat').html(first).show();
}
 }