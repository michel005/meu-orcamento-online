import React, { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export type ModalType = {
	id?: number
	type: 'message' | 'question'
	header: string
	message?: JSX.Element | JSX.Element[] | string
	confirm?: (id: number) => void
	onClose?: () => void
}

export type ModalContextType = {
	modals?: ModalType[]
	setModals?: any
}

export const ModalContext = React.createContext<ModalContextType>({})

export const ModalProvider = ({ children }: any) => {
	const [modals, setModals] = useState<ModalType[]>([])

	return <ModalContext.Provider value={{ modals, setModals }}>{children}</ModalContext.Provider>
}
