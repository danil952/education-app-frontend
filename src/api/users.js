import fetch from 'isomorphic-unfetch'
import { getUrl } from './helpers'
import { getAuthHeaders } from './auth'

export const updateUser = async (data, _userId) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/users/${_userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify(data),
	})
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const deleteUser = async (_userId) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/users/${_userId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
	})
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const getProfessorsInfo = async () => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/users/professors`)
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}
