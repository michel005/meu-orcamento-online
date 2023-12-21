import React, { HTMLProps, useState } from 'react'
import style from './Field.module.scss'

export const Field = ({
	label,
	input,
	leftSide,
	rightSide,
	info,
	error,
	isCheckbox = false,
	disabled,
	className,
	field,
	...props
}: HTMLProps<HTMLDivElement> & {
	label?: string
	input?: (setFocus: any, id: string) => any
	leftSide?: any
	rightSide?: any
	info?: string
	error?: any
	isCheckbox?: boolean
	disabled?: boolean
	className?: string
	field?: string
}) => {
	const randomId = Math.random().toString()
	const [focus, setFocus] = useState<boolean>(false)

	return (
		<div
			{...props}
			data-field={field}
			className={`${style.field} ${className}`}
			data-checkbox={isCheckbox}
			data-focus={focus}
			data-disabled={disabled ? 'true' : 'false'}
			data-error={!!error}
			data-context="input"
		>
			{label && <label htmlFor={randomId}>{label}</label>}
			{input && (
				<div className={style.inputContent}>
					{leftSide ? (
						<div className={style.leftSide}>{leftSide}</div>
					) : (
						<div className={style.emptySpace} />
					)}
					<div className={style.input}>{input?.(setFocus, randomId)}</div>
					{rightSide ? (
						<div className={style.rightSide}>{rightSide}</div>
					) : (
						<div className={style.emptySpace} />
					)}
				</div>
			)}
			{info && <small>{info}</small>}
			{error && <small className={style.error}>{error}</small>}
		</div>
	)
}
