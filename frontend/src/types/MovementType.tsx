import { GoalType } from './GoalType'
import { Template } from '../context/DatabaseContext'
import { AccountType } from './AccountType'

export type MovementType = {
	id?: string | null
	date?: string | null
	description?: string
	account?: AccountType | null
	template?: Template | null
	goal?: GoalType | null
	value: number
	approved?: boolean | null
	status?: 'late' | 'pendent' | 'approved' | 'today'
}
