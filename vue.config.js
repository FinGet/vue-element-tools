// const path = require('path');

// function resolve(dir) {
// 	return path.join(__dirname, dir);
// }

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/xxx' : '/',
	devServer: {
		open: false,
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://10.0.6.199:9001/',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
	// chainWebpack: (config) => {
	// 	// 移除 prefetch 插件
	// 	// config.plugins.delete('prefetch');
	// },
};
