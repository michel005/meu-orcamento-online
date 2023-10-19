import React, { CSSProperties } from 'react'
import style from './UserPicture.module.scss'
import { StringUtils } from '../utils/StringUtils'

export const UserPicture = ({
	picture,
	onClick = undefined,
	className = '',
	type = 'circle',
	name = '',
	placeholder = undefined,
	size = '50px',
}) => {
	return (
		<div
			onClick={onClick}
			className={`${style.userPicture} ${className}`}
			style={{ '--size': size } as CSSProperties}
			data-format={type}
			data-have-onclick={!!onClick}
		>
			{picture ? (
				<img src={picture} />
			) : (
				<>
					{placeholder && (
						<div className={`${style.initialLetters} ${style.placeholder}`}>
							{placeholder}
						</div>
					)}
					{!placeholder && (
						<div className={style.initialLetters}>
							{placeholder || StringUtils.initialLetters(name).toUpperCase()}
						</div>
					)}
				</>
			)}
		</div>
	)
}
