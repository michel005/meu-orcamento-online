import React from 'react'
import { useContext } from 'react'
import { ModalContext } from '../context/ModalContext'
import { Modal } from '../components/Modal'

export const ModalModule = () => {
	const { modals } = useContext(ModalContext)

	return (
		<>
			{(modals || []).map((modal, modalKey) => {
				return <Modal key={modalKey} modal={modal} />
			})}
		</>
	)
}
