import { useState } from 'react'

export type ErrorType = Map<string, string>

export const useFormValidation = (validation: (entity: any, errors: ErrorType) => void) => {
	const [errors, setErrors] = useState<Map<string, string>>(new Map())

	const validate = (entity: any) => {
		let temporaryErrors = new Map<string, string>()
		validation(entity, temporaryErrors)
		setErrors(temporaryErrors)
		return temporaryErrors.size === 0
	}

	return {
		validate,
		errors,
	}
}
