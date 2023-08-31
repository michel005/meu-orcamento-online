export type ToggleType = {
	error?: string | undefined
	label?: string | undefined
	value: boolean | undefined
	onChange: (v: boolean | undefined) => void
	disabled?: boolean | undefined
	loading?: boolean | undefined
}
