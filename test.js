/*
* @Author: Jack.Chan
* @Date:   2021-07-22 14:41:56
* @Last Modified by:   Jack.Chan
* @Last Modified time: 2021-07-22 15:10:28
*/

const { BUILD_ENV, NODE_ENV } = process.env
const { EnvOriginCheck } = require('./index')
const ENV_CONFIGS = require('./env.config')

// 当前环境配置
const ENV_CONFIG = ENV_CONFIGS[BUILD_ENV]

// 检测环境配置项
EnvOriginCheck({
	ORIGINS: ENV_CONFIGS.ORIGINS,
	locale: 'en-US',
	mode: NODE_ENV,
	env: BUILD_ENV,
	defines: ENV_CONFIG.defines
})

console.log('\n\n')
console.log('@ORIGINS:', ENV_CONFIGS.ORIGINS)
console.log('@NODE_ENV:', NODE_ENV)
console.log('@BUILD_ENV:', BUILD_ENV)
console.log('@defines:')
console.log(ENV_CONFIG.defines)
console.log('\n\n')

module.exports = {
	defines: ENV_CONFIG.defines
}