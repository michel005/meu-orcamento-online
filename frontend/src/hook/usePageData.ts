import { useContext } from 'react'
import { PageContext } from '../context/PageContext'

export function usePageData<T>(
	pageName: string,
	initial?: T
): {
	data: T
	updateData: (value: T) => void
} {
	const { data, defineData } = useContext(PageContext)

	return {
		data: data.get(pageName) || initial,
		updateData: (value) => defineData(pageName, value),
	}
}
