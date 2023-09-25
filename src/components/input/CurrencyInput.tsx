import React, { useState } from 'react'
import style from './Field.module.scss'
import { Label } from '../Label.style'
import { NumberType } from './Number.type'
import { Button } from '../button/Button'

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
				<div className={style.leftIcon}>
					<Button variation="ghost" disabled={true} style={{ opacity: 1 }}>
						R$
					</Button>
				</div>
				<div style={{ width: '100%' }}>
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
