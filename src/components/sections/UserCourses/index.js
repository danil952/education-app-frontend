import { useState, useEffect } from 'react'
import {
	getCoursesInfoByStudent,
	getCoursesInfo,
	subscribeCourse,
} from '@/api/courses'

import styles from './user.courses.module.css'

const UserCourses = () => {
	const [userCourses, setUserCourses] = useState([])
	const [freeCourses, setFreeCourses] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchData = async () => {
		try {
			setLoading(true)
			const coursesData = await getCoursesInfoByStudent()
			const userCoursesIds = coursesData.map((course) => course._courseId)
			setUserCourses(coursesData)
			const freeCoursesData = await getCoursesInfo()
			const filtered = freeCoursesData.filter(
				(course) => !userCoursesIds.includes(course._id)
			)
			setFreeCourses(filtered)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const onSubscribe = async (_courseId) => {
		try {
			await subscribeCourse(_courseId)
			fetchData()
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return loading ? (
		<div>Loading</div>
	) : (
		<div className={styles.userCourses__container}>
			<h4 className={styles.userCourses__title}>My courses</h4>
			<div className={styles.userCourses__grid}>
				{userCourses.map((course, id) => {
					return (
						<div className={styles.userCourses__card} key={id}>
							<p>
								Name: <span>{course.courseData.name}</span>
							</p>
							<p>
								Description: <span>{course.courseData.description}</span>
							</p>
							<p>
								Professor: <span>{course.teacher.fio}</span>
							</p>
							<button>
								SHOW COURSE
							</button>
						</div>
					)
				})}
			</div>
			<h4 className={styles.userCourses__title}>Available courses</h4>
			<div className={styles.userCourses__grid}>
				{freeCourses.map((course, id) => {
					return (
						<div className={styles.userCourses__card} key={id}>
							<p>
								Name: <span>{course.name}</span>
							</p>
							<p>
								Description: <span>{course.description}</span>
							</p>
							<p>
								Professor: <span>{course.teacher.fio}</span>
							</p>
							<button onClick={() => onSubscribe(course._id)}>
								ADD COURSE
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default UserCourses
