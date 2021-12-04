const isProd = process.env.NODE_ENV === 'production'
const envFileName = isProd ? '.env' : '.env.' + process.env.NODE_ENV

require('dotenv').config({ path: envFileName })

const basePath = process.env.BASE_PATH ? process.env.BASE_PATH : ''

module.exports = {
	trailingSlash: true,
	basePath: basePath,
	assetPrefix: basePath,
	env: {
		DOMAIN_NAME: process.env.DOMAIN_NAME,
		API_URL: process.env.API_URL,
	},
	publicRuntimeConfig: {
		basePath: basePath,
		DomainName: process.env.DOMAIN_NAME,
		ApiUrl: process.env.API_URL,
	},
	serverRuntimeConfig: {
		basePath: basePath,
		DomainName: process.env.DOMAIN_NAME,
		ApiUrl: process.env.API_URL,
	},
}
