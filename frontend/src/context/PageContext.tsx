import React, { createContext, useCallback, useState } from 'react'

export type PageContextType = {
	defineData: (field: string, value: any) => void
	data: Map<string, any>
}

export const PageContext = createContext<PageContextType>({
	defineData: () => null,
	data: new Map([
		[
			'product',
			{
				displayMode: 'card',
			},
		],
	]),
})

export const PageProvider = ({ children }: any) => {
	const [data, setData] = useState<Map<string, any>>(new Map())

	const defineData = (field: string, value: any) => {
		setData((x) => {
			x.set(field, value)
			return new Map(x)
		})
	}

	return (
		<PageContext.Provider
			value={{
				defineData,
				data,
			}}
		>
			{children}
		</PageContext.Provider>
	)
}
