import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useApiData = (pageName: string) => {
	const { apiData, setApiData } = useContext(ConfigContext)

	return {
		data: apiData?.[pageName],
		set: (value: any) => {
			setApiData((x: any) => {
				x[pageName] = [...value]
				return { ...x }
			})
		},
	}
}
