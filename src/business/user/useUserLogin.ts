import axios from 'axios'
import { ErrorUtils } from '../../utils/ErrorUtils'
import { useContext } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'

export const useUserLogin = ({ onSuccess, onError }: { onSuccess?: any; onError?: any }) => {
	const { setLoading } = useContext(ConfigContext)

	const run = ({ userName, password }: { userName: string; password: string }) => {
		setLoading(true)
		axios
			.post('user/login', {
				user_name: userName,
				password: password,
			})
			.then((response) => {
				onSuccess?.(response.data)
			})
			.catch((errors) => {
				onError?.(ErrorUtils.convertErrors(errors.response.data))
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return {
		run,
	}
}
