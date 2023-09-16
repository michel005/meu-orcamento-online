import React, { useEffect, useRef, useState } from 'react'
import style from './Field.module.scss'
import { Label } from '../Label.style'
import { DateInputType } from './DateInput.type'
import { DateUtils } from '../../utils/DateUtils'
import { Button } from '../button/Button'
import { DivRow } from '../DivRow'

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
	const [focused, setFocused] = useState(false)
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
		<div
			className={style.field}
			data-loading={loading}
			data-error={!!error}
			data-disabled={disabled}
			data-focus={focused}
		>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			<div className={style.inputArea}>
				<div className={style.emptyIcon} />
				<div style={{ width: '100%' }}>
					<input
						ref={ref}
						disabled={disabled}
						id={randomId}
						type="date"
						value={internalValue || ''}
						onChange={(e) => {
							setInternalValue(e.target.value)
						}}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						placeholder={placeholder}
					/>
				</div>
				<div className={style.rightIcon}>
					<DivRow style={{ gap: '14px', paddingInline: '14px' }}>
						{value && (
							<Button
								leftIcon="close"
								variation="ghost"
								style={{ paddingInline: 0 }}
								onClick={() => {
									onChange(null)
								}}
							/>
						)}
						<Button
							leftIcon="calendar_month"
							variation="ghost"
							style={{ paddingInline: 0 }}
							onClick={() => {
								ref.current.showPicker()
							}}
						/>
					</DivRow>
				</div>
			</div>
			{error && <span className={style.error}>{error}</span>}
		</div>
	)
}
