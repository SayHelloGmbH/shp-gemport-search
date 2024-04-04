import gulp from 'gulp';

const config = {
	name: 'WordPress plugin with block',
	key: 'shp_gemport_search',
	assetsDir: 'assets/',
	assetsBuild: './.build/',
	blockScriptsSrc: './src/Blocks/**/assets/src/scripts',
	blockScriptsDist: './src/Blocks/',
	blockStylesSrc: './src/Blocks/**/assets/src/styles/**/*.{scss,js}',
	blockStylesDist: './src/Blocks/',
	errorLog: function (error) {
		console.log('\x1b[31m%s\x1b[0m', error);
		if (this.emit) {
			this.emit('end');
		}
	},
};

import { task as taskBlockScripts } from './.build/gulp/task-block-scripts';
import { task as taskBlockStyles } from './.build/gulp/task-block-styles';
import { task as taskScripts } from './.build/gulp/task-scripts';

export const block_scripts = () => taskBlockScripts(config);
export const block_styles = () => taskBlockStyles(config);
export const scripts = () => taskScripts(config);

export const watch = () => {
	const settings = { usePolling: true, interval: 100 };

	gulp.watch(config.assetsBuild + 'preact/**/*.{scss,css,js}', settings, gulp.series(scripts));
	gulp.watch(config.blockStylesSrc, settings, gulp.series(block_styles));
	gulp.watch(config.blockScriptsSrc + '/**/*.{scss,js}', settings, gulp.series(block_scripts));
};

export const taskDefault = gulp.series(watch);

export default taskDefault;
