import axios from 'axios'
import { useContext, useState } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useApi = (entity: string) => {
	const { setLoading } = useContext(ConfigContext)
	const [data, setData] = useState([])

	const header = {
		headers: {
			auth_token: localStorage.getItem('auth_token'),
		},
	}

	const getAll = ({ query = {}, onSuccess = (x) => {}, onError = (x) => {} } = {}) => {
		setLoading(true)
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
				setLoading(false)
			})
	}
	const getById = ({ id, onSuccess = (x) => {}, onError = (x) => {} }) => {
		setLoading(true)
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
				setLoading(false)
			})
	}
	const create = ({ data, onSuccess = (x) => {}, onError = (x) => {} }) => {
		setLoading(true)
		axios
			.post(`${entity}`, data, header)
			.then((...x) => {
				setData(x[0].data)
				onSuccess(...x)
			})
			.catch((...x) => {
				onError(...x)
			})
			.finally(() => {
				setLoading(false)
			})
	}
	const update = ({ id, data, onSuccess = (x) => {}, onError = (x) => {} }) => {
		setLoading(true)
		axios
			.put(`${entity}/${id}`, data, header)
			.then((...x) => {
				setData(x[0].data)
				onSuccess(...x)
			})
			.catch((...x) => {
				onError(...x)
			})
			.finally(() => {
				setLoading(false)
			})
	}
	const remove = ({ id, onSuccess = (x) => {}, onError = (x) => {} }) => {
		setLoading(true)
		axios
			.delete(`${entity}/${id}`, header)
			.then((...x) => {
				onSuccess(...x)
			})
			.catch((...x) => {
				onError(...x)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return {
		data,
		getAll,
		getById,
		create,
		update,
		remove,
	}
}
