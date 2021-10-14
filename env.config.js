/*
* @Author: Jack.Chan
* @Date:   2021-07-22 14:42:08
* @Last Modified by:   Jack.Chan
* @Last Modified time: 2021-10-14 18:40:55
*/

const ORIGINS_COMMONS = [
	'//static.test.com',
	'//rpo-com.oss-ap-northeast-1.aliyun.com'
]

const ORIGINS = {
	daily: [...ORIGINS_COMMONS, '//daily.api.test.com'],
	gray: [...ORIGINS_COMMONS, '//gray.api.test.com'],
	prod: [...ORIGINS_COMMONS, '//api.test.com']
}

// ============================================================================

module.exports = {
	ORIGINS,
	dev: {
		defines: {
			API_BASE: '//daily.api.test.com/api',
			HELLO: 'dev'
		}
	},
	daily: {
		defines: {
			// API_BASE: '//daily.api.test.com/api',
			// config error
			API_BASE: '//gray.api.test.com/api',
			HELLO: 'daily'
		}
	},
	gray: {
		defines: {
			API_BASE: '//gray.api.test.com/api',
			HELLO: 'gray'
		}
	},
	prod: {
		defines: {
			// API_BASE: '//api.test.com/api',
			HELLO: 'prod',
			publicPath: '//rpo-com.oss-ap-northeast-1.aliyun.com/sa'
		}
	}
}