import { AddressType } from './AddressType'
import { InputImageValue } from '../components/InputImage'

export type CustomerType = {
	id?: string
	fullName?: string
	picture?: InputImageValue
	type: 'PF' | 'PJ'
	cpfCnpj?: string
	birthday?: string
	addresses?: AddressType[]
	email?: string
}
