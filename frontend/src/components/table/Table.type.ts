export type TableType = {
	header: {
		[key: string]: {
			alignment?: 'left' | 'center' | 'right'
			label: string
			show?: boolean
			type?: 'text' | 'currency'
			valueModifier?: (row: any, rowIndex: number) => any
			width?: string
		}
	}
	value: any[]
}
