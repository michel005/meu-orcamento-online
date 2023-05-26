import React, { createContext, useState } from 'react'
import { Account, Movement, Settings, Template } from './DatabaseContext'
import { MovementModal } from '../pages/modal/MovementModal'
import { TemplateModal } from '../pages/modal/TemplateModal'

export type ModalByEntityType = [string, any]

export type ModalRecord = {
	entity: string
	modal: Account | Movement | Template | Settings
}

export type ModalContextType = {
	modalCollection: ModalRecord[]
	show: (modalInfo: ModalRecord) => void
	close: (modalId: string) => void
}

export const ModalByEntity: ModalByEntityType[] = [
	['account', MovementModal],
	['movement', MovementModal],
	['template', TemplateModal],
]

export const ModalContext = createContext<ModalContextType>({
	modalCollection: [],
	show: () => null,
	close: () => null,
})

export const ModalProvider = ({ children }: any) => {
	const [modalCollection, setModalCollection] = useState<ModalRecord[]>([])

	const show = (modalInfo: ModalRecord) => {
		setModalCollection((collection) => {
			collection.push(modalInfo)
			return [...collection]
		})
	}

	const close = (entity: string) => {
		setModalCollection((collection) => {
			const row = collection.find((row) => row.entity === entity)
			if (row) {
				collection.splice(collection.indexOf(row), 1)
			}
			return [...collection]
		})
	}

	return (
		<ModalContext.Provider
			value={{
				modalCollection,
				show,
				close,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
