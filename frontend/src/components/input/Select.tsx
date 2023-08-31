import React from 'react'
import { Label } from '../Label.style'
import { SelectType } from './Select.type'
import { SelectStyle } from './Select.style'

export const Select = ({
	error,
	label,
	onChange,
	placeholder,
	options,
	idModifier = (x) => x?.id,
	labelModifier = (x) => x?.value,
	valueModifier = (x) => x,
	value,
	disabled,
	loading,
}: SelectType) => {
	const randomId = Math.random().toString()

	return (
		<SelectStyle data-loading={loading} data-error={!!error}>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			<div>
				<select
					disabled={disabled}
					id={randomId}
					value={
						value ? idModifier(options.find((x) => valueModifier(x) === value)) : 'null'
					}
					onChange={(e) => {
						if (e.target.selectedIndex === 0) {
							onChange(null)
						} else {
							onChange(valueModifier(options[e.target.selectedIndex - 1]))
						}
					}}
					placeholder={placeholder}
				>
					<option value={'null'}></option>
					{options.map((option, optionKey) => {
						return (
							<option key={optionKey} value={idModifier(option)}>
								{labelModifier(option)}
							</option>
						)
					})}
				</select>
			</div>
			{error && <span>{error}</span>}
		</SelectStyle>
	)
}
