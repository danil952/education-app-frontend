import fetch from 'isomorphic-unfetch'
import { getUrl } from './helpers'
import { getAuthHeaders } from './auth'

export const getLessonInfoById = async (_id) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/lessons/${_id}`)
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const getLessonsMarks = async () => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/lessons/marks`, {
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

export const updateLessonById = async (data, _id) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/lessons/${_id}`, {
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

export const createLesson = async (data) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/lessons/`, {
		method: 'POST',
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

export const sendPracticeAnswers = async (data) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/scores/`, {
		method: 'POST',
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
