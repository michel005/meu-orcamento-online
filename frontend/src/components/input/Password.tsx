import React, { useState } from 'react'
import style from './Field.module.scss'
import { TextType } from './Text.type'
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
	const [focused, setFocused] = useState(false)

	return (
		<div className={style.field} data-loading={loading} data-focus={focused}>
			{label && <Label htmlFor={randomId}>{label}</Label>}
			<div className={style.inputArea}>
				<div className={style.emptyIcon} />
				<div style={{ width: '100%' }}>
					<input
						disabled={disabled}
						id={randomId}
						type="password"
						value={value || ''}
						onChange={(e) => {
							onChange(e.target.value)
						}}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						placeholder={placeholder}
					/>
				</div>
				<div className={style.emptyIcon} />
			</div>
			{error && <span className={style.error}>{error}</span>}
		</div>
	)
}
