import { EMPTY_FUNCTION } from 'constants/GeneralConstants'
import { createContext, useCallback, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const ConfigContext = createContext({
	isMobile: false,
	form: {},
	showForm: EMPTY_FUNCTION,
	closeForm: EMPTY_FUNCTION,
	closeAllForms: EMPTY_FUNCTION,
	loadIndicator: {},
	startLoad: EMPTY_FUNCTION,
	stopLoad: EMPTY_FUNCTION,
})

export const ConfigProvider = ({ children }) => {
	const [form, setForm] = useState({})
	const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
	const [loadIndicator, setLoadIndicator] = useState({})

	const startLoad = useCallback((entity) => {
		setLoadIndicator((l) => {
			l[entity] = true
			return { ...l }
		})
	}, [])

	const stopLoad = useCallback((entity) => {
		setLoadIndicator((l) => {
			l[entity] = false
			return { ...l }
		})
	}, [])

	const showForm = useCallback((form, value) => {
		setForm((sf) => {
			sf[form] = structuredClone(value)
			return {
				...sf,
			}
		})
	}, [])

	const closeForm = useCallback((form) => {
		setForm((sf) => {
			sf[form] = null
			return {
				...sf,
			}
		})
	}, [])

	const closeAllForms = useCallback(() => {
		setForm({})
	}, [])

	return (
		<ConfigContext.Provider
			value={{
				isMobile,
				form,
				showForm,
				closeForm,
				closeAllForms,
				loadIndicator,
				startLoad,
				stopLoad,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigContext }
