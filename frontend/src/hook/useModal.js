import { useContext } from 'react'
import { ConfigContext } from './Config.context'

export const useModal = (name) => {
	const { showModal, closeModal } = useContext(ConfigContext)

	const show = (value) => {
		showModal(name, value)
	}

	const close = () => {
		closeModal(name)
	}

	return {
		show,
		close,
	}
}
