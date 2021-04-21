import moment from 'moment'

export { default as idxdDB } from './indexed-db'

function validTodo ({ title, description, status, dueDate }) {
	return !!(
			(title && typeof title === 'string')
			&& (!description || typeof description === 'string')
			&& (status)
			&& (!dueDate || moment(dueDate).isValid())
	)
}

export default function todoListApiFactory(client) {
	return {
		update: async (id, todo) => {
			if (!validTodo(todo)) throw Error(422)		
	
			return await client.update(id, todo)	
		},
		create: async (todo) => {
			console.log(todo)
			if (!validTodo(todo)) throw Error(422)

			return await client.create(todo)
		},
		list: async () => {
			return await client.list()
		},
		show: async (id) => {
			return await client.show(id)
		},
		remove: async (id) => {
			return await client.remove(id)
		}
	}
}
