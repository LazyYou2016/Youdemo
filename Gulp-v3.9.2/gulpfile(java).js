var gulp = require('gulp');
	fileinclude  = require('gulp-file-include'),//分离文件
	minicss = require('gulp-minify-css'),//css压缩
	minijs = require('gulp-uglify'),//js压缩
	concat = require('gulp-concat'),//文件合并
	rename = require('gulp-rename'),//文件更名
	notify = require('gulp-notify'),//提示信息
	rev = require('gulp-rev'),//对文件名加MD5后缀
	revCollector = require('gulp-rev-collector'),//路径替换
	del = require('del'),//删除
	runSequence = require('gulp-sequence'),//执行顺序任务
	htmlmin = require('gulp-htmlmin'),//html压缩
	less = require('gulp-less');//less编译
	replace = require('gulp-replace'),
	cheerio = require('gulp-cheerio');//dom操作组件

var docs_html = "docs/*.html",
	docs_css = "docs/dist/css/*.css",
	docs_cssmin = "docs/dist/css/*.min.css",
	docs_cssmin_not = "!docs/dist/css/*.min.css",
	docs_js = "docs/dist/js/*.js",
	docs_jsmin = "docs/dist/js/*.min.js",
	docs_jsmin_not = "!docs/dist/js/*.min.js",
	docs_img = "docs/dist/imgs/**",
	docs_font = "docs/dist/fonts/**",
	docs_less = "docs/dist/css/*.less",
	dist_all = "online/*",
	dist_del = "online/dist",
	dist_html = "online/",
	dist_html_edit = "online/*.html",
	dist_css = "online/dist/css",
	dist_js = "online/dist/js",
	dist_img = "online/dist/imgs",
	dist_font = "online/dist/fonts"
	buildBasePath = 'online/dist/';//构建输出的目录

	
	//static/docs/css/*.min.css
	//WEB-INF/jsp/common/head.jsp
//java

gulp.task('del', function () {
	return del(['rev/*.json']);
});

// 合并、压缩、重命名css
gulp.task('css', function() {
	return gulp.src(['static/dist/css/style.css']) //路径
//		.pipe(concat('style.css'))	//合并css
	    .pipe(rename({ suffix: '.min' })) //重命名
	    .pipe(minicss())	//压缩
	    .pipe(gulp.dest('static/dist/css'))	//输出文件夹
//	    .pipe(notify({ message: 'mincss task ok' }));	//提示
});
// 合并、压缩、重命名js
gulp.task('js', function() {
	return gulp.src(['static/dist/js/conmon.js']) //路径
//		.pipe(concat('conmon.js'))	//合并css
	    .pipe(rename({ suffix: '.min' })) //重命名
	    .pipe(minicss())	//压缩
	    .pipe(gulp.dest('static/dist/js'))	//输出文件夹
//	    .pipe(notify({ message: 'mincss task ok' }));	//提示
});


//修改css 合并css
gulp.task('head', function () {
	gulp.src('WEB-INF/jsp/common/head.jsp')
    .pipe(cheerio(function ($) {
        $('link').remove();
        $('head').append('<link rel="shortcut icon" href="${ctxStatic}/favicon.ico" type="image/x-icon" /><link rel="stylesheet" href="${ctxStatic}/dist/css/style.min.css">');
     }))
    .pipe(gulp.dest('WEB-INF/jsp/common'));
});

// 路径替换
gulp.task('revcss', function() {
    gulp.src(['rev/*.json','WEB-INF/jsp/common/head.jsp'])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest('WEB-INF/jsp/common'));
}); 
gulp.task('revjs', function() {
    gulp.src(['rev/*.json','WEB-INF/jsp/common/footer.jsp'])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest('WEB-INF/jsp/common'));
}); 

//修改foot 压缩js
gulp.task('footer', function () {
	gulp.src('WEB-INF/jsp/common/footer.jsp')
    .pipe(replace('<script src="${ctxStatic}/dist/js/conmon.js"></script>','<script src="${ctxStatic}/dist/js/conmon.min.js"></script>'))
    .pipe(gulp.dest('WEB-INF/jsp/common'));
});



//cssmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('cssmd5', function (){
    gulp.src(['static/dist/css/style.min.css'])
        //.pipe(concat('style.css'))//压缩后的css
        .pipe(minicss())//压缩css到一行
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest('static/dist/css'))//输出到css目录
        .pipe(rev.manifest('rev-css-manifest.json'))//生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});

//cssmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('jsmd5', function (){
    gulp.src(['static/dist/js/conmon.min.js'])
        //.pipe(concat('style.css'))//压缩后的css
        .pipe(minijs())//压缩css到一行
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest('static/dist/js'))//输出到css目录
        .pipe(rev.manifest('rev-css-manifest.json'))//生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});

//上线任务——带md5
gulp.task('onlinecss', function(cb) {  
    runSequence('cssmd5','revcss',cb);
});
gulp.task('onlinejs', function(cb) {  
    runSequence('jsmd5','revjs',cb);
});

