import { ProductType } from './ProductType'

export type ProductAddCartType = {
	product: ProductType
	selectedPrice: number
	amount: number
	obervation?: string
	toGo: boolean
}
