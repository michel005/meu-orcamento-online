import { GoogleIcons } from '../../types/GoogleIcons'

export type TextType = {
	leftSpace?: any
	rightSpace?: any
	error?: string | undefined
	label?: string | undefined
	value: string | null
	onChange: (v: string | null) => void
	placeholder?: string | undefined
	disabled?: boolean | undefined
	loading?: boolean | undefined
	textArea?: boolean | undefined
}
