import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useModal = <T>(key: string, defaultValue?: T) => {
	const { modal, setModal } = useContext(ConfigContext)

	return {
		modal: (modal?.[key] || defaultValue) as T,
		showModal: (value: T | null) => {
			setModal((prevState) => {
				prevState[key] = value
				return { ...prevState }
			})
		},
	}
}
