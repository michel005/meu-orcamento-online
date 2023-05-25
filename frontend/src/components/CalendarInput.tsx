import React, { useState } from 'react'
import style from './CalendarInput.module.scss'
import { Calendar, CalendarType } from './Calendar'
import { Button } from './Button'
import { DateUtils } from '../utils/DateUtils'

export type CalendarInput = CalendarType & {
	label?: string
	variation?: 'primary' | 'secondary'
}

export const CalendarInput = ({
	label,
	variation = 'primary',
	value,
	range,
	onChange,
}: CalendarInput) => {
	const [showCalendar, setShowCalendar] = useState(false)

	const getFormattedValue = () => {
		if (!value) {
			return 'Sem data'
		}
		if (value?.start && value?.end) {
			if (value.start === value.end) {
				return value.start
			}
			return `${value.start} - ${value.end}`
		}
		if (value?.start) {
			return value.start
		}
		return value
	}

	return (
		<div className={style.calendarInput} data-show={showCalendar}>
			{label && <label>{label}</label>}
			<Button
				variation={variation}
				onClick={() => {
					setShowCalendar((x) => !x)
				}}
				leftIcon="calendar_month"
			>
				{getFormattedValue()}
			</Button>
			{showCalendar && (
				<div className={style.calendar}>
					<Calendar
						value={value}
						range={range}
						onChange={(value: any) => {
							if (!range) {
								setShowCalendar(false)
							} else {
								if (value?.start && value?.end) {
									setShowCalendar(false)
								}
							}
							if (onChange) {
								onChange(value)
							}
						}}
					/>
				</div>
			)}
		</div>
	)
}
