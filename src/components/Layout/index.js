import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/router'

import { getAuthInfo } from 'api/auth'

const userTypes = ['admin', 'professor', 'student']

const Layout = (props) => {
	const router = useRouter()
	const { children } = props
	const [login, setLogin] = useState('')
	const [userType, setUserType] = useState('')
	const actions = {
		admin: [
			{ name: 'courses', link: '/admin-courses' },
			{ name: 'professors', link: '/admin-professors' },
			{ name: 'statistics', link: '/admin-statistics' },
		],
		student: [{ name: 'courses', link: '/courses' }],
		professor: [{ name: 'courses', link: '/professor-courses' }],
	}

	useEffect(() => {
		const { login, userType } = getAuthInfo()
		if (login && userTypes.includes(userType)) {
			setLogin(login)
			setUserType(userType)
		} else router.push('/auth')
	}, [])

	return (
		<>
			<Header login={login} actionsData={login ? actions[userType] : []} />
			{children}
		</>
	)
}

export default Layout
