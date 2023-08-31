import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../Label.style'
import { DateInputType } from './DateInput.type'
import { DateInputStyle } from './DateInput.style'
import { DateUtils } from '../../utils/DateUtils'

export const DateInput = ({
	error,
	label,
	onChange,
	placeholder,
	value,
	disabled,
	loading,
}: DateInputType) => {
	const randomId = Math.random().toString()
	const ref = useRef<any>()
	const [internalValue, setInternalValue] = useState<string | undefined | null>(
		value ? DateUtils.stringToInputDate(value) : null
	)

	useEffect(() => {
		if (internalValue !== value) {
			if (internalValue) {
				onChange(DateUtils.inputDateToString(internalValue))
			} else {
				onChange(null)
			}
		}
	}, [internalValue])

	useEffect(() => {
		setInternalValue(value ? DateUtils.stringToInputDate(value) : null)
	}, [value])

	return (
		<DateInputStyle data-loading={loading} data-error={!!error} data-disabled={disabled}>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			<div>
				<input
					ref={ref}
					disabled={disabled}
					id={randomId}
					type="date"
					value={internalValue || ''}
					onChange={(e) => {
						setInternalValue(e.target.value)
					}}
					placeholder={placeholder}
				/>
				<button
					onClick={() => {
						ref.current.showPicker()
					}}
				>
					Selecionar
				</button>
			</div>
			{error && <span>{error}</span>}
		</DateInputStyle>
	)
}
