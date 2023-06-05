import { GoalType } from '../types/GoalType'
import { DateUtils } from './DateUtils'

export class GoalUtils {
	static monthsToFinish = (goal: GoalType) => {
		if (!goal.targetDate) {
			return 1
		}
		const target = DateUtils.stringToDate(goal.targetDate)
		let current = new Date()
		let months = 0
		while (current < target) {
			current.setMonth(current.getMonth() + 1)
			months++
		}
		return months
	}
}
