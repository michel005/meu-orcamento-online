import React from 'react'
import { ToggleType } from './Toggle.type'
import { ToggleStyle } from './Toggle.style'

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
					<label
						onClick={() => {
							onChange(!value)
						}}
					>
						{label}
					</label>
				)}
			</section>
			{error && <span>{error}</span>}
		</ToggleStyle>
	)
}
