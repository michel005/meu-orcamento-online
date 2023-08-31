import React from 'react'
import { TextType } from './Text.type'
import { TextStyle } from './Text.style'
import { Label } from '../Label.style'

export const Password = ({
	error,
	label,
	onChange,
	placeholder,
	value,
	disabled,
	loading,
}: TextType) => {
	const randomId = Math.random().toString()

	return (
		<TextStyle data-loading={loading}>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			<input
				disabled={disabled}
				id={randomId}
				type="password"
				value={value || ''}
				onChange={(e) => {
					onChange(e.target.value)
				}}
				placeholder={placeholder}
			/>
			{error && <span>{error}</span>}
		</TextStyle>
	)
}
