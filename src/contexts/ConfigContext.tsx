import React, { createContext, useEffect, useState } from 'react'
import { ConfigContextType, StatusType } from './ConfigContext.type'
import { MichelUser } from '../constants/MichelUser'

export const ConfigContext = createContext<ConfigContextType>({
	status: {},
	data: {},
	setData: () => {},
	modal: {},
	setModal: () => {},
	message: [],
	setMessage: () => {},
	database: {},
	setDatabase: () => {},
	sidebar: null,
	setSidebar: () => {},
})

export const ConfigProvider = ({ children }: { children: any }) => {
	const [sidebar, setSidebar] = useState<any | null>(null)
	const [data, setData] = useState<{
		[key: string]: any
	}>({})
	const [modal, setModal] = useState<{
		[key: string]: any
	}>({})
	const [message, setMessage] = useState<any[]>([])
	const [status, setStatus] = useState<StatusType>({
		modal: false,
		database: false,
		data: false,
	})
	const [database, setDatabase] = useState<{
		[key: string]: any
	}>({
		user: [MichelUser],
	})

	useEffect(() => {
		if (!status.database) {
			if (localStorage.getItem('database')) {
				setDatabase(JSON.parse(localStorage.getItem('database') || '{}'))
			}
			setStatus((x) => {
				x.database = true
				return { ...x }
			})
		}
	}, [status])

	useEffect(() => {
		if (status.database) {
			localStorage.setItem('database', JSON.stringify(database))
		}
	}, [status, database])

	return (
		<ConfigContext.Provider
			value={{
				status,
				data,
				setData,
				modal,
				setModal,
				database,
				setDatabase,
				message,
				setMessage,
				sidebar,
				setSidebar,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}
