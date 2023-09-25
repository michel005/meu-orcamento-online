import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useMessage = () => {
	const { message, setMessage } = useContext(ConfigContext)

	return {
		showMessage: (header: string, content: any) => {
			setMessage((x) => {
				x.push({
					type: 'message',
					header,
					content,
				})
				return [...x]
			})
		},
		showQuestion: (header: string, content: any, confirm: () => void) => {
			setMessage((x) => {
				x.push({
					type: 'question',
					header,
					content,
					confirm,
				})
				return [...x]
			})
		},
	}
}
