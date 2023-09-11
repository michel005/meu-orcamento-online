export type UseFormType<T> = {
	definition: {
		[key: string]: {
			label?: string
			step?: number
			options?: any
			placeholder?: string
			idModifier?: (value: any) => any
			labelModifier?: (value: any) => any
			valueModifier?: (value: any) => any
			disabled?: boolean
			image?: boolean | undefined
			textArea?: boolean | undefined
			nullable?: boolean | undefined
			nullableLabel?: string | undefined
			type:
				| 'text'
				| 'password'
				| 'date'
				| 'toggle'
				| 'radio'
				| 'file'
				| 'select'
				| 'number'
				| 'currency'
		}
	}
	loading?: boolean
	disabled?: boolean
	onChange: (value: T | null) => void
	value: T | null
	validate?: (value: T | null, errors: Map<string, string>) => void
}
