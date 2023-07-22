import { Entity } from '../context/DatabaseContext'

export interface EatingRecordType extends Entity {
	date: string
	shift?: string
	food?: string
	measureUnit?: {
		id: string
		label: string
	}
	amount?: number
	energy?: number
}
