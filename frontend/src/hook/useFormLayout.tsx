import React, { HTMLAttributes, useMemo } from 'react'
import { Input, InputType } from '../components/Input'
import { Select, SelectType } from '../components/Select'
import { CalendarInput } from '../components/CalendarInput'
import { Button } from '../components/Button'
import { InputImage, InputImageType } from '../components/InputImage'
import { ImageList, ImageListType } from '../components/ImageList'
import style from './UseFormLayout.module.scss'
import { Text } from '../components/Text'
import { CalendarType } from '../components/Calendar'

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
	fields: (Fields | SelectType | InputType | InputImageType | ImageListType | CalendarType)[]
	value?: any
	onChange: (value: T) => void
	disableAllFields?: boolean
	formValidation?: Map<string, string>
}

export function useFormLayout<T>({
	fields,
	value,
	onChange,
	disableAllFields = false,
	formValidation = new Map(),
}: UseLayoutType<T>) {
	let allInputs = useMemo(
		() =>
			fields.map((field: any) => {
				const id = field.id || ''

				if (field.type === 'select') {
					const fd = field as SelectType
					return [
						id,
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
						/>,
					]
				} else if (field.type === 'date') {
					const fd = field as CalendarInput
					return [
						id,
						<CalendarInput
							{...fd}
							label={field.label}
							value={value?.[id]}
							onChange={(x) => {
								value[id] = x
								onChange({ ...value })
							}}
							variation="secondary"
							key={id}
						/>,
					]
				} else if (field.type === 'image') {
					const fd = field as InputImageType
					return [
						id,
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
						/>,
					]
				} else if (field.type === 'imageList') {
					const fd = field as ImageListType
					return [
						id,
						<ImageList
							value={(value as any)?.[id] || []}
							onChange={(x) => {
								value[id] = x
								onChange({ ...value })
							}}
							key={id}
							imageLimit={fd.imageLimit}
						/>,
					]
				} else if (field.type === 'currency') {
					return [
						id,
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
						/>,
					]
				} else {
					return [
						id,
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
						/>,
					]
				}
			}),
		[value, fields]
	)

	let all: any = {}

	allInputs.forEach((def) => {
		const id = def[0]
		all[id] = (
			<div className={style.inputGroup}>
				{def[1]}
				{formValidation.has(id) && !!formValidation.has(id) && (
					<Text className={style.error} leftIcon="warning">
						{formValidation.get(id)}
					</Text>
				)}
			</div>
		)
	})

	return all as T
}
