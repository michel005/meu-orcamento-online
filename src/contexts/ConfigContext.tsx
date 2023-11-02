import React, { useState } from 'react'
import { MessageType } from '../types/AllTypes'

export type ConfigContextType = {
	message: MessageType | null
	setMessage: (message: MessageType | null) => void
	loading: boolean
	setLoading: any
	form: any
	setForm: any
	onCloseForm: any
	setOnCloseForm: any
	pageData: any
	setPageData: any
}

export const ConfigContext = React.createContext<ConfigContextType>({
	message: null,
	setMessage: () => {},
	loading: false,
	setLoading: () => {},
	form: null,
	setForm: () => {},
	onCloseForm: null,
	setOnCloseForm: () => {},
	pageData: null,
	setPageData: () => {},
})

export const ConfigProvider = ({ children }: { children: any }) => {
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({})
	const [pageData, setPageData] = useState({
		customer: {
			favorite: false,
			active: true,
			inactive: false,
			pf: true,
			pj: true,
		},
		product: {
			customer: null,
		},
	})
	const [onCloseForm, setOnCloseForm] = useState({})

	return (
		<ConfigContext.Provider
			value={{
				message,
				setMessage,
				loading,
				setLoading,
				form,
				setForm,
				onCloseForm,
				setOnCloseForm,
				pageData,
				setPageData,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}
