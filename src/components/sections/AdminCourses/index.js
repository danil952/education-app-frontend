import { useState, useEffect } from 'react'
import clsx from 'clsx'
import {
	getCoursesInfo,
	createNewCourse,
	updateCourse,
	deleteCourse,
} from '@/api/courses'
import { getProfessorsInfo } from '@/api/professors'

import styles from './admin.courses.module.css'

const AdminCourses = () => {
	const [courses, setCourses] = useState([])
	const [professors, setProfessors] = useState([])
	const [newCourseOpen, setNewCourseOpen] = useState(false)
	const [loading, setLoading] = useState(true)

	const fetchData = async () => {
		try {
			setLoading(true)
			const coursesData = await getCoursesInfo()
			const professorsData = await getProfessorsInfo()
			setCourses(coursesData)
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
		<div className={styles.adminCourses__container}>
			<button
				className={styles.adminCourses__new}
				onClick={() => {
					setNewCourseOpen(!newCourseOpen)
				}}
			>
				{newCourseOpen ? 'CANCEL' : 'NEW COURSE'}
			</button>
			<NewCourseForm
				isOpen={newCourseOpen}
				professorsData={professors}
				fetchData={fetchData}
			/>
			{courses.map((course, id) => {
				return (
					<CourseRaw
						course={course}
						professorsData={professors}
						fetchData={fetchData}
						key={id}
					/>
				)
			})}
		</div>
	)
}

const NewCourseForm = ({ isOpen, professorsData, fetchData }) => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [selectedProfessor, setSelectedProfessor] = useState(
		professorsData[0]._id
	)

	const onNewCourseSubmit = async () => {
		try {
			await createNewCourse(name, description, selectedProfessor)
			await fetchData()
		} catch (error) {
			console.log(error)
		}
	}

	if (!professorsData.lenght) null

	return (
		<div
			className={clsx(
				styles.newCourse__form,
				isOpen && styles.newCourse__form_open
			)}
		>
			<p>Name</p>
			<input
				placeholder='Course name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<p>Description</p>
			<textarea
				placeholder='Course description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<p>Professor</p>
			<select
				value={selectedProfessor}
				onChange={(e) => {
					setSelectedProfessor(e.target.value)
					console.log(e.target.value)
				}}
			>
				{professorsData.map((professor) => {
					return (
						<option value={professor._id} key={professor._id}>
							{professor.fio}
						</option>
					)
				})}
			</select>
			<button
				className={styles.newCourse__submit}
				onClick={() => onNewCourseSubmit()}
				disabled={!name || !description}
			>
				CREATE
			</button>
		</div>
	)
}

const CourseRaw = ({ course, professorsData, fetchData }) => {
	const [editOpen, setEditOpen] = useState(false)
	const [selectedProfessor, setSelectedProfessor] = useState(course._teacherId)
	const [name, setName] = useState(course.name)
	const [description, setDescription] = useState(course.description)

	const onUpdateCourse = async () => {
		try {
			await updateCourse(course._id, name, description, selectedProfessor)
			await fetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const onDeleteCourse = async () => {
		try {
			await deleteCourse(course._id, name, description, selectedProfessor)
			await fetchData()
		} catch (error) {
			console.log(error)
		}
	}

	return !editOpen ? (
		<div className={styles.adminCourses__courseBlock}>
			<div className={styles.adminCourses__courseInfo}>
				<p>
					Name: <span>{name}</span>
				</p>
				<p>
					Info: <span>{description}</span>
				</p>
				<p>
					Professor: <span>{course.teacher.fio}</span>
				</p>
			</div>
			<div className={styles.adminCourses__courseControls}>
				<button
					className={styles.adminCourses__edit}
					onClick={() => setEditOpen(true)}
				>
					EDIT
				</button>
				<button
					className={styles.adminCourses__delete}
					onClick={() => onDeleteCourse()}
				>
					DELETE
				</button>
			</div>
		</div>
	) : (
		<div className={styles.adminCourses__editForm}>
			<p
				className={styles.adminCourses__editForm_close}
				onClick={() => setEditOpen(false)}
			>
				X
			</p>
			<p>Edit course: {course.name}</p>
			<p>Name</p>
			<input
				placeholder='Course name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<p>Info</p>
			<textarea
				placeholder='Course info'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<p>Professor</p>
			<select
				value={selectedProfessor}
				onChange={(e) => {
					setSelectedProfessor(e.target.value)
				}}
			>
				{professorsData.map((professor) => {
					return (
						<option value={professor._id} key={professor._id}>
							{professor.fio}
						</option>
					)
				})}
			</select>
			<button
				className={styles.adminCourses__editForm_submit}
				onClick={() => onUpdateCourse()}
			>
				UPDATE COURSE
			</button>
		</div>
	)
}

export default AdminCourses
