import { useState, useEffect } from 'react'
import { getProfessorsInfo, updateUser } from '@/api/users'

import styles from './admin.professors.module.css'

const AdminProfessors = () => {
	const [professors, setProfessors] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchData = async () => {
		try {
			setLoading(true)
			const professorsData = await getProfessorsInfo()
			setProfessors(professorsData)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return loading ? (
		<div>Loading</div>
	) : (
		<div className={styles.adminProfessors__container}>
			{professors.map((professor, id) => {
				return (
					<ProfessorRaw professor={professor} fetchData={fetchData} key={id} />
				)
			})}
		</div>
	)
}

const ProfessorRaw = ({ professor, fetchData }) => {
	const [editOpen, setEditOpen] = useState(false)
	const [login, setLogin] = useState(professor.login)
	const [password, setPassword] = useState('')
	const [fio, setFio] = useState(professor.fio)

	const onUpdateProfessor = async () => {
		try {
			const data = { login, fio }
			if (password) data.password = password
			await updateUser(data, professor._id)
			await fetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const onDeleteProfessor = async () => {
		/* try {
			await deleteCourse(course._id, name, description, selectedProfessor)
			await fetchData()
		} catch (error) {
			console.log(error)
		} */
	}

	return !editOpen ? (
		<div className={styles.adminProfessors__courseBlock}>
			<div className={styles.adminProfessors__courseInfo}>
				<p>
					Login: <span>{login}</span>
				</p>
				<p>
					First and last name: <span>{fio}</span>
				</p>
			</div>
			<div className={styles.adminProfessors__courseControls}>
				<button
					className={styles.adminProfessors__edit}
					onClick={() => setEditOpen(true)}
				>
					EDIT
				</button>
				<button
					className={styles.adminProfessors__delete}
					onClick={() => onDeleteProfessor()}
				>
					DELETE
				</button>
			</div>
		</div>
	) : (
		<div className={styles.adminProfessors__editForm}>
			<span
				className={styles.adminProfessors__editForm_close}
				onClick={() => setEditOpen(false)}
			>
				X
			</span>
			<p>Edit professor: {fio}</p>
			<p>Login</p>
			<input
				placeholder='Login'
				value={login}
				onChange={(e) => setLogin(e.target.value)}
			/>
			<p>First and last name</p>
			<input
				placeholder='John Smith'
				value={fio}
				onChange={(e) => setFio(e.target.value)}
			/>
			<p>New password</p>
			<input
				placeholder='#$%#%$#%$'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				className={styles.adminProfessors__editForm_submit}
				onClick={() => onUpdateProfessor()}
				disabled={!login || !fio}
			>
				UPDATE PROFILE
			</button>
		</div>
	)
}

export default AdminProfessors
