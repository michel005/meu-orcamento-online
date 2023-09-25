export type ButtonOptionsType = {
	options: {
		[key: string]: string | undefined
	}
	value?: string
	onChange?: (opt: string) => void
	variation?: 'primary' | 'secondary'
}
