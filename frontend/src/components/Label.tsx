import React from 'react'
import style from './Label.module.scss'

export type LabelType = {
	children?: any | undefined
	icon?: string | null | undefined
	variation?: 'default' | 'white' | 'red'
	rounded?: 'no' | 'less' | 'full'
}

export const Label = ({ children, icon, variation = 'default', rounded = 'less' }: LabelType) => {
	return (
		<span
			data-variation={variation}
			data-rounded={rounded}
			data-icon={icon}
			className={style.label}
		>
			{children}
		</span>
	)
}
