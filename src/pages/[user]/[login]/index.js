import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import UserPage from '@/components/sections/UserPage'

const User = () => {
	const router = useRouter()
	const { login } = router.query

	return (
		<Layout>
			<UserPage login={login} />
		</Layout>
	)
}

export default User
