import React, { useState } from 'react'
import { CustomerType, MessageType, ProductType } from '../types/AllTypes'

export type ConfigContextType = {
	showSidebar: boolean
	setShowSidebar: any
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
	apiData: {
		customer: CustomerType[]
		product: ProductType[]
	}
	setApiData: any
}

export const ConfigContext = React.createContext<ConfigContextType>({
	showSidebar: null,
	setShowSidebar: () => {},
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
	apiData: null,
	setApiData: () => {},
})

export const ConfigProvider = ({ children }: { children: any }) => {
	const [showSidebar, setShowSidebar] = useState(true)
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({})
	const [apiData, setApiData] = useState({
		customer: [],
		product: [],
	})
	const [pageData, setPageData] = useState({
		customer: {
			view: 'table',
			favorite: false,
			personType: null,
		},
		product: {
			view: 'table',
			seller_id: null,
		},
	})
	const [onCloseForm, setOnCloseForm] = useState({})

	return (
		<ConfigContext.Provider
			value={{
				showSidebar,
				setShowSidebar,
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
				apiData,
				setApiData,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}
