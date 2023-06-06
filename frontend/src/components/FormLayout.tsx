import React, { useEffect, useMemo, useState } from 'react'
import style from './FormLayout.module.scss'
import { Input, InputType } from '../components/Input'
import { Select, SelectType } from './Select'
import { CalendarInput } from './CalendarInput'
import { Button } from './Button'

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
	formValidation?: Map<string, string>
}

export const FormLayout = ({
	children = null,
	fields,
	value,
	onChange,
	disableAllFields = false,
	formValidation = new Map(),
}: FormLayoutType) => {
	let allInputs = useMemo(() => {
		let all: any = {}
		fields.forEach((field) => {
			if (field.type === 'select') {
				all[field.id] = (
					<Select
						{...field}
						label={field.label}
						value={value[field.id]}
						idModifier={field.idModifier}
						valueModifier={field.valueModifier}
						onChange={(inputValue) => {
							let x = value
							x[field.id] = inputValue
							onChange({ ...x })
						}}
						key={field.id}
					/>
				)
			} else if (field.type === 'date') {
				all[field.id] = (
					<CalendarInput
						{...field}
						label={field.label}
						value={value[field.id]}
						onChange={(inputValue) => {
							let x = value
							x[field.id] = inputValue
							onChange({ ...x })
						}}
						key={field.id}
					/>
				)
			} else {
				all[field.id] = (
					<Input
						{...field}
						error={null}
						info={null}
						disabled={disableAllFields || field.disabled}
						value={value[field.id]}
						onChange={(inputValue) => {
							let x = value
							x[field.id] = inputValue
							onChange({ ...x })
						}}
						key={field.id}
					/>
				)
			}

			all[field.id] = (
				<div key={field.id}>
					{all[field.id]}
					{formValidation.has(field.id) && !!formValidation.has(field.id) && (
						<Button
							variation="link"
							className={style.error}
							disabled={true}
							leftIcon="warning"
						>
							{formValidation.get(field.id)}
						</Button>
					)}
				</div>
			)
		})
		return all
	}, [fields, children, formValidation])

	return (
		<div className={style.formLayout}>
			<div className={style.content}>{children ? children(allInputs) : allInputs}</div>
		</div>
	)
}
