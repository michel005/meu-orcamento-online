import React from 'react'
import style from './Icon.module.scss'
import { GoogleIconType } from '../types/GoogleIconType'
import { SizeType } from '../types/SizeType'

export const Icon = ({
	icon,
	className,
	size,
}: {
	icon: GoogleIconType
	className?: string
	size?: SizeType
}) => {
	return (
		<div className={`${style.icon} ${className}`} style={{ fontSize: size || 'inherit' }}>
			{icon}
		</div>
	)
}
