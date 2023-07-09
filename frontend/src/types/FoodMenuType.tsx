import { ProductType } from './ProductType'
import { InputImageValue } from '../components/InputImage'

export type ProductsSectionType = {
	type: 'products'
	title: string
	products: ProductType[]
}

export type HeaderSectionType = {
	type: 'header'
	header: string
	subHeader: string
}

export type FoodMenuType = {
	background: string | InputImageValue
	title: string
	sections: (ProductsSectionType | HeaderSectionType)[] | null
}
