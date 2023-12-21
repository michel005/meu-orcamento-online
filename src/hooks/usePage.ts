import { useForm } from './useForm'
import { useMessage } from './useMessage'
import { useApi } from './useApi'
import { useFormLayout, useFormLayoutDefinitionType } from './useFormLayout'
import { usePageData } from './usePageData'
import { useContext } from 'react'
import { ConfigContext } from '../contexts/ConfigContext'
import { useApiData } from './useApiData'

export const usePage = <T>(
	pageName: string,
	definition: (entity: T) => useFormLayoutDefinitionType = () => ({}),
	disableForm: boolean = false
) => {
	const message = useMessage()
	const form = useForm<T>(pageName)
	const apiData = useApiData(pageName)
	const pageData = usePageData(pageName)
	const api = useApi(pageName)
	const formLayout = useFormLayout<T>({
		definition: definition(form.form),
		value: form.form,
		onChange: form.edit,
		disable: disableForm,
	})

	return {
		apiData,
		message,
		pageData,
		form,
		formLayout,
		api,
	}
}
