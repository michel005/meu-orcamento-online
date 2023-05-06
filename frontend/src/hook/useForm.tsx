import React from 'react'
import { useState } from 'react'
import { InputWithLabel } from '../components/InputWithLabel'

export const useForm = ({ definition }: any) => {
	const [value, setValue] = useState<any>({})

	const fieldCollections = Object.keys(definition).map((field, fieldKey) => {
		const def = definition[field]
		if (def.type === 'radio') {
			return Object.keys(def.list || []).map((radio, radioKey) => {
				return (
					<InputWithLabel
						key={`${fieldKey}_${radioKey}`}
						label={def.list[radio]}
						type="radio"
						value={value[field] === radio}
						inputProps={{
							name: fieldKey,
						}}
						onChange={() =>
							setValue((form: any) => {
								form[field] = radio
								return { ...form }
							})
						}
					/>
				)
			})
		}
		return (
			<InputWithLabel
				key={fieldKey}
				inputProps={def}
				label={def.label}
				type={def.type}
				value={value[field]}
				onChange={(e: any) =>
					setValue((form: any) => {
						form[field] = e
						return { ...form }
					})
				}
				leftButton={def.type !== 'checkbox' && def.leftButton}
				rightButton={def.type !== 'checkbox' && def.rightButton}
				placeholder={def.placeholder}
			/>
		)
	})

	let fields: any = {}
	Object.keys(definition).forEach((field, index) => {
		fields[field] = fieldCollections.find((f, i) => i === index)
	})

	const clear = () => {
		setValue({})
	}

	return {
		fields,
		value,
		setValue,
		clear,
	}
}
