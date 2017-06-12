# dropload.js
dropload上滑加载下拉刷新插件,可以的话后续会整理一份dropload.js(api)文档

1.基本使用
2.dropload.js修改部分
3.dropload避坑指南
4.dropload.js github获取
5.dropload.js 百度云下载

基本使用
<div class="outer">
	<header>头部导航</header>
	<div class="om-wrap">
		<div class="om-list-box">
			<!-- <div class="om-list om-list-img">
				<img src="test.jpg" class="om-list-src">
				<div class="om-list-title om-ellipsis">这里是列表的标题这里是列表的标题</div>
				<div class="om-list-text om-ellipsis">这里是列表的文字这里是列表的文字哈哈哈</div>
			</div> -->
		</div>
	</div>
</div>
说明：必须类似以上dom结构（.om-wrap > .om-list-box > item），因为修改了dropload.js
$wrap = $('.om-wrap');
dropload = $wrap.dropload({
	scrollArea : window,
	// 初始化
	initFn : function(me){
		me.opts.initFnBefore();//必须执行
		// some code ...
		me.opts.initFnAfter();//必须执行
	},
	//上滑加载
	loadDownFn : function(me){
		// some code ...
    },
    //下拉刷新
    loadUpFn : function(me){
		// some code ...
    }
});

dropload.js修改部分：
	1.tab切换页面展示效果
	2.添加loadd函数：
		详情查看dropload.js再封装
		使用示例：
			loadd({window:0,url:"http://test.com/test.html",ul:'.om-wrap',inners:'.om-list-box',data:{p:1,post_id:id,limit:8},after:function(res){
	            // console.log('ress',res);
	        }});
	        是的，你没有看错，就是这么简洁
	        优点：简洁
	        缺点：简单封装，不适用于所有场景

避坑指南：
	1.滚动嵌套，既出现两处以上可滚动区域(通常两处：window和.om-wrap)
		某些例子中(scrollArea : $('.om-wrap'))：
		.om-wrap {
		    position: absolute;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 100%;
		    overflow-y: scroll;
		}
		height: 100%;,如果此时.om-wrap再加个属性：top、margin-top...,那么window就会overflow：scroll，所以可以测试
		一下把.om-wrap的height:60%;试试就知道效果
		解决方案1：
			scrollArea : window,既以window为滚动区域，这样就只有一处是可滚动的，那么此时
				.om-wrap {
				    position: relative;
				}
		解决方案2：
			有时确实要以某些dom节点作为滚动区域（scrollArea : $('.om-wrap')）,
				1.保证滚动区域的height不大于window的height。
				2.(推荐)header元素和.om-wrap之间加入.margin-top元素，.margin-top的margin-top:44px;,那么：.om-wrap {
				    position: relative;
					    left: 0;
					    top: 0;
					    width: 100%;
					    height: 100%;
					    overflow-y: scroll;
					}
					这样就保证window不会滚动了。
					<div class="outer">
						<header>头部导航</header>
						<div class="margin-top"></div>
						<div class="om-wrap">
							<div class="om-list-box">
								<!-- <div class="om-list om-list-img">
									<img src="test.jpg" class="om-list-src">
									<div class="om-list-title om-ellipsis">这里是列表的标题这里是列表的标题</div>
									<div class="om-list-text om-ellipsis">这里是列表的文字这里是列表的文字哈哈哈</div>
								</div> -->
							</div>
						</div>
					</div>
	1.布局
		头部导航，由于.om-wrap元素overflow-y: scroll;刚开始使用时容易产生头部导航固定的错觉，
		避坑如下：
