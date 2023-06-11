import React, { useContext } from 'react'
import { ModalByEntity, ModalContext } from '../context/ModalContext'

export const ModalContainer = () => {
	const { modalCollection } = useContext(ModalContext)

	return (
		<>
			{Array.from(modalCollection, ([key, value]) => ({
				key,
				value,
			})).map((modal) => {
				const Modal: any = ModalByEntity.find(([entity]) => entity === modal.key)
				const ModalTag = Modal[1]
				return <ModalTag />
			})}
		</>
	)
}
