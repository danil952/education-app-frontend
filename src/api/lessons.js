import fetch from 'isomorphic-unfetch'
import { getUrl } from './helpers'
import { getAuthHeaders } from './auth'

export const getLessonsInfo = async (_courseId) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/lessons/course/${_courseId}`)
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const getLessonInfoById = async (_id) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/lessons/${_id}`)
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

