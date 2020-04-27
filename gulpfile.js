const gulp = require("gulp");
const babel = require("gulp-babel");
const eslint = require("eslint");

gulp.task("default", () => {
    gulp.src("src/**/.js")
    .pipe(eslint)
    .pipe(eslint.format());

    gulp.src("src/**/*.js")
    .pipe(babel({
        presets: ["@babel/env"]
    }))
    .pipe(gulp.dest("dist"));
})