import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useMessage = () => {
	const { setMessage } = useContext(ConfigContext)

	const question = (header: string, content: any, confirm: () => void) => {
		setMessage({
			header,
			content,
			confirm,
			type: 'question',
		})
	}

	const message = (header: string, content: any) => {
		setMessage({
			header,
			content,
			type: 'confirm',
		})
	}

	return {
		question,
		message,
	}
}
