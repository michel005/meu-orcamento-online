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
})

export const ConfigProvider = ({ children }: { children: any }) => {
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

	useEffect(() => {
		if (!status.modal) {
			if (localStorage.getItem('modal')) {
				setModal(JSON.parse(localStorage.getItem('modal') || '{}'))
			}
			setStatus((x) => {
				x.modal = true
				return { ...x }
			})
		}
	}, [status])

	useEffect(() => {
		if (status.modal) {
			localStorage.setItem('modal', JSON.stringify(modal))
		}
	}, [status, modal])

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
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}
