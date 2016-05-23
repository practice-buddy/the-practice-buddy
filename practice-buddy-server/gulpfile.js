var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var childprocess = require('child_process');
server = require('gulp-develop-server');

gulp.task('runServer', function () {
    server.listen({path: './bin/www'});
});

gulp.task('buildServer', function () {
    var tsProject = ts.createProject(path.resolve('tsconfig.json'));
    return gulp.src(path.resolve('src/**/*.ts'))
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest(path.resolve('./dist')))
});

gulp.task('buildClient', function (cb) {
    var exec = childprocess.exec;

    exec('cd ../practice-buddy-client && ng build', function (error, stdout, stderr) {
        console.log(stdout);
        if (error) {
            console.log(error, stderr);
        }
        cb(error);
    });
});

gulp.task('serve', ['runServer'], function () {
    gulp.watch('src/**/*.ts', ['buildServerAndRestart']);
});

gulp.task('buildServerAndRestart', ['buildServer'], function (cb) {
    server.restart(function() {
        cb();
    });
});

gulp.task('serveClient', ['runServer'], function (cb) {
    var exec = childprocess.exec;

    exec('cd ../practice-buddy-client && ng serve --proxy http://localhost:3011', function (error, stdout, stderr) {
        console.log(stdout);
        if (error) {
            console.log(error, stderr);
        }
        cb(error);
    });
});

gulp.task('copyClientToDist', ['buildClient', 'buildServer'], function () {
    return gulp.src('../practice-buddy-client/dist/**/*')
        .pipe(gulp.dest('dist/client'));
});

gulp.task('startDev', ['runServer', 'serveClient']);

gulp.task('buildAllAndRunServer', ['copyClientToDist'], function () {
    server.listen({path: './bin/www'});

});

gulp.task('default',['copyClientToDist']);


