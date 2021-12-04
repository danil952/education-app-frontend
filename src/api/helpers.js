import getConfig from 'next/config'

const {
	publicRuntimeConfig: { DomainName, ApiUrl },
} = getConfig()

export function getUrl() {
	const serverUrl = `http://${DomainName}`
	const apiUrl = `http://${DomainName}${ApiUrl}`

	return { serverUrl, apiUrl }
}