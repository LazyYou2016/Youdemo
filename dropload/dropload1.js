
/**
 * dropload
 * 西门
 * 0.7.0(151225)
 */
(function($){
    'use strict';
    var win = window;
    var doc = document;
    var $win = $(win);
    var $doc = $(doc);
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;

    function fun(e){
        e.preventDefault();
        e.stopPropagation();

    }

    $.fn.dropload = function(options){
        return new MyDropLoad(this, options);
    };
    var MyDropLoad = function(element, options){
        var me = this;
        me.$element = $(element);
        // 上方是否插入DOM
        me.upInsertDOM = false;
        // console.log('upInsertDOM',me.upInsertDOM);
        // loading状态
        me.loading = false;
        // 是否锁定
        me.isLockUp = false;
        me.isLockDown = false;
        // 是否有数据
        me.isData = true;
        me._scrollTop = 0;
        me.init(options);
    };

    // 初始化
    MyDropLoad.prototype.init = function(options){
        var me = this;
        me.opts = $.extend({}, {
            scrollArea : me.$element,                                            // 滑动区域
            domUp : {                                                            // 上方DOM
                domClass   : 'dropload-up',
                domRefresh : '<div class="dropload-refresh"><i class="am-dropload-text"></i>下拉查看更多    </div>',
                domUpdate  : '<div class="dropload-update"><i class=" am-dropload-text"></i>松开手指查看更多</div>',
                domLoad    : '<div class="dropload-load am-dropload-up"><div class="la-ball-elastic-dots la-dark la-sm"><div></div><div></div> <div></div><div></div><div>加载中...</div></div></div>',
            },
            domDown : {                                                          // 下方DOM
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domFnLoad  :'<div class="am-dropload-load-box"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div> <div class="am-fnload-text"> 加载中,请稍后...</div></div>',
                domNoData  : '<div class="dropload-noData">没有更多啦!</div>'
            },
            distance : 40,                                                       // 拉动距离
            threshold : '',                                                      // 提前加载距离
            loadUpFn : '',                                                       // 上方function
            loadDownFn : '',                                                      // 下方function
            initFnBefore : function() {
                // console.log('hello')
                me.$element.children().html('');
                me.direction = 'init';
                me.$domDown.addClass("domInit");
                me.$domDown.html(me.opts.domDown.domFnLoad);
                me.loading = true;
            },
            initFnAfter : function() {
                me.direction = 'up';
            },
        }, options);
        
        // 如果加载下方，事先在下方插入DOM
        if(me.opts.loadDownFn != ''){
            me.$element.append('<div class="'+me.opts.domDown.domClass+'">'+me.opts.domDown.domRefresh+'</div>');
            me.$domDown = $('.'+me.opts.domDown.domClass);
            document.addEventListener("touchmove",fun,false);

        }
        // 判断滚动区域
        if(me.opts.scrollArea == win){
            me.$scrollArea = $win;
            // 获取文档高度
            me._scrollContentHeight = $doc.height();
            // 获取win显示区高度  —— 这里有坑
            me._scrollWindowHeight = doc.documentElement.clientHeight;
        }else{
            me.$scrollArea = me.opts.scrollArea;
            me._scrollContentHeight = me.$element[0].scrollHeight;
            me._scrollWindowHeight = me.$element.height();
        }

        // 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
        // console.log('s',me._scrollContentHeight);
        // console.log('l',me._scrollWindowHeight);
        // console.log(me._scrollContentHeight <= me._scrollWindowHeight);
        if(me._scrollContentHeight <= me._scrollWindowHeight){
            fnpLoadDown();
        }

        // 窗口调整
        $win.on('resize',function(){
            if(me.opts.scrollArea == win){
                // 重新获取win显示区高度
                me._scrollWindowHeight = win.innerHeight;
            }else{
                me._scrollWindowHeight = me.$element.height();
            }
        });

        // 绑定触摸
        me.$element.on('touchstart',function(e){
            if(!me.loading){
                fnTouches(e);
                fnTouchstart(e, me);
            }
        });
        me.$element.on('touchmove',function(e){
            if(!me.loading){
                fnTouches(e, me);
                fnTouchmove(e, me);
            }
        });
        me.$element.on('touchend',function(){
            if(!me.loading){
                fnTouchend(me);
            }
        });

        // 加载下方
        me.$scrollArea.on('scroll',function(){
            me._scrollTop = me.$scrollArea.scrollTop();
            if(me.opts.threshold === ''){
                // 默认滑到加载区2/3处时加载
                me._threshold = Math.floor(me.$domDown.height()*1/3);
                if(me.$domDown.hasClass('.domInit')){
                    me.$domDown.removeClass("domInit");
                }
            }else{
                me._threshold = me.opts.threshold;
            }
            // console.log('ks',me._scrollContentHeight - me._threshold);
            // console.log('fd',me._scrollWindowHeight + me._scrollTop);
            // console.log('d',me._scrollContentHeight);
            // console.log('s',me._threshold);
            if(me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)){
                fnLoadDown();
                document.addEventListener("touchmove",fun,false);
            }
        });

        // 加载下方方法
        function fnLoadDown(){
            me.direction = 'up';
            if(me.$domDown.hasClass('.domInit')){
                me.$domDown.removeClass("domInit");
            }
            me.$domDown.html(me.opts.domDown.domLoad);
            me.loading = true;
            me.opts.loadDownFn(me);
        }
        // 初始化下方方法
        function fnpLoadDown(){
            // me.opts.initBeforeDo();
            me.opts.initFn(me);
            
        }
    };

    // touches
    function fnTouches(e){
        if(!e.touches){
            e.touches = e.originalEvent.touches;
        }
    }

    // touchstart
    function fnTouchstart(e, me){
        me._startY = e.touches[0].pageY;
        // 记住触摸时的scrolltop值
        me.touchScrollTop = me.$scrollArea.scrollTop();
    }

    // touchmove
    function fnTouchmove(e, me){
        me._curY = e.touches[0].pageY;
        me._moveY = me._curY - me._startY;

        if(me._moveY > 0){
            me.direction = 'down';
        }else if(me._moveY < 0){
            me.direction = 'up';
        }

        var _absMoveY = Math.abs(me._moveY);

        // 加载上方
        if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
            e.preventDefault();
            if(me.$domDown.is('.domInit')){
                me.$domDown.removeClass("domInit");
            }
            me.$domUp = $('.'+me.opts.domUp.domClass);
            // 如果加载区没有DOM
            if(!me.upInsertDOM){
                me.$element.prepend('<div class="'+me.opts.domUp.domClass+'"></div>');
                me.upInsertDOM = true;
            }
            fnTransition(me.$domUp,0);
            // 下拉
            if(_absMoveY <= me.opts.distance){
                me._offsetY = _absMoveY;
                // todo：move时会不断清空、增加dom，有可能影响性能，下同
                me.$domUp.html(me.opts.domUp.domRefresh);
            // 指定距离 < 下拉距离 < 指定距离*2
            }else if(_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance*2){
                me._offsetY = me.opts.distance+(_absMoveY-me.opts.distance)*0.5;
                me.$domUp.html(me.opts.domUp.domUpdate);

            // 下拉距离 > 指定距离*2
            }else{
                me._offsetY = me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2;

            }

            me.$domUp.css({'height': me._offsetY});
        }
    }

    // touchend
    function fnTouchend(me){
        var _absMoveY = Math.abs(me._moveY);
        if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
            fnTransition(me.$domUp,300);

            if(_absMoveY > me.opts.distance){
                me.$domUp.css({'height':me.$domUp.children().height()});

                me.$domUp.html(me.opts.domUp.domLoad);
                me.loading = true;
                me.opts.loadUpFn(me);
            }else{
                me.$domUp.css({'height':'0'}).on('webkitTransitionEnd transitionend',function(){
                    me.upInsertDOM = false;
                    $(this).remove();
                });
            }
            me._moveY = 0;
        }
    }

    // 重新获取文档高度
    function fnRecoverContentHeight(me){
        if(me.opts.scrollArea == win){
            me._scrollContentHeight = $doc.height();
        }else{
            me._scrollContentHeight = me.$element[0].scrollHeight;
        }
    }

    // 锁定
    MyDropLoad.prototype.lock = function(direction){
        var me = this;
        // 如果不指定方向
        if(direction === undefined){
            // 如果操作方向向上
            if(me.direction == 'up'){
                me.isLockDown = true;
            // 如果操作方向向下
            }else if(me.direction == 'down'){
                me.isLockUp = true;
            }else{
                me.isLockUp = true;
                me.isLockDown = true;
            }
        // 如果指定锁上方
        }else if(direction == 'up'){
            me.isLockUp = true;
        // 如果指定锁下方
        }else if(direction == 'down'){
            me.isLockDown = true;
        }
    };

    // 解锁
    MyDropLoad.prototype.unlock = function(){
        var me = this;
        // 简单粗暴解锁
        me.isLockUp = false;
        me.isLockDown = false;
    };

    // 无数据
    MyDropLoad.prototype.noData = function(){
        var me = this;
        me.isData = false;
    };

    // 重置
    MyDropLoad.prototype.resetload = function(){
        var me = this;
        if(me.direction == 'down' && me.upInsertDOM){
            me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                me.loading = false;
                me.upInsertDOM = false;
                $(this).remove();
                fnRecoverContentHeight(me);

            });
        }else if(me.direction == 'up'){
            me.loading = false;
            document.removeEventListener("touchmove",fun,false);
            // 如果有数据
            if(me.isData){
                // console.log('data');
                // 加载区修改样式
                me.$domDown.html(me.opts.domDown.domRefresh);
                fnRecoverContentHeight(me);
                document.removeEventListener("touchmove",fun,false);
            }else{
                // console.log('nodata');
                // 如果没数据
                if(me.$domDown.is('.domInit')){
                    me.$domDown.removeClass("domInit");
                }
                me.$domDown.html(me.opts.domDown.domNoData);
                document.removeEventListener("touchmove",fun,false);
            }
        }else {
            document.removeEventListener("touchmove",fun,false);
            if(me.$domDown.is('.domInit')){
                me.$domDown.removeClass("domInit");
            }
        }
    };

    // css过渡
    function fnTransition(dom,num){
        dom.css({
            '-webkit-transition':'all '+num+'ms',
            'transition':'all '+num+'ms'
        });
    };


})(window.Zepto || window.jQuery);


    function loadd(options){
        options = options || {};
        p = 1;
        var defaults = {
            inners:'.inners'
            ,url:''
            // ,limit:8
            ,data:{p:p,limit:8}
            ,ul:'ul.item'
            ,window:1
            ,after:function(){}
        }
        for(var k in options){
            defaults[k] = options[k];
        }
        var dropload = $(defaults.inners).dropload({
            // am-list-news-bd overflow-y:scroll
            scrollArea : defaults.window === 1?window:$(defaults.inners),
            initFn: function (me) {
                console.log('initFn');
                // var limit = defaults.limit;
                $.ajax({
                    url:defaults.url,
                    dataType:"JSON",
                    type:"POST",
                    data:defaults.data,
                    success:function(res){
                            $(defaults.ul).append(res.data);
                            defaults.data.p++;
                        if(res.msg>=defaults.data.limit){
                            console.log('---------ok----:');
                        }else{
                            console.log('over',defaults.data);
                             // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                        }
                        dropload.resetload();
                        defaults.after(res);
                    }
                })
            },
            loadUpFn: '',
            loadDownFn: function (me) {
                console.log('loadDownFn');
                // var limit = 8;
                $.ajax({
                    url:defaults.url,
                    dataType:"JSON",
                    type:"POST",
                    data:defaults.data,
                    success:function(res){
                            $(defaults.ul).append(res.data);
                            defaults.data.p++;
                        if(res.msg>=defaults.data.limit){
                            console.log('---------ok----:');
                        }else{
                            console.log('over',defaults.data);
                             // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                        }
                        dropload.resetload();
                        defaults.after(res);
                    }
                })
            }
        });
    }