/**
 * gulp 配置文件
 * @author      {BOBO}
 * @verstion    {2.0}
 * @create      {2016/04}
 * @update      {2016/04}
 */
var gulp = require('gulp'),
    // 更名
    rename = require("gulp-rename"),
    // 压缩js
    uglify = require('gulp-uglify'),
    // 编译Less文件
    less = require("gulp-less"),
    // 压缩css文件
    minifyCss = require('gulp-minify-css'),
    // 文件合并
    concat = require('gulp-concat'),
    // 输出字符加颜色
    chalk = require('chalk'), 
    // 桌面通知
    notify = require("gulp-notify"),
    // 路径扩展
    watchPath = require('gulp-watch-path');

// 所有路径及文件
var Path = {
    dist: '../',
    less: function(file){
        if(file){
            return this.dist + 'less/*.less'
        }else{
            return this.dist + 'less/'
        }
    },
    mincss: function(){ return this.dist + 'css/' }
} 

// 处理器
var handle = {
    Errors: function(err){
        console.log('-------------- '+ chalk.bold.red('~ Error ~') +' ------------')
        console.log('message => ' + err.message)
        console.log('plugin => ' + chalk.bold.red(err.plugin))
        gulp.src(err.fileName) 
            .pipe( notify("Error => <%= file.relative %>\nLine => " + err.lineNumber) )
    },
    Success: function(event){
        console.log('-------------- '+ chalk.bold.green(event.type) +' ------------')
        console.log('fileName => ' + event.path);   
    }
}

// 编译Less文件 
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
gulp.task('less', function () {
    gulp.src( Path.less(true) )
        .pipe(less({
            compress: true,
            plugins: [autoprefix]
        }))
        .on('error', handle.Errors)
        .pipe(gulp.dest( Path.mincss() ));
});

// 监听任务
gulp.task('default', function(){   
    var watchLess = gulp.watch(Path.less(true), ['less']);       
    watchLess.on('change', handle.Success);
})