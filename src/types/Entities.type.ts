export type Address = {
	streetNumber?: string
	streetName?: string
	complement?: string
	city?: string
	state?: string
	zipCode?: string
	country?: string
}

export type Customer = {
	id?: number
	created?: string
	updated?: string
	picture?: string
	name?: string
	personType?: 'PF' | 'PJ' | null
	documentType?: 'RG' | 'CPF' | 'CNPJ' | null
	documentNumber?: string
	email?: string
	phone?: string
	active?: boolean
	address?: Address
}

export type Service = {
	id?: number
	picture?: string
	name?: string
	description?: string
	amount?: number
	price?: number
}

type BudgetStatus = 'pending' | 'accepted' | 'rejected' | 'completed'

export type Budget = {
	id?: number
	created?: string
	updated?: string
	title?: string
	customerId?: number
	services?: Service[]
	date?: string
	amount?: number
	description?: string
	status?: BudgetStatus
}