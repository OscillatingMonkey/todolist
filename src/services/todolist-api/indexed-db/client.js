const VERSION = 1

export const DATABASE = 'todolist'
export const TODOS = 'todos'

export function getDB () {
	return new Promise ((resolve, reject) => {
		const request = indexedDB.open(DATABASE, VERSION)

		request.onerror = function () {
			reject('Could not access DB')
		}

		request.onsuccess = function () {
			const db = request.result

			db.onversionchange = function () {
				db.close()
				alert('Error: Please reload page')
			}
			
			resolve(db)
		}

		// this can handle every DB update
		request.onupgradeneeded = function () {
			const db = request.result
			db.objectStoreNames.contains(TODOS)
					|| db.createObjectStore(TODOS, { keyPath: 'id' })
		}
	})	
}
