const path = require('path');

module.exports = {
	webpack: (config: Record<string, any>) => {
		config.resolve.alias['@'] = path.resolve(__dirname, 'src');
		return config;
	},
};