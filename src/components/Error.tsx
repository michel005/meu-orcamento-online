import React from 'react'
import style from './Error.module.scss'

export const Error = ({ message, code }: { message: string; code?: string }) => {
	return (
		<div className={style.error}>
			{message} {code && <>({code})</>}
		</div>
	)
}
