import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { auth, registerUser } from 'api/auth'

import styles from './auth.module.css'

const AuthPage = () => {
	const router = useRouter()

	const [page, setPage] = useState(0)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [fio, setFio] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	useEffect(() => {
		window.localStorage.removeItem('token')
		window.localStorage.removeItem('login')
		window.localStorage.removeItem('userType')
	}, [])

	const handleAuth = async () => {
		if (!(login && password)) return
		try {
			await auth(login, password)
			router.push('/')
		} catch (error) {
			setError(error.data)
			setTimeout(() => setError(''), 1500)
			console.log(error)
		}
	}

	const handleRegister = async () => {
		if (!(login && password && fio)) return
		try {
			await registerUser(login, password, fio)
			setSuccess('Регистрация прошла успешно')
			setTimeout(() => setSuccess(''), 1500)
		} catch (error) {
			setError(error.data)
			setTimeout(() => setError(''), 1500)
			console.log(error)
		}
	}

	return (
		<div className={styles.authPage__container}>
			<h2 className={styles.authPage__title}>
				{page == 0 ? 'Авторизация' : 'Регистрация'}
			</h2>
			<div className={styles.authPage__controls}>
				<p
					onClick={() => setPage(0)}
					className={clsx(page == 0 && styles.authPage__controlsActive)}
				>
					Есть аккаунт
				</p>
				<p
					onClick={() => setPage(1)}
					className={clsx(page == 1 && styles.authPage__controlsActive)}
				>
					Я тут первый раз!
				</p>
			</div>
			<div className={styles.authPage__divider}></div>
			<div className={styles.authPage__form}>
				{page == 1 && (
					<>
						<p>ФИО</p>
						<input
							placeholder='Фамилия, имя, отчество'
							value={fio}
							onChange={(e) => setFio(e.target.value)}
						/>
					</>
				)}
				<p>Логин</p>
				<input
					placeholder='Логин'
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<p>Пароль</p>
				<input
					placeholder='Пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button
				onClick={() => {
					if (page == 0) handleAuth()
					if (page == 1) handleRegister()
				}}
				className={styles.authPage__formButton}
			>
				{page == 0 ? 'Войти' : 'Регистрация'}
			</button>
			{error && <p className={styles.authPage__errorText}>{error}</p>}
			{success && <p className={styles.authPage__successText}>{success}</p>}
		</div>
	)
}

export default AuthPage
