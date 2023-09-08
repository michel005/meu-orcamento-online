import { Dispatch, SetStateAction } from 'react'

export type StatusType = {
	modal?: boolean
	database?: boolean
	data?: boolean
}

export type ConfigContextType = {
	status: StatusType
	data: {
		[key: string]: any
	}
	setData: Dispatch<
		SetStateAction<{
			[key: string]: any
		}>
	>
	modal: {
		[key: string]: any
	}
	setModal: Dispatch<
		SetStateAction<{
			[key: string]: any
		}>
	>
	database: {
		[key: string]: any
	}
	setDatabase: Dispatch<
		SetStateAction<{
			[key: string]: any
		}>
	>
	message: any[]
	setMessage: Dispatch<SetStateAction<any[]>>
}
