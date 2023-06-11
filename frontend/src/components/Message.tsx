import { Modal } from './Modal'
import React, { useContext } from 'react'
import { ButtonType } from './Button'
import { ModalContext } from '../context/ModalContext'

export type MessageType = {
	entity: {
		header: string
		message?: string
		options?: ButtonType[]
	}
}

export const Message = () => {
	const { modalCollection, close } = useContext(ModalContext)

	const entity = modalCollection.get('message')

	return (
		<Modal
			style={{ zIndex: 'var(--zindex-message)' }}
			header={entity.header}
			buttons={entity.options}
			onClose={() => close('message')}
			messageMode={true}
		>
			{entity.message}
		</Modal>
	)
}
