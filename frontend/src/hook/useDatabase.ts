import { useContext } from 'react'
import { DatabaseContext, Entity } from '../context/DatabaseContext'

export function useDatabase<T extends Entity>(entity: string) {
	const { content, save: saveX, remove: removeX } = useContext(DatabaseContext)

	const save = (value: T, success?: (value: T) => void, failed?: (error: any) => void) => {
		return saveX<T>(entity, value, success, failed)
	}

	const remove = (id: string, success?: (value: T) => void, failed?: (error: any) => void) => {
		return removeX<T>(entity, id, success, failed)
	}

	return {
		content: (content.get(entity) || []) as T[],
		save,
		remove,
	}
}
