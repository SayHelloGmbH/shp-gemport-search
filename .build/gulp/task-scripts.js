import gulp from 'gulp';
import gulpWebpack from 'webpack-stream';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import fs from 'fs';

function getDirectories(path) {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path + '/' + file).isDirectory();
	});
}

export const task = (config) => {
	return new Promise((resolve) => {
		const bundles = getDirectories(`${config.assetsBuild}react/`);
		const entry = {};
		bundles.forEach((bundle) => {
			const filePath = `${config.assetsBuild}react/${bundle}/index.js`;
			if (fs.existsSync(filePath)) {
				entry[bundle] = './' + filePath;
			}
		});

		gulp.src([`${config.assetsBuild}react/*`])
			.pipe(
				gulpWebpack({
					entry,
					mode: 'production',
					module: {
						rules: [
							{
								test: /\.js$/,
								exclude: /node_modules/,
								loader: 'babel-loader',
							},
							{
								test: /\.(s)css$/i,
								use: ['style-loader', 'css-loader', 'sass-loader'],
							},
						],
					},
					output: {
						filename: '[name].js',
					},
				})
			)
			.on('error', config.errorLog)
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			.pipe(gulp.dest(config.assetsDir + 'react/'))

			// Minify
			.pipe(uglify())

			.on('error', config.errorLog)
			.pipe(gulp.dest(config.assetsDir + 'react/'));
		resolve();
	});
};
