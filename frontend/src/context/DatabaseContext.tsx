import React, { useEffect, useState } from 'react'
import { DateUtils } from '../utils/DateUtils'

export interface Entity {
	id?: string
}

export type DatabaseContextType = {
	content: Map<string, any[]>
	offline: boolean
	save: <T extends Entity>(
		entity: string,
		value: T,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) => void
	insert: <T extends Entity>(
		entity: string,
		value: T,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) => void
	update: <T extends Entity>(
		entity: string,
		value: T,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) => void
	remove: <T extends Entity>(
		entity: string,
		id: string,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) => void
}

export const DatabaseContext = React.createContext<DatabaseContextType>({
	content: new Map(),
	offline: false,
	save: () => null,
	insert: () => null,
	update: () => null,
	remove: () => null,
})

export const DatabaseProvider = ({ children }: any) => {
	const [content, setContent] = useState<Map<string, any[]>>(new Map())
	const [offline, setOffline] = useState<boolean>(false)
	const [init, setInit] = useState<boolean>(false)

	function save<T extends Entity>(
		entity: string,
		value: T,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) {
		if (value?.id) {
			update<T>(entity, value, success, failed)
		} else {
			insert<T>(entity, value, success, failed)
		}
	}

	function insert<T extends Entity>(
		entity: string,
		value: T,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) {
		setContent((x) => {
			if (!x.get(entity)) {
				x.set(entity, [])
			}
			const values = x.get(entity) || []
			value.id =
				DateUtils.dateToString(new Date()).replaceAll('/', '') +
				DateUtils.timeToString(new Date()).replaceAll(':', '')
			x.set(entity, [...values, { ...value }])
			success?.(value)
			return new Map(x)
		})
	}

	function update<T extends Entity>(
		entity: string,
		value: T,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) {
		setContent((x) => {
			const values = x.get(entity) || []
			const index = values.findIndex((y) => y.id === value.id)
			if (index !== -1) {
				values[index] = { ...value }
				x.set(entity, [...values])
				success?.(value)
			} else {
				failed?.('ID was not found')
			}
			return new Map(x)
		})
	}

	function remove<T extends Entity>(
		entity: string,
		id: string,
		success?: (value: T) => void,
		failed?: (error: any) => void
	) {
		setContent((x) => {
			const values = x.get(entity) || []
			const index = values.findIndex((y) => y.id === id)
			const removedValues = values.splice(index, 1)
			x.set(entity, [...values])
			success?.(removedValues[0])
			return new Map(x)
		})
	}

	useEffect(() => {
		if (!init) {
			setInit(true)
			const storage = localStorage.getItem('database')
			let map = new Map()
			if (storage) {
				let parsedStorage = JSON.parse(storage)
				parsedStorage.forEach((row: any[]) => {
					map.set(row[0], row[1])
				})
			}
			setContent(map)
		}
	}, [init])

	useEffect(() => {
		if (init) {
			let storageToSave: any[] = []
			Array.from(content.keys()).forEach((row) => {
				storageToSave.push([row, content.get(row)])
			})
			localStorage.setItem('database', JSON.stringify(storageToSave))
		}
	}, [init, content])

	return (
		<DatabaseContext.Provider
			value={{
				content,
				offline,
				save,
				insert,
				update,
				remove,
			}}
		>
			{children}
		</DatabaseContext.Provider>
	)
}
