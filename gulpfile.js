const gulp = require('gulp');

const pathConfig = {
	clean: {
        misc: ['./**/*.log']
    }
};

require('./gulp/eslint.js')(gulp);
require('./gulp/clean.js')(gulp, pathConfig);

gulp.task('default', ['eslint']);
