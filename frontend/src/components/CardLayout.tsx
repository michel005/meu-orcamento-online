import React, { HTMLProps } from 'react'
import style from './CardLayout.module.scss'

export const CardLayout = ({ children, ...props }: HTMLProps<HTMLDivElement>) => {
	return (
		<div {...props} className={style.cardLayout}>
			{children}
		</div>
	)
}
