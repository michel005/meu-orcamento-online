import { MovementType } from '../types/MovementType'
import { DateUtils } from './DateUtils'

export class DashboardUtils {
	movements: MovementType[] = []
	balanceByDay: number[] = []

	constructor(movements: MovementType[]) {
		this.movements = movements

		const sortedMovements = movements.sort((x, y) => {
			if (DateUtils.stringToDate(x.date || '') > DateUtils.stringToDate(y.date || ''))
				return 1
			if (DateUtils.stringToDate(x.date || '') < DateUtils.stringToDate(y.date || ''))
				return -1
			return 0
		})

		var balance = sortedMovements
			.filter(
				(x) =>
					DateUtils.stringToDate(x.date || '') <=
					new Date(new Date().getFullYear(), new Date().getMonth(), 0)
			)
			.reduce((x, y) => x + y.value, 0)

		let day = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		let month = new Date().getMonth()
		const greaterThen = sortedMovements.filter(
			(x) =>
				DateUtils.stringToDate(x.date || '') >=
				new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		)

		while (day.getMonth() === month) {
			balance += greaterThen
				.filter((x) => x.date === DateUtils.dateToString(day))
				.reduce((x, y) => x + y.value, 0)
			this.balanceByDay.push(balance)
			day.setDate(day.getDate() + 1)
		}
	}
}
