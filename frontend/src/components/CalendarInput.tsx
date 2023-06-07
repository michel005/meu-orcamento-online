import React, { useMemo, useState } from 'react'
import style from './CalendarInput.module.scss'
import { Calendar, CalendarType } from './Calendar'
import { Button } from './Button'
import { DateUtils } from '../utils/DateUtils'

export type CalendarInput = CalendarType & {
	label?: string
	variation?: 'primary' | 'secondary' | 'sidebar'
	sidebarMode?: boolean
}

export const CalendarInput = ({
	label,
	variation = 'primary',
	sidebarMode = false,
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

	const id = useMemo(() => `calendar_${Math.random().toString()}`, [])

	return (
		<div
			className={style.calendarInput}
			data-show={showCalendar}
			data-sidebar-mode={sidebarMode}
			data-variation={variation}
		>
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
				<div
					className={style.calendar}
					onClick={(e: any) => {
						if (e.target.className === style.calendar) {
							setShowCalendar(false)
						}
					}}
				>
					<Calendar
						id={id}
						value={value}
						monthYear={value?.start ? DateUtils.stringToDate(value?.start) : null}
						range={range}
						onChange={(val: any) => {
							if (!range) {
								setShowCalendar(false)
							} else {
								if (val?.start && val?.end) {
									setShowCalendar(false)
								}
							}
							onChange?.(val)
						}}
					/>
				</div>
			)}
		</div>
	)
}
