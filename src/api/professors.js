import fetch from 'isomorphic-unfetch'
import { getUrl } from './helpers'

export const getProfessorsInfo = async () => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/users/professors`)
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}