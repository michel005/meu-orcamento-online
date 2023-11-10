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
}) => {
	const [fallbackImage, setFallbackImage] = useState(null)

	return (
		<div
			title={name}
			onClick={onClick}
			className={`${style.userPicture} ${className}`}
			style={{ '--size': size } as CSSProperties}
			data-format={type}
			data-have-onclick={!!onClick}
		>
			{picture && !fallbackImage ? (
				<img
					src={
						fallbackImage || picture.startsWith('http')
							? `${picture}?randomId=${randomId}`
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
