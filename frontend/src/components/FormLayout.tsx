import React, { HTMLAttributes, useMemo } from 'react'
import style from './FormLayout.module.scss'
import { Input, InputType } from '../components/Input'
import { Select, SelectType } from './Select'
import { CalendarInput } from './CalendarInput'
import { Button } from './Button'
import { InputImage, InputImageType } from './InputImage'
import { ImageList, ImageListType } from './ImageList'

export interface Fields extends HTMLAttributes<any> {
	label: string
	type?:
		| 'color'
		| 'date'
		| 'image'
		| 'imageList'
		| 'number'
		| 'password'
		| 'range'
		| 'text'
		| 'checkbox'
		| 'search'
		| 'select'
		| undefined
}

export type FormLayoutType = {
	children?: null | ((fields: any) => any)
	footer?: any
	footerAlignment?: 'center' | 'left' | 'right'
	fields: (Fields | SelectType | InputType | InputImageType | ImageListType)[]
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
		fields.forEach((field: any) => {
			const id = field.id || ''

			if (field.type === 'select') {
				const fd = field as SelectType
				all[id] = (
					<Select
						{...fd}
						label={fd.label}
						value={value?.[id]}
						idModifier={fd.idModifier}
						valueModifier={fd.valueModifier}
						onChange={(inputValue) => {
							let x = value
							x[id] = inputValue
							onChange({ ...x })
						}}
						variation="secondary"
						key={id}
					/>
				)
			} else if (field.type === 'date') {
				const fd = field as CalendarInput
				all[id] = (
					<CalendarInput
						{...fd}
						label={field.label}
						value={value?.[id]}
						onChange={(inputValue) => {
							let x = value
							x[id] = inputValue
							onChange({ ...x })
						}}
						variation="secondary"
						key={id}
					/>
				)
			} else if (field.type === 'image') {
				const fd = field as InputImageType
				all[id] = (
					<InputImage
						label={field.label}
						value={value?.[id]}
						onChange={(inputValue) => {
							let x = value
							x[id] = inputValue
							onChange({ ...x })
						}}
						key={id}
						fullWidth={fd.fullWidth || false}
						enableRepositioning={fd?.enableRepositioning || false}
						readOnly={fd?.readOnly || false}
					/>
				)
			} else if (field.type === 'imageList') {
				const fd = field as ImageListType
				all[id] = (
					<ImageList
						value={value?.[id] || []}
						onChange={(inputValue) => {
							value[id] = inputValue
							onChange({ ...value })
						}}
						key={id}
						imageLimit={fd.imageLimit}
					/>
				)
			} else {
				all[id] = (
					<Input
						{...field}
						info={null}
						disabled={disableAllFields || field.disabled}
						value={value?.[id]}
						onChange={(inputValue) => {
							let x = value
							x[id] = inputValue
							onChange({ ...x })
						}}
						key={id}
					/>
				)
			}

			if (field.type !== 'image') {
				all[id] = (
					<div>
						{all[id]}
						{formValidation.has(id) && !!formValidation.has(id) && (
							<Button
								variation="link"
								className={style.error}
								disabled={true}
								leftIcon="warning"
							>
								{formValidation.get(id)}
							</Button>
						)}
					</div>
				)
			}
		})
		return all
	}, [fields, children, formValidation])

	return (
		<div className={style.formLayout}>
			<div className={style.content}>{children ? children(allInputs) : allInputs}</div>
		</div>
	)
}
