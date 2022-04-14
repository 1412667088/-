$(function(){
    let layer = layui.layer;
//    1.获取裁剪区的dom元素
    let $image = $('#image');
    // 2.配置选项
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
// 3.创建裁剪区域
    $image.cropper(options);

// 为上传按钮绑定点击事件
$('#btnChooseImage').on('click',function(){
    $('#file').click();
})
// 为文件选择绑定change事件
$('#file').on('change',function(e){
    let filelist = e.target.files;
    console.log(filelist);
    if(filelist.length === 0){
        return layer.msg('请选择照片!');
    }

    // 拿到用户选择文件
    let file = e.target.files[0];
//    将文件转换成路径
    let imgURL = URL.createObjectURL(file);    
    // 初始化裁剪区
    $image 
    .cropper('destroy')
    .attr('src',imgURL)
    .cropper(options)
})

// 为确定按钮绑定事件
$('#btnUpload').on('click',function(){
    // 拿到头像
    let dataURL = $image
    .cropper('getCroppedCanvas',{
    //    创建一个canvas画布
    width: 100,
    height: 100
    })
    .toDataURL('image/png')
    // 调用接口
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar:dataURL
        },
        success: function(res){
            if(res.status !==0){
                return layer.msg('更换头像失败!')
            }
            window.parent.getUserInfo();
            return layer.msg('更换头像成功!')
            
        }
    })
})
})