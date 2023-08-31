import React, { createContext, useEffect, useState } from 'react'
import { ConfigContextType } from './ConfigContext.type'

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
	const [status, setStatus] = useState<{
		modal: boolean
		database: boolean
		data: boolean
	}>({
		modal: false,
		database: false,
		data: false,
	})
	const [database, setDatabase] = useState<{
		[key: string]: any
	}>({})

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
		if (!status.data) {
			if (localStorage.getItem('data')) {
				setData(JSON.parse(localStorage.getItem('data') || '{}'))
			}
			setStatus((x) => {
				x.data = true
				return { ...x }
			})
		}
	}, [status])

	useEffect(() => {
		if (status.data) {
			localStorage.setItem('data', JSON.stringify(data))
		}
	}, [status, data])

	useEffect(() => {
		if (status.database) {
			localStorage.setItem('database', JSON.stringify(database))
		}
	}, [status, database])

	useEffect(() => {
		if (status.modal) {
			localStorage.setItem('modal', JSON.stringify(modal))
		}
	}, [status, modal])

	console.log(database)

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
