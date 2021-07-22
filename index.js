/*
* env-origin-check
* @Author: Jack.Chan
* @Date:   2021-07-22 14:24:48
* @Last Modified by:   Jack.Chan
* @Last Modified time: 2021-07-22 15:10:56
*/


/*
* 是否是URL
* @function isURL
* @param {String} url
* @param {Array} origins
*/
const isURL = (url, origins) => {
	let result = false;
	if (url) {
		const pattern = /^(http:|https:)?\/\/[a-zA-Z0-9\.]*/
		url = url.toString();
		result = pattern.test(url);
		if (result && typeof(origins) === 'object' && origins.length) {
			const matched = url.match(pattern);
			if (matched && matched.length) {
				return !origins.includes(matched[0]);
			}
		}
	}
	return result;
}


const DEFAULT_LOCALES = {
	'en-US': {
		'CHECKING': 'Checking defines...',
		'WARNING': 'Warning, configuration item may be abnormal, please check carefully !!!',
		'WARNING_ORIGINS': 'WARNING: ORIGINS is empty',
		'SUCCESS': 'No abnormality found. Please continue',
		'NODE_ENV': 'NODE ENV',
		'BUILD_ENV': 'BUILD ENV'
	},
	'zh-CN': {
		'CHECKING': '检测环境配置项...',
		'WARNING': '警告，配置项可能存在异常, 请仔细检查 !!!',
		'WARNING_ORIGINS': '警告，ORIGINS 参数是空的',
		'SUCCESS': '未发现异常, 请继续',
		'NODE_ENV': '模式',
		'BUILD_ENV': '环境'
	}
}

const DEFAULT_CONFIG = {
	LOCALES: DEFAULT_LOCALES,
	IGNORE: {
		'mock': 1,
		'dev': 1,
		'development': 1,
		'test': 1,
		'demo': 1,
		'preview': 1
	},
	// {Boolean} [optional] forceExit, 是否强制退出NODE进程，默认NODE_ENV为 development 是只提示警告信息，production 为强制中断退出
	forceExit: false,
	// {Object} ORIGINS whitelist of api origin
	ORIGINS: {},
	// {String} display language
	locale: 'zh-CN',
	// {String} NODE_ENV: development | production , 当前NODE环境模式
	mode: '',
	// {String} BUILD_ENV: dev | daily | gray | prod , 当前构建环境
	env: '',
	// {Object} defines , 定义的环境变量
	defines: {} 
}

/**
  * 检测环境配置项 (接口地址)
  * @function EnvOriginCheck
  * @param {Object} options 定义的环境变量
*/
const EnvOriginCheck = (options) => {
	options = Object.assign({}, DEFAULT_CONFIG, options || {});
	const { LOCALES = {}, IGNORE = {}, locale, forceExit, ORIGINS, mode, env, defines } = options;
	const LANG = LOCALES[locale] || DEFAULT_LOCALES['en-US'];

	if (mode && env && !IGNORE[env] && typeof defines === 'object' && Object.keys(defines).length) {
		if (typeof(ORIGINS) === 'object' && Object.keys(ORIGINS).length) {
			console.log('\n', LANG.CHECKING);
			let hasError = false;
			for (var key in defines) {
				if (isURL(defines[key])) {
					hasError = isURL(defines[key], ORIGINS[env]);
					if (hasError) {
						console.log('\n', '===============================================================', '\n');
						console.log('\t', LANG.WARNING, '\n');
						console.log('\t', LANG.WARNING, '\n');
						console.log('\t', LANG.WARNING, '\n');
						console.log('\t', `${LANG.NODE_ENV}: ${mode}`);
						console.log('\t', `${LANG.BUILD_ENV}: ${env}`);
						console.log('\n');
						console.log('\t', `ERROR:`);
						console.log('\t', `${key}: ${defines[key]}`);
						console.log('\n', '===============================================================', '\n\n\n');
						if (mode === 'production') {
							// force exit when production mode
							process.exit(0);
						}
						break;
					}
				}
			}
			if (!hasError) {
				console.log('\n', LANG.SUCCESS, '\n');
			}
			if (forceExit) {
				process.exit(0);
			}
		} else {
			console.log('\n', LANG.WARNING_ORIGINS, '\n');
			process.exit(0);
		}
	}
}

module.exports = {
	isURL,
	EnvOriginCheck,
}
