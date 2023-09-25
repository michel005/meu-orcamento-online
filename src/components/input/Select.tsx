import React, { useState } from 'react'
import style from './Field.module.scss'
import { Label } from '../Label.style'
import { SelectType } from './Select.type'

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
	const [focused, setFocused] = useState(false)

	return (
		<div
			className={style.field}
			data-loading={loading}
			data-error={!!error}
			data-focus={focused}
		>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			<div className={style.inputArea}>
				<div className={style.emptyIcon} />
				<div style={{ width: '100%' }}>
					<select
						disabled={disabled}
						id={randomId}
						value={
							value
								? idModifier(options.find((x) => valueModifier(x) === value))
								: 'null'
						}
						onChange={(e) => {
							onChange(valueModifier(options[e.target.selectedIndex]))
						}}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						placeholder={placeholder}
					>
						{options.map((option, optionKey) => {
							return (
								<option key={optionKey} value={idModifier(option)}>
									{labelModifier(option)}
								</option>
							)
						})}
					</select>
				</div>
				<div className={style.emptyIcon} />
			</div>
			{error && <span className={style.error}>{error}</span>}
		</div>
	)
}
