import React, { useCallback, useEffect, useState } from 'react'
import { Field } from '../components/Field'
import { Error } from '../components/Error'
import { DateUtils } from '../utils/DateUtils'
import { SelectInput } from '../components/inputs/SelectInput'
import { PictureField } from '../components/inputs/PictureField'
import { LabelInput } from '../components/inputs/LabelInput'

const FileField = ({ field, fieldDefinition, value, onChange, disableAll }) => {
	return (
		<PictureField
			field={field}
			value={value}
			onChange={onChange}
			disabled={disableAll || fieldDefinition.disabled}
			placeholder={disableAll || fieldDefinition.disabled ? '' : fieldDefinition.placeholder}
			type={fieldDefinition.pictureType}
			name={fieldDefinition.pictureName}
			size={fieldDefinition.size}
		/>
	)
}
const CheckboxField = ({ id, field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<Field
			field={field}
			leftSide={<label htmlFor={id}>{fieldDefinition.label}</label>}
			info={fieldDefinition.info}
			input={(setFocus) => (
				<input
					id={id}
					type="checkbox"
					checked={value?.[field as keyof typeof value] as boolean}
					onChange={(event) => {
						value[field] = event.target.checked
						onChange({ ...value })
					}}
					disabled={disableAll || fieldDefinition.disabled}
					placeholder={
						disableAll || fieldDefinition.disabled ? '' : fieldDefinition.placeholder
					}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
			)}
			disabled={disableAll || fieldDefinition.disabled}
			isCheckbox={true}
			error={errors?.[field]?.message}
		/>
	)
}
const SelectField = ({ field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<SelectInput
			field={field}
			label={fieldDefinition.label}
			leftSide={fieldDefinition.leftSide}
			rightSide={fieldDefinition.rightSide}
			info={fieldDefinition.info}
			disabled={disableAll || fieldDefinition.disabled}
			error={errors?.[field]?.message}
			value={value?.[field as keyof typeof value] as string}
			onChange={(newValue: any) => {
				value[field] = newValue
				onChange({ ...value })
			}}
			numberOfOptions={fieldDefinition.numberOfOptions}
			options={fieldDefinition.options}
			optionsPosition={fieldDefinition.optionsPosition}
			idModifier={fieldDefinition.idModifier || ((value) => value[0])}
			valueRender={fieldDefinition.valueRender || ((value) => <>{value[1]}</>)}
			optionValueRender={fieldDefinition.optionValueRender}
			placeholder={disableAll || fieldDefinition.disabled ? '' : fieldDefinition.placeholder}
			multiple={fieldDefinition.multiple}
		/>
	)
}
const CurrencyField = ({ field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<Field
			field={field}
			label={fieldDefinition.label}
			leftSide={fieldDefinition.leftSide}
			rightSide={fieldDefinition.rightSide}
			info={fieldDefinition.info}
			input={(setFocus, id) => (
				<input
					id={id}
					type="number"
					value={
						value?.[field as keyof typeof value]
							? parseFloat(value?.[field as keyof typeof value] as string) / 100
							: 0
					}
					onChange={(event) => {
						value[field] =
							event.target.value === '' ? null : parseFloat(event.target.value) * 100
						onChange({ ...value })
					}}
					disabled={disableAll || fieldDefinition.disabled}
					placeholder={
						disableAll || fieldDefinition.disabled ? '' : fieldDefinition.placeholder
					}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
			)}
			disabled={disableAll || fieldDefinition.disabled}
			error={errors?.[field]?.message}
		/>
	)
}

const LabelField = ({ field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<LabelInput
			label={fieldDefinition.label}
			leftSide={fieldDefinition.leftSide}
			rightSide={fieldDefinition.rightSide}
			valueType={fieldDefinition.labelsValueType}
			value={value?.[field as keyof typeof value]}
			onChange={(newValue: any) => {
				value[field] = newValue
				onChange({ ...value })
			}}
			field={field}
			disabled={disableAll || fieldDefinition.disabled}
			error={errors?.[field]?.message}
		/>
	)
}

const GeneralField = ({ field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<Field
			field={field}
			label={fieldDefinition.label}
			leftSide={fieldDefinition.leftSide}
			rightSide={fieldDefinition.rightSide}
			info={fieldDefinition.info}
			input={(setFocus, id) => (
				<input
					id={id}
					type={fieldDefinition.type === 'date' ? 'text' : fieldDefinition.type}
					value={value?.[field as keyof typeof value] || ''}
					onChange={(event) => {
						value[field] = event.target.value === '' ? null : event.target.value
						onChange({ ...value })
					}}
					disabled={disableAll || fieldDefinition.disabled}
					placeholder={
						disableAll || fieldDefinition.disabled ? '' : fieldDefinition.placeholder
					}
					onFocus={(event) => {
						setFocus(true)
						if (fieldDefinition.type === 'date') {
							value[field] =
								event.target.value === ''
									? null
									: DateUtils.dateToString(
											DateUtils.stringToDate(event.target.value)
									  )
						}
					}}
					onBlur={() => setFocus(false)}
				/>
			)}
			disabled={disableAll || fieldDefinition.disabled}
			error={errors?.[field]?.message}
		/>
	)
}

