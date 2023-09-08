export type PaginationType = {
	currentPage: number
	onChange: (page: number) => void
	numberOfRows: number
	pageSize?: number
}
