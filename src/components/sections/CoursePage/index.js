import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { getCoursesInfoById } from '@/api/courses'

import styles from './course.page.module.css'

const CoursePage = () => {
	const router = useRouter()
	const { id } = router.query
	const [loading, setLoading] = useState(true)
	const [course, setCourse] = useState({})

	const fetchData = async () => {
		try {
			const data = await getCoursesInfoById(id)
			setCourse(data)
			console.log(data)
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
		<div className={styles.coursePage__container}>
			<h4 className={styles.coursePage__title}>{course.name}</h4>
			<p className={styles.coursePage__subTitle}>{course.description}</p>
			<p className={styles.coursePage__lessons}>Lessons:</p>
			{course.lessonsData.map((lesson, id) => (
				<div className={styles.lesson__block} key={id}>
					<div className={styles.lesson__info}>
						<p>№{lesson.indexNumber}</p>
						<p>{lesson.name}</p>
					</div>
					<div className={styles.lesson__controls}>
						<button
							className={styles.lesson__view}
							onClick={() => router.push(`/lesson/${lesson._id}`)}
						>
							VIEW
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default CoursePage
