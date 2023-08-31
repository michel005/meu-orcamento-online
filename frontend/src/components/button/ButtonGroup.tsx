import React from 'react'
import { ButtonGroupStyle } from './ButtonGroup.style'
import { ButtonGroupType } from './ButtonGroup.type'

export const ButtonGroup = ({ children, align = 'left', className }: ButtonGroupType) => {
	return (
		<ButtonGroupStyle data-align={align} className={className}>
			{children}
		</ButtonGroupStyle>
	)
}
