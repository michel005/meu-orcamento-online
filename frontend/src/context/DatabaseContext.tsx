import React, { useEffect, useState } from 'react'
import { ProductType } from '../types/ProductType'
import { ProductOutputType } from '../types/ProductOutputType'
import { CustomerType } from '../types/CustomerType'

export type DatabaseContextType = {
	content: DatabaseContextContentType
	offline: boolean
	save: ({ entity, value, success, failed }: InsertType) => void
	insert: ({ entity, value, success, failed }: InsertType) => void
	update: ({ entity, value, success, failed }: InsertType) => void
	remove: ({ entity, id, success, failed }: DeleteType) => void
}

export type DatabaseContextContentType = {
	customer: CustomerType[]
	product: ProductType[]
	productOutput: ProductOutputType[]
}

export type EntityType = 'product' | 'productOutput' | 'customer'

export type InsertType = {
	entity: EntityType
	value: any
	success?: (value: any) => void
	failed?: (response: any) => void
}

export type DeleteType = {
	entity: EntityType
	id: string
	success?: () => void
	failed?: (response: any) => void
}

export type DatabaseContextInputType = {
	children: any
}

export const DatabaseContext = React.createContext<DatabaseContextType>({
	content: {
		customer: [],
		product: [],
		productOutput: [],
	},
	offline: false,
	save: () => {},
	insert: () => {},
	update: () => {},
	remove: () => {},
})

export const DatabaseProvider = ({ children }: DatabaseContextInputType) => {
	const [content, setContent] = useState<DatabaseContextContentType>({
		customer: [],
		product: [],
		productOutput: [],
	})
	const [offline, setOffline] = useState<boolean>(false)
	const [initialized, setInitialized] = useState<boolean>(false)

	const save = (props: InsertType) => {
		if (props.value?.id) {
			update(props)
		} else {
			insert(props)
		}
	}

	const insert = ({ entity, value, success, failed }: InsertType) => {
		setContent((x) => {
			if (!x?.[entity]) {
				x[entity] = []
			}
			x[entity].push({ ...value, id: x[entity].length + 1 })
			success?.(x[entity][x[entity].length - 1])
			return { ...x }
		})
	}

	const update = ({ entity, value, success, failed }: InsertType) => {
		setContent((x: DatabaseContextContentType) => {
			let index = -1
			x[entity].forEach((y, yKey) => {
				if (y.id === value.id) {
					index = yKey
				}
			})
			if (index >= 0) {
				x[entity][index] = value
				success?.(value)
			}
			return { ...x }
		})
	}

	const remove = ({ entity, id, success, failed }: DeleteType) => {
		setContent((x) => {
			let index = -1
			x[entity].forEach((y, yKey) => {
				if (y.id === id) {
					index = yKey
				}
			})
			if (index > 0) {
				x[entity].splice(index, 1)
				success?.()
			}
			return { ...x }
		})
	}

	useEffect(() => {
		if (initialized) {
			localStorage.setItem('database', JSON.stringify(content))
		}
	}, [initialized, content])

	useEffect(() => {
		if (!initialized) {
			setInitialized(true)
			if (localStorage.getItem('database')) {
				setContent(JSON.parse(localStorage.getItem('database') || '{  }'))
			} else {
				setContent({
					customer: [],
					product: [],
					productOutput: [],
				})
			}
		}
	}, [initialized])

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
