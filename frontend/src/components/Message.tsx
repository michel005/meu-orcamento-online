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

export const Message = ({ entity }: MessageType) => {
	const { close } = useContext(ModalContext)
	return (
		<Modal
			style={{ zIndex: 'var(--zindex-message)' }}
			header={entity.header}
			buttons={entity.options}
			onClose={() => close('message')}
		>
			{entity.message}
		</Modal>
	)
}
