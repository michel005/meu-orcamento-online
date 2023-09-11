export type SelectType = {
	error?: string | undefined
	label?: string | undefined
	value: any | null
	onChange: (v: any | null) => void
	options: any[]
	idModifier?: (value: any) => any
	labelModifier?: (value: any) => any
	valueModifier?: (value: any) => any
	placeholder?: string | undefined
	disabled?: boolean | undefined
	loading?: boolean | undefined
}
