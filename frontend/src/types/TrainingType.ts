import { Entity } from '../context/DatabaseContext'

export interface TrainingType extends Entity {
	name: string
	expirationDate: string
	description?: string
}
