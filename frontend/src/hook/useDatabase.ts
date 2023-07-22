import { useContext } from 'react'
import { DatabaseContext, Entity } from '../context/DatabaseContext'
import { Query } from 'mingo'

export function useDatabase<T extends Entity>(entity: string) {
	const { content, save: saveX, remove: removeX } = useContext(DatabaseContext)
	const result = (content.get(entity) || []) as T[]

	const save = (value: T, success?: (value: T) => void, failed?: (error: any) => void) => {
		return saveX<T>(entity, value, success, failed)
	}

	const remove = (id: string, success?: (value: T) => void, failed?: (error: any) => void) => {
		return removeX<T>(entity, id, success, failed)
	}

	const find = (search: any) => {
		const query = new Query(search)
		return query.find(result).all() as T[]
	}

	return {
		content: result,
		find,
		save,
		remove,
	}
}
