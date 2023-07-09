import { InputImageValue } from '../components/InputImage'

export type CustomerType = {
	birthday?: string
	document?: string
	email?: string
	fullName?: string
	id?: string
	personType?: 'pf' | 'pj'
	profilePicture?: InputImageValue | null
	active?: boolean
}
