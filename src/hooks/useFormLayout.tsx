import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Field } from '../components/fields/Field'
import { Error } from '../components/Error'
import { FileUtils } from '../utils/FileUtils'
import { ButtonGhost, ButtonWhite } from '../components/Button'

export type useFormLayoutDefinitionType = {
	[key: string]: {
		label: string
		placeholder?: string
		type?: 'text' | 'date' | 'password' | 'number' | 'currency' | 'checkbox' | 'file'
		leftSide?: any
		rightSide?: any
		disabled?: boolean
	}
}

export type useFormLayoutType<Entity> = {
	definition: useFormLayoutDefinitionType
	value: Entity
	onChange: Dispatch<SetStateAction<Entity>>
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
					input={(setFocus, id) => (
						<input
							id={id}
							type={fieldDefinition.type}
							value={(value?.[field as keyof typeof value] as string) || ''}
							onChange={(event) => {
								onChange((previousValue: any) => {
									previousValue[field] =
										event.target.value === '' ? null : event.target.value
									return { ...previousValue }
								})
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
		} else if (['checkbox'].includes(fieldDefinition.type as string)) {
			const id = Math.random().toString()
			fields[field] = (
				<Field
					leftSide={<label htmlFor={id}>{fieldDefinition.label}</label>}
					input={(setFocus) => (
						<input
							id={id}
							type="checkbox"
							checked={value?.[field as keyof typeof value] as boolean}
							onChange={(event) => {
								onChange((previousValue: any) => {
									previousValue[field] = event.target.checked
									return { ...previousValue }
								})
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
			fields[field] = (
				<>
					<Field
						label={fieldDefinition.label}
						leftSide={
							value?.[field] ? (
								<>
									<img src={value?.[field]} />
								</>
							) : (
								<ButtonWhite
									leftIcon="folder_open"
									onClick={() => {
										ref.current.click()
									}}
								>
									Clique em procurar para achar uma imagem...
								</ButtonWhite>
							)
						}
						rightSide={
							value?.[field] ? (
								<div style={{ display: 'flex', flexDirection: 'row' }}>
									<ButtonGhost
										leftIcon="clear_all"
										onClick={() => {
											onChange((previousValue: any) => {
												previousValue[field] = null
												return { ...previousValue }
											})
										}}
									>
										Limpar
									</ButtonGhost>
									<ButtonGhost
										leftIcon="folder_open"
										onClick={() => {
											ref.current.click()
										}}
									>
										Procurar
									</ButtonGhost>
								</div>
							) : (
								<ButtonGhost
									leftIcon="file_open"
									onClick={() => {
										ref.current.click()
									}}
								>
									Procurar
								</ButtonGhost>
							)
						}
						input={() => <></>}
						error={errors?.[field]?.message}
					/>
					<input
						ref={ref}
						style={{ display: 'none' }}
						id={id}
						type={fieldDefinition.type}
						onChange={(event) => {
							FileUtils.fileToBase64(event.target.files?.[0], (base64) => {
								onChange((previousValue: any) => {
									previousValue[field] = base64 === '' ? null : base64
									return { ...previousValue }
								})
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
					input={(setFocus, id) => (
						<input
							id={id}
							type="text"
							value={(value?.[field as keyof typeof value] as string) || ''}
							onChange={(event) => {
								onChange((previousValue: any) => {
									previousValue[field] =
										event.target.value === '' ? null : event.target.value
									return { ...previousValue }
								})
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
	return {
		fields: {
			...fields,
			error: errors?.['error'] && (
				<Error message={errors?.['error']?.message} code={errors?.['error']?.code} />
			),
		} as any,
		setErrors,
	}
}
