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

export type useFormLayoutDefinitionType = {
	[key: string]: {
		label?: string
		placeholder?: string
		type?: 'text' | 'date' | 'password' | 'number' | 'currency' | 'checkbox' | 'file' | 'select'
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
}

export const useFormLayout = <Entity,>({
	definition,
	value,
	onChange,
}: useFormLayoutType<Entity>) => {
	const allFields = Object.keys(definition)
	const [errors, setErrors] = useState({})

	const fields = {} as any
	allFields.forEach((field) => {
		const fieldDefinition = definition[field as keyof typeof definition]
		if (['text', 'date', 'password', 'number'].includes(fieldDefinition.type as string)) {
			fields[field] = (
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
									value[field] =
										event.target.value === '' ? null : event.target.value
								}
								onChange({ ...value })
							}}
							disabled={fieldDefinition.disabled}
							placeholder={fieldDefinition.placeholder}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
					)}
					error={errors?.[field]?.message}
				/>
			)
		} else if (fieldDefinition.type === 'currency') {
			fields[field] = (
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
									event.target.value === ''
										? null
										: parseFloat(event.target.value) * 100
								onChange({ ...value })
							}}
							disabled={fieldDefinition.disabled}
							placeholder={fieldDefinition.placeholder}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
					)}
					error={errors?.[field]?.message}
				/>
			)
		} else if (['select'].includes(fieldDefinition.type as string)) {
			const id = Math.random().toString()
			fields[field] = (
				<Field
					label={fieldDefinition.label}
					leftSide={fieldDefinition.leftSide}
					info={fieldDefinition.info}
					input={(setFocus) => (
						<select
							id={id}
							value={value?.[field as keyof typeof value] as string}
							onChange={(event) => {
								value[field] = event.target.value
								onChange({ ...value })
							}}
							disabled={fieldDefinition.disabled}
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
					)}
					error={errors?.[field]?.message}
				/>
			)
		} else if (['checkbox'].includes(fieldDefinition.type as string)) {
			const id = Math.random().toString()
			fields[field] = (
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
							disabled={fieldDefinition.disabled}
							placeholder={fieldDefinition.placeholder}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
					)}
					isCheckbox={true}
					error={errors?.[field]?.message}
				/>
			)
		} else if (['file'].includes(fieldDefinition.type as string)) {
			const ref = useRef(null)
			fields[field] = (
				<div
					className={style.pictureField}
					style={{ width: fieldDefinition.size || '150px' }}
				>
					<UserPicture
						onClick={() => {
							ref.current.click()
						}}
						picture={value?.[field]}
						placeholder={!value[field] && 'Sem Imagem Selecionada'}
						size={fieldDefinition.size || '150px'}
					/>
					<div className={style.pictureOptions}>
						{value[field] ? (
							<Button
								leftIcon="close"
								onClick={() => {
									value[field] = null
									onChange({ ...value })
								}}
							/>
						) : (
							<Button
								leftIcon="search"
								onClick={() => {
									ref.current.click()
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
						disabled={fieldDefinition.disabled}
						placeholder={fieldDefinition.placeholder}
					/>
				</div>
			)
		} else {
			fields[field] = (
				<Field
					label={fieldDefinition.label}
					leftSide={fieldDefinition.leftSide}
					rightSide={fieldDefinition.rightSide}
					info={fieldDefinition.info}
					input={(setFocus, id) => (
						<input
							id={id}
							type="text"
							value={(value?.[field as keyof typeof value] as string) || ''}
							onChange={(event) => {
								value[field] = event.target.value === '' ? null : event.target.value
								onChange({ ...value })
							}}
							disabled={fieldDefinition.disabled}
							placeholder={fieldDefinition.placeholder}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
					)}
					error={errors?.[field]?.message}
				/>
			)
		}
	})
	fields.error = (
		<>
			{errors?.['error'] && (
				<Error message={errors?.['error']?.message} code={errors?.['error']?.code} />
			)}
		</>
	)

	return {
		fields: fields as Entity & {
			error: any
		},
		setErrors,
	}
}
