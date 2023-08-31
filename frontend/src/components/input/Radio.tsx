import React from 'react'
import { RadioType } from './Radio.type'
import { RadioStyle } from './Radio.style'
import { Label } from '../Label.style'

export const Radio = ({
	error,
	label,
	onChange,
	value,
	definedValue,
	disabled,
	loading,
}: RadioType) => {
	return (
		<RadioStyle
			data-loading={loading}
			data-error={!!error}
			data-disabled={disabled}
			data-value={value === definedValue}
		>
			<section>
				<div
					onClick={() => {
						if (!disabled) {
							onChange(value === definedValue ? null : definedValue)
						}
					}}
				/>
				{label && (
					<Label
						onClick={() => {
							if (!disabled) {
								onChange(value === definedValue ? null : definedValue)
							}
						}}
					>
						{label}
					</Label>
				)}
			</section>
			{error && <span>{error}</span>}
		</RadioStyle>
	)
}
