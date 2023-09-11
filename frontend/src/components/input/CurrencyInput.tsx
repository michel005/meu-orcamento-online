import React from 'react'
import { TextStyle } from './Text.style'
import { Label } from '../Label.style'
import { NumberType } from './Number.type'

export const CurrencyInput = ({
	error,
	label,
	onChange,
	placeholder,
	value,
	disabled,
	loading,
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
				step={0.01}
				value={value ? value / 100 : ''}
				onChange={(e) => {
					try {
						onChange(parseFloat(e.target.value) * 100)
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
