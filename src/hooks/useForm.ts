import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'

export const useForm = <T>(name: string) => {
	const { form, setForm, onCloseForm, setOnCloseForm } = useContext(ConfigContext)

	return {
		originalValue: form?.[name],
		form: (form?.[name] || {}) as T,
		edit: (value: T) => {
			setForm((x: any) => {
				x[name] = { ...value }
				return { ...x }
			})
		},
		show: (value: T, onClose: () => void | null = null) => {
			setForm((x: any) => {
				x[name] = { ...value }
				return { ...x }
			})
			setOnCloseForm((x: any) => {
				x[name] = onClose
				return { ...x }
			})
		},
		close: (runOn: boolean = true) => {
			if (runOn) {
				onCloseForm?.[name]?.()
			}
			setForm((x: any) => {
				x[name] = null
				return { ...x }
			})
			setOnCloseForm((x: any) => {
				x[name] = undefined
				return { ...x }
			})
		},
	}
}
