import React, { HTMLProps } from 'react'
import style from './Card.module.scss'

export const Card = ({ ...props }: HTMLProps<HTMLDivElement>) => {
	return <div {...props} className={`${style.card} ${props.className}`} />
}
