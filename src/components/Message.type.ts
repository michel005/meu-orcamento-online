export type MessageType = {
	index: number
	type: 'message' | 'question'
	header: string
	content: any
	confirm?: () => void
}
