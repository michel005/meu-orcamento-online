import React, { useContext } from 'react'
import { ModalByEntityType, ModalContext } from '../context/ModalContext'
import { Message } from '../components/Message'
import { EatingModal } from '../pages/eating/modal'
import { GymModal } from '../pages/gym/modal'

export const ModalByEntity: ModalByEntityType[] = [
	['message', Message],
	['eating', EatingModal],
	['gym', GymModal],
]

export const ModalContainer = () => {
	const { modalCollection } = useContext(ModalContext)

	return (
		<>
			{Array.from(modalCollection, ([key, value]) => ({
				key,
				value,
			})).map((modal, modalKey) => {
				const Modal: any = ModalByEntity.find(([entity]) => entity === modal.key)
				const ModalTag = Modal[1]
				return <ModalTag key={modalKey} />
			})}
		</>
	)
}
