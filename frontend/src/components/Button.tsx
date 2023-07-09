import React, { ButtonHTMLAttributes } from 'react'
import style from './Button.module.scss'
import { IconType } from '../types/IconType'

export type ButtonType = {
	variation?: 'primary' | 'secondary' | 'link' | 'sidebar'
	leftIcon?: IconType | null | undefined
	rightIcon?: IconType | null | undefined
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
			type="button"
			className={`${props.className} ${style.button}`}
			data-loading={loading}
			data-variation={variation}
			data-icon-left={leftIcon || undefined}
			data-icon-right={rightIcon || undefined}
		/>
	)
}
