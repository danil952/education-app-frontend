import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/router'

import { getAuthInfo } from 'api/auth'

const Layout = (props) => {
    const router = useRouter()
	const { children } = props

	const [login, setLogin] = useState('')
	useEffect(() => {
		const { login } = getAuthInfo()
		if (login) setLogin(login)
        else router.push('/auth')
	}, [])

	return (
		<>
			<Header login={login}/>
			{children}
		</>
	)
}

export default Layout
