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
//分离文件
gulp.task('fileinclude', function(done) {
    gulp.src(docs_html)
        .pipe(fileinclude({
	        prefix: '@@',
	        basepath: '@file'
        }))
    .pipe(gulp.dest(dist_html));
//  .pipe(notify({ message: 'head and foot task ok' }));	//提示
    done();
});
//favicon.ico
gulp.task('ico', function(done) {
	return gulp.src('docs/favicon.ico') //路径
	    .pipe(gulp.dest('online/'))	//输出文件夹
//	    .pipe(notify({ message: 'css task ok' }));	//提示
  done();
});
// 合并、压缩、重命名css
gulp.task('minicss', function(done) {
	return gulp.src([docs_css, docs_cssmin_not]) //路径
//		.pipe(concat('style.css'))	//合并css
//	    .pipe(rename({ suffix: '.min' })) //重命名
	    .pipe(minicss())	//压缩
	    .pipe(gulp.dest(dist_css))	//输出文件夹
//	    .pipe(notify({ message: 'mincss task ok' }));	//提示
  done();
});
//默认css
gulp.task('css', function(done) {
	return gulp.src(docs_css) //路径
	    .pipe(gulp.dest(dist_css))	//输出文件夹
//	    .pipe(notify({ message: 'css task ok' }));	//提示
  done();
});
gulp.task('css-min', function(done) {
	return gulp.src(docs_cssmin) //路径
	    .pipe(gulp.dest(dist_css))	//输出文件夹
//	    .pipe(notify({ message: 'css task ok' }));	//提示
  done();
});
// 合并、压缩js文件
gulp.task('minijs', function(done) {
	return gulp.src([docs_js, docs_jsmin_not])
//		.pipe(concat('common.js'))	//合并js
//	    .pipe(rename({ suffix: '.min' }))
	    .pipe(minijs())
	    .pipe(gulp.dest(dist_js))
//	    .pipe(notify({ message: 'minijs task ok' }));
  done();
});
gulp.task('js', function(done) {
	return gulp.src(docs_js)
	    .pipe(gulp.dest(dist_js))
//	    .pipe(notify({ message: 'js task ok' }));
  done();
});
gulp.task('js-min', function(done) {
	return gulp.src(docs_jsmin)
      .pipe(gulp.dest(dist_js))
  done();
});
gulp.task('img', function(done) {
	return gulp.src(docs_img)
	    .pipe(gulp.dest(dist_img))
//	    .pipe(notify({ message: 'imgs task ok' }));
  done();
});
gulp.task('fonts', function(done) {
	return gulp.src(docs_font)
      .pipe(gulp.dest(dist_font))
  done();
});
gulp.task('less', function (done) {
    gulp.src(docs_less)
        .pipe(less())
        .pipe(minicss()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest(dist_css));
  done();
});


//cssmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifycssmd5', function (done){
    gulp.src([docs_css, docs_cssmin_not])
        //.pipe(concat('style.css'))//压缩后的css
        .pipe(minicss())//压缩css到一行
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest(dist_css))//输出到css目录
        .pipe(rev.manifest('rev-css-manifest.json'))//生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
  done();
});
//imgmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifyimgmd5', function (done){
    gulp.src([docs_img])
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest(dist_img))//输出到css目录
        .pipe(rev.manifest('rev-img-manifest.json'))//生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
        done();
});
//jsmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifyjsmd5', function(done) {
    gulp.src([docs_js, docs_jsmin_not])
        //.pipe(concat('common.min.js'))//压缩后的js
        .pipe(minijs())//压缩js到一行
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest(dist_js))//输出到js目录
        .pipe(rev.manifest('rev-js-manifest.json'))////生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
        done();
});

gulp.task('rev', function(done) {
    //html，针对js,css,img
    gulp.src(['rev/*.json', dist_html_edit])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest(dist_html));
        done();
}); 

gulp.task('revimg', function(done) {
    //css，主要是针对img替换
    gulp.src(['rev/rev-img-manifest.json',buildBasePath+'css/*.css'])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest(dist_css));
        done();
});


// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function (done) {
// 监听文件修改，当文件被修改则执行 css 任务
 	gulp.watch('fileinclude');
	gulp.watch('minicss');
	gulp.watch('css')
	gulp.watch('minjs');
  gulp.watch('js')
  done();
});

 gulp.task('del-all', function (done) {
  return del(dist_all);
  done()
});
gulp.task('del-dist', function (done) {
  return del([dist_del]);
  done();
});
//上线任务——带md5
gulp.task('online-md5', function(cb) {  
  gulp.series('notmd5','img','minifyjsmd5','minifycssmd5','rev','revimg');
    // runSequence('notmd5','img','minifyjsmd5','minifycssmd5','rev','revimg',cb);
    // done();
});
gulp.task('online-md5-rev', function(cb) {  
  gulp.series('rev','revimg')
    // runSequence('rev','revimg',cb);
    // done();
});

gulp.task('minihtml', function (done) {
    var options = {
        removeComments: true,//清除HTML注释
		//collapseInlineTagWhitespace: true,//不要在显示器之间留下空格
        collapseWhitespace: true,//压缩HTML
		preserveLineBreaks:true,//不折叠，只压缩
		//conservativeCollapse:true, //保留一个空格
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(dist_html_edit)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(dist_html));
        done();
});


// 默认任务
gulp.task('default', function(done){
  gulp.start('help');
  done();
});


//gulp.task('modify', function(){
//	gulp.run('fileinclude','minicss', 'css', 'minijs', 'js');
//	gulp.watch('docs/dist/*.html', function(){
//	    gulp.run('fileinclude');
//	});
//	gulp.watch(docs_css, ['minicss']);
//	gulp.watch(docs_js, ['minijs']);
//	gulp.watch(docs_js, ['js']);
//});
//上线任务——不带md5
gulp.task('online',
  gulp.series(
    'del-all','fileinclude','minicss','css-min','minijs','js-min','img','fonts','minihtml','ico'
  )
  // runSequence('del-all','fileinclude','minicss','css-min','minijs','js-min','img','fonts','minihtml','ico',cb)
);
//不带md5（上线任务——带md5前提下）
gulp.task('notmd5', function (cb) {
  gulp.series('del-all','fileinclude','css-min','js-min','fonts','ico')
  // runSequence('del-all','fileinclude','css-min','js-min','fonts','ico',cb)
  // done();
});

//本地测试任务——不带md5
gulp.task('test', function (cb) {
  gulp.series('del-all','fileinclude','css','js','img','fonts','css-min','js-min','ico')
  // runSequence('del-all','fileinclude','css','js','img','fonts','css-min','js-min','ico',cb)
  // done();
});
//帮助
gulp.task('help',function (done) {
	console.log('	gulp				打开gulp参数说明');
	console.log('	gulp auto			执行自动任务（监听修改）');
	console.log('	gulp online			执行上线任务（合并html、压缩css js min版)');
	console.log('	gulp online-md5			执行md5生成任务');
	console.log('	gulp online-md5-rev		执行上线md5任务（需要先执行gulp online-md5)');
	console.log('	gulp minihtml			执行html压缩任务');
	console.log('	gulp test			执行测试任务（合并html、输出css js 原版');
//	console.log('	gulp modify			执行修改自定义任务');
	console.log('	gulp fileinclude		head and foot 执行打包');
	console.log('	gulp minijs			css压缩');
	console.log('	gulp css			css默认');
	console.log('	gulp minijs			js压缩');
	console.log('	gulp js				js默认');
  console.log('	gulp help			gulp参数说明');
  done();
});





