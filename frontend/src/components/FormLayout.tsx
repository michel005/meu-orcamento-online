import React, { useEffect, useMemo, useState } from 'react'
import style from './FormLayout.module.scss'
import { Input, InputType } from '../components/Input'
import { Select, SelectType } from './Select'
import { CalendarInput } from './CalendarInput'

export type FormLayoutType = {
	children?: null | ((fields: any) => any)
	footer?: any
	footerAlignment?: 'center' | 'left' | 'right'
	fields: (InputType &
		SelectType & {
			id: string
		})[]
	value?: any
	onChange: (value: any) => void
	disableAllFields?: boolean
}

export const FormLayout = ({
	children = null,
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
			if (field.type === 'select') {
				all[field.id] = (
					<Select
						{...field}
						label={field.label}
						key={field.id}
						options={field.options}
						value={value[field.id]}
						idModifier={field.idModifier}
						valueModifier={field.valueModifier}
						nullable={field.nullable}
						nullableLabel={field.nullableLabel}
						onChange={(inputValue) => {
							onChange((x: any) => {
								x[field.id] = inputValue
								return { ...x }
							})
						}}
					/>
				)
			} else if (field.type === 'date') {
				all[field.id] = (
					<CalendarInput
						{...field}
						label={field.label}
						key={field.id}
						value={value[field.id]}
						onChange={(inputValue) => {
							onChange((x: any) => {
								x[field.id] = inputValue ? inputValue() : null
								return { ...x }
							})
						}}
					/>
				)
			} else {
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
			}
		})
		return all
	}, [fields, children])

	return (
		<div className={style.formLayout}>
			<div className={style.content}>{children ? children(allInputs) : allInputs}</div>
			{footer && (
				<div className={style.footer} data-alignment={footerAlignment}>
					{footer}
				</div>
			)}
		</div>
	)
}
