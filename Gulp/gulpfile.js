var gulp = require('gulp');
	fileinclude  = require('gulp-file-include'),//分离文件
	minicss = require('gulp-minify-css'),//css压缩
	minijs = require('gulp-uglify'),//js压缩
	concat = require('gulp-concat'),//文件合并
	rename = require('gulp-rename'),//文件更名
	notify = require('gulp-notify'),//提示信息
	less = require('gulp-less');//less编译

//分离文件
gulp.task('fileinclude', function() {
    gulp.src('src/**.html')
        .pipe(fileinclude({
	        prefix: '@@',
	        basepath: '@file'
        }))
    .pipe(gulp.dest('./'));
//  .pipe(notify({ message: 'head and foot task ok' }));	//提示
});
// 合并、压缩、重命名css
gulp.task('minicss', function() {
	return gulp.src(['src/css/*.css', '!src/css/*.min.css']) //路径
//		.pipe(concat('main.css'))	//合并css
//		.pipe(gulp.dest('dist/js'))
	    .pipe(rename({ suffix: '.min' })) //重命名
	    .pipe(minicss())	//压缩
	    .pipe(gulp.dest('dist/css'))	//输出文件夹
	    .pipe(notify({ message: 'mincss task ok' }));	//提示
});

gulp.task('css', function() {
	return gulp.src('src/css/*.css') //路径
	    .pipe(gulp.dest('dist/css'))	//输出文件夹
	    .pipe(notify({ message: 'css task ok' }));	//提示
});

// 合并、压缩js文件
gulp.task('minijs', function() {
	return gulp.src(['src/js/*.js', '!src/js/*.min.js'])
//		.pipe(concat('all.js'))	//合并js
//		.pipe(gulp.dest('dist/js'))
	    .pipe(rename({ suffix: '.min' }))
	    .pipe(minijs())
	    .pipe(gulp.dest('dist/js'))
	    .pipe(notify({ message: 'minijs task ok' }));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
	    .pipe(gulp.dest('dist/js'))
	    .pipe(notify({ message: 'js task ok' }));
});

gulp.task('less', function () {
    gulp.src('src/css/*.less')
        .pipe(less())
        .pipe(minicss()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/css'));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
// 监听文件修改，当文件被修改则执行 css 任务
 	gulp.watch('fileinclude');
	gulp.watch('minicss');
	gulp.watch('css')
	gulp.watch('minjs');
	gulp.watch('js')
});

gulp.task('all', function () {
	gulp.run('fileinclude','minicss','minijs')
});
gulp.task('test', function () {
	gulp.run('fileinclude','css','js')
});
// 默认任务
gulp.task('default', function(){
	gulp.start('help');
});
//帮助
gulp.task('help',function () {
	console.log('	gulp				执行默认任务');
	console.log('	gulp auto			执行自动任务');
	console.log('	gulp all			执行上线任务');
	console.log('	gulp test			执行测试任务');
	console.log('	gulp modify			执行修改自定义任务');
	console.log('	gulp fileinclude		head and foot 执行打包');
	console.log('	gulp minijs			css压缩');
	console.log('	gulp css			css默认');
	console.log('	gulp minijs			js压缩');
	console.log('	gulp js				js默认');
	console.log('	gulp help			gulp参数说明');
});
//gulp.task('default', ['fileinclude']); 

gulp.task('modify', function(){
	gulp.run('fileinclude','minicss', 'css', 'mini', 'js');
	gulp.watch('src/*.html', function(){
	    gulp.run('fileinclude');
	});
	gulp.watch('src/css/*.css', ['minicss']);
	gulp.watch('src/js/*.js', ['minijs']);
	gulp.watch('src/js/*.js', ['js']);
});
