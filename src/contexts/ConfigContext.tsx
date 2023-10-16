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
})

export const ConfigProvider = ({ children }: { children: any }) => {
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({})
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
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}
