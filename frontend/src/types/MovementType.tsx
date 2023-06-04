import { GoalType } from './GoalType'
import { Account, Template } from '../context/DatabaseContext'

export type MovementType = {
	id?: string | null
	date?: string | null
	description?: string
	account?: Account | null
	template?: Template | null
	goal?: GoalType | null
	value: number
	approved?: boolean | null
	status?: 'late' | 'pendent' | 'approved' | 'today'
}
