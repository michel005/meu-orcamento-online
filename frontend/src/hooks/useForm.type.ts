export type UseFormType<T> = {
	definition: {
		[key: string]: {
			label?: string
			options?: any
			placeholder?: string
			idModifier?: (value: any) => any
			labelModifier?: (value: any) => any
			valueModifier?: (value: any) => any
			disabled?: boolean
			image?: boolean | undefined
			textArea?: boolean | undefined
			type: 'text' | 'password' | 'date' | 'toggle' | 'radio' | 'file' | 'select' | 'number'
		}
	}
	errors?: Map<string, string>
	loading?: boolean
	disabled?: boolean
	onChange: (value: T | null) => void
	value: T | null
}