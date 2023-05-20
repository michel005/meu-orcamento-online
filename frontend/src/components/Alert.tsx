import React from 'react'
import style from './Alert.module.scss'

export type AlertType = {
	children: any
	icon?: string | null
	variation?: 'primary' | 'secondary' | 'gray'
	orientation?: 'vertical' | 'horizontal'
}

export const Alert = ({
	children,
	icon,
	variation = 'primary',
	orientation = 'horizontal',
}: AlertType) => {
	return (
		<div className={style.alert} data-variation={variation} data-orientation={orientation}>
			<div className={style.icon} data-icon={icon} />
			<span>{children}</span>
		</div>
	)
}
