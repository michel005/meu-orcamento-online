import React, { HTMLAttributes } from 'react'
import style from './Bag.module.scss'

export const Bag = ({
	color = 'white',
	side = 'right',
	fixed = false,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	color?: 'white' | 'red'
	side?: 'left' | 'right'
	fixed?: boolean
}) => {
	return (
		<div
			{...props}
			className={`${style.bag} ${props.className}`}
			data-side={side}
			data-fixed={fixed}
			data-color={color}
		/>
	)
}
