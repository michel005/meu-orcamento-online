import React, { useState } from 'react'
import { Button } from './Button'
import style from './Calendar.module.scss'
import { DateUtils } from '../utils/DateUtils'

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
	id?: string
	value?: any | null
	monthYear?: Date | null
	range?: boolean
	onChange?: (value: any | null) => void
}

export const Calendar = ({
	id = Math.random().toString(),
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
		if (temp.getDay() !== 6) {
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
					leftIcon="chevron_left"
					onClick={() => {
						setCurrentDate((x) => {
							x.setMonth(x.getMonth() - 1)
							return new Date(x)
						})
					}}
				/>
				<span>
					{(currentDate.getMonth() + 1).toString().padStart(2, '0')} /{' '}
					{currentDate.getFullYear()}
				</span>
				<Button
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
						return <Button key={weekDay}>{WEEKDAYS[weekDay].substring(0, 3)}</Button>
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
			<div className={style.links}>
				{value && (
					<Button leftIcon="clear" variation="link" onClick={() => onChange(null)}>
						Limpar Seleção
					</Button>
				)}
				{value && (
					<Button
						leftIcon="calendar_month"
						variation="link"
						onClick={() => {
							if (range) {
								const start = value?.start
									? DateUtils.stringToDate(value?.start)
									: null
								if (start) {
									setCurrentDate(
										new Date(start.getFullYear(), start.getMonth(), 1)
									)
								}
							} else {
								const v = value ? DateUtils.stringToDate(value) : null
								if (v) {
									setCurrentDate(new Date(v.getFullYear(), v.getMonth(), 1))
								}
							}
						}}
					>
						Seleção atual
					</Button>
				)}
				<Button
					leftIcon="calendar_month"
					variation="link"
					onClick={() => {
						setCurrentDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
					}}
				>
					Mês atual
				</Button>
			</div>
		</div>
	)
}
