let { parallel, series, src, dest, pipe, watch } = require("gulp");
let htmlmin = require("gulp-htmlmin");

/* 001-压缩Html文件的插件 */
let htmlminTask = () => {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return src("./item/client/src/html/*").pipe(htmlmin(options)).pipe(dest("./item/client/dist/temp"));
};

exports.htmlminTask = htmlminTask;

/* 需求：先把1.css文件拷贝目标目录，再对该文件压缩，压缩之后保存为1.min.css */
let cssmin = require("gulp-cssmin");
let cssminTask = ()=>{
    return src("./item/client/src/css/*.css").pipe(cssmin()).pipe(dest("./item/client/dist/css"))
}
exports.cssminTask = cssminTask;



/* 004-安装合并文件的插件 concat */
let concat = require("gulp-concat");
let concatTask = () => {
    return src("./item/client/src/lib/*.js").pipe(concat("index.js")).pipe(dest("./item/client/dist/js/"));
}
exports.concatTask = concatTask;

/* 005-js文件的压缩和混淆(丑化) */
let uglify = require("gulp-uglify");
let uglifyTask = ()=>{
    return src("./item/client/src/lib/*.js").pipe(uglify()).pipe(dest("./item/client/dist/lib/"));
}
exports.uglifyTask = uglifyTask;

/* 006-ES6代码转换ES5代码 */
const babel = require("gulp-babel");
let babelTask = () => {                                                           //压缩丑化
    return src("./item/client/src/lib/*.js").pipe(babel({ presets: ["es2015"] })).pipe(uglify()).pipe(dest("./item/client/dist/lib/"));
}
exports.babelTask = babelTask;


var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');               //- 路径替换

let nameTask = ()=>{
    return src("./item/client/src/css/*.css")  
    .pipe(cssmin())                   
    .pipe(rev())                         
    .pipe(dest('./item/client/dist/css'))            
    .pipe(rev.manifest())                
    .pipe(dest('./item/client/dist/css'));           
}
exports.nameTask = nameTask;

let changeRoad = ()=>{
    return src(['./item/client/dist/css/*.json','./item/client/dist/temp/*']) 
    .pipe(revCollector())                                 
    .pipe(dest('./item/client/dist/html'));                   
}

exports.changeRoad = changeRoad;