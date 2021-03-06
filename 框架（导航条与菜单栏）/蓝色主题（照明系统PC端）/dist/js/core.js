/**
 * Created by bqby on 2016/12/14.
 */
$(document).ready(function(){
    var winHeight = 0;
    function findDimensions() //函数：获取尺寸
    {
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.scrollHeight))
            winHeight = document.body.scrollHeight;
        //通过深入Document内部对body进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.scrollHeight && document.documentElement.clientWidth)
        {
            winHeight = document.documentElement.scrollHeight;
        }
        console.log(winHeight);
        //结果输出至#body-wrap
        $(".card").css("min-height",winHeight-40)
    }
    findDimensions();
    //调用函数，获取数值
    window.onresize=findDimensions;

    //提示
    $('.tooltips').tooltip(
        {placement:"top"}
    )
});
//进度条
$(".project").hover(function(){
    $(this).find(".progress-bar").addClass("progress-bar-striped active");
},function (){
    $(this).find(".progress-bar").removeClass("progress-bar-striped active");
});