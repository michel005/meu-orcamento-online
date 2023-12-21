import axios from 'axios'
import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'
import { useApiData } from './useApiData'

export const useApi = (entity: string) => {
	const { setLoading } = useContext(ConfigContext)
	const apiData = useApiData(entity)

	const header = {
		headers: {
			authorization: `Baerer ${localStorage.getItem('auth_token')}`,
		},
	}

	const getAll = ({
		silently = false,
		query = {},
		onSuccess = (x) => {},
		onError = (x) => {},
	} = {}) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.get(
				`${entity}?${Object.keys(query)
					.map((x) => `${x}=${query[x]}`)
					.join('&')}`,
				header
			)
			.then((response) => {
				apiData.set(response.data)
				onSuccess?.(response)
			})
			.catch(onError)
			.finally(() => {
				if (!silently) {
					setLoading(false)
				}
			})
	}
	const getById = ({ id, silently = false, onSuccess = (x) => {}, onError = (x) => {} }) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.get(`${entity}/${id}`, header)
			.then(onSuccess)
			.catch(onError)
			.finally(() => {
				if (!silently) {
					setLoading(false)
				}
			})
	}
	const create = ({ data, silently = false, onSuccess = (x) => {}, onError = (x) => {} }) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.post(`${entity}`, data, header)
			.then((response) => {
				onSuccess(response.data)
			})
			.catch((...x) => {
				onError(...x)
			})
			.finally(() => {
				if (!silently) {
					setLoading(false)
				}
			})
	}
	const update = ({ data, silently = false, onSuccess = (x) => {}, onError = (x) => {} }) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.put(`${entity}`, data, header)
			.then((response) => {
				onSuccess(response.data)
			})
			.catch((...x) => {
				onError(...x)
			})
			.finally(() => {
				if (!silently) {
					setLoading(false)
				}
			})
	}
	const remove = ({ id, silently = false, onSuccess = (x) => {}, onError = (x) => {} }) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.delete(`${entity}/${id}`, header)
			.then((...x) => {
				onSuccess(...x)
			})
			.catch((...x) => {
				onError(...x)
			})
			.finally(() => {
				if (!silently) {
					setLoading(false)
				}
			})
	}
	const removeByQuery = ({
		query,
		silently = false,
		onSuccess = (x) => {},
		onError = (x) => {},
	}) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.delete(
				`${entity}/?${Object.keys(query)
					.map((x) => `${x}=${query[x]}`)
					.join('&')}`,
				header
			)
			.then((...x) => {
				onSuccess(...x)
			})
			.catch((...x) => {
				onError(...x)
			})
			.finally(() => {
				if (!silently) {
					setLoading(false)
				}
			})
	}

	return {
		getAll,
		getById,
		create,
		update,
		remove,
		removeByQuery,
	}
}
