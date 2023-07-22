import React, { HTMLProps } from 'react'
import style from './FormDesign.module.scss'

export type FormDesignType = HTMLProps<HTMLDivElement>

export const FormDesign = ({ children }: FormDesignType) => {
	return <div className={style.formDesign}>{children}</div>
}

export const GroupWithLabel = ({
	label,
	description,
	...props
}: HTMLProps<HTMLDivElement> & { label: string; description?: string }) => {
	return (
		<div {...props} className={`${props.className} ${style.groupWithLabel}`}>
			<div className={style.left}>
				<label>{label}</label>
				{description && <p>{description}</p>}
			</div>
			<div className={style.right}>{props.children}</div>
		</div>
	)
}
