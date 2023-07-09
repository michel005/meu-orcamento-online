import React, { HTMLAttributes, useMemo } from 'react'
import { Input, InputType } from '../components/Input'
import { Select, SelectType } from '../components/Select'
import { CalendarInput } from '../components/CalendarInput'
import { Button } from '../components/Button'
import { InputImage, InputImageType } from '../components/InputImage'
import { ImageList, ImageListType } from '../components/ImageList'
import style from './UseFormLayout.module.scss'

export interface Fields extends HTMLAttributes<any> {
	label: string
	type?:
		| 'color'
		| 'date'
		| 'image'
		| 'imageList'
		| 'number'
		| 'password'
		| 'currency'
		| 'range'
		| 'text'
		| 'checkbox'
		| 'search'
		| 'select'
		| undefined
}

export type UseLayoutType<T> = {
	children?: null | ((fields: any) => any)
	footerAlignment?: 'center' | 'left' | 'right'
	fields: (Fields | SelectType | InputType | InputImageType | ImageListType)[]
	value?: any
	onChange: (value: T) => void
	disableAllFields?: boolean
	formValidation?: Map<string, string>
}

export function useFormLayout<T>({
	children = null,
	fields,
	value,
	onChange,
	disableAllFields = false,
	formValidation = new Map(),
}: UseLayoutType<T>) {
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
						value={(value as any)?.[id]}
						idModifier={fd.idModifier}
						valueModifier={fd.valueModifier}
						onChange={(x) => {
							value[id] = x
							onChange({ ...value })
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
						value={(value as any)?.[id]}
						onChange={(x) => {
							value[id] = x
							onChange({ ...value })
						}}
						variation="secondary"
						key={id}
					/>
				)
			} else if (field.type === 'image') {
				const fd = field as InputImageType
				console.log(fd)
				all[id] = (
					<InputImage
						{...fd}
						label={field.label}
						value={(value as any)?.[id]}
						onChange={(x) => {
							value[id] = x
							onChange({ ...value })
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
						value={(value as any)?.[id] || []}
						onChange={(x) => {
							value[id] = x
							onChange({ ...value })
						}}
						key={id}
						imageLimit={fd.imageLimit}
					/>
				)
			} else if (field.type === 'currency') {
				all[id] = (
					<Input
						{...field}
						type="number"
						info={null}
						disabled={disableAllFields || field.disabled}
						value={(value as any)?.[id] ? (value as any)?.[id] / 100 : 0}
						onChange={(x) => {
							value[id] = parseInt(x as string) * 100
							onChange({ ...value })
						}}
						key={id}
					/>
				)
			} else {
				all[id] = (
					<Input
						{...field}
						info={null}
						disabled={disableAllFields || field.disabled}
						value={(value as any)?.[id]}
						onChange={(x) => {
							value[id] = x
							onChange({ ...value })
						}}
						key={id}
					/>
				)
			}

			if (field.type !== 'image') {
				all[id] = (
					<div className={style.inputGroup}>
						{all[id]}
						{formValidation.has(id) && !!formValidation.has(id) && (
							<Button
								className={style.error}
								variation="link"
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
	}, [fields, children, formValidation, value])

	return allInputs
}
