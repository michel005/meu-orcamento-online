export type MessageType = {
	header: string
	content?: any
	type?: 'confirm' | 'question'
	confirm?: () => void
}

export interface CreateUser extends UserType {
	agree_terms?: boolean
}

export type UserType = {
	picture: string
	full_name: string
	user_name: string
	email: string
	birthday?: string
	phone?: string
	password: string
}

export type ChangePasswordType = {
	old_password: string
	new_password: string
	new_password_confirm: string
}

export type CustomerType = {
	_id?: string
	created?: string
	updated?: string
	picture?: string
	name?: string
	email?: string
	birthday?: string
	phone?: string
	person_type?: 'PF' | 'PJ'
	document_type?: 'CPF' | 'CNPJ' | 'RG'
	document_number?: string
	active?: boolean
}
