export type GoalStatusType = 'OPEN' | 'IN_PROGRESS' | 'CANCELED' | 'DONE'

export type GoalType = {
	id: string | null
	name: string
	description: string
	status: GoalStatusType
	targetValue: number
	targetDate: String
}
