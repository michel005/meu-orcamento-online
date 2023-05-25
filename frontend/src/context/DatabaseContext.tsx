import React, { useEffect, useState } from 'react'
import { Axios } from '../configs/Axios'

export const AccountType: any = {
	DEBIT: 'Débito',
	CREDIT: 'Crédito',
	SAVINGS: 'Poupança',
	INVESTMENT: 'Investimento',
	SALARY: 'Salário',
}

export type Account = {
	id?: string | null
	name: string
	type: 'DEBIT' | 'CREDIT' | 'SAVINGS' | 'INVESTMENTS' | 'SALARY'
}

export type Movement = {
	id?: string | null
	date?: Date | string | null
	description?: string
	account?: Account | null
	value: number
}

export type Goal = {
	id: string | null
	name: string
	description: string
	status: 'completed' | 'inProgress' | 'canceled'
	targetValue: number
	targetDate: Date
}

export type Settings = {}

export type DatabaseResponse = {
	accounts: Account[]
	movements: Movement[]
	goals: Goal[]
	settings: Settings
}

export type Entity = 'account' | 'movement' | 'goal' | 'settings'

export type DatabaseContextType = DatabaseResponse & {
	refresh: () => void
	loading: boolean | null
	create: (
		entity: Entity,
		value: Account | Movement | Goal | Settings,
		after: (response: any) => void
	) => void
	update: (
		entity: Entity,
		value: Account | Movement | Goal | Settings,
		after: (response: any) => void
	) => void
	remove: (entity: Entity, id: string, after: (response: any) => void) => void
}

export type DatabaseContextInputType = {
	children: any
}

export const DatabaseContext = React.createContext<DatabaseContextType>({
	accounts: [],
	movements: [],
	goals: [],
	settings: {},
	refresh: () => null,
	loading: false,
	create: () => null,
	update: () => null,
	remove: () => null,
})

export const DatabaseProvider = ({ children }: DatabaseContextInputType) => {
	const [accounts, setAccounts] = useState<Account[]>([])
	const [movements, setMovements] = useState<Movement[]>([])
	const [goals, setGoals] = useState<Goal[]>([])
	const [settings, setSettings] = useState<Settings>({})
	const [loading, setLoading] = useState<boolean | null>(null)
	const [initialized, setInitialized] = useState<boolean>(false)

	const refresh = () => {
		setLoading(true)
		Axios.get<DatabaseResponse>('/all')
			.then((response) => {
				setAccounts(response.data?.accounts || [])
				setMovements(response.data?.movements || [])
				setGoals(response.data?.goals || [])
				setSettings(response.data?.settings || {})
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const create = (
		entity: Entity,
		value: Account | Movement | Goal | Settings,
		after: (response: any) => void
	) => {
		Axios.post(`/${entity}`, value).then((response) => {
			refresh()
			after(response)
		})
	}

	const update = (
		entity: Entity,
		value: Account | Movement | Goal | Settings,
		after: (response: any) => void
	) => {
		Axios.put(`/${entity}`, value).then((response) => {
			refresh()
			after(response)
		})
	}

	const remove = (entity: Entity, id: string, after: (response: any) => void) => {
		Axios.delete(`/${entity}?id=${id}`).then((response) => {
			refresh()
			after(response)
		})
	}

	useEffect(() => {
		if (!initialized) {
			setInitialized(true)
			refresh()
		}
	}, [initialized])

	return (
		<DatabaseContext.Provider
			value={{
				accounts,
				movements,
				goals,
				settings,
				refresh,
				loading,
				create,
				update,
				remove,
			}}
		>
			{children}
		</DatabaseContext.Provider>
	)
}
