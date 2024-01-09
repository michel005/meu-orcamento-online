import axios, { AxiosResponse } from 'axios'
import { FileUtils } from '../utils/FileUtils'

export const usePicture = (type: string) => {
	const upload = ({
		id,
		file,
		onSuccess,
		onFailed,
	}: {
		id: string
		file: string
		onSuccess?: (response: AxiosResponse) => void
		onFailed?: (error: any) => void
	}) => {
		axios
			.post(
				`/picture/${type}/${id}`,
				{
					picture: file,
				},
				{
					headers: {
						authorization: `Baerer ${localStorage.getItem('auth_token')}`,
					},
				}
			)
			.then(onSuccess)
			.catch(onFailed)
	}
	const remove = ({
		id,
		onSuccess,
		onFailed,
	}: {
		id: string
		onSuccess?: (response: AxiosResponse) => void
		onFailed?: (error: any) => void
	}) => {
		axios
			.delete(`/picture/${type}/${id}`, {
				headers: {
					authorization: `Baerer ${localStorage.getItem('auth_token')}`,
				},
			})
			.then(onSuccess)
			.catch(onFailed)
	}

	return {
		upload,
		remove,
	}
}
