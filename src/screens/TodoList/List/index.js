import styles from './index.module.css'
import Item from './Item'

function List ({ todos, onPickTodo, selected, onChange }) {
	return (
		<div className={styles.todoList}>
			{
				todos.map((todo) => <Item 
					key={`todo-${todo.id}`} 
					todo={todo} 
					onClick={onPickTodo.bind(null, todo.id)} 
					selected={selected === todo.id}
					onChange={onChange}
				/>)
			}	
		</div>
	)
}

export default List
