export class ErrorUtils {
	static convertErrors = (error: any, fallbackField = 'error') => {
		let convertedErrors = {}
		if (error?.code) {
			convertedErrors[fallbackField] = {
				code: error.code,
				message: error.message,
			}
		} else {
			convertedErrors = error
			// Object.keys(error).forEach((x) => {
			// 	if (x === 'AUTH-005') {
			// 		convertedErrors[x] = `${error[x].message} (${x})`
			// 	} else {
			// 		convertedErrors[x] = error[x].message
			// 	}
			// })
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
