import { ProductType } from './ProductType'
import { CustomerType } from './CustomerType'

export type ProductOutputType = {
	id?: string
	date?: string
	customer?: CustomerType
	items: {
		product?: ProductType
		amount?: number
		price?: number
		finalPrice?: number
	}
	taxes?: number
	finalPrice?: number
}
