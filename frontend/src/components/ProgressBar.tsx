import React from 'react'
import style from './ProgressBar.module.scss'
import { CSSProperties } from 'styled-components'

export const ProgressBar = ({ progress }: { progress: number }) => {
	return (
		<div className={style.progressBar} style={{ '--value': progress + '%' } as CSSProperties} />
	)
}
