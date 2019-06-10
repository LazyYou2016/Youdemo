// window.onload = function () {
//     console.log(123)
    (function(window) {
        var theUA = navigator.userAgent.toLowerCase();
        if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
            var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
            if (ieVersion < 9) {
                document.body.innerHTML='<div class="container" align="center">\n' +
                    '    <div>\n' +
                    '    <h3 class="text" >对不起，您当前浏览器版本过于古老，<span class="text-danger">存在安全隐患！</span></h3><br>\n' +
                    '    <h4 class="text1" >推荐您使用以下浏览器</h4>\n' +
                    '    </div>\n' +
                    '\n' +
                    '</div>\n' +
                    '<div class="xiang">\n' +
                    '     <div class="kuang" align="center" >\n' +
                    '         <div class="ie-icon chrome"></div>\n' +
                    '         <p class="pp">GOOGLE CHROME</p>\n' +
                    '         <p class="pc" align="left">”Gogle全新推出的高速浏览器“</p>\n' +
                    '         <div class="kua" >\n' +
                    '             <p class="pi"><a href="https://www.google.com/chrome" >浏览官方网站</a></p>\n' +
                    '         </div>\n' +
                    '     </div>\n' +
                    '    <div class="kuang" align="center">\n' +
                    '        <div class="ie-icon firefox"></div>\n' +
                    '        <p class="pp">MOZILLA FIREFOX</p>\n' +
                    '        <p class="pc" align="left">”Firefox注重您的信息安全。汇聚各种全新特性，给你更好的上网体验！“</p>\n' +
                    '        <div class="kua" >\n' +
                    '            <p class="pi"><a href="https://www.mozilla.org/zh-CN/firefox/new/?utm_medium=referral&utm_source=firefox-com" >浏览官方网站</a></p>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="kuang" align="center">\n' +
                    '        <div class="ie-icon ie360"></div>\n' +
                    '        <p class="pp">360浏览器</p>\n' +
                    '        <p class="pc" align="left">”360安全浏览器是360安全中心推出的一款基于IE和Chrime双内核的浏览器“</p>\n' +
                    '        <div class="kua" >\n' +
                    '            <p class="pi"><a href="https://browser.360.cn/se/" >浏览官方网站</a></p>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
            }
        }
    })(window);

// }