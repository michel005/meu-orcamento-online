import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useData = <T>(key: string, defaultValue?: T) => {
	const { data, setData } = useContext(ConfigContext)

	return {
		data: (data?.[key] || defaultValue) as T,
		setData: (value: T | null) => {
			setData((prevState) => {
				prevState[key] = value
				return { ...prevState }
			})
		},
		setDataProp: (prop: string, value: any) => {
			setData((prevState) => {
				if (!prevState?.[key] && defaultValue) {
					prevState[key] = { ...defaultValue }
				}
				prevState[key][prop] = value
				return { ...prevState }
			})
		},
	}
}
