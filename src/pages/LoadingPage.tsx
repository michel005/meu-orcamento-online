import React from 'react'
import style from './LoadingPage.module.scss'

export const LoadingPage = () => {
	return (
		<div className={style.loadingPage}>
			<span className={style.spinner} />
		</div>
	)
}
