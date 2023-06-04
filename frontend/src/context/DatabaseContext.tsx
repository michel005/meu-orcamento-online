import React, { useEffect, useState } from 'react'
import { Axios } from '../configs/Axios'
import { TemplateRecurrenceType } from '../types/TemplateRecurrenceType'
import { GoalType } from '../types/GoalType'
import { MovementType } from '../types/MovementType'

export const AccountType: any = {
	DEBIT: 'Débito',
	CREDIT: 'Crédito',
	SAVINGS: 'Poupança',
	INVESTMENT: 'Investimento',
	SALARY: 'Salário',
}

export type AccountType = 'DEBIT' | 'CREDIT' | 'SAVINGS' | 'INVESTMENTS' | 'SALARY'

export type Account = {
	id?: string | null
	name: string
	type: AccountType
}

export type Template = {
	id?: string | null
	day?: number | null
	description?: string
	account?: Account | null
	goal?: GoalType | null
	value: number
	recurrence: TemplateRecurrenceType
}

export type Settings = {
	id?: string | null
	colorSchema?: string | null
}

export type DatabaseResponse = {
	accounts: Account[]
	movements: MovementType[]
	templates: Template[]
	goals: GoalType[]
	settings: Settings
}

export type Entity = 'account' | 'movement' | 'template' | 'goal' | 'settings'

export type DatabaseContextType = DatabaseResponse & {
	refresh: () => void
	loading: boolean | null
	create: (
		entity: Entity,
		value: Account | MovementType | GoalType | Settings,
		after?: (response: any) => void
	) => void
	update: (
		entity: Entity,
		value: Account | MovementType | GoalType | Settings,
		after?: (response: any) => void
	) => void
	remove: (entity: Entity, id: string, after: (response: any) => void) => void
	offline: boolean
}

export type DatabaseContextInputType = {
	children: any
}

export const DatabaseContext = React.createContext<DatabaseContextType>({
	accounts: [],
	movements: [],
	templates: [],
	goals: [],
	settings: {},
	refresh: () => null,
	loading: false,
	create: () => null,
	update: () => null,
	remove: () => null,
	offline: false,
})

export const DatabaseProvider = ({ children }: DatabaseContextInputType) => {
	const [accounts, setAccounts] = useState<Account[]>([])
	const [movements, setMovements] = useState<MovementType[]>([])
	const [templates, setTemplates] = useState<Template[]>([])
	const [goals, setGoals] = useState<GoalType[]>([])
	const [settings, setSettings] = useState<Settings>({})
	const [loading, setLoading] = useState<boolean | null>(null)
	const [initialized, setInitialized] = useState<boolean>(false)

	const [offline, setOffline] = useState<boolean>(false)

	const refresh = () => {
		setLoading(true)
		setOffline(false)
		Axios.get<DatabaseResponse>('/all')
			.then((response) => {
				setAccounts(response.data?.accounts || [])
				setMovements(response.data?.movements || [])
				setTemplates(response.data?.templates || [])
				setGoals(response.data?.goals || [])
				setSettings(response.data?.settings || {})
			})
			.catch(() => {
				setOffline(true)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const create = (
		entity: Entity,
		value: Account | MovementType | GoalType | Settings,
		after?: (response: any) => void
	) => {
		Axios.post(`/${entity}`, value).then((response) => {
			refresh()
			after?.(response)
		})
	}

	const update = (
		entity: Entity,
		value: Account | MovementType | GoalType | Settings,
		after?: (response: any) => void
	) => {
		Axios.put(`/${entity}`, value).then((response) => {
			refresh()
			after?.(response)
		})
	}

	const remove = (entity: Entity, id: string, after?: (response: any) => void) => {
		Axios.delete(`/${entity}?id=${id}`).then((response) => {
			refresh()
			after?.(response)
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
				templates,
				goals,
				settings,
				refresh,
				loading,
				create,
				update,
				remove,
				offline,
			}}
		>
			{children}
		</DatabaseContext.Provider>
	)
}
