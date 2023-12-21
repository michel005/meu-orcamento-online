import React, { HTMLProps } from 'react'
import style from './ButtonGroup.module.scss'

export const ButtonGroup = ({ ...props }: HTMLProps<HTMLDivElement>) => {
	return (
		<div
			{...props}
			data-content="button-group"
			className={`${style.buttonGroup} ${props.className}`}
		/>
	)
}
