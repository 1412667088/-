$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
  
            Authorization: localStorage.getItem('token') ||''
         }
    }
//    全局统一挂载
options.complete = function(res){
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 1.强制清空token
                localStorage.removeItem('token');
        //         // 强制跳转
                location.href = '/login.html';
            }
}
})

