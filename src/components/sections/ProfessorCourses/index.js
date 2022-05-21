import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { getCoursesInfoByProfessor } from '@/api/courses'

import styles from './professor.courses.module.css'

const ProfessorCourses = () => {
	const [courses, setCourses] = useState([])

	const fetchData = async () => {
		const data = await getCoursesInfoByProfessor()
		setCourses(data)
	}

	useEffect(() => {
		try {
			fetchData()
		} catch (error) {
			console.log(error)
		}
	}, [])

	return (
		<div className={styles.professorCourses__container}>
			{courses.map((course, id) => (
				<CourseRow data={course} key={id} />
			))}
		</div>
	)
}

const CourseRow = ({ data }) => {
	const router = useRouter()

	const [isOpen, setIsOpen] = useState(false)
	return (
		<div
			className={clsx(
				styles.course__container,
				isOpen && styles.course__container_active
			)}
		>
			<div className={styles.course__infoBlock}>
				<div className={styles.course__info}>
					<p>
						Name: <span>{data.name}</span>
					</p>
					<p>
						Description: <span>{data.description}</span>
					</p>
				</div>
				<button
					className={clsx(
						styles.course__openButton,
						isOpen && styles.course__openButton_active
					)}
					onClick={() => setIsOpen(!isOpen)}
				>
					&gt;
				</button>
			</div>
			{isOpen && (
				<div className={styles.lessons__container}>
					<button
						className={styles.lessons__new}
						onClick={() => router.push(`/new-lesson/${data._id}`)}
					>
						NEW LESSON
					</button>
					{data.lessonsData.map((lesson, id) => (
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
								<button
									className={styles.lesson__edit}
									onClick={() => router.push(`/edit-lesson/${lesson._id}`)}
								>
									EDIT
								</button>
								<button className={styles.lesson__delete}>DELETE</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default ProfessorCourses
