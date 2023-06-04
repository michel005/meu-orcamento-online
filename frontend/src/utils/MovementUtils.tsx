import { Account } from '../context/DatabaseContext'
import { DateUtils } from './DateUtils'
import { MovementType } from '../types/MovementType'
import { GoalType } from '../types/GoalType'

export class MovementUtils {
	movements: MovementType[] = []

	startMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	endMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

	constructor(movements: MovementType[]) {
		this.movements = MovementUtils.status(movements)
	}
	pendentMovements = () => {
		return this.movements
			.filter((movement) => !movement.approved)
			.filter((movement) => DateUtils.stringToDate(movement.date || '') <= this.endMonth)
	}
	balance = () => {
		const data = this.movements.filter(
			(movement) => DateUtils.stringToDate(movement.date || '') <= new Date()
		)
		return {
			current: data.filter((movement) => movement.approved).reduce((x, y) => x + y.value, 0),
			income: data.filter((x) => x.value > 0).reduce((x, y) => x + y.value, 0),
			expense: data.filter((x) => x.value < 0).reduce((x, y) => x + y.value, 0),
			monthBalance: this.movements
				.filter((movement) =>
					DateUtils.between(
						DateUtils.stringToDate(movement.date || ''),
						this.startMonth,
						this.endMonth
					)
				)
				.reduce((x, y) => x + y.value, 0),
		}
	}
	goalBalance = (goal: GoalType) => {
		const data = this.movements.filter(
			(movement) => movement.goal && goal.id === movement.goal.id
		)
		return {
			current: data
				.filter((movement) => DateUtils.stringToDate(movement.date || '') <= new Date())
				.filter((movement) => movement.approved)
				.reduce((x, y) => x + y.value, 0),
			future: data.reduce((x, y) => x + y.value, 0),
		}
	}
	static balance = (movements: MovementType[], account?: Account, date?: string) => {
		return movements
			.filter((movement) => movement.approved)
			.filter((movement) => DateUtils.stringToDate(movement.date || '') <= new Date())
			.filter((movement) => !account || movement?.account?.id === account.id)
			.filter(
				(movement) =>
					!date ||
					DateUtils.stringToDate(movement?.date || '') <= DateUtils.stringToDate(date)
			)
			.reduce((x, y) => x + y.value, 0)
	}
	static futureBalance = (movements: MovementType[], account?: Account, date?: string) => {
		return movements
			.filter((movement) => DateUtils.stringToDate(movement.date || '') <= new Date())
			.filter((movement) => !account || movement?.account?.id === account.id)
			.filter(
				(movement) =>
					!date ||
					DateUtils.stringToDate(movement?.date || '') <= DateUtils.stringToDate(date)
			)
			.reduce((x, y) => x + y.value, 0)
	}

	static status = (movements: MovementType[]) => {
		return movements.map((movement) => {
			if (movement.approved) {
				movement.status = 'approved'
			} else {
				if (
					DateUtils.stringToDate(movement.date || '').getTime() <
					DateUtils.stringToDate(DateUtils.dateToString(new Date())).getTime()
				) {
					movement.status = 'late'
				} else if (
					DateUtils.stringToDate(movement.date || '').getTime() ===
					DateUtils.stringToDate(DateUtils.dateToString(new Date())).getTime()
				) {
					movement.status = 'today'
				} else {
					movement.status = 'pendent'
				}
			}
			return { ...movement }
		})
	}
}
