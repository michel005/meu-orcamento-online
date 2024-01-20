import axios from 'axios'
import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'
import { useApiData } from './useApiData'
import { SessionUtils } from '../utils/SessionUtils'

export const useApi = (entity: string) => {
	const { setLoading } = useContext(ConfigContext)
	const apiData = useApiData(entity)

	const header = SessionUtils.getHeader()

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
			.post(`${entity}`, JSON.parse(JSON.stringify(data)), header)
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
	const update = ({ id, data, silently = false, onSuccess = (x) => {}, onError = (x) => {} }) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.put(`${entity}?id=${id}`, JSON.parse(JSON.stringify(data)), header)
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
	const updateProperty = ({
		id,
		propName,
		propValue,
		silently = false,
		onSuccess = (x) => {},
		onError = (x) => {},
	}) => {
		if (!silently) {
			setLoading(true)
		}
		axios
			.put(`${entity}/prop/${propName}/${propValue}?id=${id}`, null, header)
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
			.delete(`${entity}?id=${id}`, header)
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
		updateProperty,
		remove,
		removeByQuery,
	}
}
