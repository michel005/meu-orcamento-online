import React, { Dispatch, SetStateAction, useState } from 'react'
import { Field } from '../components/fields/Field'

export type useFormLayoutDefinitionType = {
	[key: string]: {
		label: string
		type?: 'text' | 'date' | 'password' | 'number' | 'currency' | 'checkbox'
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
									previousValue[field] = event.target.value
									return { ...previousValue }
								})
							}}
							disabled={fieldDefinition.disabled}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
					)}
					error={errors?.[field]}
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
							type={fieldDefinition.type || 'text'}
							checked={value?.[field as keyof typeof value] as boolean}
							onChange={(event) => {
								onChange((previousValue: any) => {
									previousValue[field] = event.target.checked
									return { ...previousValue }
								})
							}}
							disabled={fieldDefinition.disabled}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
					)}
					isCheckbox={true}
					error={errors?.[field]}
				/>
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
									previousValue[field] = event.target.value
									return { ...previousValue }
								})
							}}
							disabled={fieldDefinition.disabled}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
					)}
					error={errors?.[field]}
				/>
			)
		}
	})
	return {
		fields: fields as any,
		setErrors,
	}
}
