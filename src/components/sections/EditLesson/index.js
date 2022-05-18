import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { updateLessonById } from '@/api/lessons'

const importJodit = () => import('jodit-react')
const JoditEditor = dynamic(importJodit, {
	ssr: false,
})

import { getLessonInfoById } from '@/api/lessons'

import styles from './edit.lesson.module.css'

const EditLesson = () => {
	const router = useRouter()
	const { id } = router.query

	const editor = useRef(null)
	const [loading, setLoading] = useState(true)
	const [content, setContent] = useState('')
	const [lesson, setLesson] = useState({})
	const [keys, setKeys] = useState([])
	const config = {
		readonly: false,
		height: 400,
		hidePoweredByJodit: true,
		toolbarSticky: false,
	}

	const fetchData = async () => {
		try {
			const data = await getLessonInfoById(id)
			setLesson(data)
			setContent(data.lecture)
			setKeys(data.keys)
			console.log(data)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const onUpdateLesson = async () => {
		try {
			const updatedLesson = {
				lecture: content,
				keys: keys,
				_courseId: lesson._courseId,
			}
			await updateLessonById(updatedLesson, lesson._id)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (id) fetchData()
	}, [id])

	return loading ? (
		<div>Loading</div>
	) : (
		<div className={styles.editLesson__container}>
			<h4 className={styles.editLesson__title}>
				Lecture: №{lesson.indexNumber} {lesson.name}
			</h4>
			<JoditEditor
				ref={editor}
				value={content}
				config={config}
				onBlur={(newContent) => setContent(newContent)}
				onChange={(newContent) => {}}
			/>
			{/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
			<h4 className={styles.editLesson__title}>Practice keys:</h4>
			{keys.length > 0 &&
				keys.map((value, id) => {
					return (
						<div key={id} className={styles.editLesson__keyBlock}>
							<span>№{id + 1}</span>
							<textarea
								value={keys[id]}
								onChange={(e) => {
									keys[id] = e.target.value.toLocaleLowerCase()
									setKeys([...keys])
								}}
							/>
							<button
								className={styles.editLesson__deletePractice}
								onClick={() => {
									setKeys([...keys.filter((key, idx) => idx != id)])
								}}
							>
								-
							</button>
						</div>
					)
				})}
			<button
				className={styles.editLesson__newPractice}
				onClick={(e) => {
					keys.push('')
					setKeys([...keys])
				}}
			>
				+
			</button>
			<button
				className={styles.editLesson__save}
				onClick={() => onUpdateLesson()}
			>
				SAVE CHANGES
			</button>
		</div>
	)
}

export default EditLesson
