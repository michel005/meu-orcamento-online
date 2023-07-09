import React, { useMemo, useState } from 'react'
import style from './CalendarInput.module.scss'
import { Calendar, CalendarType } from './Calendar'
import { Button } from './Button'
import { DateUtils } from '../utils/DateUtils'
import { Input } from './Input'

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

	return (
		<div
			className={style.calendarInput}
			data-show={showCalendar}
			data-sidebar-mode={sidebarMode}
			data-variation={variation}
		>
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
						console.log('Validando')
						try {
							const result: string | Date = DateUtils.stringToDate(string)
							if (result.toString() !== 'Invalid Date') {
								onChange?.(string)
								console.log('Sucesso')
							} else {
								setString(!!value ? getFormattedValue() : '')
								console.log('Erro')
							}
						} catch (e) {
							setString(!!value ? getFormattedValue() : '')
							console.log('Erro')
						}
					}
				}}
			/>
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
