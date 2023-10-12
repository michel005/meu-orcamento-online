import axios from 'axios'

export const useApi = (entity: string) => {
	const header = {
		headers: {
			auth_token: localStorage.getItem('auth_token'),
		},
	}

	const getAll = ({ onSuccess, onError }) => {
		axios.get(`${entity}/`, header).then(onSuccess).catch(onError)
	}
	const getById = ({ id, onSuccess, onError }) => {
		axios.get(`${entity}/${id}`, header).then(onSuccess).catch(onError)
	}
	const create = ({ data, onSuccess, onError }) => {
		axios.post(`${entity}`, data, header).then(onSuccess).catch(onError)
	}
	const update = ({ id, data, onSuccess, onError }) => {
		axios.put(`${entity}/${id}`, data, header).then(onSuccess).catch(onError)
	}
	const remove = ({ id, onSuccess, onError }) => {
		axios.delete(`${entity}/${id}`, header).then(onSuccess).catch(onError)
	}

	return {
		getAll,
		getById,
		create,
		update,
		remove,
	}
}
