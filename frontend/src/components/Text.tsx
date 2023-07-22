import React, { HTMLProps } from 'react'
import style from './Text.module.scss'
import { IconType } from '../types/IconType'

export type TextType = HTMLProps<HTMLDivElement> & {
	leftIcon?: IconType
	rightIcon?: IconType
}

export const Text = ({ leftIcon, rightIcon, ...props }: TextType) => {
	return (
		<div
			{...props}
			className={`${style.text} ${props.className || ''}`}
			data-icon-left={leftIcon}
			data-icon-right={rightIcon}
		/>
	)
}
