import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'
import { DateUtils } from '../utils/DateUtils'

export const useDatabase = <T>(key: string) => {
	const { database, setDatabase } = useContext(ConfigContext)

	return {
		data: (database?.[key] || []) as T[],
		findById: (id: number) => {
			return (database?.[key] as T[]).find((x: any) => x.id === id)
		},
		create: (value: T) => {
			setDatabase((prevState) => {
				if (!prevState[key]) {
					prevState[key] = []
				}
				prevState[key].push({
					id: Math.random(),
					...value,
					created: DateUtils.dateToString(new Date()),
				})
				return structuredClone(prevState)
			})
		},
		update: (id: number, value: T) => {
			console.log(value)
			setDatabase((prevState) => {
				const index = prevState[key].findIndex((x: any) => x.id === id)
				console.log(prevState[key][index])
				prevState[key][index] = {
					id: Math.random(),
					...value,
					updated: DateUtils.dateToString(new Date()),
				}
				if (!prevState[key][index]?.created) {
					prevState[key][index].created = DateUtils.dateToString(new Date())
				}
				return structuredClone(prevState)
			})
		},
		remove: (id: number) => {
			setDatabase((prevState) => {
				const index = prevState[key].findIndex((x: any) => x.id === id)
				prevState[key].splice(index)
				return structuredClone(prevState)
			})
		},
	}
}
