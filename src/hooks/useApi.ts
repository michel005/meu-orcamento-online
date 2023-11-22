import axios from 'axios'
import { useContext, useState } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useApi = (entity: string) => {
	const { setLoading } = useContext(ConfigContext)
	const [data, setData] = useState([])

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
			.then((...x) => {
				setData(x[0].data)
				onSuccess?.(...x)
			})
			.catch((...x) => {
				onError?.(...x)
			})
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
			.then((...x) => {
				setData(x[0].data)
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
		data,
		getAll,
		getById,
		create,
		update,
		remove,
		removeByQuery,
	}
}
