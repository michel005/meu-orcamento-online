import { Entity } from '../context/DatabaseContext'
import { InputImageValue } from '../components/InputImage'

export type ProductPriceType = {
	condition?: string
	value: number
}

export type ProductType = Entity & {
	picture?: InputImageValue
	name?: string
	group?: string
	subGroup?: string
	description?: string
	observation?: string
	prices?: ProductPriceType[]
}
