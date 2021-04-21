import { getDB, TODOS } from './client'

export default async function (item) {
	try {
		const db = await getDB()

		const result = await new Promise((resolve, reject) => {
			const request = db
				.transaction([TODOS], 'readwrite')
				.objectStore(TODOS)
				.add({ ...item, id: Date.now() })

			request.onsuccess = () => resolve(request.result)
			request.onerror = () => reject(request.error)
		})

		return result
	} catch (err) {
		return err
	}
}
