import { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import List from './List'
import TodoEdit from './TodoEdit'
import TodoCreate from './TodoCreate'

import TopBar from '../../components/TopBar'

import styles from './index.module.css'

import todoListApiFactory, { 
	idxdDB 
} from '../../services/todolist-api/todo-list-api-factory'

const api = todoListApiFactory(idxdDB)

function TodoList () {
	const [list, setList] = useState([])
	const [dictionary, setDictionary] = useState({})
	const [selected, setSelected] = useState(null)
	const [createNew, setCreateNew] = useState(null)

	const [loadList, setLoadList] = useState(true)

	useEffect(() => {
		if (!loadList) return
		
		setLoadList(false)

		const load = async () => {
			const res = await api.list()
			setList(res)
		}

		load()
	}, [loadList])

	useEffect(() => {
		setDictionary(
			list.reduce((dic, val) => ({ ...dic, [val.id]: val }), {})
		)		
	}, [list])

	return (
		<>
			<TopBar />
			<div className={styles.todoListContainer}>
				<div className={styles.listContainer}>
					<List 
						todos={list} 
						onPickTodo={(id) => {
							setSelected(id)
							setCreateNew(false)
						}} 
						selected={selected} 
						onChange={() => setLoadList(true)}
					/> 
				</div>
				<div className={styles.todoContainer}>
					<div className={styles.menu}>
						<AiOutlinePlus 
							onClick={() => { 
								setCreateNew(true) 
								setSelected(null)
							}} 
							className={styles.menuItem} />
					</div>
					{ selected 
						&& (
							<TodoEdit 
								key={`editing-${selected}`} 
								todo={dictionary[selected]} 
								onChange={() => setLoadList(true)} />
						) 
					}
					{ createNew 
						&& (
							<TodoCreate 
								key={`creating-${new Date()}`} 
								onCreate={() => setLoadList(true) } /> 
						)
					}
				</div>
			</div>
		</>
	)
}

export default TodoList
