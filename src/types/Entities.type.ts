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
	_id?: string
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
	_id?: string
	created?: string
	updated?: string
	estimatedDate?: string
	title?: string
	customerId?: string
	services?: Service[]
	date?: string
	amount?: number
	description?: string
	status?: BudgetStatus
	history?: {
		date: string
		value: Omit<Omit<Omit<Budget, 'created'>, 'updated'>, 'history'>
	}[]
}
