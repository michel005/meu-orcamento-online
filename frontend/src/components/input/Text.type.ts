export type TextType = {
	error?: string | undefined
	label?: string | undefined
	value: string | null
	onChange: (v: string | null) => void
	placeholder?: string | undefined
	disabled?: boolean | undefined
	loading?: boolean | undefined
	textArea?: boolean | undefined
}
