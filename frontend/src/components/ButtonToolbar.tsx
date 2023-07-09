import React, { HTMLAttributes } from 'react'
import style from './ButtonToolbar.module.scss'

export interface ButtonToolbarType extends HTMLAttributes<HTMLDivElement> {
	align?: 'left' | 'center' | 'right'
}

export const ButtonToolbar = ({ align = 'left', ...props }: ButtonToolbarType) => {
	return (
		<div
			{...props}
			data-align={align}
			className={`${style.buttonToolbar} ${props.className}`}
		/>
	)
}
