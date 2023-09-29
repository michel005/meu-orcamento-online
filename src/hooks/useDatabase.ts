import { DateUtils } from '../utils/DateUtils'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useDatabase = <T>(key: string) => {
	const api = axios.create({
		baseURL: `http://localhost:8080/${key}`,
	})
	const [data, setData] = useState<T[]>([])

	const refresh = async () => {
		const result = await api.get('/')
		return setData((result.data || []) as T[])
	}

	useEffect(() => {
		api.get('/').then((response) => {
			setData(response.data)
		})
	}, [])

	return {
		data,
		refresh,
		findById: async (id: string) => {
			const result = await api.get('/' + id)
			return result.data as T | null
		},
		create: async (value: T, after?: () => void) => {
			try {
				await api.post('/', {
					...value,
					created: DateUtils.dateToString(new Date()),
				})
				await refresh()
				after?.()
			} catch (err) {
				throw err
			}
		},
		update: async (id: string, value: T, after?: () => void) => {
			try {
				await api.put('/' + id, {
					...value,
					updated: DateUtils.dateToString(new Date()),
				})
				await refresh()
				after?.()
			} catch (err) {
				throw err
			}
		},
		remove: async (id: string, after?: () => void) => {
			try {
				await api.delete('/' + id)
				await refresh()
				after?.()
			} catch (err) {
				throw err
			}
		},
	}
}
