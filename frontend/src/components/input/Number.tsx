import React from 'react'
import { TextStyle } from './Text.style'
import { Label } from '../Label.style'
import { NumberType } from './Number.type'

export const Number = ({
	error,
	label,
	onChange,
	placeholder,
	value,
	disabled,
	loading,
	step,
}: NumberType) => {
	const randomId = Math.random().toString()

	return (
		<TextStyle data-loading={loading} data-error={!!error}>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			<input
				style={{
					textAlign: 'right',
				}}
				disabled={disabled}
				id={randomId}
				type="number"
				step={step || 1}
				value={value || ''}
				onChange={(e) => {
					try {
						onChange(parseFloat(e.target.value))
					} catch (_) {
						onChange(null)
					}
				}}
				placeholder={placeholder}
			/>
			{error && <span>{error}</span>}
		</TextStyle>
	)
}
