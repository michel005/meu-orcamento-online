export type TableTypeDefinition = {
	alignment?: 'left' | 'center' | 'right'
	header: string
	keyValue?: [string, string][]
	type: 'string' | 'currency' | 'date' | 'domain'
	valueOverride?: (row: any) => any
	width?: string
}

export type TableType = {
	definition: {
		[key: string]: TableTypeDefinition
	}
	value: any[]
}
