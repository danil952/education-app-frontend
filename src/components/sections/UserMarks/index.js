import { useState, useEffect } from 'react'
import { getUserScores } from '@/api/users'
import { useRouter } from 'next/router'

import styles from './user.marks.module.css'

const UserMarks = () => {
	const router = useRouter()
	const [marks, setMarks] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchData = async () => {
		try {
			const data = await getUserScores()
			setMarks(data)
			console.log(data)
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
		<div className={styles.userMarks__container}>
			{marks.map((mark, id) => {
				return (
					<div key={id} className={styles.userMarks__markBlock}>
						<div className={styles.userMarks__lessonInfo}>
							<p>№{mark.lessonData.indexNumber}</p>
							<p>{mark.lessonData.name}</p>
						</div>
						<div className={styles.userMarks__lessonInfo}>
							{mark.lessonData.keys && (
								<p>
									Score: {mark.mark} of {mark.lessonData.keys.length}
								</p>
							)}
							<button
								className={styles.userMarks__markView}
								onClick={() => router.push(`lesson/${mark.lessonData._id}`)}
							>
								VIEW
							</button>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default UserMarks
