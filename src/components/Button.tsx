import React, { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from 'react'
import style from './Button.module.scss'
import { GoogleIcons } from '../types/GoogleIcons'

export interface ButtonType
	extends DetailedHTMLProps<any, ButtonHTMLAttributes<HTMLButtonElement>> {
	leftIcon?: GoogleIcons
	rightIcon?: GoogleIcons
	variation?: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({ ...props }: ButtonType) => {
	return <GenericButton {...props} variation="primary" />
}

export const ButtonSecondary = ({ ...props }: ButtonType) => {
	return <GenericButton {...props} variation="secondary" />
}

export const ButtonGhost = ({ ...props }: ButtonType) => {
	return <GenericButton {...props} variation="ghost" />
}

const GenericButton = ({ leftIcon, rightIcon, variation, ...props }: ButtonType) => {
	return (
		<button
			{...props}
			className={`${props.className} ${style.button}`}
			data-variation={variation}
		>
			{leftIcon && <div className={style.icon}>{leftIcon}</div>}
			{props.children && <span>{props.children}</span>}
			{rightIcon && <div className={style.icon}>{rightIcon}</div>}
		</button>
	)
}
