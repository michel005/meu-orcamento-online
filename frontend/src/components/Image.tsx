import { InputImageValue } from './InputImage'
import React, { HTMLAttributes } from 'react'
import style from './Image.module.scss'
import { CSSProperties } from 'styled-components'

export const Image = ({
	identifier,
	base64,
	position,
	size = '36px',
	...props
}: InputImageValue &
	HTMLAttributes<HTMLImageElement> & {
		size?: string
	}) => {
	return (
		<img
			{...props}
			className={style.image}
			style={
				{
					backgroundColor: base64 ? '' : '#ccc',
					'--position-x': `${(position.x || 0) * -1}%`,
					'--position-y': `${(position.y || 0) * -1}%`,
					'--size': `${size}`,
				} as CSSProperties
			}
			src={base64 || ''}
			alt={identifier?.toString()}
		/>
	)
}
