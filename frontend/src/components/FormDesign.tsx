import React, { HTMLProps } from 'react'
import style from './FormDesign.module.scss'

export type FormDesignType = HTMLProps<HTMLDivElement>

export const FormDesign = ({ children }: FormDesignType) => {
	return <div className={style.formDesign}>{children}</div>
}