export type useFormDefinitionType = {
	label?: string
	placeholder?: string
	type?:
		| 'text'
		| 'date'
		| 'password'
		| 'number'
		| 'currency'
		| 'checkbox'
		| 'file'
		| 'select'
		| 'labels'
		| 'subForm'
	pictureType?: 'circle' | 'square'
	idModifier?: any
	valueRender?: any
	optionValueRender?: any
	pictureName?: string
	options?: any
	numberOfOptions?: number
	leftSide?: any
	rightSide?: any
	info?: any
	disabled?: boolean
	size?: string
	multiple?: boolean
	optionsPosition?: 'top' | 'bottom'
	labelsValueType?: 'string' | 'list'
	subForm?: useFormLayoutDefinitionType
}

export type useFormLayoutDefinitionType = {
	[key: string]: useFormDefinitionType
}

export type useFormLayoutType<Entity> = {
	definition: useFormLayoutDefinitionType
	value: Entity
	onChange: (value: Entity) => void
	disable?: boolean
	injectErrors?: any
}

export const useFormLayout = <Entity,>({
	definition,
	value,
	onChange,
	disable,
	injectErrors,
}: useFormLayoutType<Entity>) => {
	const [disableAll, setDisableAll] = useState(disable || false)
	const [errors, setErrors] = useState(injectErrors || {})

	const getField = useCallback(
		(field: string, overrideProps = {}): any => {
			if (field === 'error') {
				return (
					<>
						{errors?.['error'] && (
							<Error
								message={errors?.['error']?.message}
								code={errors?.['error']?.code}
							/>
						)}
					</>
				)
			}
			const fieldDefinition = { ...(definition[field] || {}), ...overrideProps }
			const id = Math.random().toString()
			if (['text', 'date', 'password', 'number'].includes(fieldDefinition.type || 'text')) {
				return (
					<GeneralField
						field={field}
						fieldDefinition={fieldDefinition}
						value={value}
						onChange={onChange}
						errors={errors}
						disableAll={disableAll}
					/>
				)
			} else if (fieldDefinition.type === 'currency') {
				return (
					<CurrencyField
						field={field}
						fieldDefinition={fieldDefinition}
						value={value}
						onChange={onChange}
						errors={errors}
						disableAll={disableAll}
					/>
				)
			} else if (['select'].includes(fieldDefinition.type)) {
				return (
					<SelectField
						field={field}
						fieldDefinition={fieldDefinition}
						value={value}
						onChange={onChange}
						errors={errors}
						disableAll={disableAll}
					/>
				)
			} else if (['labels'].includes(fieldDefinition.type)) {
				return (
					<LabelField
						field={field}
						fieldDefinition={fieldDefinition}
						value={value}
						onChange={onChange}
						errors={errors}
						disableAll={disableAll}
					/>
				)
			} else if (['checkbox'].includes(fieldDefinition.type)) {
				return (
					<CheckboxField
						id={id}
						field={field}
						fieldDefinition={fieldDefinition}
						value={value}
						onChange={onChange}
						errors={errors}
						disableAll={disableAll}
					/>
				)
			} else if (['file'].includes(fieldDefinition.type)) {
				return (
					<FileField
						field={field}
						fieldDefinition={fieldDefinition}
						value={value}
						onChange={onChange}
						disableAll={disableAll}
					/>
				)
			} else if (['subForm'].includes(fieldDefinition.type)) {
				const { getField: getSubFormField, setDisableAll: setDisableAllSubForm } =
					useFormLayout({
						definition: fieldDefinition.subForm,
						value: value?.[field],
						onChange: (v) => {
							value[field] = { ...v }
							onChange({ ...value })
						},
						injectErrors: errors?.[field],
						disable: disableAll,
					})
				useEffect(() => {
					setDisableAllSubForm(disableAll)
				}, [disableAll])
				return {
					getField: getSubFormField,
				}
			} else {
				return (
					<GeneralField
						field={field}
						fieldDefinition={fieldDefinition}
						value={value}
						onChange={onChange}
						errors={errors}
						disableAll={disableAll}
					/>
				)
			}
		},
		[value, definition]
	)

	return {
		errors,
		setErrors,
		getField,
		setDisableAll,
	}
}
