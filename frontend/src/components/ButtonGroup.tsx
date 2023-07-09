import React from 'react'
import style from './ButtonGroup.module.scss'

export type ButtonGroupType = {
	children: any
	variation?: 'primary' | 'secondary' | 'sidebar'
	sidebarMode?: boolean
	orientation?: 'horizontal' | 'vertical'
}

export const ButtonGroup = ({
	children,
	variation = 'primary',
	orientation = 'horizontal',
	sidebarMode = false,
}: ButtonGroupType) => {
	return (
		<div
			className={`${style.buttonGroup} buttonGroup`}
			data-sidebar-mode={sidebarMode}
			data-variation={variation}
			data-orientation={orientation}
		>
			{children}
		</div>
	)
}
