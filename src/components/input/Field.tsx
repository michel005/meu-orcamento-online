import { TextType } from './Field.type'
import style from './Field.module.scss'
import { Label } from '../Label.style'
import React from 'react'

export const Field = ({ label, error, children }: TextType) => {
	return (
		<div className={style.field} data-error={!!error}>
			{label && <Label>{label}</Label>}
			{children}
			{error && <span className={style.error}>{error}</span>}
		</div>
	)
}
