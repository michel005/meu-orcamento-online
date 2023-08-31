import React from 'react'
import { ButtonStyle } from './Button.style'
import { ButtonType } from './Button.type'

export const Button = ({
	leftIcon,
	rightIcon,
	loading,
	variation = 'primary',
	...props
}: ButtonType) => {
	return (
		<ButtonStyle
			{...props}
			data-left-icon={leftIcon}
			data-right-icon={rightIcon}
			data-loading={loading}
			data-variation={variation}
		>
			<span>{props.children}</span>
		</ButtonStyle>
	)
}
