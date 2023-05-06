import { ErrorCode } from '@react-oauth/google'

export type GoogleUser = {
	access_token: string
	expires_in: number
	hd?: string
	prompt: string
	token_type: string
	scope: string
	state?: string
	error?: ErrorCode
	error_description?: string
	error_uri?: string
	id: number
	name: string
	given_name: string
	family_name: string
	email: string
	picture: string
	locale: string
}
