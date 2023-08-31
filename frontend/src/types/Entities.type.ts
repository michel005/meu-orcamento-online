export type OrderItemType = {
	productId: number
	quantity: number
	price: number
}

export const OrderStatus: any = {
	available: 'Disponível',
	soldOut: 'Esgotado',
	onSale: 'Em Promoção',
	preOrder: 'Pré-venda',
	reserved: 'Reservado',
	unavailable: 'Indisponível',
}

export type OrderType = {
	id: number
	userId: number
	items: OrderItemType[]
	status?: string | null
}

export type Supplier = {
	id?: number
	picture?: {
		name: string
		base64: string
	}
	name?: string
	email?: string
	phone?: string
	address?: AddressType
	active?: boolean
}

export type AddressType = {
	street?: string
	number?: string
	complement?: string
	zipCode?: string
	city?: string
	state?: string
	country?: string
}

export type ProductType = {
	id?: number
	picture?: {
		name: string
		base64: string
	}
	name?: string
	description?: string
	price?: number
	categories?: string
	supplierId?: number
}
