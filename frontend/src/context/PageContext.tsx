import React, { createContext, useCallback, useState } from 'react'
import { DateUtils } from '../utils/DateUtils'
import { Account, AccountType } from './DatabaseContext'
import { AccountOptions } from '../pages/account/AccountOptions'
import { MovementOptions } from '../pages/movement/MovementOptions'
import { TemplateOptions } from '../pages/template/TemplateOptions'
import { TemplateRecurrenceType } from '../types/TemplateRecurrenceType'
import { GoalOptions } from '../pages/goal/GoalOptions'
import { GoalStatusType, GoalType } from '../types/GoalType'

export type PageDefinitionType = {
	id: string
	icon: string
	name: string
	path: string
	options?: any
}

export type PageContextType = {
	pages: PageDefinitionType[]
	defineData: (page: string, field: string, value: any) => void
	data: DataType
}

export const PageContext = createContext<PageContextType>({
	pages: [],
	defineData: () => null,
	data: {},
})

export type DataType = {
	account?: {
		type?: null | AccountType
	}
	movement?: {
		status: string | null
		account?: Account | null
		goal?: GoalType | null
		date?: {
			start?: string
			end?: string
		}
	}
	template?: {
		recurrence?: TemplateRecurrenceType | null
	}
	goal?: {
		status?: GoalStatusType | null
	}
}

const initialData: DataType = {
	account: {
		type: null,
	},
	movement: {
		status: null,
		account: null,
		goal: null,
		date: {
			start: DateUtils.dateToString(
				new Date(new Date().getFullYear(), new Date().getMonth(), 1)
			),
			end: DateUtils.dateToString(
				new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
			),
		},
	},
	template: {
		recurrence: null,
	},
	goal: {
		status: null,
	},
}

export const PageProvider = ({ children }: any) => {
	const [data, setData] = useState<DataType>(initialData)

	const pages: PageDefinitionType[] = [
		{
			id: 'dashboard',
			icon: 'dashboard',
			name: 'Dashboard',
			path: '/',
		},
		{
			id: 'account',
			icon: 'wallet',
			name: 'Conta',
			path: '/accounts',
			options: <AccountOptions />,
		},
		{
			id: 'movement',
			icon: 'shopping_cart',
			name: 'Lançamentos',
			path: '/movements',
			options: <MovementOptions />,
		},
		{
			id: 'template',
			icon: 'description',
			name: 'Template de Lançamento',
			path: '/template',
			options: <TemplateOptions />,
		},
		{
			id: 'goal',
			icon: 'flag',
			name: 'Metas',
			path: '/goals',
			options: <GoalOptions />,
		},
		{
			id: 'print',
			icon: 'print',
			name: 'Relatórios',
			path: '/reports',
		},
	]

	const defineData = useCallback((page: string, field: string, value: any) => {
		setData((x: any) => {
			x[page][field] = value
			return { ...x }
		})
	}, [])

	return (
		<PageContext.Provider
			value={{
				pages,
				defineData,
				data,
			}}
		>
			{children}
		</PageContext.Provider>
	)
}
