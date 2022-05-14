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

export const getUserInfo = async (login) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/users/info/${login}`)
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const createNewProfessor = async (login, fio, password) => {
	const { apiUrl } = getUrl()
	const request = await fetch(`${apiUrl}/users/professors`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify({ login, fio, password }),
	})
	const result = await request.json()

	if (request.ok) {
		return result
	} else {
		return Promise.reject(result || request.statusText)
	}
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
