import { TextType } from '../components/input/Text.type'

type KeysOfType<T, U> = {
	[K in keyof T]: T[K] extends U ? K : any
}

export interface DefinitionField {
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
	leftSpace?: any
	rightSpace?: any
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

export type UseFormType<T> = {
	definition: {
		[key in KeysOfType<T, any>[keyof T]]?: DefinitionField
	}
	loading?: boolean
	disabled?: boolean
	onChange: (value: T | null) => void
	value: T | null
	validate?: (value: T | null, errors: Map<string, string>) => void
}
