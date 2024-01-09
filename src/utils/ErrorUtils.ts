export class ErrorUtils {
	static convertErrors = (error: any, fallbackField = 'error') => {
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
}
