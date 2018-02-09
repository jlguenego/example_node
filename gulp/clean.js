const del = require('del');

module.exports = function(gulp, pathConfig) {
	// Delete the dist directory
	gulp.task('clean:misc', function() {
		return del(pathConfig.clean.misc);
	});

	

	gulp.task('clean', ['clean:misc']);
};
