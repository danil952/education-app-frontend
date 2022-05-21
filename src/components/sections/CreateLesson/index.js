import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const importJodit = () => import('jodit-react')
const JoditEditor = dynamic(importJodit, {
	ssr: false,
})

import { createLesson } from '@/api/lessons'

import styles from './create.lesson.module.css'

const CreateLesson = () => {
	const router = useRouter()
	const { id } = router.query

	const editor = useRef(null)
	const [name, setName] = useState('')
	const [content, setContent] = useState('')
	const [keys, setKeys] = useState([])
	const config = {
		readonly: false,
		height: 400,
		hidePoweredByJodit: true,
		toolbarSticky: false,
	}

	const onCreateNewLesson = async () => {
		try {
			const data = {
				lecture: content,
				name,
				_courseId: id,
				keys,
			}

			await createLesson(data)
			router.push('/professor-courses')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.newLesson__container}>
			<h4 className={styles.newLesson__title}>New lesson</h4>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='New lesson name'
			/>
			<JoditEditor
				ref={editor}
				value={content}
				config={config}
				onBlur={(newContent) => setContent(newContent)}
				onChange={(newContent) => {}}
			/>
			<h4 className={styles.newLesson__title}>Practice keys:</h4>
			{keys.length > 0 &&
				keys.map((value, id) => {
					return (
						<div key={id} className={styles.newLesson__keyBlock}>
							<span>№{id + 1}</span>
							<textarea
								value={keys[id]}
								onChange={(e) => {
									keys[id] = e.target.value.toLocaleLowerCase()
									setKeys([...keys])
								}}
							/>
							<button
								className={styles.newLesson__deletePractice}
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
				className={styles.newLesson__newPractice}
				onClick={(e) => {
					keys.push('')
					setKeys([...keys])
				}}
			>
				+
			</button>
			<button
				className={styles.newLesson__save}
				onClick={() => onCreateNewLesson()}
				disabled={!name || !content}
			>
				CREATE LESSON
			</button>
		</div>
	)
}

export default CreateLesson
