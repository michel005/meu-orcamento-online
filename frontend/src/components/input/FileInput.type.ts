export type FileInputType = {
	error?: string | undefined
	label?: string | undefined
	value:
		| {
				name: string
				base64: string
		  }
		| null
		| undefined
	onChange: (
		v:
			| {
					name: string
					base64: string
			  }
			| null
			| undefined
	) => void
	placeholder?: string | undefined
	disabled?: boolean | undefined
	loading?: boolean | undefined
	image?: boolean | undefined
}
