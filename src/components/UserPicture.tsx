import React, { CSSProperties } from 'react'
import style from './UserPicture.module.scss'
import { StringUtils } from '../utils/StringUtils'

export const UserPicture = ({ picture, className = '', type = 'circle', name, size = '50px' }) => {
	return (
		<div
			className={`${style.userPicture} ${className}`}
			style={{ '--size': size } as CSSProperties}
			data-format={type}
		>
			{picture ? (
				<img src={picture} />
			) : (
				<div className={style.initialLetters}>
					{StringUtils.initialLetters(name).toUpperCase()}
				</div>
			)}
		</div>
	)
}
