import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import UserPage from '@/components/sections/UserPage'

const User = () => {
	const router = useRouter()
	const [token, setToken] = useState('')
	useEffect(() => {
		setToken(window.localStorage.getItem('token'))
	}, [])

	return (
		<Layout>
			<UserPage />
		</Layout>
	)
}

export default User
