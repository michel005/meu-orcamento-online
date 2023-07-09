import React, { HTMLAttributes } from 'react'
import style from './Label.module.scss'

export interface LabelType extends HTMLAttributes<HTMLSpanElement> {
	children?: any | undefined
	icon?: string | null | undefined
	variation?: 'default' | 'white' | 'red' | 'purple'
	rounded?: 'no' | 'less' | 'full'
}

export const Label = ({
	children,
	icon,
	variation = 'default',
	rounded = 'less',
	...props
}: LabelType) => {
	return (
		<span
			{...props}
			data-variation={variation}
			data-rounded={rounded}
			data-icon={icon}
			className={style.label}
		>
			{children}
		</span>
	)
}
