import { useEffect, useState } from 'react'
import { getUserInfo } from '@/api/users'

import styles from './user.module.css'

const UserPage = ({ login }) => {
	const [userData, setUserData] = useState({})

	const fetchData = async () => {
		const data = await getUserInfo(login)
		setUserData(data)
	}

	const formatDate = (date) => {
		return date.toDateString()
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className={styles.user__container}>
			<div className={styles.user__infoContainer}>
				<p>
					Login: <span>{userData.login}</span>
				</p>
				<p>
					First and last name: <span>{userData.fio}</span>
				</p>
				<p>
					Registration date:{' '}
					<span>{formatDate(new Date(userData.createdAt))}</span>
				</p>
				<button className={styles.user__editButton}>
					EDIT
				</button>
			</div>
		</div>
	)
}

export default UserPage
