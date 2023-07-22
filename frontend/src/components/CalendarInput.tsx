import React, { useEffect, useMemo, useState } from 'react'
import style from './CalendarInput.module.scss'
import { Calendar, CalendarType } from './Calendar'
import { Button } from './Button'
import { DateUtils } from '../utils/DateUtils'
import { Input } from './Input'

export type CalendarInput = CalendarType & {
	label?: string
	variation?: 'primary' | 'secondary' | 'sidebar'
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

	const [string, setString] = useState(!!value ? getFormattedValue() : '')

	useEffect(() => {
		setString(!!value ? getFormattedValue() : '')
	}, [value])

	return (
		<div className={style.calendarInput} data-show={showCalendar} data-variation={variation}>
			{label && <label>{label}</label>}
			<Input
				value={string}
				placeholder={!!value ? '' : 'Sem data'}
				disabled={range}
				onChange={setString}
				rightButton={{
					leftIcon: 'calendar_month',
					onClick: () => {
						setShowCalendar((x) => !x)
					},
				}}
				onBlur={() => {
					if (!range) {
						if (string === '') {
							onChange?.(null)
						}
						try {
							const result: string | Date = DateUtils.stringToDate(string)
							if (result.toString() !== 'Invalid Date') {
								onChange?.(string)
							} else {
								setString(!!value ? getFormattedValue() : '')
							}
						} catch (e) {
							setString(!!value ? getFormattedValue() : '')
						}
					}
				}}
			/>
			{showCalendar && (
				<div className={style.calendar}>
					<Calendar
						value={value}
						monthYear={
							range
								? value?.start
									? DateUtils.stringToDate(value?.start)
									: null
								: value
								? DateUtils.stringToDate(value)
								: null
						}
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
