import { useState, useEffect } from 'react'

import TodoForm from '../TodoForm'

import styles from './index.module.css'

import useForm from 'services/hooks/useForm'
import api from 'services/todolist-api/indexed-db-client'

import config from '../todo-form-config'

function TodoEdit ({ todo, onChange }) {
	const [
		form,
		updateField,
		submittableForm,
		valid
	] = useForm(config.map((field) => {
		return {
			...field,
			defaultValue: todo && todo[field.label]
		}
	}))

	useEffect(() => {
		if (!valid) return

		const save = async () => {
			try {
				const res = await api.update(todo.id, submittableForm)
				onChange()
			} catch (err) {
				console.log('Could not save')
			}

		}

		save()
	}, [submittableForm])

	if (!todo) return null

	return (
		<TodoForm 
			form={form}
			updateField={updateField}
			submittableForm={submittableForm}
			valid={valid}
			defaultValues={todo}
		/>
	)
}

export default TodoEdit
