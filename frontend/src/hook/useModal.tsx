import { useContext } from 'react'
import { ModalContext, ModalType } from '../context/ModalContext'

export const useModal = () => {
	const { setModals } = useContext(ModalContext)

	const message = ({ header, message, onClose = () => null }: any) => {
		setModals((x: ModalType[]) => {
			const greaterId = x.reduce(
				(prev, curr) => (prev > (curr.id || 0) ? prev : curr.id || 0),
				1
			)

			x.push({ id: greaterId + 1, type: 'message', header, message, onClose })
			return [...x]
		})
	}

	const question = ({ header, message, confirm, onClose = () => null }: any) => {
		setModals((x: ModalType[]) => {
			const greaterId = x.reduce(
				(prev, curr) => (prev > (curr.id || 0) ? prev : curr.id || 0),
				1
			)

			x.push({ id: greaterId + 1, type: 'question', header, message, confirm, onClose })
			return [...x]
		})
	}

	const close = (id: number) => {
		setModals((x: ModalType[]) => {
			const modal: ModalType | undefined = x.find((modal) => modal.id === id)

			if (modal) {
				x.splice(x.indexOf(modal), 1)
			}
			return [...x]
		})
	}

	return { message, question, close }
}
