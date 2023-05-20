import React, { ButtonHTMLAttributes } from 'react'
import style from './Button.module.scss'

export type ButtonType = {
	variation?: 'primary' | 'secondary' | 'link'
	leftIcon?: string
	rightIcon?: string
	loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
	leftIcon,
	rightIcon,
	loading = false,
	variation = 'primary',
	type = 'button',
	...props
}: ButtonType) => {
	return (
		<button
			{...props}
			className={`${style.button} ${props.className}`}
			data-loading={loading}
			data-variation={variation}
			data-icon-left={leftIcon || undefined}
			data-icon-right={rightIcon || undefined}
		/>
	)
}
