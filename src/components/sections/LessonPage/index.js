import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getLessonInfoById } from '@/api/lessons'

import styles from './lesson.page.module.css'

const LessonPage = () => {
	const router = useRouter()
	const [lesson, setLesson] = useState({})
	const [loading, setLoading] = useState(true)
	const [answers, setAnswers] = useState([])
	const { id } = router.query

	const fetchData = async () => {
		try {
			const data = await getLessonInfoById(id)
			setLesson(data)
			setAnswers(
				lesson.keys.map(() => {
					return ''
				})
			)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (id) fetchData()
	}, [id])

	return loading ? (
		<div>Loading</div>
	) : (
		<div className={styles.lessonPage__container}>
			<h4 className={styles.lessonPage__title}>
				Lecture: №{lesson.indexNumber} {lesson.name}
			</h4>
			<div
				className={styles.lessonPage__lecture}
				dangerouslySetInnerHTML={{ __html: lesson.lecture }}
			></div>
			<h4 className={styles.lessonPage__title}>Practice:</h4>
			<div className={styles.lessonPage__keysBlock}>
				{lesson.keys.length > 0 &&
					lesson.keys.map((value, id) => {
						return (
							<div key={id} className={styles.lessonPage__keyBlock}>
								<span>№{id + 1}</span>
								<textarea
									value={answers[id]}
									onChange={(e) => {
										answers[id] = e.target.value.toLocaleLowerCase()
										setAnswers([...answers])
									}}
								/>
							</div>
						)
					})}
			</div>
			<button className={styles.lessonPage__submit} onClick={() => {}}>
				SUBMIT ANSWERS
			</button>
		</div>
	)
}

export default LessonPage
