import { useContext } from 'react'
import { ModalContext } from '../context/ModalContext'

export function useModalData<T>(modalName: string) {
	const { modalCollection, show, update, close } = useContext(ModalContext)

	return {
		modal: modalCollection.get(modalName) as T,
		show: (value: T) => show(modalName, value),
		update: (value: T) => update(modalName, value),
		close: () => close(modalName),
	}
}
