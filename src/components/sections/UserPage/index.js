import styles from './user.module.css'

const UserPage = () => {
	return (
		<div className={styles.userPage__container}>
			<div className={styles.userPage__info}>INFO<span>coming soon</span></div>
			<div className={styles.userPage__info}>COURSES<span>coming soon</span></div>
			<div className={styles.userPage__info}>STATS<span>coming soon</span></div>
		</div>
	)
}

export default UserPage
