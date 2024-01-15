import React, { createContext, useState } from 'react'

export type DataCacheContextType = {
	pictureCache: [string, string][]
	setPictureCache: any
}

export const DataCacheContext = createContext<DataCacheContextType>({
	pictureCache: [],
	setPictureCache: () => {},
})

export const DataCacheProvider = ({ children }) => {
	const [pictureCache, setPictureCache] = useState<[string, string][]>([])

	return (
		<DataCacheContext.Provider value={{ pictureCache, setPictureCache }}>
			{children}
		</DataCacheContext.Provider>
	)
}
