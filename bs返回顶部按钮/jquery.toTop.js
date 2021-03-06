/**
 *  Plugin Name: jQuery toTop for smoothly Scroll back to Top
 *  Plugin URL: https://github.com/mmkjony/jQuery.toTop
 *  Version: 1.1
 *  Author: MMK Jony
 *  Author URL: https://github.com/mmkjony
 *  License: Licensed under MIT
 **/

(function( $ ){
    'use strict';
    $.fn.toTop = function(opt){
        //variables
        var elem = this;
        var win = $(window);
        var doc = $('html, body');
        //Extended Options
        var options = $.extend({
            autohide: true,
            offset: 300,
            speed: 400,
            position: true
//          right: 15,
//          bottom: 30
        }, opt);
        elem.css({
            'cursor': 'pointer'
        });
        if(options.autohide){
            elem.css('display', 'none');
        }
        if(options.position){
            elem.css({
                'position': 'fixed',
                'right': options.right,
                'bottom': options.bottom,
            });
        }
        elem.click(function(){
            doc.animate({scrollTop: 0}, options.speed);
        });
        win.scroll(function(){
            var scrolling = win.scrollTop();
            if(options.autohide){
                if(scrolling > options.offset){
                    elem.fadeIn(options.speed);
                }
                else elem.fadeOut(options.speed);
            }
        });
    };
}( jQuery ));

//$('.backtop').toTop();
//配置
//autohide	布尔值	true	自动隐藏
//offset	整数	420	距离顶部多少距离时自动隐藏按钮
//speed	整数	500	滚动持续时间
//position	布尔值	true	如果设置为 false，则需要手动在 css 中设置“按钮”的位置
//right	整数	15	右侧距离
//bottom	整数	30	底部距离

//移动端ontouchstart模拟hover效果
function mouseout(obj) {
	var className ="hover";
	var _ecname = obj.className;
	if (_ecname.length == 0) return;
	if (_ecname == className) {
		obj.className ="";return;
	}
	if (_ecname.match(new RegExp("(^|\s)"+ className +"(\s|$)")));
	obj.className = _ecname.replace((new RegExp("(^|\s)"+ className +"(\s|$)")),"");
}  
function hover(obj) {
	if (!obj) return;
	var className ="hover"
	var _ecname = obj.className;
	if (_ecname.length == 0) {
	obj.className = className;return;
}
	if (_ecname == className || _ecname.match(new RegExp("(^|\s)"+ className +"(\s|$)")))
	   return;
	obj.className = _ecname +""+ className;
} 