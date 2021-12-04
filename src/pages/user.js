import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const User = () => {
	const router = useRouter()
    const [token, setToken] = useState('')
    useEffect(()=>{
        setToken(window.localStorage.getItem('token'))
    }, [])

	return (
		<div>
            {token}
		</div>  
	)
}

export default User
