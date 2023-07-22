import React, { HTMLProps } from 'react'
import style from './Card.module.scss'
import { Text } from './Text'
import { IconType } from '../types/IconType'
import { Label } from './Label'

export interface CardType extends HTMLProps<HTMLDivElement> {
	header?: any
	icon?: IconType
	label?: any
}

export const Card = ({ children, header, icon, label, ...props }: CardType) => {
	return (
		<div {...props} className={`${style.card} ${props.className}`}>
			{header && (
				<Text leftIcon={icon} className={style.header}>
					{header}
					{label && <div className={style.label}>{label}</div>}
				</Text>
			)}
			<div className={style.allChilds}>{children}</div>
		</div>
	)
}
