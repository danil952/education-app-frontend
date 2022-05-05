import fetch from 'isomorphic-unfetch'
import { getUrl } from './helpers'
import { getAuthHeaders } from './auth'

export const getCoursesInfo = async () => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/courses`)
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const createNewCourse = async (name, description, _teacherId) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/courses`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify({ name, description, _teacherId }),
	})
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const updateCourse = async (
	_courseId,
	name,
	description,
	_teacherId
) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/courses/${_courseId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			...getAuthHeaders(),
		},
		body: JSON.stringify({ name, description, _teacherId }),
	})
	const result = await request.json()

	if (!request.ok) {
		return Promise.reject(result)
	}

	return result
}

export const deleteCourse = async (_courseId) => {
	const { apiUrl } = getUrl()

	const request = await fetch(`${apiUrl}/courses/${_courseId}`, {
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
