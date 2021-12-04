import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'

const User = () => {
	const router = useRouter()
	const [token, setToken] = useState('')
	useEffect(() => {
		setToken(window.localStorage.getItem('token'))
	}, [])

	return (
		<Layout>
			<div>{token}</div>
		</Layout>
	)
}

export default User
