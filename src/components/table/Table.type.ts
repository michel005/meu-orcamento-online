type KeysOfType<T, U> = {
	[K in keyof T]: T[K] extends U ? K : any
}

export type TableType<T> = {
	header: {
		[key in KeysOfType<T, any>[keyof T]]?: {
			alignment?: 'left' | 'center' | 'right'
			label: string
			show?: boolean
			type?: 'text' | 'currency' | 'date'
			valueModifier?: (row: T, rowIndex: number) => any
			width?: string
		}
	}
	footer?: any
	pagination?: boolean
	value: T[]
}
