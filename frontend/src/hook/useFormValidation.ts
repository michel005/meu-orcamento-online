import { useState } from 'react'

export type ErrorType = Map<string, string>

export function useFormValidation<T>(validation: (entity: T, errors: ErrorType) => void) {
	const [errors, setErrors] = useState<Map<string, string>>(new Map())

	const reset = () => {
		setErrors(new Map())
	}

	const validate = (entity: T) => {
		let temporaryErrors = new Map<string, string>()
		validation(entity, temporaryErrors)
		setErrors(temporaryErrors)
		return temporaryErrors.size === 0
	}

	return {
		validate,
		errors,
		reset,
	}
}
