import React from 'react'
import style from './ButtonGroup.module.scss'
import { ButtonGroupType } from './ButtonGroup.type'

export const ButtonGroup = ({ children, align = 'left', className }: ButtonGroupType) => {
	return (
		<div className={`${style.buttonGroup} ${className}`} data-align={align}>
			{children}
		</div>
	)
}
