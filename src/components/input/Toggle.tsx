import React from 'react'
import { ToggleType } from './Toggle.type'
import { ToggleStyle } from './Toggle.style'
import { Label } from '../Label.style'

export const Toggle = ({ error, label, onChange, value, disabled, loading }: ToggleType) => {
	return (
		<ToggleStyle
			data-loading={loading}
			data-disabled={disabled}
			data-error={!!error}
			data-value={value}
		>
			<section>
				<div
					onClick={() => {
						onChange(!value)
					}}
				/>
				{label && (
					<Label
						onClick={() => {
							onChange(!value)
						}}
					>
						{label}
					</Label>
				)}
			</section>
			{error && <span>{error}</span>}
		</ToggleStyle>
	)
}
