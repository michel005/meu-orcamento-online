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
	const [expand, setExpand] = useState(false)

	return (
		<>
			<div
				{...props}
				title={name}
				onClick={onClick}
				className={`${style.userPicture} ${className}`}
				style={{ '--size': size, ...props.style } as CSSProperties}
				data-format={type}
				data-have-onclick={!!onClick}
				data-full-width={fullWidth}
				data-picture-component
			>
				{picture && !fallbackImage ? (
					<img
						src={picture}
						onError={(e) => {
							setFallbackImage(true)
						}}
						onDoubleClick={() => {
							setExpand(true)
						}}
						loading="lazy"
						data-picture
					/>
				) : (
					<>
						{placeholder ? (
							<div
								data-picture
								className={`${style.initialLetters} ${style.placeholder}`}
							>
								{placeholder}
							</div>
						) : (
							<div data-picture className={style.initialLetters}>
								{StringUtils.initialLetters(name).toUpperCase()}
							</div>
						)}
					</>
				)}
			</div>
			{!fallbackImage && expand && (
				<div
					className={style.preview}
					onClick={() => {
						setExpand(false)
					}}
				>
					<img
						src={picture}
						onDoubleClick={() => {
							setExpand(false)
						}}
						loading="lazy"
					/>
				</div>
			)}
		</>
	)
}
