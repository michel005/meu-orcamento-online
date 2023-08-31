export type TableType = {
	header: {
		[key: string]: {
			alignment?: 'left' | 'center' | 'right'
			label: string
			type?: 'text' | 'currency'
			valueModifier?: (row: any) => any
			width?: string
		}
	}
	rowComplement?: (row: any) => any
	value: any[]
}
