import React, { CSSProperties, useEffect, useState } from 'react'
import { StringUtils } from '../utils/StringUtils'
import style from './DatabasePicture.module.scss'

export const DatabasePicture = ({
	type,
	id,
	file,
	name,
	size,
	onError,
}: {
	type?: string
	id?: string
	file?: File
	name?: string
	size?: string
	onError?: () => void
}) => {
	const url = `http://localhost:8080/api/picture/${type}/${id}`
	const [picture, setPicture] = useState(
		file ? URL.createObjectURL(file) : type && id ? url : null
	)

	useEffect(() => {
		if (file) {
			setPicture(URL.createObjectURL(file))
		} else {
			setPicture(url)
		}
	}, [file])

	if (!picture) {
		return (
			<div className={style.onlyLetters} style={{ '--size': size } as CSSProperties}>
				{StringUtils.initialLetters(name).toUpperCase()}
			</div>
		)
	}

	return (
		<img
			className={style.picture}
			style={{ '--size': size } as CSSProperties}
			src={picture}
			onError={() => {
				onError?.()
				setPicture(null)
			}}
		/>
	)
}
