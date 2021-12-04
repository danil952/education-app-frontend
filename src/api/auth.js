import fetch from 'isomorphic-unfetch'
import { getUrl } from './helpers'

export const getAuthHeaders = () => {
	const token = window.localStorage.getItem('token')
	return {
		Authorization: `Bearer ${token}`,
	}
}

export const getAuthInfo = () => {
	const token = window.localStorage.getItem('token')
	const login = window.localStorage.getItem('login')
	return {
		login,
		token,
	}
}

export const auth = async (login, password) => {
	const { apiUrl } = getUrl()
	const request = await fetch(`${apiUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ login, password }),
	})
	const result = await request.json()

	if (request.ok) {
		window.localStorage.setItem('token', result.token)
		window.localStorage.setItem('login', result.login)
		return result
	} else {
		return Promise.reject(result || request.statusText)
	}
}

export const registerUser = async (login, password, fio) => {
	const { apiUrl } = getUrl()
	const request = await fetch(`${apiUrl}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ login, password, fio }),
	})
	const result = await request.json()

	if (request.ok) {
		return result
	} else {
		return Promise.reject(result || request.statusText)
	}
}
