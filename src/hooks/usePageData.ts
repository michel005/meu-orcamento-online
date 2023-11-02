import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const usePageData = (pageName: string) => {
	const { pageData, setPageData } = useContext(ConfigContext)

	return {
		data: pageData?.[pageName],
		set: (value: any) => {
			setPageData((x: any) => {
				x[pageName] = { ...value }
				return { ...x }
			})
		},
		setProp: (prop: string, value: (prev: any) => void) => {
			setPageData((x: any) => {
				x[pageName][prop] = value?.(x?.[pageName]?.[prop])
				return { ...x }
			})
		},
		clear: () => {
			setPageData((x: any) => {
				x[pageName] = undefined
				return { ...x }
			})
		},
	}
}
