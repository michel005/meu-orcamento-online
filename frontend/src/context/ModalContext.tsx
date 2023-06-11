import React, { createContext, useState } from 'react'
import { Message } from '../components/Message'
import { ButtonType } from '../components/Button'
import { ProductDetail } from '../pages/product/ProductDetail'

export type ModalByEntityType = [string, any]

export type ModalContextType = {
	modalCollection: Map<string, any>
	show: (entity: string, value: any) => void
	update: (entity: string, value: any) => void
	showMessage: (header: string, message?: string) => void
	showQuestion: (header: string, message: string, confirm: () => void) => void
	showQuestionWithOptions: (header: string, message: string, ...options: ButtonType[]) => void
	close: (modalId: string) => void
}

export const ModalByEntity: ModalByEntityType[] = [
	['message', Message],
	['product', ProductDetail],
]

export const ModalContext = createContext<ModalContextType>({
	modalCollection: new Map(),
	show: () => null,
	update: () => null,
	showMessage: () => null,
	showQuestion: () => null,
	showQuestionWithOptions: () => null,
	close: () => null,
})

export const ModalProvider = ({ children }: any) => {
	const [modalCollection, setModalCollection] = useState<Map<string, any>>(new Map())

	const show = (entity: string, value: any) => {
		setModalCollection((collection) => {
			collection.set(entity, value)
			return new Map(collection)
		})
	}

	const update = (entity: string, value: any) => {
		setModalCollection((collection) => {
			collection.set(entity, value)
			return new Map(collection)
		})
	}

	const showMessage = (header: string, message?: string) => {
		setModalCollection((collection) => {
			collection.set('message', {
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
			})
			return new Map(collection)
		})
	}

	const showQuestion = (header: string, message: string, confirm: () => void) => {
		setModalCollection((collection) => {
			collection.set('message', {
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
			})
			return new Map(collection)
		})
	}

	const showQuestionWithOptions = (header: string, message: string, ...options: ButtonType[]) => {
		setModalCollection((collection) => {
			collection.set('message', {
				header,
				message,
				options,
			})
			return new Map(collection)
		})
	}

	const close = (entity: string) => {
		setModalCollection((collection) => {
			collection.delete(entity)
			return new Map(collection)
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
