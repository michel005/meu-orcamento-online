import React, { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react'
import { Field } from '../components/fields/Field'
import { Error } from '../components/Error'
import { FileUtils } from '../utils/FileUtils'
import { Button, ButtonGhost } from '../components/Button'
import { Modal } from '../components/Modal'
import style from './useFormLayout.module.scss'
import { DateUtils } from '../utils/DateUtils'

export type useFormLayoutDefinitionType = {
	[key: string]: {
		label: string
		placeholder?: string
		type?: 'text' | 'date' | 'password' | 'number' | 'currency' | 'checkbox' | 'file' | 'select'
		options?: string[][]
		leftSide?: any
		rightSide?: any
		info?: any
		disabled?: boolean
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
		if (
			['text', 'date', 'password', 'number', 'currency'].includes(
				fieldDefinition.type as string
			)
		) {
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
			const id = Math.random().toString()
			const ref = useRef(null)
			const [showModal, setShowModal] = useState(false)
			const [temporaryFile, setTemporaryFile] = useState(null)
			fields[field] = (
				<>
					{showModal && (
						<Modal onClose={() => setShowModal(false)}>
							<h1>Selecione uma imagem</h1>
							{temporaryFile ? (
								<div
									className={style.modalImageDisplayPicture}
									style={{ backgroundImage: `url(${temporaryFile})` }}
								>
									<img src={temporaryFile} />
								</div>
							) : (
								<ButtonGhost
									leftIcon="folder_open"
									onClick={() => {
										ref.current.click()
									}}
								>
									Procurar...
								</ButtonGhost>
							)}
							{temporaryFile && (
								<div className={style.pictureOptions}>
									<ButtonGhost
										leftIcon="folder_open"
										onClick={() => {
											ref.current.click()
										}}
									>
										Procurar...
									</ButtonGhost>
									<ButtonGhost
										leftIcon="close"
										onClick={() => {
											setShowModal(false)
											value[field] = null
											onChange({ ...value })
										}}
									>
										Remover
									</ButtonGhost>
									<Button
										leftIcon="check"
										onClick={() => {
											setShowModal(false)
											value[field] = temporaryFile
											onChange({ ...value })
										}}
									>
										Usar imagem
									</Button>
								</div>
							)}
						</Modal>
					)}
					{value?.[field] ? (
						<Field
							className={style.fileField}
							label={fieldDefinition.label}
							info={fieldDefinition.info}
							error={
								<div className={style.picturePreview}>
									<img
										onClick={() => {
											setShowModal((x) => !x)
											setTemporaryFile(value?.[field])
										}}
										src={value?.[field]}
									/>
								</div>
							}
						/>
					) : (
						<Field
							label={fieldDefinition.label}
							info={fieldDefinition.info}
							leftSide={
								<ButtonGhost
									leftIcon="photo"
									onClick={() => {
										setShowModal((x) => !x)
										setTemporaryFile(value?.[field])
									}}
								>
									Procurar imagem...
								</ButtonGhost>
							}
							input={() => <></>}
							error={errors?.[field]?.message}
						/>
					)}
					<input
						ref={ref}
						style={{ display: 'none' }}
						id={id}
						type={fieldDefinition.type}
						onChange={(event) => {
							FileUtils.fileToBase64(event.target.files?.[0], (base64) => {
								setTemporaryFile(base64 === '' ? null : base64)
							})
						}}
						disabled={fieldDefinition.disabled}
						placeholder={fieldDefinition.placeholder}
					/>
				</>
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
