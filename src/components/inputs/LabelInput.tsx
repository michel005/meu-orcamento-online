import { Field } from '../Field'
import style from './LabelInput.module.scss'
import React, { useState } from 'react'
import { Icon } from '../Icon'

export type LabelInputType = {
	field: string
	label: string
	info?: string
	error?: string
	value: any | null
	onChange: any
	leftSide?: any
	rightSide?: any
	disabled?: boolean
	valueType?: 'string' | 'list'
}

export const LabelInput = ({
	field,
	info,
	error,
	leftSide,
	rightSide,
	label,
	value,
	onChange,
	disabled,
	valueType = 'list',
}: LabelInputType) => {
	const [currentValue, setCurrentValue] = useState<string>()

	return (
		<Field
			className={style.labelInput}
			field={field}
			label={label}
			info={info}
			leftSide={leftSide}
			rightSide={rightSide}
			disabled={disabled}
			error={error}
			input={(setFocus, id) => (
				<div className={style.input}>
					{valueType === 'list' &&
						(value || []).map((item: string) => {
							return (
								<span key={item}>
									{item}
									{!disabled && (
										<Icon
											icon="close"
											onClick={() => {
												value.splice(value.indexOf(item), 1)
												onChange((values: string[]) => {
													values.splice(values.indexOf(item), 1)
													return [...values]
												})
											}}
										/>
									)}
								</span>
							)
						})}
					{valueType === 'string' &&
						(value || '').trim().length > 0 &&
						(value || '').split(';').map((item: string) => {
							return (
								<span key={item}>
									{item}
									{!disabled && (
										<Icon
											icon="close"
											onClick={() => {
												const splitValues = value.split(';')
												splitValues.splice(splitValues.indexOf(item), 1)
												onChange(splitValues.join(';'))
											}}
										/>
									)}
								</span>
							)
						})}
					<input
						id={id}
						value={currentValue || ''}
						onChange={(x) => {
							setCurrentValue(x.target.value)
						}}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						disabled={disabled}
						onKeyUp={(x) => {
							if (valueType === 'list') {
								if (
									x.key === 'Enter' &&
									currentValue.trim() !== '' &&
									!value.includes(currentValue)
								) {
									onChange([...value, currentValue])
									setCurrentValue('')
								}
							} else if (valueType === 'string') {
								if (
									x.key === 'Enter' &&
									currentValue.trim() !== '' &&
									!(value || '').split(';').includes(currentValue)
								) {
									onChange(
										(value || '') === ''
											? currentValue
											: value + ';' + currentValue
									)
									setCurrentValue('')
								}
							}
						}}
						placeholder="Informar label"
					/>
				</div>
			)}
		/>
	)
}
