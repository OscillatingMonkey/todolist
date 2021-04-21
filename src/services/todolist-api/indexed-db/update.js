import { getDB, TODOS } from './client'

export default async function (id, item) {
	try {
		const db = await getDB()

		const result = await new Promise((resolve, reject) => {
			const request = db
				.transaction(TODOS, 'readwrite')
				.objectStore(TODOS)
				.put({ id, ...item })

			request.onsuccess = () => resolve(request.result)
			request.onerror = () => reject(request.error)
		})

		return result
	} catch (err) {
		return err
	}
}
