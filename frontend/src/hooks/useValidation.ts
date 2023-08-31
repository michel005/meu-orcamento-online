import { useValidationType } from './useValidation.type'
import { useState } from 'react'

export const useValidation = <T>(validation: useValidationType<T>) => {
	const [errors, setErrors] = useState<Map<string, string>>(new Map())
	return {
		validate: (value: T | null) => {
			const newErrors = new Map()
			validation(value, newErrors)
			setErrors(new Map(newErrors))
			return newErrors.size === 0
		},
		errors,
	}
}
