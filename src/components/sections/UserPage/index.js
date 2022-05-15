import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUserInfo, updateUser } from '@/api/users'

import styles from './user.module.css'

const UserPage = () => {
	const router = useRouter()
	const { login } = router.query

	const [loading, setLoading] = useState(true)

	const [userData, setUserData] = useState({})
	const [isEdit, setIsEdit] = useState(false)
	const [newLogin, setNewLogin] = useState('')
	const [newFio, setNewFio] = useState('')
	const [newPassword, setNewPassword] = useState('')

	const fetchData = async () => {
		try {
			const data = await getUserInfo(login)
			setUserData(data)
			setNewLogin(data.login)
			setNewFio(data.fio)
		} catch (error) {
			router.push(`/auth`)
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const formatDate = (date) => {
		return date.toDateString()
	}

	const onUpdateUser = async () => {
		try {
			const data = {}
			if (login !== newLogin) data.login = newLogin
			if (userData.fio !== newFio) data.fio = newFio
			if (newPassword) data.password = newPassword

			await updateUser(data, userData._id)
			router.push(`/user/${newLogin}`)
			setIsEdit(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		login && fetchData()
	}, [login])

	return loading ? (
		<div>Loading</div>
	) : (
		<div className={styles.user__container}>
			<div className={styles.user__infoContainer}>
				{isEdit && (
					<span
						className={styles.user__editForm_close}
						onClick={() => setIsEdit(false)}
					>
						X
					</span>
				)}
				<p>
					Login: <span>{!isEdit && userData.login}</span>
				</p>
				{isEdit && (
					<input
						placeholder='New login'
						value={newLogin}
						onChange={(e) => setNewLogin(e.target.value)}
					/>
				)}
				<p>
					First and last name: <span>{!isEdit && userData.fio}</span>
				</p>
				{isEdit && (
					<input
						placeholder='New fio'
						value={newFio}
						onChange={(e) => setNewFio(e.target.value)}
					/>
				)}
				{isEdit && (
					<>
						<p>New password</p>
						<input
							placeholder='%^%$^%$$#*()^%$'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</>
				)}
				<p>
					Registration date:{' '}
					<span>{formatDate(new Date(userData.createdAt))}</span>
				</p>
				<button
					className={styles.user__editButton}
					onClick={() => {
						if (isEdit) {
							onUpdateUser()
						} else {
							setIsEdit(true)
						}
					}}
					disabled={isEdit && (!newLogin || !newFio)}
				>
					{isEdit ? 'CONFIRM' : 'EDIT'}
				</button>
			</div>
		</div>
	)
}

export default UserPage
