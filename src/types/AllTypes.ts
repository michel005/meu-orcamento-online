export type MessageType = {
	header: string
	content?: any
	type?: 'confirm' | 'question'
	confirm?: () => void
}

export type Picture = {
	value?: string | File
	type?: 'url' | 'file'
}

export interface CreateUser extends UserType {
	agree_terms?: boolean
}

export type UserType = {
	picture: Picture
	full_name: string
	user_name: string
	email: string
	birthday?: string
	phone?: string
	address?: AddressType | null
	password: string
}

export type ChangePasswordType = {
	old_password: string
	new_password: string
	new_password_confirm: string
}

export type AddressType = {
	zip_code?: string
	street_number?: string
	street_name?: string
	complement?: string
	city?: string
	state?: string
	country?: string
}

export type CustomerType = {
	_id?: string
	created?: string
	updated?: string
	picture?: Picture
	full_name?: string
	email?: string
	birthday?: string
	phone?: string
	person_type?: 'PF' | 'PJ'
	document_type?: 'CPF' | 'CNPJ' | 'RG'
	document_number?: string
	address?: AddressType | null
	active?: boolean
	favorite?: boolean
}

export type ProductType = {
	_id?: string
	seller_id?: string
	seller?: CustomerType
	created?: string
	updated?: string
	picture?: Picture
	code?: string
	title?: string
	description?: string
	categories?: string
	price?: number
	status?: string
	product_waiting_list?: WaitingListType[] | null
}

export type WaitingListType = {
	id?: string
	product_id?: string | null
	customer_id?: string | null
	created?: string | null
	product?: ProductType | null
	customer?: CustomerType | null
}
