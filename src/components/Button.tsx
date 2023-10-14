import React, { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from 'react'
import style from './Button.module.scss'
import { GoogleIconType } from '../types/GoogleIconType'

export interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
	leftIcon?: GoogleIconType
	rightIcon?: GoogleIconType
	variation?: 'primary' | 'secondary' | 'ghost' | 'white'
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

export const ButtonWhite = ({ ...props }: ButtonType) => {
	return <GenericButton {...props} variation="white" />
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
