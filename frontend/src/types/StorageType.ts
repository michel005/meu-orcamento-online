import { InputImageValue } from '../components/InputImage'
import { Entity } from '../context/DatabaseContext'

export interface StorageType extends Entity {
	name: string
	description?: string
	localization?: string
	code?: string
	picture?: InputImageValue
}
