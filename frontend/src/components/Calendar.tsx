import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import { DateUtils } from '../utils/DateUtils'
import { Select } from './Select'
import { MonthName } from '../constants/Months'
import style from './Calendar.module.scss'

const WEEKDAYS = [
	'Domingo',
	'Segunda-Feira',
	'Terça-Feira',
	'Quarta-Feira',
	'Quinta-Feira',
	'Sexta-Feira',
	'Sábado',
]

export type CalendarType = {
	value?: any | null
	monthYear?: Date | null
	range?: boolean
	onChange?: (value: any | null) => void
}

export const Calendar = ({
	value,
	monthYear = null,
	range = false,
	onChange = () => null,
}: CalendarType) => {
	const [currentDate, setCurrentDate] = useState<Date>(
		!!monthYear
			? new Date(monthYear.getFullYear(), monthYear.getMonth(), 1)
			: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	)

	const discoverFirstDay = (date: Date) => {
		let temp = new Date(date.getFullYear(), date.getMonth(), 1)
		if (temp.getDay() !== 0) {
			while (temp.getDay() > 0) {
				temp.setDate(temp.getDate() - 1)
				temp = new Date(temp)
			}
		}
		return temp
	}

	const getSelectedDay = (tmp: any) => {
		if (range) {
			if (value?.start && value?.end) {
				return DateUtils.between(
					tmp,
					DateUtils.stringToDate(value.start),
					DateUtils.stringToDate(value.end)
				)
			}
			if (value?.start) {
				return DateUtils.dateToString(tmp) === value.start
			}
		} else {
			return DateUtils.dateToString(tmp) === value
		}
		return false
	}

	const firstDay = discoverFirstDay(currentDate)
	const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

	return (
		<div className={style.calendar}>
			<div className={style.buttons}>
				<Button
					className={style.backButton}
					leftIcon="chevron_left"
					onClick={() => {
						setCurrentDate((x) => {
							x.setMonth(x.getMonth() - 1)
							return new Date(x)
						})
					}}
				/>
				<Button className={style.monthYear}>
					{MonthName[currentDate.getMonth()]} / {currentDate.getFullYear()}
				</Button>
				<Button
					className={style.nextButton}
					leftIcon="chevron_right"
					onClick={() => {
						setCurrentDate((x) => {
							x.setMonth(x.getMonth() + 1)
							return new Date(x)
						})
					}}
				/>
			</div>
			<div className={style.content}>
				<div className={style.weekDays}>
					{Object.keys(WEEKDAYS).map((weekDay: any) => {
						return <Button key={weekDay}>{WEEKDAYS[weekDay].substring(0, 1)}</Button>
					})}
				</div>
				<div className={style.days}>
					{new Array(42).fill(null).map((_, dayIndex) => {
						const tmp = new Date(
							firstDay.getFullYear(),
							firstDay.getMonth(),
							firstDay.getDate() + dayIndex
						)
						return (
							<Button
								key={DateUtils.dateToString(tmp)}
								data-current-day={tmp.toString() === today.toString()}
								data-selected-day={getSelectedDay(tmp)}
								data-current-month={tmp.getMonth() === currentDate.getMonth()}
								className={style.day}
								disabled={tmp.getMonth() !== currentDate.getMonth()}
								onClick={() => {
									let x = value
									let result
									if (range) {
										if (!x) {
											x = {}
										}
										if (!x.start && !x.end) {
											x.start = DateUtils.dateToString(tmp)
										} else if (x.start && !x.end) {
											x.end = DateUtils.dateToString(tmp)
										} else if (x.start && x.end) {
											x = null
										}

										if (x && x.start && x.end) {
											if (
												DateUtils.stringToDate(x.start).getTime() >
												DateUtils.stringToDate(x.end).getTime()
											) {
												x = {
													start: x.end,
													end: x.start,
												}
											}
										}
										result = x ? { ...x } : null
									} else {
										result = DateUtils.dateToString(tmp)
									}
									onChange(result)
								}}
							>
								{tmp.getDate()}
							</Button>
						)
					})}
				</div>
			</div>
		</div>
	)
}
