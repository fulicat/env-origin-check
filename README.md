# env-origin-check
env origin (api origin) check



---------

"devDependencies": {
    "cross-env": "^7.0.3"
  }

--------------------------------------





1. env.config.js

```javascript
const ORIGINS_COMMONS = ['//static.test.com']

const ORIGINS = {
	daily: [...ORIGINS_COMMONS, '//daily.api.test.com'],
	gray: [...ORIGINS_COMMONS, '//gray.api.test.com'],
	prod: [...ORIGINS_COMMONS, '//api.test.com'],
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
			// config error , will force stop when production node
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
			API_BASE: '//api.test.com/api',
			HELLO: 'prod'
		}
	}
}
```



1. test.js

```javascript
const { BUILD_ENV, NODE_ENV } = process.env
const { EnvOriginCheck } = require('env-origin-check')
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

module.exports = {
    defines: ENV_CONFIG.defines
}
```





## License

(The MIT License)

Copyright (c) 2021 Jack.Chan <fulicat@qq.com> (http://fulicat.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
