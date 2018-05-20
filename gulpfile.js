var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var less = require('gulp-less');
var notify = require("gulp-notify");
var inject = require('gulp-inject');
var minifycss = require('gulp-clean-css');
var runsequence = require('run-sequence');
var connect = require('gulp-connect');


var paths = {
	srcless: './ui-src/less',
	srcangularjs: './ui-src/app',
	srchtml: './ui-src/pages',
	srcjs: './ui-src/js/myjs.js',
	srcimg: './ui-src/img',

	bowerdir: './bower_components',
	angularjs: './bower_components/angular/angular.min.js',
	angularroutejs: './bower_components/angular-route/angular-route.min.js',
	bootstrapjs: './bower_components/bootstrap/dist/js/bootstrap.min.js',
	bootstrapless: './bower_components/bootstrap/less',
	jqueryjs: './bower_components/jquery/dist/jquery.min.js',
	d3js: './bower_components/d3/d3.min.js',
	underscorejs: './bower_components/underscore-min/underscore-min.js',
	linechartsjs: './node_modules/n3-charts/build/LineChart.min.js',
	linechartscss: './node_modules/n3-charts/build/LineChart.min.css',
	moment: './node_modules/moment/min/moment.min.js',
	datetimepickerjs: './node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
	datetimepickertmpljs: './node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js',
	datetimepickercss: './node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',

	materialicons: './bower_components/material-design-icons/iconfont',
	fontawesome: './bower_components/font-awesome/fonts',
	ionicons: './icons',

	angularuirouter: './bower_components/angular-ui-router/release/angular-ui-router.min.js',
	angularpermission: './bower_components/angular-permission/dist/',

	builddir: './build/',
	publicdir: './build/public',
	buildjs: './build/public/js',
	buildcss: './build/public/css',
	buildimg: './build/public/img',
	buildicons: './build/public/fonts'
};

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest(paths.bowerdir));
});

gulp.task('clean', function (callback) {
	return gulp.src(paths.builddir, {read: false})
								.pipe(clean());
});

gulp.task('copy-images', function(){
	return gulp.src(paths.srcimg+'**/*')
								.pipe(gulp.dest(paths.publicdir));
});

gulp.task('copy-fonts', function(){
	return gulp.src([
						paths.materialicons+'/*.woff',
						paths.materialicons+'/*.woff2',
						paths.materialicons+'/*.ttf',
						paths.materialicons+'/*.eot',
						paths.materialicons+'/*.svg',
						paths.fontawesome+'/*.woff',
						paths.fontawesome+'/*.woff2',
						paths.fontawesome+'/*.ttf',
						paths.fontawesome+'/*.eot',
						paths.fontawesome+'/*.svg',
						paths.ionicons+'/*.woff',
						paths.ionicons+'/*.ttf',
						paths.ionicons+'/*.eot',
						paths.ionicons+'/*.svg',
					]).pipe(gulp.dest(paths.buildicons));
});

gulp.task('vendorjs', function(){
	return gulp.src([paths.angularjs, paths.angularuirouter, paths.jqueryjs, paths.bootstrapjs, paths.underscorejs,paths.d3js, paths.linechartsjs, paths.moment, paths.datetimepickerjs, paths.datetimepickertmpljs])
								.pipe(concat('vendor.js'))
								.pipe(gulp.dest(paths.buildjs));
});

gulp.task('sourcejs', function(){
	return gulp.src([paths.srcangularjs+'/**/*.js', paths.srcjs])
								.pipe(concat('source.js'))
								.pipe(gulp.dest(paths.buildjs));
});

gulp.task('build-less', function(){
	return gulp.src(paths.srcless + '/style.less')
			.pipe(less({
				paths: [
	                paths.bootstrapless,
					paths.srcless
				]
			}))
			.on("error", notify.onError(function (error) {
			    return "Error: " + error.message;
			}))
			.pipe(minifycss())
			.pipe(gulp.dest(paths.buildcss));
});

gulp.task('vendorcss', function(){
	return gulp.src([paths.linechartscss, paths.datetimepickercss])
								.pipe(concat('vendor.css'))
								.pipe(gulp.dest(paths.buildcss));
});


gulp.task('sourcehtml', function(){
	return gulp.src(paths.srchtml+'/**/*.html')
								.pipe(gulp.dest(paths.publicdir));
});

gulp.task('injectlinks', ['sourcehtml'], function(){
	var sources = gulp.src([paths.buildjs+'/vendor.js', paths.buildjs+'/source.js' , paths.buildcss+'/**/*.css'], {read: false});
	return gulp.src(paths.publicdir+'/index.html')
								.pipe(inject(sources, {relative: true}))
								.pipe(gulp.dest(paths.publicdir));
});

//gulp.task('build', ['clean', 'vendorjs', 'sourcejs', 'build-less', 'sourcehtml', 'injectlinks']);
gulp.task('build', function(callback){
	runsequence('clean', ['copy-images', 'copy-fonts', 'vendorjs', 'sourcejs', 'build-less', 'vendorcss','sourcehtml'], 'injectlinks');
});

gulp.task('watch', function(){
	gulp.watch([paths.srcless+'/*.less'], ['build-less']);
	gulp.watch([paths.srcangularjs+'/**/*.js'], ['sourcejs']);
	gulp.watch([paths.srchtml+'/*.html'], ['sourcehtml', 'injectlinks']);
	gulp.watch(paths.srcjs, ['sourcejs']);
});

gulp.task('servedev', function(){
	connect.server({
		root: './build/public',
		livereload: true
	});
});
