import React, { useState } from 'react'
import { TextType } from './Text.type'
import { Label } from '../Label.style'
import style from './Field.module.scss'

export const Text = ({
	error,
	label,
	onChange,
	placeholder,
	value,
	disabled,
	loading,
	textArea,
	leftSpace,
	rightSpace,
}: TextType) => {
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
				{leftSpace ? (
					<div className={style.leftIcon}>{leftSpace}</div>
				) : (
					<div className={style.emptyIcon} />
				)}
				<div style={{ width: '100%' }}>
					{textArea ? (
						<textarea
							disabled={disabled}
							id={randomId}
							value={value || ''}
							onChange={(e) => {
								onChange(e.target.value)
							}}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
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
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							placeholder={placeholder}
						/>
					)}
				</div>
				{rightSpace ? (
					<div className={style.rightIcon}>{rightSpace}</div>
				) : (
					<div className={style.emptyIcon} />
				)}
			</div>
			{error && <span className={style.error}>{error}</span>}
		</div>
	)
}
