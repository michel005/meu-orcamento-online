import React from 'react'
import { TextType } from './Text.type'
import { TextStyle } from './Text.style'
import { Label } from '../Label.style'

export const Text = ({
	error,
	label,
	onChange,
	placeholder,
	value,
	disabled,
	loading,
	textArea,
}: TextType) => {
	const randomId = Math.random().toString()

	return (
		<TextStyle data-loading={loading} data-error={!!error}>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			{textArea ? (
				<textarea
					disabled={disabled}
					id={randomId}
					value={value || ''}
					onChange={(e) => {
						onChange(e.target.value)
					}}
					placeholder={placeholder}
				/>
			) : (
				<input
					disabled={disabled}
					id={randomId}
					type="text"
					value={value || ''}
					onChange={(e) => {
						onChange(e.target.value)
					}}
					placeholder={placeholder}
				/>
			)}
			{error && <span>{error}</span>}
		</TextStyle>
	)
}
