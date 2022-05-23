import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { getLessonsMarks } from '@/api/lessons'

import styles from './stats.module.css'

const Statistics = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(true)
	const [marksData, setMarksData] = useState([])

	const fetchData = async () => {
		try {
			const data = await getLessonsMarks()
			const filtered = data.filter((item) => item.marksData[0].mark)
			setMarksData(filtered)
			console.log(filtered)
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
		<div className={styles.stats__container}>
			{marksData.map((item, id) => {
				return <LessonItem data={item} key={id}/>
			})}
		</div>
	)
}

const LessonItem = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div
				className={clsx(
					styles.stats__block,
					isOpen && styles.stats__block_open
				)}
			>
				<p>
					Lesson: №{data.indexNumber} {data.name}
				</p>
				<p>Course: {data.courseData.name}</p>
				<button
					className={clsx(
						styles.stats__openButton,
						isOpen && styles.stats__openButton_active
					)}
					onClick={() => setIsOpen(!isOpen)}
				>
					&gt;
				</button>
			</div>
			{isOpen &&
				data.marksData.map((markItem, id) => {
					return (
						<div key={id} className={styles.stats__markBlock}>
							<p><span>Score:</span> {markItem.mark}</p>
							<p><span>Student:</span> {markItem.studentData.fio}</p>
						</div>
					)
				})}
		</>
	)
}

export default Statistics
