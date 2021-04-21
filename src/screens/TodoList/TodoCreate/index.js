import { useState, useEffect } from 'react'
import config from '../todo-form-config'
import api from 'services/todolist-api/indexed-db-client'
import useForm from 'services/hooks/useForm'
import styles from './index.module.css'
import TodoForm from '../TodoForm'

const defaults = {
	status: 'Pending'
}

function TodoCreate ({ onCreate }) {
	const [submit, setSubmit] = useState(false)
	const [
		form,
		updateField,
		submittableForm,
		valid
	]	= useForm(config.map((field) => {
		return {
			...field,
			defaultValue: defaults[field.label]
		}
	}))

	useEffect(() => {
		if (!submit) return
		
		setSubmit(false)
		
		if (!valid) return

		const create = async () => {
			try {
				const res = await api.create(submittableForm)
				onCreate()
			} catch (err) {
				console.log(err)
				console.log('Could not create')
			}
		}

		create()
	}, [submit])

	return (
		<>
			<TodoForm
				form={form}
				updateField={updateField}
				submittableForm={submittableForm}
				valid={valid} />
			<input 
				type='submit' 
				value='create' 
				className={styles.submitButton}
				disabled={!valid}
				onClick={() => setSubmit(true)}
			/>
		</>
	)
}

export default TodoCreate
