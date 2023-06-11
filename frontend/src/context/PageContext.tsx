import React, { createContext, useCallback, useState } from 'react'
import { ProductType } from '../types/ProductType'
import { ProductOutputType } from '../types/ProductOutputType'
import { CustomerType } from '../types/CustomerType'

export type PageDefinitionType = {
	id: string
	icon: string
	name: string
	path: string
}

export type PageContextType = {
	pages: PageDefinitionType[]
	defineData: (page: string, field: string, value: any) => void
	data: DataType
}

export const PageContext = createContext<PageContextType>({
	pages: [],
	defineData: () => null,
	data: {
		navbar: {
			search: '',
		},
		product: {
			detail: null,
			output: null,
		},
		customer: {
			detail: null,
		},
	},
})

export type DataType = {
	navbar: {
		search: string
	}
	product: {
		detail: ProductType | null
		output: ProductOutputType | null
	}
	customer: {
		detail: CustomerType | null
	}
}

const initialData: DataType = {
	navbar: {
		search: '',
	},
	product: {
		detail: null,
		output: null,
	},
	customer: {
		detail: null,
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
			id: 'customer',
			icon: 'person',
			name: 'Clientes',
			path: '/customer',
		},
		{
			id: 'product',
			icon: 'list',
			name: 'Produtos',
			path: '/product',
		},
		{
			id: 'sell',
			icon: 'shopping_cart',
			name: 'Vendas',
			path: '/sell',
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
