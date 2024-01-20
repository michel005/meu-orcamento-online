export class SessionUtils {
	static getHeader = () => ({
		headers: {
			authorization: `Baerer ${localStorage.getItem('auth_token')}`,
		},
	})
}
