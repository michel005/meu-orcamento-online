import React, { CSSProperties } from 'react'
import style from './Button.module.scss'
import { ButtonType } from './Button.type'

export const Button = ({
	leftIcon,
	rightIcon,
	loading,
	variation = 'primary',
	progress,
	...props
}: ButtonType) => {
	return (
		<button
			{...props}
			className={`${style.button} ${props.className}`}
			data-left-icon={leftIcon}
			data-right-icon={rightIcon}
			data-loading={loading}
			data-variation={variation}
		>
			<span>{props.children}</span>
			{(progress || loading) && (
				<div
					style={
						{
							'--progress': `${progress}%`,
						} as CSSProperties
					}
				/>
			)}
		</button>
	)
}
