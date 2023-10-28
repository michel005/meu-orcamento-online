import React, { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from 'react'
import style from './Button.module.scss'
import { GoogleIconType } from '../types/GoogleIconType'

export interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
	leftIcon?: GoogleIconType
	rightIcon?: GoogleIconType
	leftBag?: any
	rightBag?: any
	variation?: 'primary' | 'secondary' | 'ghost' | 'white'
	variationOverride?: 'primary' | 'secondary' | 'ghost' | 'white'
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

const GenericButton = ({
	leftIcon,
	rightIcon,
	leftBag,
	rightBag,
	variation,
	variationOverride,
	...props
}: ButtonType) => {
	return (
		<button
			{...props}
			title={props.title || (props.children as string)}
			className={`${props.className} ${style.button}`}
			data-variation={variationOverride || variation}
			data-have-bag={!!leftBag || !!rightBag}
		>
			{leftBag !== undefined && <div className={style.bag}>{leftBag}</div>}
			{leftIcon && <div className={style.icon}>{leftIcon}</div>}
			{props.children && <span>{props.children}</span>}
			{rightIcon && <div className={style.icon}>{rightIcon}</div>}
			{rightBag !== undefined && <div className={style.bag}>{rightBag}</div>}
		</button>
	)
}
