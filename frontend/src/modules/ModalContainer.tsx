import React, { useContext } from 'react'
import { ModalByEntity, ModalContext } from '../context/ModalContext'

export const ModalContainer = () => {
	const { modalCollection } = useContext(ModalContext)

	return (
		<>
			{modalCollection.map((modal) => {
				const Modal: any = ModalByEntity.find(([entity]) => {
					return entity === modal.entity
				})
				const ModalTag = Modal[1]
				return <ModalTag key={Modal[0]} entity={modal.modal} />
			})}
		</>
	)
}
