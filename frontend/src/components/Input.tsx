import React, { HTMLAttributes, TextareaHTMLAttributes, useState } from 'react'
import { Button, ButtonType } from './Button'
import style from './Input.module.scss'
import styleButton from './Button.module.scss'

interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
	disabled?: boolean | undefined
	max?: number | string | undefined
	min?: number | string | undefined
	placeholder?: string | undefined
	readOnly?: boolean | undefined
	step?: number | string | undefined
	accept?: string | undefined
	value?: any | undefined
}

export type InputType = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	leftButton?: ButtonType | null
	rightButton?: ButtonType | null
	onChange?: (value: string | Date | null) => void
	textArea?: boolean
	sidebarMode?: boolean
}

export const Input = ({
	label,
	leftButton = null,
	rightButton = null,
	onChange = () => null,
	textArea = false,
	value,
	type,
	...props
}: InputType & {
	type?: string
}) => {
	const [focus, setFocus] = useState(false)

	return (
		<div
			className={style.input}
			data-type={type}
			data-focus={focus}
			data-value={value}
			data-has-value={!!value && value !== ''}
		>
			{label && <label>{label}</label>}
			<div className={style.inputWithButton} data-text-area={textArea}>
				{leftButton && (
					<Button
						{...leftButton}
						variation={'secondary'}
						className={`${styleButton.button} ${style.leftButton}`}
					/>
				)}
				{textArea ? (
					<textarea
						{...(props as TextareaHTMLAttributes<any>)}
						value={value || ''}
						onBlur={() => {
							setFocus(false)
						}}
						onFocus={() => {
							setFocus(true)
						}}
						onChange={(e: any) => {
							onChange(e.target.value)
						}}
						data-have-left-button={!!leftButton}
						data-have-right-button={!!rightButton}
					/>
				) : (
					<input
						{...props}
						type={type}
						checked={type === 'checkbox' ? value || false : undefined}
						value={value || ''}
						onBlur={(e) => {
							setFocus(false)
							props?.onBlur?.(e)
						}}
						onFocus={(e) => {
							setFocus(true)
							props?.onFocus?.(e)
						}}
						onChange={(e: any) => {
							let x = e.target.value
							if (type === 'date') {
								if (x !== '') {
									x = new Date(e.target.value)
								}
							} else if (type === 'checkbox') {
								x = e.target.checked
							}
							onChange(x)
						}}
						data-have-left-button={!!leftButton}
						data-have-right-button={!!rightButton}
					/>
				)}
				{rightButton && (
					<Button
						{...rightButton}
						variation={'secondary'}
						className={`${styleButton.button} ${style.rightButton}`}
					/>
				)}
			</div>
		</div>
	)
}
