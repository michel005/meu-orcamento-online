import React, { useMemo } from 'react'
import { UseFormType } from './useForm.type'
import { Text } from '../components/input/Text'
import { DateInput } from '../components/input/DateInput'
import { Password } from '../components/input/Password'
import { Toggle } from '../components/input/Toggle'
import { Radio } from '../components/input/Radio'
import { Label } from '../components/Label.style'
import { FileInput } from '../components/input/FileInput'
import { Select } from '../components/input/Select'
import { Number } from '../components/input/Number'
import { useValidation } from './useValidation'
import { CurrencyInput } from '../components/input/CurrencyInput'

export const useForm = <T,>({
	definition,
	onChange,
	value,
	loading,
	disabled,
	validate,
}: UseFormType<T>) => {
	const { errors, validate: executeValidation } = useValidation<T>(validate || (() => {}))
	const fields = useMemo(() => {
		const allFields: keyof T = {} as any
		Object.keys(definition).forEach((field) => {
			const fieldDefinition = (definition as any)[field]
			const error = errors?.get(field)
			if (fieldDefinition.type === 'text') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<Text
						key={field}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						textArea={fieldDefinition?.textArea}
						label={fieldDefinition.label}
						placeholder={fieldDefinition?.placeholder}
						leftSpace={fieldDefinition?.leftSpace}
						rightSpace={fieldDefinition?.rightSpace}
						value={value?.[field as keyof typeof value] as string}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as string | null) = innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			} else if (fieldDefinition.type === 'number') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<Number
						key={field}
						step={fieldDefinition.step}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						label={fieldDefinition.label}
						placeholder={fieldDefinition.placeholder}
						value={value?.[field as keyof typeof value] as number}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as number | null) = innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			} else if (fieldDefinition.type === 'currency') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<CurrencyInput
						key={field}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						label={fieldDefinition.label}
						placeholder={fieldDefinition.placeholder}
						value={value?.[field as keyof typeof value] as number}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as number | null) = innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			} else if (fieldDefinition.type === 'select') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<Select
						key={field}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						label={fieldDefinition.label}
						options={fieldDefinition.options}
						idModifier={fieldDefinition.idModifier}
						labelModifier={fieldDefinition.labelModifier}
						valueModifier={fieldDefinition.valueModifier}
						placeholder={fieldDefinition.placeholder}
						value={value?.[field as keyof typeof value] as string}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as string | undefined) =
									innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			} else if (fieldDefinition.type === 'password') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<Password
						key={field}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						label={fieldDefinition.label}
						placeholder={fieldDefinition.placeholder}
						value={value?.[field as keyof typeof value] as string}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as string | null) = innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			} else if (fieldDefinition.type === 'toggle') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<Toggle
						key={field}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						label={fieldDefinition.label}
						value={value?.[field as keyof typeof value] as boolean}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as boolean | undefined) =
									innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			} else if (fieldDefinition.type === 'radio') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<>
						{fieldDefinition.label && (
							<Label key={field}>{fieldDefinition.label}</Label>
						)}
						{(fieldDefinition.options || []).map(([id, keyValue]: any) => {
							return (
								<Radio
									key={field + '-' + id}
									loading={loading}
									disabled={disabled || fieldDefinition?.disabled}
									label={keyValue}
									value={value?.[field as keyof typeof value] as string}
									definedValue={id}
									onChange={(innerValue) => {
										if (value) {
											;(value[field as keyof typeof value] as
												| string
												| null
												| undefined) = innerValue
										}
										onChange({ ...value } as T)
									}}
									error={error}
								/>
							)
						})}
					</>
				)
			} else if (fieldDefinition.type === 'date') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<DateInput
						key={field}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						label={fieldDefinition.label}
						placeholder={fieldDefinition.placeholder}
						value={value?.[field as keyof typeof value] as string}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as string | null | undefined) =
									innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			} else if (fieldDefinition.type === 'file') {
				;(allFields[field as keyof typeof allFields] as any) = (
					<FileInput
						key={field}
						loading={loading}
						disabled={disabled || fieldDefinition?.disabled}
						label={fieldDefinition.label}
						placeholder={fieldDefinition.placeholder}
						image={fieldDefinition?.image}
						value={value?.[field as keyof typeof value] as string | undefined | null}
						onChange={(innerValue) => {
							if (value) {
								;(value[field as keyof typeof value] as string | undefined | null) =
									innerValue
							}
							onChange({ ...value } as T)
						}}
						error={error}
					/>
				)
			}
		})
		return allFields as T
	}, [definition, onChange, value])
	return { fields, validate: executeValidation } as {
		fields: T
		validate: (value: T | null) => boolean
	}
}
