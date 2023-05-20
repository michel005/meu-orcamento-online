import React, { useEffect, useMemo, useState } from 'react'
import style from './FormLayout.module.scss'
import { Input, InputType } from '../components/Input'

export type FormLayoutType = {
	header: {
		title: string
		description?: string
	}
	children?: null | ((fields: any) => any)
	footer: any
	footerAlignment?: 'center' | 'left' | 'right'
	fields: (InputType & {
		id: string
	})[]
	value?: any
	onChange: (value: any) => void
	disableAllFields?: boolean
}

export const FormLayout = ({
	children = null,
	header,
	fields,
	footer,
	footerAlignment = 'right',
	value,
	onChange,
	disableAllFields = false,
}: FormLayoutType) => {
	let allInputs = useMemo(() => {
		let all: any = {}
		fields.forEach((field) => {
			all[field.id] = (
				<Input
					key={field.id}
					{...field}
					disabled={disableAllFields || field.disabled}
					value={value[field.id]}
					onChange={(inputValue) => {
						onChange((x: any) => {
							x[field.id] = inputValue
							return { ...x }
						})
					}}
				/>
			)
		})
		return all
	}, [fields])

	return (
		<div className={style.formLayout}>
			<div className={style.header}>
				<h1>{header.title}</h1>
				<p>{header.description}</p>
			</div>
			<div className={style.content}>{children ? children(allInputs) : allInputs}</div>
			<div className={style.footer} data-alignment={footerAlignment}>
				{footer}
			</div>
		</div>
	)
}
