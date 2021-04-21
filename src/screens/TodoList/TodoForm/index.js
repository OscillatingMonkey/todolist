import styles from './index.module.css'
import ContentEditable from 'react-contenteditable'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function TodoForm ({ form, updateField, submittableForm, valid, defaultValues }) {
	return (
		<div className={styles.todo}>
			<input 
				type='text'
				placeholder='Enter a Title'
				onChange={(e) => updateField('title', e.target.value)} 
				className={[styles.inputField, styles.shortField].join(' ')} 
				defaultValue={defaultValues ? defaultValues.title : ''} />
			<div className={styles.toolbar}>
				<span className={styles.dueDateText}>{'Due Date'}</span>
				<DatePicker 
					className={styles.inputField}
					wrapperClassName={styles.dateWrapper}
					selected={submittableForm.dueDate}
					showTimeSelect
					dateFormat="Pp"
					onChange={(date) => updateField('dueDate', date)}
					defaultValue='Set a Due Date!'
				/>
			</div>
			<span className={styles.label}>{'Task Description'}</span>
			<ContentEditable
				className={[styles.textField, styles.inputField].join(' ')}
				html={submittableForm.description}
				onBlur={(e) => { updateField('description', e.target.innerText) }} />
		</div>
	)
}

export default TodoForm
