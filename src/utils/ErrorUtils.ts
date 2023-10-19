export class ErrorUtils {
	static convertErrors = (error: any, fallbackField = 'error') => {
		console.log(error)
		let convertedErrors = {}
		if (error?.code && error?.message) {
			convertedErrors[fallbackField] = {
				code: error.code,
				message: error.message,
			}
		} else {
			convertedErrors = error
		}
		return convertedErrors
	}

	static singleError = (field, message: string) => {
		return {
			[field]: {
				message,
			},
		}
	}
}
