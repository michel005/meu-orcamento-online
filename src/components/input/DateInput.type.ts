export type DateInputType = {
	error?: string | undefined
	label?: string | undefined
	value: string | null | undefined
	onChange: (v: string | null | undefined) => void
	placeholder?: string | undefined
	disabled?: boolean | undefined
	loading?: boolean | undefined
}
