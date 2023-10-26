import React, { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react'
import { Field } from '../components/fields/Field'
import { Error } from '../components/Error'
import { FileUtils } from '../utils/FileUtils'
import { Button, ButtonGhost } from '../components/Button'
import { Modal } from '../components/Modal'
import style from './useFormLayout.module.scss'
import { DateUtils } from '../utils/DateUtils'
import { UserPicture } from '../components/UserPicture'
import { NumberUtils } from '../utils/NumberUtils'

const FileField = ({ field, fieldDefinition, value, onChange, disableAll }) => {
	const ref = useRef(null)
	return (
		<div className={style.pictureField} style={{ width: fieldDefinition.size || '150px' }}>
			<UserPicture
				className={style.picture}
				onClick={
					!disableAll || !fieldDefinition.disabled
						? () => {
								ref.current.click()
						  }
						: undefined
				}
				picture={value?.[field]}
				placeholder={
					!!fieldDefinition.pictureName
						? undefined
						: !value[field] && 'Sem Imagem Selecionada'
				}
				size={fieldDefinition.size || '150px'}
				type={fieldDefinition.pictureType}
				name={fieldDefinition.pictureName}
			/>
			<div className={style.pictureOptions}>
				{value[field] ? (
					<Button
						leftIcon="close"
						onClick={() => {
							if (!disableAll && !fieldDefinition.disabled) {
								value[field] = null
								onChange({ ...value })
							}
						}}
					/>
				) : (
					<Button
						leftIcon="search"
						onClick={() => {
							if (!disableAll && !fieldDefinition.disabled) {
								ref.current.click()
							}
						}}
					/>
				)}
			</div>
			<input
				ref={ref}
				style={{ display: 'none' }}
				type={fieldDefinition.type}
				onChange={(event) => {
					FileUtils.fileToBase64(event.target.files?.[0], (base64) => {
						value[field] = base64
						onChange({ ...value })
					})
				}}
			/>
		</div>
	)
}
const CheckboxField = ({ id, field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<Field
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
					placeholder={fieldDefinition.placeholder}
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

const SelectField = ({ id, field, fieldDefinition, value, onChange, errors, disableAll }) => {
	const ref = useRef(null)

	return (
		<Field
			label={fieldDefinition.label}
			leftSide={fieldDefinition.leftSide}
			rightSide={
				<ButtonGhost
					leftIcon="keyboard_arrow_down"
					onClick={() => {
						if (ref.current) {
							ref.current.dispatchEvent(
								new MouseEvent('mousedown', {
									view: window,
									bubbles: true,
									cancelable: true,
								})
							)
						}
					}}
				/>
			}
			info={fieldDefinition.info}
			input={(setFocus) => {
				return (
					<select
						id={id}
						ref={ref}
						value={value?.[field as keyof typeof value] as string}
						onChange={(event) => {
							value[field] = event.target.value
							onChange({ ...value })
						}}
						disabled={disableAll || fieldDefinition.disabled}
						placeholder={fieldDefinition.placeholder}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
					>
						<option></option>
						{(fieldDefinition.options || []).map((option: any) => {
							return (
								<option key={option[0]} value={option[0]}>
									{option[1]}
								</option>
							)
						})}
					</select>
				)
			}}
			disabled={disableAll || fieldDefinition.disabled}
			error={errors?.[field]?.message}
		/>
	)
}
const CurrencyField = ({ field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<Field
			label={fieldDefinition.label}
			leftSide={fieldDefinition.leftSide}
			rightSide={fieldDefinition.rightSide}
			info={fieldDefinition.info}
			input={(setFocus, id) => (
				<input
					id={id}
					type="number"
					value={parseFloat(value?.[field as keyof typeof value] as string) / 100}
					onChange={(event) => {
						value[field] =
							event.target.value === '' ? null : parseFloat(event.target.value) * 100
						onChange({ ...value })
					}}
					disabled={disableAll || fieldDefinition.disabled}
					placeholder={fieldDefinition.placeholder}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
			)}
			disabled={disableAll || fieldDefinition.disabled}
			error={errors?.[field]?.message}
		/>
	)
}
const GeneralField = ({ field, fieldDefinition, value, onChange, errors, disableAll }) => {
	return (
		<Field
			label={fieldDefinition.label}
			leftSide={fieldDefinition.leftSide}
			rightSide={fieldDefinition.rightSide}
			info={fieldDefinition.info}
			input={(setFocus, id) => (
				<input
					id={id}
					type={fieldDefinition.type}
					value={
						fieldDefinition.type === 'date'
							? (value?.[field as keyof typeof value] as string)
								? DateUtils.stringToInputDate(
										value?.[field as keyof typeof value] as string
								  )
								: ''
							: (value?.[field as keyof typeof value] as string)
					}
					onChange={(event) => {
						if (fieldDefinition.type === 'date') {
							value[field] =
								event.target.value === ''
									? null
									: DateUtils.inputDateToString(event.target.value)
						} else {
							value[field] = event.target.value === '' ? null : event.target.value
						}
						onChange({ ...value })
					}}
					disabled={disableAll || fieldDefinition.disabled}
					placeholder={fieldDefinition.placeholder}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
			)}
			disabled={disableAll || fieldDefinition.disabled}
			error={errors?.[field]?.message}
		/>
	)
}

export type useFormLayoutDefinitionType = {
	[key: string]: {
		label?: string
		placeholder?: string
		type?: 'text' | 'date' | 'password' | 'number' | 'currency' | 'checkbox' | 'file' | 'select'
		pictureType?: 'circle' | 'square'
		pictureName?: string
		options?: string[][]
		leftSide?: any
		rightSide?: any
		info?: any
		disabled?: boolean
		size?: string
	}
}

export type useFormLayoutType<Entity> = {
	definition: useFormLayoutDefinitionType
	value: Entity
	onChange: (value: Entity) => void
	disableAll?: boolean
}

export const useFormLayout = <Entity,>({
	definition,
	value,
	onChange,
	disableAll,
}: useFormLayoutType<Entity>) => {
	const [errors, setErrors] = useState({})

	const getError = () => {
		return (
			<>
				{errors?.['error'] && (
					<Error message={errors?.['error']?.message} code={errors?.['error']?.code} />
				)}
			</>
		)
	}

	const getField = (field: string, overrideProps = {}) => {
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
					id={id}
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
	}

	return {
		setErrors,
		getField,
		getError,
	}
}
