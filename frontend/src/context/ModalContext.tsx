import React, { createContext, useState } from 'react'
import { MovementModal } from '../pages/movement/MovementModal'
import { TemplateModal } from '../pages/template/TemplateModal'
import { Message } from '../components/Message'
import { ButtonType } from '../components/Button'
import { AccountModal } from '../pages/account/AccountModal'
import { GoalModal } from '../pages/goal/GoalModal'

export type ModalByEntityType = [string, any]

export type ModalRecord = {
	entity: string
	modal: any
}

export type ModalContextType = {
	modalCollection: ModalRecord[]
	show: (modalInfo: ModalRecord) => void
	update: (modalInfo: ModalRecord) => void
	showMessage: (header: string, message?: string) => void
	showQuestion: (header: string, message: string, confirm: () => void) => void
	showQuestionWithOptions: (header: string, message: string, ...options: ButtonType[]) => void
	close: (modalId: string) => void
}

export const ModalByEntity: ModalByEntityType[] = [
	['message', Message],
	['account', AccountModal],
	['movement', MovementModal],
	['template', TemplateModal],
	['goal', GoalModal],
]

export const ModalContext = createContext<ModalContextType>({
	modalCollection: [],
	show: () => null,
	update: () => null,
	showMessage: () => null,
	showQuestion: () => null,
	showQuestionWithOptions: () => null,
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

	const update = (modalInfo: ModalRecord) => {
		setModalCollection((collection) => {
			const found: any = collection.find((x) => x.entity === modalInfo.entity)
			if (found) {
				found.modal = { ...found.modal, ...modalInfo.modal }
			}
			return [...collection]
		})
	}

	const showMessage = (header: string, message?: string) => {
		setModalCollection((collection) => {
			collection.push({
				entity: 'message',
				modal: {
					header,
					message,
					options: [
						{
							children: 'Confirmar',
							leftIcon: 'check',
							onClick: () => {
								close('message')
							},
						},
					],
				},
			})
			return [...collection]
		})
	}

	const showQuestion = (header: string, message: string, confirm: () => void) => {
		setModalCollection((collection) => {
			collection.push({
				entity: 'message',
				modal: {
					header,
					message,
					options: [
						{
							children: 'Confirmar',
							leftIcon: 'check',
							onClick: () => {
								confirm()
								close('message')
							},
						},
						{
							children: 'Cancelar',
							leftIcon: 'close',
							variation: 'secondary',
							onClick: () => {
								close('message')
							},
						},
					],
				},
			})
			return [...collection]
		})
	}

	const showQuestionWithOptions = (header: string, message: string, ...options: ButtonType[]) => {
		setModalCollection((collection) => {
			collection.push({
				entity: 'message',
				modal: {
					header,
					message,
					options,
				},
			})
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
				update,
				showMessage,
				showQuestion,
				showQuestionWithOptions,
				close,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
