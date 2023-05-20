import React, { useState } from 'react'
import { Button } from './Button'
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
	range?: boolean
	onChange?: (value: any | null) => void
}

export const Calendar = ({ value, range = false, onChange = () => null }: CalendarType) => {
	const [currentDate, setCurrentDate] = useState<Date>(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
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
						return <Button>{WEEKDAYS[weekDay].substring(0, 3)}</Button>
					})}
				</div>
				<div className={style.days}>
					{new Array(42).fill(null).map((day, dayIndex) => {
						const tmp = new Date(firstDay)
						tmp.setDate(firstDay.getDate() + dayIndex)
						return (
							<Button
								key={dayIndex}
								data-current-day={tmp.toString() === today.toString()}
								data-selected-day={
									value &&
									(range
										? value.start
											? value.end
												? tmp.getTime() >= value.start.getTime() &&
												  tmp.getTime() <= value.end.getTime()
												: tmp.toString() === value.start.toString()
											: tmp.toString() === value.toString()
										: tmp.toString() === value.toString())
								}
								data-current-month={tmp.getMonth() === currentDate.getMonth()}
								className={style.day}
								disabled={tmp.getMonth() !== currentDate.getMonth()}
								onClick={() => {
									onChange((x: any) => {
										if (range) {
											if (!x) {
												x = {}
											}
											if (!x.start && !x.end) {
												x.start = tmp
											} else if (x.start && !x.end) {
												x.end = tmp
											} else if (x.start && x.end) {
												x = null
											}

											if (x && x.start && x.end) {
												if (x.start.getTime() > x.end.getTime()) {
													const start = x.start
													x.start = x.end
													x.end = start
												}
											}
											return x ? { ...x } : null
										} else {
											return new Date(tmp)
										}
									})
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
								setCurrentDate(
									new Date(value.start.getFullYear(), value.start.getMonth(), 1)
								)
							} else {
								setCurrentDate(new Date(value.getFullYear(), value.getMonth(), 1))
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
