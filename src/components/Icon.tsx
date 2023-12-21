import React from 'react'
import styleClass from './Icon.module.scss'
import { GoogleIconType } from '../types/GoogleIconType'
import { SizeType } from '../types/SizeType'

export const Icon = ({
	icon,
	className,
	style,
	size,
}: {
	icon: GoogleIconType
	className?: string
	style?: any
	size?: SizeType
}) => {
	return (
		<i
			className={`${styleClass.icon} ${className}`}
			style={{ ...style, fontSize: size || 'inherit' }}
		>
			{icon}
		</i>
	)
}
