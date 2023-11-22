import React, { CSSProperties, useState } from 'react'
import style from './UserPicture.module.scss'
import { StringUtils } from '../utils/StringUtils'
import { DateUtils } from '../utils/DateUtils'

export const UserPicture = ({
	picture,
	onClick = undefined,
	className = '',
	type = 'circle',
	name = '',
	placeholder = undefined,
	size = '50px',
	randomId = null,
	fullWidth = false,
	...props
}) => {
	const [fallbackImage, setFallbackImage] = useState(null)

	return (
		<div
			{...props}
			title={name}
			onClick={onClick}
			className={`${style.userPicture} ${className}`}
			style={{ '--size': size, ...props.style } as CSSProperties}
			data-format={type}
			data-have-onclick={!!onClick}
			data-full-width={fullWidth}
		>
			{picture && !fallbackImage ? (
				<img
					src={
						fallbackImage || picture.startsWith('http')
							? picture //`${picture}?randomId=${randomId}`
							: picture
					}
					onError={(e) => {
						setFallbackImage(true)
					}}
					loading="lazy"
				/>
			) : (
				<>
					{placeholder ? (
						<div className={`${style.initialLetters} ${style.placeholder}`}>
							{placeholder}
						</div>
					) : (
						<div className={style.initialLetters}>
							{placeholder || StringUtils.initialLetters(name).toUpperCase()}
						</div>
					)}
				</>
			)}
		</div>
	)
}
