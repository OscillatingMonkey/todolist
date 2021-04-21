import { useState, useEffect } from 'react'

import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import styles from './index.module.css'

import api from 'services/todolist-api/indexed-db-client'

import { AiOutlineClose } from 'react-icons/ai'

momentDurationFormatSetup(moment)

function DateString ({ date }) {
	if (!date) return null

	let duration = moment.duration(moment(date).diff(moment()))

	const missed = duration.milliseconds() < 0

	const dueDateStr = missed 
		? 'past due!' 
		: 'until due.'

	const dueDateStyles = missed 
		? [styles.missed, styles.dueDate].join(' ') 
		: styles.dueDate

	return <span className={dueDateStyles}>{`${duration.humanize()} ${dueDateStr}`}</span>
}

function Item ({ todo, onClick, selected, onChange }) {
	const [remove, setRemove] = useState(false)
	const [toggleStatus, setToggleStatus] = useState(false)

	useEffect(() => {
		if (!remove) return

		setRemove(false)

		const removeFn = async () => {
			try {
				await api.remove(todo.id)		
				
				onChange()
			} catch (err) {
				console.log('Could not remove')
			}
		} 

		removeFn()
	}, [remove])

	useEffect(() => {
		if (!toggleStatus) return

		setToggleStatus(false)

		const toggle = async () => {
			try {
				const status = todo.status === 'Done' 
					? 'Pending' : 'Done'

				await api.update(todo.id, { ...todo, status })		
				onChange()
			} catch (err) {
				console.log('Could not change status')
			}
		} 

		toggle()
	}, [toggleStatus])

	return (
		<div className={styles.todoItem}>
			<div className={[styles.todo, selected ? styles.selected : ''].join(' ')} onClick={onClick}>
				<span className={styles.todoTitle}>{todo.title}</span>
				{ todo.status === 'Pending' 
					? <DateString date={todo.dueDate} /> 
					: <span className={styles.dueDate}>{'Done!'}</span>
				}
			</div>
			<div className={styles.menuContainer}>
				<div 
					className={[
						styles.status, 
						todo.status === 'Pending' 
							? styles.pending 
							: styles.done].join(' ')} 
					onClick={() => setToggleStatus(true)}	
				/>
				<div 
					className={styles.remove} 
					onClick={() => setRemove(true)}
				><AiOutlineClose /></div>
			</div>
		</div>
	)
}

export default Item
