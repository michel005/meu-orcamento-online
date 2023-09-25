export type RadioType = {
	error?: string | undefined
	label?: string | undefined
	group?: string | undefined
	value: string | null | undefined
	definedValue: string | undefined
	onChange: (v: string | null | undefined) => void
	disabled?: boolean | undefined
	loading?: boolean | undefined
}
